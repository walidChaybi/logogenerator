import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "icongenerator",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site");
      environment: {
        DATABASE_URL: process.env.DATABASE_URL;
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET;
        NEXTAUTH_URL: process.env.NEXTAUTH_URL;
        HOST_NAME: process.env.HOST_NAME;
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process
          .env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY;
        PRICE_ID: process.env.PRICE_ID;
        STRIPE_WEB_HOOK_SECRET: process.env.STRIPE_WEB_HOOK_SECRET;
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID;
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET;
        REPLICATE_API_KEY: process.env.REPLICATE_API_KEY;
        MOCK_REPLICATE: process.env.MOCK_REPLICATE;
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY;
        OPENAI_API_KEY: process.env.OPENAI_API_KEY;
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID;
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY;
      }
      timeout: "50 seconds";
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
