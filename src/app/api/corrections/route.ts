import { correctSentence } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type CorrectionBody = {
  text: string;
};

export async function GET(req: NextRequest) {
  try {
    const messages = await prisma.messages.findMany();
    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CorrectionBody = await request.json();
    const { text } = body;

    if (text) {
      // Call OpenAI API here and return gramatically correct sentence here

      const result = await correctSentence(text);

      const corrected = result?.data.choices[0].text?.replace("\n", "");

      if (corrected) {
        const message = await prisma.messages.create({
          data: {
            originalMessage: text,
            correctedMessage: corrected,
          },
        });
        return NextResponse.json({
          message,
        });
      } else {
        return NextResponse.json({
          message: "Failed to correct sentence",
        });
      }
    } else {
      return NextResponse.json(
        { message: "Invalid body provided" },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Unexpected error", error: new Error(err as string).message },
      { status: 500 }
    );
  }
}
