# Velmore Executive

**Dispatch, drivers, and bookings in one ops system.**

Live: [velmoreexecutive.com](https://velmoreexecutive.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#velmore)

## Problem

Dispatch, drivers, and public booking were not one system. Quotes, calendar, and job state needed to stay in sync, including payment.

## What we discussed

Public site is the booking surface. Admin is ops: calendar, maps, live jobs. Stripe takes payment. A React Native driver app sits next to the web stack. The API is Fastify with Prisma on PostgreSQL.

## What shipped

- Public booking site at velmoreexecutive.com
- Admin for calendar, maps, and live job state
- Fastify API
- Stripe checkout
- React Native driver app

## How it was built

Vite + React public site and admin. Fastify + Prisma + PostgreSQL API, Redis, Stripe, nodemailer. React Native driver app. PM2 for the Node services.

## How it was deployed

Live at velmoreexecutive.com. API starts under PM2 in production.

## Extra screens

![Velmore Executive](https://image.thum.io/get/width/1200/crop/750/noanimate/https://velmoreexecutive.com)

## Open live product

[velmoreexecutive.com](https://velmoreexecutive.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#velmore)
