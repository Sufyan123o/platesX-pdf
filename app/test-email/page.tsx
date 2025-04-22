"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestEmail() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sendTestEmail = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      // Test data for the email
      const testData = {
        name: "Test User",
        email: "test@example.com",
        phoneNumber: "+447123456789",
        budget: "£5,000 - £10,000",
        subject: "TEST EMAIL - Please confirm if received",
        message: "This is a test message to verify if the email sending functionality is working correctly. Please check if this arrives in the sales@platesx.com inbox."
      };
      
      console.log("Sending test email with data:", testData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      const data = await response.json();
      
      console.log("API response:", data);
      setResponse(data);
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to send test email");
      }
    } catch (err: any) {
      console.error("Error sending test email:", err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Email Functionality Test</h1>
      <p className="mb-6">
        This page allows you to test if the email sending functionality is working properly.
        Click the button below to send a test email to sales@platesx.com.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Send Test Email</CardTitle>
          <CardDescription>
            This will send a test email through the Mailjet API to verify your setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={sendTestEmail} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send Test Email"}
          </Button>
        </CardContent>
      </Card>
      
      {response && (
        <Card className="mb-6 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-green-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-green-700">
              If the API response shows success but you don't see the email, check your spam folder or your Mailjet dashboard for any delivery issues.
            </p>
          </CardFooter>
        </Card>
      )}
      
      {error && (
        <Card className="mb-6 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">Debugging Information</h2>
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold">1. Check Your Mailjet Account</h3>
            <p>Make sure you've verified your domain (platesx.com) in your Mailjet account.</p>
          </div>
          
          <div>
            <h3 className="font-bold">2. Check Server Logs</h3>
            <p>Look at your terminal where the Next.js server is running for detailed logs.</p>
          </div>
          
          <div>
            <h3 className="font-bold">3. Check Environment Variables</h3>
            <p>Ensure your MAILJET_API_KEY and MAILJET_SECRET_KEY are correctly set in .env.local.</p>
          </div>
          
          <div>
            <h3 className="font-bold">4. Check Email Inbox</h3>
            <p>Look in the sales@platesx.com inbox, including the spam/junk folder.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
