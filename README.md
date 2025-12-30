# FarmLink (MERN)
Directly connect local farmers with consumers, restaurants, and wholesalers—cutting middlemen.

## Features (v1)
- Auth for **farmer / buyer / admin**
- Crop listing with **images, quantity, grade, expected price**
- **Bulk upload via CSV** + photo recognition stub
- **Auto-tagging seasonal crops** (Nepali calendar heuristic placeholder)
- **Inventory/status**: available/reserved/sold + **expiry date**
- **Quality certificate** upload URL field
- Filters, **location-based search** (radius)
- **Negotiable / Fixed** price toggle
- **Real-time demand board**
- **Chat + price negotiation**
- **Payments**: stubs for eSewa / Khalti / COD
- **AI price prediction** endpoint
- **Language switching (Nepali/English)**
- Farmer-friendly UI with **moving flowers** on login

## Quick Start
1) Server
```bash
cd server
cp .env.example .env
npm i
npm run dev
```
2) Client
```bash
cd client
npm i
npm run dev
```
Set `VITE_API` in client `.env` if your API is not `http://localhost:4000`.

## Notes
- This is a developer starter. Replace stubs with production integrations (payment gateways, ML models, image recognition, role-based policies, file storage like S3).
- Add proper validation, error handling, and input sanitation before going live.
