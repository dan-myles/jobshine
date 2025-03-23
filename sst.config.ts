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
     * Common Env Vars
     * These are common environment variables that we'll use across our apps.
     */
    const COMMON_ENV = {
      NODE_ENV: $app.stage === "production" ? "production" : "development",
    };

    /**
     * Secrets
     * These are stored in AWS Secrete Manager and need to be set
     * with `pnpx sst secret set <secret> <value>`
     */
    const BETTER_AUTH_SECRET = new sst.Secret("BETTER_AUTH_SECRET");

    /**
     * VPC
     * Most cloud resources we create are going to be hosted in our VPC.
     * This makes it easy to tunnel to the VPC and access our resources.
     */
    const vpc = new sst.aws.Vpc("AcmeVPC", {
      bastion: true,
      nat: "ec2",
    });

    /**
     * Database
     * This is just a simple relational Postgres database that we'll use for our
     * application. It needs to be hosted in a VPC so that it can be accessed from
     * our APIs. Also, so we can tunnel to it from our local machine.
     */
    const db = new sst.aws.Postgres("AcmeDB", {
      vpc,
      proxy: true,
    });

    /**
     * API Gateway
     * This is our primary API Gateway that we'll use to route traffic to our Lambdas/services.
     */
    const api = new sst.aws.ApiGatewayV2("AcmeAPI", {
      vpc,
      cors: {
        allowOrigins: ["http://localhost:3000", `https://${APP.url}`],
        allowMethods: ["*"],
        allowHeaders: ["*"],
        allowCredentials: true,
      },
      domain: {
        name: APP.url,
        dns: sst.cloudflare.dns(),
        path: "api/v1",
      },
    });

    /**
     * API Routes
     * General definitions of all API routes go here.
     */
    // Vanguard 🛡️
    api.route("ANY /auth/{proxy+}", {
      link: [db],
      handler: "apps/vanguard/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        BASE_URL: APP.url,
        ...COMMON_ENV,
      },
    });

    // Argus 🏹
    api.route("GET /trpc/{proxy+}", {
      link: [db],
      handler: "apps/argus/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
        ...COMMON_ENV,
      },
    });

    api.route("POST /trpc/{proxy+}", {
      link: [db],
      handler: "apps/argus/src/index.handler",
      environment: {
        BETTER_AUTH_SECRET: BETTER_AUTH_SECRET.value,
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
        NEXT_PUBLIC_BASE_URL: APP.url === "" ? api.url : `https://${APP.url}`,
        NEXT_PUBLIC_API_URL: api.url,
        ...COMMON_ENV,
      },
      domain: {
        name: APP.url,
        dns: sst.cloudflare.dns(),
      },
    });

    return {
      ...(APP.url === ""
        ? {
            distribution: api.url,
          }
        : {
            distribution: `https://${APP.url}`,
          }),
      api: api.url,
      frontend: frontend.url,
      db: db.id,
    };
  },
});
