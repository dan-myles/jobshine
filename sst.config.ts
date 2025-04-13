/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "JobShine",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    /**
     * Project URL 🌐
     */
    const APP: { url: string; provider: "cloudflare" | "aws" | "" } = {
      url: "jobshine.cc",
      provider: "cloudflare",
    };

    // Set the URL based on the stage
    APP.url =
      $app.stage === "production" ? APP.url : `${$app.stage}.${APP.url}`;

    /**
     * Secrets
     * These are stored in AWS Secrete Manager and need to be set
     * with `pnpx sst secret set <secret> <value>`
     */
    const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET");
    const AWS_BEDROCK_ACCESS_KEY_ID = new sst.Secret(
      "AWS_BEDROCK_ACCESS_KEY_ID",
    );
    const AWS_BEDROCK_SECRET_ACCESS_KEY = new sst.Secret(
      "AWS_BEDROCK_SECRET_ACCESS_KEY",
    );
    const DEEPSEEK_API_KEY = new sst.Secret("DEEPSEEK_API_KEY");
    const OPENAI_API_KEY = new sst.Secret("OPENAI_API_KEY");
    const POLAR_ACCESS_TOKEN = new sst.Secret("POLAR_ACCESS_TOKEN");

    /**
     * Common Env Vars
     * These are common environment variables that we'll use across our apps.
     */
    const COMMON_ENV = {
      NODE_ENV: $app.stage === "production" ? "production" : "development",
    };

    /**
     * VPC
     */
    const vpc = new sst.aws.Vpc("JobShineVPC", {
      bastion: true,
      nat: "ec2",
    });

    /**
     * Database
     */
    const db = new sst.aws.Postgres("JobShineDB", {
      vpc,
      proxy: true,
    });

    /**
     * Resume Bucket
     * This is a bucket that we'll use to store resumes.
     */
    const resumeBucket = new sst.aws.Bucket("JobShineResumeBucket");

    /**
     * Router
     * This is our router that we'll use to route our requests to our services.
     */
    const router = new sst.aws.Router("JobShineRouter", {
      domain: {
        name: APP.url,
        dns: sst.cloudflare.dns(),
      },
    });

    /**
     * Functions
     * These are our backend functions that are used
     * to handle our API requests.
     */
    // 🛡️Auth
    const auth = new sst.aws.Function("JobShineAuth", {
      vpc,
      link: [db],
      url: {
        cors: {
          allowOrigins: [
            process.env.NODE_ENV === "production"
              ? `https://${APP.url}`
              : "http://localhost:3000",
          ],
          allowMethods: ["*"],
          allowHeaders: ["*"],
          allowCredentials: true,
        },
      },
      handler: "apps/vanguard/src/index.handler",
      environment: {
        PUBLIC_BASE_URL: `https://${APP.url}`,
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        ...COMMON_ENV,
      },
    });

    // 💻 API
    const api = new sst.aws.Function("JobShineAPI", {
      vpc,
      link: [db, resumeBucket],
      url: {
        cors: {
          allowOrigins: [
            process.env.NODE_ENV === "production"
              ? `https://${APP.url}`
              : "http://localhost:3000",
          ],
          allowMethods: ["*"],
          allowHeaders: ["*"],
          allowCredentials: true,
        },
      },
      handler: "apps/argus/src/index.handler",
      timeout: "120 seconds",
      environment: {
        PUBLIC_BASE_URL: `https://${APP.url}`,
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        AWS_BEDROCK_ACCESS_KEY_ID: AWS_BEDROCK_ACCESS_KEY_ID.value,
        AWS_BEDROCK_SECRET_ACCESS_KEY: AWS_BEDROCK_SECRET_ACCESS_KEY.value,
        DEEPSEEK_API_KEY: DEEPSEEK_API_KEY.value,
        OPENAI_API_KEY: OPENAI_API_KEY.value,
        ...COMMON_ENV,
      },
    });

    const polar = new sst.aws.Function("JobShinePolar", {
      vpc,
      link: [db, resumeBucket],
      url: {
        cors: {
          allowOrigins: [
            process.env.NODE_ENV === "production"
              ? `https://${APP.url}`
              : "http://localhost:3000",
          ],
          allowMethods: ["*"],
          allowHeaders: ["*"],
          allowCredentials: true,
        },
      },
      handler: "apps/polar/src/index.handler",
      environment: {
        PUBLIC_BASE_URL: `https://${APP.url}`,
        POLAR_ACCESS_TOKEN: POLAR_ACCESS_TOKEN.value,
        ...COMMON_ENV,
      },
    });

    /**
     * Frontend
     * This is our primary frontend (Next.js) that we'll use to consume our APIs.
     * Any frontends must be declared before our CF distribution, since it needs
     * to know the URL of the frontend.
     */
    const frontend = new sst.aws.TanStackStart("JobShineFE", {
      vpc,
      path: "apps/arbor",
      environment: {
        PUBLIC_BASE_URL: `https://${APP.url}`,
        ...COMMON_ENV,
      },
      route: {
        router,
        path: "/",
      },
    });

    /**
     * Routes
     * These are the routes that we'll use to route our requests to our services.
     *
     * readTimeout: "60 seconds" because AI requests can take a while...
     * Can request an increase for this: /servicequotas/home/services/cloudfront/quotas/L-AECE9FA7
     */
    // API Routes
    router.route("/api/v1/trpc", api.url, {
      readTimeout: "60 seconds",
    });
    router.route("/api/v1/auth", auth.url);

    // Polar Routes
    router.route("/portal", polar.url);
    router.route("/checkout", polar.url);
    router.route("/polar/webhooks", polar.url);

    /** Dev Commands */
    new sst.x.DevCommand("DrizzleStudio", {
      link: [db],
      dev: {
        autostart: true,
        command: "pnpm -F @jobshine/db non-tunnel-studio",
      },
    });

    return {
      frontend: frontend.url,
      backend: router.url,
    };
  },
});
