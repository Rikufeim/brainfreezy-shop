# "Pay to Get In" Lead Intake Funnel - Implementation Guide

## 🎯 Overview

A production-ready lead intake funnel with a **2-step modal flow** that collects project details and simulates a deposit checkout process. Built for your Vite + React + TypeScript stack.

## 📁 File Structure

```
src/
├── lib/
│   ├── config.ts              # Configuration (deposit amount, services, etc.)
│   ├── leadsStore.ts          # In-memory lead storage (swap to DB later)
│   └── api.ts                 # Mock API functions
├── components/
│   └── lets-talk/
│       ├── LetsTalkModal.tsx  # Main modal orchestrator
│       ├── ServicePicker.tsx  # Step 1: Service selection
│       └── BriefForm.tsx      # Step 2: Project brief form
├── pages/
│   ├── Index.tsx              # Homepage (updated to use new modal)
│   ├── CheckoutSuccess.tsx    # /checkout/success page
│   └── Book.tsx               # /book page (placeholder)
└── App.tsx                    # Router (updated with new routes)
```

## 🚀 Features Implemented

### ✅ 2-Step Modal Flow

**Step 1: Service Selection**
- Custom Web App
- Custom Landing Page
- Custom Tracker

**Step 2: Project Brief & Contact**
- **Required fields:**
  - Project details (min 20 characters)
  - Contact method (Telegram, Discord, WhatsApp, Instagram, Email)
  - Contact value (@username or email)
  - Consent checkbox
- **Optional fields:**
  - Budget range (<1k, 1k-3k, 3k-10k, 10k+)
  - Deadline (date picker)

### ✅ Form Validation
- **zod** + **react-hook-form** for type-safe validation
- Real-time error messages
- Custom validation rules

### ✅ Anti-Spam Measures
- **Honeypot field** (hidden "website" input)
- **Rate limiting** (max 3 submissions per IP per hour)
- In-memory tracking (can be swapped to Redis)

### ✅ Deposit Flow (Stubbed)
1. User submits form
2. `POST /api/leads` creates lead → returns `leadId`
3. `POST /api/checkout` creates checkout session → returns `checkoutUrl`
4. Browser redirects to `/checkout/success?lead={leadId}`

**Current behavior:** No real payment processor, just mock URLs and in-memory storage.

### ✅ Deposit UI
- **Amount:** €49 (configurable in `src/lib/config.ts`)
- **Note:** "Deposit is credited toward your project if we work together"
- Displayed prominently in the brief form

### ✅ Success & Booking Pages
- `/checkout/success` - Shows lead confirmation + "Book a Call" CTA
- `/book` - Placeholder calendar integration page

### ✅ Accessibility
- Focus trap in modal
- Escape key to close
- ARIA labels and roles
- Keyboard navigation

## 🔧 Configuration

Edit `src/lib/config.ts` to customize:

```typescript
export const DEPOSIT_AMOUNT = 49; // Change deposit amount
export const DEPOSIT_CURRENCY = "EUR"; // Change currency

export const SERVICES = [
  // Add/edit services
];

export const CONTACT_METHODS = [
  // Add/edit contact methods
];

export const BUDGET_RANGES = [
  // Add/edit budget ranges
];
```

## 💾 Data Persistence

### Current: In-Memory Store
All leads are stored in `src/lib/leadsStore.ts` using a Map.

**View stored leads:**
```typescript
import { leadsStore } from "@/lib/leadsStore";
console.log(leadsStore.getAllLeads());
```

### Future: Database Integration
The `leadsStore` interface is designed to be easily swapped:

```typescript
// Instead of in-memory:
export const leadsStore = new LeadsStore();

// Swap to Supabase:
export const leadsStore = new SupabaseLeadsStore();
```

Just implement the same interface:
```typescript
interface ILeadsStore {
  createLead(data: Omit<Lead, "id" | "createdAt">): Promise<Lead>;
  getLead(id: string): Promise<Lead | undefined>;
  getAllLeads(): Promise<Lead[]>;
  checkRateLimit(ip: string): Promise<boolean>;
}
```

