import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    
    // User ka last message get karein
    const userMessage = body?.message || (messages.length > 0 ? messages[messages.length - 1]?.content : '') || '';
    const lowerText = userMessage.toLowerCase();

    let botReply = "";

    // Smart Keyword Matching Logic
    if (lowerText.includes("medical") || lowerText.includes("doctor") || lowerText.includes("mbbs") || lowerText.includes("biology")) {
      botReply = "Medical field is noble and vast! Are you leaning towards Clinical Practice (MBBS/BDS), Medical Research, Pharmacy, or Allied Health Sciences like Biotechnology?";
    } else if (lowerText.includes("cs") || lowerText.includes("software") || lowerText.includes("developer") || lowerText.includes("coding") || lowerText.includes("computer")) {
      botReply = "Software Engineering is thriving! Are you interested in Full-Stack Web Development, Data Science/AI, or Mobile App Development?";
    } else if (lowerText.includes("business") || lowerText.includes("management") || lowerText.includes("finance") || lowerText.includes("marketing")) {
      botReply = "Business and Finance offer great leadership paths! Do you prefer Digital Marketing, Corporate Finance, or Entrepreneurship?";
    } else if (lowerText.includes("hi") || lowerText.includes("hello") || lowerText.includes("hey")) {
      botReply = "Hello! I am EduNav AI, your career guidance counselor. Which field or subjects are you interested in studying?";
    } else {
      botReply = `That sounds interesting! Based on your interest in "${userMessage}", what specific career goals or degrees are you considering?`;
    }

    // 1 second delay for natural typing feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      id: Date.now().toString(),
      sender: "assistant",
      role: "assistant",
      text: botReply,
      content: botReply,
      message: botReply,
      createdAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({
      id: Date.now().toString(),
      sender: "assistant",
      text: "I'm here to assist you with career counseling. Could you share your field of study?",
    });
  }
}