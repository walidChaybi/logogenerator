/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { buffer } from "micro";
import { prisma } from "~/server/db";

const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = "whsec_ugmwd3RcHqvjUjXTl824eO7dqatUAA9L";

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("object");
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    console.log(event);

    switch (event.type) {
      case "checkout.session.completed":
        const completedEvent = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };

        await prisma.user.update({
          where: {
            id: completedEvent.metadata.userId,
          },
          data: {
            credits: {
              increment: 100,
            },
          },
        });

        const redirectUrl = "https://logogenerator-peach.vercel.app";
        res.writeHead(302, { Location: redirectUrl });
        res.end();

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    const redirectUrl = "https://logogenerator-peach.vercel.app";
    res.writeHead(302, { Location: redirectUrl });
    res.end();
  }
};

export default webhook;
