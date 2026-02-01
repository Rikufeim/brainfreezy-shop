import { leadsStore, type Lead } from "./leadsStore";

// Mock API functions - in production these would be real backend endpoints

export async function createLead(data: Omit<Lead, "id" | "createdAt">): Promise<{ leadId: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check honeypot
  if ((data as any).website) {
    throw new Error("Spam detected");
  }

  // Check rate limit (mock IP)
  const mockIp = "127.0.0.1";
  if (!leadsStore.checkRateLimit(mockIp)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const lead = leadsStore.createLead({
    ...data,
    ip: mockIp,
  });

  console.log("Lead created:", lead);
  return { leadId: lead.id };
}

export async function createCheckout(leadId: string): Promise<{ checkoutUrl: string }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In production, this would call Stripe/payment processor
  // For now, return a mock checkout URL
  const checkoutUrl = `/checkout/success?lead=${leadId}`;

  console.log("Checkout session created:", { leadId, checkoutUrl });
  return { checkoutUrl };
}

export function getLead(leadId: string): Lead | undefined {
  return leadsStore.getLead(leadId);
}
