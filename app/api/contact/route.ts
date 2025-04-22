import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("⭐ Contact form submission received");
    try {
        const data = await req.json();
        console.log("📝 Form data:", data);

        // Validate required fields
        if (!data.email || !data.name || !data.message) {
            console.error("❌ Missing required fields in form data");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        
        // Determine which webhook URL to use based on form type
        let webhookUrl;
        let formType = data.formType || 'general';
        
        switch(formType) {
            case 'buying':
                webhookUrl = process.env.DISCORD_WEBHOOK_URL_BUYING;
                console.log("🛒 Using buying webhook");
                break;
            case 'selling':
                webhookUrl = process.env.DISCORD_WEBHOOK_URL_SELLING;
                console.log("💰 Using selling webhook");
                break;
            case 'sourcing':
                webhookUrl = process.env.DISCORD_WEBHOOK_URL_SOURCING;
                console.log("🔍 Using sourcing webhook");
                break;
            default:
                webhookUrl = process.env.DISCORD_WEBHOOK_URL;
                console.log("📋 Using general contact webhook");
        }
        
        console.log("🔗 Webhook URL configured:", webhookUrl ? "Yes" : "No");
        
        if (!webhookUrl) {
            console.warn(`⚠️ Discord webhook URL for ${formType} form not configured. Message sending is disabled.`);
            // For development purposes, simulate success but log the warning
            return NextResponse.json({
                success: true,
                message: "Your message has been sent! We'll get back to you soon.",
                dev_note: `Discord webhook URL for ${formType} not configured, message not actually sent`
            });
        }

        // Construct content for Discord webhook
        const subject = data.subject || "New contact form submission from PlatesX";
        const userMessage = data.message;
        const userEmail = data.email;
        const userName = data.name;
        const userPhone = data.phoneNumber || "Not provided";
        const userBudget = data.budget || "Not provided";        // Create a rich Discord embed based on form type
        let embedTitle, embedColor, formSpecificFields = [], footerText;
        
        // Set form-specific content
        switch(formType) {
            case 'buying':
                embedTitle = `🛒 New Buying Enquiry: ${subject}`;
                embedColor = 0x4CAF50; // Green
                footerText = "PlatesX Buying Enquiry";
                // Add buying-specific fields if needed
                if (data.plateNumber) {
                    formSpecificFields.push({
                        name: "Plate of Interest",
                        value: data.plateNumber,
                        inline: true
                    });
                }
                break;
                
            case 'selling':
                embedTitle = `💰 New Selling Request: ${subject}`;
                embedColor = 0xFFC107; // Amber/Gold
                footerText = "PlatesX Selling Request";
                // Add selling-specific fields if needed
                if (data.plateToSell) {
                    formSpecificFields.push({
                        name: "Plate to Sell",
                        value: data.plateToSell,
                        inline: true
                    });
                }
                if (data.askingPrice) {
                    formSpecificFields.push({
                        name: "Asking Price",
                        value: data.askingPrice,
                        inline: true
                    });
                }
                break;
                
            case 'sourcing':
                embedTitle = `🔍 New Sourcing Request: ${subject}`;
                embedColor = 0x2196F3; // Blue
                footerText = "PlatesX Sourcing Request";
                // Add sourcing-specific fields if needed
                if (data.desiredPlate) {
                    formSpecificFields.push({
                        name: "Desired Plate/Style",
                        value: data.desiredPlate,
                        inline: true
                    });
                }
                break;
                
            default:
                embedTitle = `📬 New General Enquiry: ${subject}`;
                embedColor = 0x9C27B0; // Purple
                footerText = "PlatesX General Enquiry";
        }
        
        // Common fields for all form types
        const commonFields = [
            {
                name: "Name",
                value: userName,
                inline: true
            },
            {
                name: "Email",
                value: userEmail,
                inline: true
            },
            {
                name: "Phone",
                value: userPhone,
                inline: true
            },
            {
                name: "Budget",
                value: userBudget,
                inline: true
            },
            {
                name: "Message",
                value: userMessage
            }
        ];
        
        // Combine common fields with form-specific fields
        const allFields = [...formSpecificFields, ...commonFields];
        
        // Create the final embed content
        const embedContent = {
            embeds: [{
                title: embedTitle,
                color: embedColor,
                fields: allFields,
                timestamp: new Date().toISOString(),
                footer: {
                    text: footerText
                }
            }]
        };

        console.log("📤 Preparing to send to Discord webhook");

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
            
            console.log("✅ Message successfully sent to Discord");
            
            return NextResponse.json({
                success: true,
                message: "Your message has been sent! We'll get back to you soon."
            });
        } catch (webhookError) {
            console.error("❌ Discord webhook error:", webhookError);
            throw new Error(`Failed to send message via Discord webhook: ${webhookError instanceof Error ? webhookError.message : String(webhookError)}`);
        }

    } catch (error) {
        console.error("❌ Error in contact form API route:", error);
        return NextResponse.json(
            {
                error: "Failed to send your message. Please try again later."
            },
            {
                status: 500
            }
        );
    }
}