## 🔌 API Endpoints (Mock)

### `src/lib/api.ts`

**`createLead(data)`**
- Validates honeypot
- Checks rate limit
- Stores lead in memory
- Returns `{ leadId }`

**`createCheckout(leadId)`**
- Simulates payment processor call
- Returns `{ checkoutUrl: "/checkout/success?lead={leadId}" }`

**`getLead(leadId)`**
- Retrieves lead from store
- Used on success page

### Future: Real Backend
Replace these functions to call your actual API:

```typescript
// Instead of:
const lead = leadsStore.createLead(data);

// Do:
const response = await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify(data),
});
const { leadId } = await response.json();
```

## 🎨 UI/UX

- **Dark minimalist theme** matching your existing design
- **Neobrutalism style** buttons with box-shadow effects
- **Smooth animations** with Framer Motion
- **Responsive** on all devices
- **Accessible** with proper ARIA labels

## 🧪 Testing the Flow

1. **Open the app:**
   ```bash
   npm run dev
   ```

2. **Click "Let's Talk"** in header

3. **Step 1:** Select a service (e.g., "Custom Web App")

4. **Step 2:** Fill out the form:
   - Enter project details (20+ chars)
   - Select contact method
   - Enter contact value
   - Check consent checkbox
   - (Optional) Select budget & deadline
   - Click "Submit & Pay Deposit"

5. **Redirects to** `/checkout/success?lead={leadId}`

6. **Click "Book a Call"** → navigates to `/book`

7. **View stored leads** in browser console:
   ```javascript
   // In dev tools console:
   window.leadsStore = require('./src/lib/leadsStore').leadsStore;
   window.leadsStore.getAllLeads();
   ```

## 🔐 Rate Limiting

**Current implementation:**
- Tracks by mock IP ("127.0.0.1")
- Max 3 submissions per hour
- Stored in memory (resets on server restart)

**Production recommendations:**
- Use real IP from request headers
- Store in Redis for distributed systems
- Adjust limits based on your needs

## 🚨 Honeypot Field

The form includes a hidden "website" field. If filled (bots often auto-fill), the submission is rejected.

```typescript
// In BriefForm.tsx:
<input
  type="text"
  {...register("website")}
  style={{ position: "absolute", left: "-9999px" }}
  tabIndex={-1}
  autoComplete="off"
/>
```

## 📊 Lead Data Structure

```typescript
type Lead = {
  id: string;              // auto-generated
  service: string;         // selected service
  details: string;         // project description
  contactMethod: string;   // telegram, discord, etc.
  contactValue: string;    // @username or email
  budgetRange?: string;    // optional
  deadline?: string;       // optional (ISO date)
  consent: boolean;        // always true (validated)
  createdAt: Date;         // auto-generated
  ip?: string;             // for rate limiting
};
```

## 🔄 Migration Path to Real Payment

When you're ready to integrate Stripe/PayPal:

1. **Install payment SDK:**
   ```bash
   npm install @stripe/stripe-js
   ```

2. **Update `src/lib/api.ts`:**
   ```typescript
   export async function createCheckout(leadId: string) {
     const response = await fetch('/api/create-checkout-session', {
       method: 'POST',
       body: JSON.stringify({ leadId, amount: DEPOSIT_AMOUNT }),
     });
     const { checkoutUrl } = await response.json();
     return { checkoutUrl };
   }
   ```

3. **Create backend endpoint** (Next.js API route, Express, etc.)

4. **Handle webhook** for successful payments

## 🎯 Next Steps

- [ ] Add real payment integration
- [ ] Connect to Supabase/database
- [ ] Implement email notifications
- [ ] Add calendar booking integration (Calendly API)
- [ ] Set up webhook handlers
- [ ] Add admin dashboard to view leads
- [ ] Implement real IP tracking for rate limits

## 📝 Notes

- All styling uses your existing Tailwind config
- Button components use your shadcn/ui setup
- Dark theme variables from `src/index.css`
- Fully type-safe with TypeScript

---

**Ready to run:** `npm run dev` and click "Let's Talk"! 🚀
