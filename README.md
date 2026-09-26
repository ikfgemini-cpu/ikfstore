# DIGISTORE
A complete digital product webstore with an "Order First, Pay Later" workflow.

## Features:
- **Order Flow**: Customers place orders that start as `PENDING`. Admins approve them. Customers then check their order status to view payment details (QRIS / WhatsApp).
- **Admin Dashboard**: View metrics, manage catalog, approve/reject orders, upload QRIS URLs dynamically.
- **Support**: Floating WhatsApp Customer Service button.

## Tech Stack
- Next.js (App Router)
- React & Tailwind CSS
- Prisma & SQLite

## Setup Instructions
1. Navigate to the project directory: `cd c:\Users\User\Documents\WEBSTORE\webstore`
2. Run development server: `npm run dev`
3. The site is live at [http://localhost:3000](http://localhost:3000)

## Directory Structure
- `src/app/page.tsx`: Catalog Homepage
- `src/app/product/[id]/page.tsx`: Product View and Order Form
- `src/app/order-status/page.tsx`: Check Order and Payment
- `src/app/admin/*`: Admin dashboard and management features
- `prisma/schema.prisma`: Database Schema
