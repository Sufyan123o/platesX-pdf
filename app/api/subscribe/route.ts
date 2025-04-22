import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("⭐ Email subscription received");
    try {
        const data = await req.json();
        console.log("📝 Subscription data:", data);

        // Validate required fields
        if (!data.email) {
            console.error("❌ Missing email in subscription data");
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }
        
        // Check and log webhook URL presence (without exposing the full URL)
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL_EMAIL;
        console.log("🔗 Email webhook URL configured:", webhookUrl ? "Yes" : "No");
        
        if (!webhookUrl) {
            console.warn("⚠️ Discord webhook URL for emails not configured. Message sending is disabled.");
            // For development purposes, simulate success but log the warning
            return NextResponse.json({
                success: true,
                message: "Thank you for subscribing!",
                dev_note: "Discord webhook URL for emails not configured, message not actually sent"
            });
        }

        // Construct content for Discord webhook
        const source = data.source || "Unknown";
        const userEmail = data.email;
        const userName = data.name || "Not provided";

        // Create a rich Discord embed
        const embedContent = {
            embeds: [{
                title: `📧 New Email Subscription`,
                color: 0x3498db, // Blue color
                fields: [
                    {
                        name: "Email",
                        value: userEmail,
                        inline: true
                    },
                    {
                        name: "Name",
                        value: userName,
                        inline: true
                    },
                    {
                        name: "Source",
                        value: source,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: "PlatesX Email Subscription"
                }
            }]
        };

        console.log("📤 Preparing to send email subscription to Discord webhook");

        try {
            // Send the message using Discord webhook
            const webhookResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embedContent),
            });
            
            console.log("📨 Discord API response status:", webhookResponse.status);
            
            if (!webhookResponse.ok) {
                const errorText = await webhookResponse.text();
                console.error("❌ Discord webhook error response:", errorText);
                throw new Error(`Discord webhook error: ${webhookResponse.status} ${errorText}`);
            }
            
            console.log("✅ Email subscription successfully sent to Discord");
            
            return NextResponse.json({
                success: true,
                message: "Thank you for subscribing!"
            });
        } catch (webhookError) {
            console.error("❌ Discord webhook error:", webhookError);
            throw new Error(`Failed to send email subscription via Discord webhook: ${webhookError instanceof Error ? webhookError.message : String(webhookError)}`);
        }

    } catch (error) {
        console.error("❌ Error in email subscription API route:", error);
        return NextResponse.json(
            {
                error: "Failed to process your subscription. Please try again later."
            },
            {
                status: 500
            }
        );
    }
}
