# SIP Pass

**Tickets that scan at the door. Checkout on the web.**

Live: [thesippass.com](https://www.thesippass.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#sip-pass)

## Problem

Events need issuance, payment, and door scan in one loop. A demo QR is not enough when a crowd is at the door.

## What we discussed

Public Next.js sites for guests. A Vite admin hub for organizers. Fastify + Prisma API replaced an earlier Supabase Auth / Edge stack. React Native CLI app for scan, check-in, vendor credits, and public ticket lookup. Paystack stays server-side.

## What shipped

- Public sites for ticket checkout
- Organizer hub
- Fastify API with QR issuance
- Paystack checkout
- React Native scan app: door check-in, vendor credits, attendee lookup without login

## How it was built

Next.js public sites. Vite + React + TypeScript admin hub. Fastify + Prisma + PostgreSQL + JWT API with QR generation. React Native CLI scan app (vision-camera barcode). Paystack on the API.

## How it was deployed

Public product at thesippass.com. Admin hub builds to static hosting. API deploys separately with its own database.

## Extra screens

![SIP Pass](https://image.thum.io/get/width/1200/crop/750/noanimate/https://www.thesippass.com)

## Open live product

[thesippass.com](https://www.thesippass.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#sip-pass)
