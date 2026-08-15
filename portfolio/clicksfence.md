# ClicksFence

**Stop paying Google for bot clicks.**

Live: [clicksfence.com](https://clicksfence.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#clicksfence)

## Problem

Paid search still leaks money to bots and click farms. Advertisers needed detection on their own sites, a way to see the session, and a path into Google Ads exclusions.

## What we discussed

Keep the tracker small. Score in workers, not in the page. Replay the session so a human can confirm a block. Billing and tenancy sit in the same dashboard as the sites.

## What shipped

- Multi-tenant dashboard: domains, analytics, click protection, team roles, billing
- Tracker install guide
- rrweb session replay
- Fastify API plus fraud and email workers
- Optional Google Ads IP sync

## How it was built

Next.js App Router dashboard (React, TypeScript, Radix, TanStack Query, Recharts, rrweb). Fastify + TypeScript API, Prisma on PostgreSQL, Redis, BullMQ workers for fraud scoring and session-complete jobs. Custom JWT auth.

## How it was deployed

API and workers run as separate processes (PM2 in production). Product is live at clicksfence.com.

## Extra screens

![ClicksFence](https://image.thum.io/get/width/1200/crop/750/noanimate/https://clicksfence.com)

## Open live product

[clicksfence.com](https://clicksfence.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#clicksfence)
