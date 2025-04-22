// filepath: c:\Users\sufyo\Desktop\platesX-pdf\app\api\test-webhook\route.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Testing Discord webhook...");
        console.log("Webhook URL:", process.env.DISCORD_WEBHOOK_URL ? "✅ Found" : "❌ Not found");
        
        if (!process.env.DISCORD_WEBHOOK_URL) {
            return NextResponse.json({ 
                error: "Discord webhook URL not configured" 
            }, { status: 400 });
        }

        const testMessage = {
            embeds: [{
                title: "🧪 Test Webhook Message",
                description: "This is a test message from the PlatesX contact form API",
                color: 0x00ff00,
                timestamp: new Date().toISOString()
            }]
        };

        const webhookResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testMessage),
        });

        if (!webhookResponse.ok) {
            const errorText = await webhookResponse.text();
            throw new Error(`Discord webhook error: ${webhookResponse.status} ${errorText}`);
        }

        return NextResponse.json({ 
            success: true, 
            message: "Test webhook sent successfully!",
            status: webhookResponse.status
        });
        
    } catch (error) {
        console.error("Error testing webhook:", error);
        return NextResponse.json(
            {
                error: String(error)
            },
            {
                status: 500
            }
        );
    }
}
