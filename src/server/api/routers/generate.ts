/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import Replicate from "replicate";
import { env } from "~/env.mjs";
import AWS from "aws-sdk";
import { uploadFileToFirebase } from "~/utils/firebase";
const imageToBase64 = require("image-to-base64");

const replicate = new Replicate({
  auth: env.REPLICATE_API_KEY,
});

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_REPLICATE === "true") {
    return "https://replicate.delivery/pbxt/6G58LkccKs5OH1epeeHn5F9mgyVRepdFFUBe9f8IcLGuRLkeIA/out-0.png";
  } else {
    const output = await replicate.run(
      "nandycc/sdxl-app-icons:5839ce85291601c6af252443a642a1cbd12eea8c83e41f27946b9212ff845dbf",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: `${prompt} app icon`,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }
    );
    return output[0];
  }
}
export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not enough credits",
        });
      }
      const url = await generateIcon(input.prompt);

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });

      const firebase_url = await uploadFileToFirebase(url, "icon");

      return {
        image: firebase_url,
      };
    }),
});
