

---

# KindBridge Admin Web

Admin web frontend for the **KindBridge** donation management platform.
Built to support governance, verification, monitoring, and oversight of the donation lifecycle.

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* JWT-based authentication

## Features

* Admin authentication & role-based access
* NGO onboarding, review, and verification
* Donation lifecycle monitoring (pending, claimed, delivered)
* System activity and audit logs
* Dashboard with key platform metrics
* Responsive admin dashboard UI

## Getting Started

```bash
npm install
npm run dev
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url
NEXTAUTH_SECRET=your-secret-key
```

App runs at `http://localhost:3000`.

## Notes

* This frontend integrates with the existing KindBridge Node.js/Express backend.
* All protected API requests require a JWT (`Authorization: Bearer <token>`).

---
