# FormitAI

**Describe the form. It builds itself, then asks the next question.**

Live: [formitai.com](https://formitai.com) · App: [app.formitai.com](https://app.formitai.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#formitai)

## Problem

Most form tools start from a blank canvas of field types. Clients wanted something closer to a conversation: describe the intake, get a working form, then let AI chase incomplete answers after publish.

## What we discussed

We split the product into four surfaces so marketing, the builder, public forms, and embeds could ship and scale on their own hosts. Tenancy lives in the Fastify API. Integrations fan out after submit and never block the submission.

## What shipped

- Next.js marketing site at formitai.com
- Vite builder and dashboard at app.formitai.com
- Next.js public form runtime at form.formitai.com
- Vanilla `embed.js` at embed.formitai.com
- Fastify + Prisma API with org roles and plans
- Slack OAuth, Google Sheets append, Zapier bridge, WhatsApp result alerts
- AI generation from a prompt, plus follow-ups on vague answers

## How it was built

Frontend monorepo (npm workspaces): `apps/www`, `apps/web`, `apps/admin`, `apps/form-runtime`, plus shared `form-renderer` and `embed` packages. Backend is a separate Fastify + TypeScript + Prisma service on PostgreSQL, with Redis in the stack and OpenAI for generation and follow-ups.

## How it was deployed

Ubuntu, nginx, and PM2.

| Host | Surface |
|------|---------|
| formitai.com | Marketing Next app |
| app.formitai.com | Builder SPA |
| form.formitai.com | Public forms |
| embed.formitai.com | embed.js |
| api.formitai.com | Fastify API |

Branded form URLs use a workspace subdomain on `*.formitai.com`.

## Extra screens

![FormitAI marketing](https://image.thum.io/get/width/1200/crop/750/noanimate/https://formitai.com)

![FormitAI app](https://image.thum.io/get/width/1200/crop/750/noanimate/https://app.formitai.com)

## Open live product

[formitai.com](https://formitai.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#formitai)
