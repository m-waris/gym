import { NextResponse } from "next/server";

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(body: ContactRequestBody): string | null {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  if (!message || message.length < 10) return "Message must be at least 10 characters.";

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const error = validate(body);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    // TODO: Replace with Resend / Nodemailer

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }
}
