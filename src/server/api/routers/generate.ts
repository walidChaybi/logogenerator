/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { uploadFileToFirebase } from "~/utils/firebase";

// export const config = {
//   maxDuration: 200,
// };

const replicate = new Replicate({
  auth: env.REPLICATE_API_KEY,
});

async function generateIcon(
  prompt: string,
  style: string
): Promise<string | undefined> {
  // if (env.MOCK_REPLICATE === "true") {
  //   return "https://firebasestorage.googleapis.com/v0/b/ainotes-5a225.appspot.com/o/icon1700497171428.png?alt=media&token=f5f23653-b572-42e7-8e4a-f1e84347db61";
  // }
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        width: 1024,
        height: 1024,
        prompt: `Generate a visually appealing app icon for a mobile application. app icon of ${prompt} in ${style} A mesmerizlingly beautifully detailed ios app icon of ${prompt},(best-quality:0.8), soft light, trending on art station`,
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
  return output[0 as keyof typeof output];
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        style: z.string().optional(),
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
      const url = await generateIcon(input.prompt, input.style || "");

      const firebase_url = await uploadFileToFirebase(url as string, "icon");

      await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
          imageUrl: firebase_url,
        },
      });

      return {
        imageUrl: firebase_url,
      };
    }),
});
