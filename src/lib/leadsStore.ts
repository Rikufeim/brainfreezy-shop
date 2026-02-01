export type Lead = {
  id: string;
  service: string;
  details: string;
  contactMethod: string;
  contactValue: string;
  budgetRange?: string;
  deadline?: string;
  consent: boolean;
  createdAt: Date;
  ip?: string;
};

// In-memory store - can be swapped to Supabase later
class LeadsStore {
  private leads: Map<string, Lead> = new Map();
  private rateLimitMap: Map<string, number[]> = new Map();

  createLead(data: Omit<Lead, "id" | "createdAt">): Lead {
    const id = this.generateId();
    const lead: Lead = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  getLead(id: string): Lead | undefined {
    return this.leads.get(id);
  }

  getAllLeads(): Lead[] {
    return Array.from(this.leads.values());
  }

  // Simple rate limiting: max 3 requests per IP per hour
  checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    const timestamps = this.rateLimitMap.get(ip) || [];
    const recentTimestamps = timestamps.filter(t => t > hourAgo);
    
    if (recentTimestamps.length >= 3) {
      return false;
    }
    
    recentTimestamps.push(now);
    this.rateLimitMap.set(ip, recentTimestamps);
    return true;
  }

  private generateId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
export const leadsStore = new LeadsStore();
