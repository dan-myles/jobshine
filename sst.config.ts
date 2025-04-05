/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ProjectAcme",
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
    const vpc = new sst.aws.Vpc("AcmeVPC", {
      bastion: true,
      nat: "ec2",
    });

    /**
     * Database
     */
    const db = new sst.aws.Postgres("AcmeDB", {
      vpc,
      proxy: true,
    });

    /**
     * Resume Bucket
     * This is a bucket that we'll use to store resumes.
     */
    const resumeBucket = new sst.aws.Bucket("AcmeResumeBucket");

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
      link: [db],
      url: true,
      handler: "apps/vanguard/src/index.handler",
      environment: {
        BETTER_AUTH_BASE_URL: APP.url,
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        ...COMMON_ENV,
      },
    });

    // 💻 API
    const api = new sst.aws.Function("JobShineAPI", {
      link: [db, resumeBucket],
      url: true,
      handler: "apps/argus/src/index.handler",
      timeout: "120 seconds",
      environment: {
        BETTER_AUTH_BASE_URL: APP.url,
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        AWS_BEDROCK_ACCESS_KEY_ID: AWS_BEDROCK_ACCESS_KEY_ID.value,
        AWS_BEDROCK_SECRET_ACCESS_KEY: AWS_BEDROCK_SECRET_ACCESS_KEY.value,
        DEEPSEEK_API_KEY: DEEPSEEK_API_KEY.value,
        OPENAI_API_KEY: OPENAI_API_KEY.value,
        ...COMMON_ENV,
      },
    });

    /**
     * Frontend
     * This is our primary frontend (Next.js) that we'll use to consume our APIs.
     * Any frontends must be declared before our CF distribution, since it needs
     * to know the URL of the frontend.
     */
    const frontend = new sst.aws.Nextjs("AcmeFrontend", {
      vpc,
      link: [db],
      path: "apps/vapor",
      environment: {
        NEXT_PUBLIC_BASE_URL: APP.url,
        ...COMMON_ENV,
      },
    });

    /**
     * Routes
     * These are the routes that we'll use to route our requests to our services.
     *
     * readTimeout: "60 seconds" because AI requests can take a while...
     * Can request an increase for this: /servicequotas/home/services/cloudfront/quotas/L-AECE9FA7
     */
    router.route("/api/v1/trpc", api.url, {
      readTimeout: "60 seconds",
    });
    router.route("/api/v1/auth", auth.url);

    /** Dev Commands */
    new sst.x.DevCommand("AcmeStudio", {
      link: [db],
      dev: {
        autostart: true,
        command: "pnpm -F @acme/db non-tunnel-studio",
      },
    });

    return {
      frontend: frontend.url,
      backend: router.url,
    };
  },
});
