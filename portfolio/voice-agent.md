# Neurodek Voice Agent

**Drop an AI agent on any website. Chat, voice, or both.**

Live: [tahiramjad.com](https://tahiramjad.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#voice-agent)

## Problem

Most chat widgets stop at text. Voice demos die in a notebook. The brief was a control plane plus a real WebRTC pipeline that a site can embed.

## What we discussed

Three runtimes: a React dashboard for assistants and knowledge, a Node control plane that mints LiveKit tokens, and a Python worker that joins the room. Chat, voice, or both on one widget. PersonaPlex is the speech-to-speech path when a custom voice is trained.

## What shipped

- Embeddable widget: visitors type, talk, or switch mid-conversation
- Control plane for orgs, assistants, knowledge bases, and call analytics
- LiveKit voice worker
- PersonaPlex custom-voice path: upload reference audio, train, test in super-admin, ship on a widget

## How it was built

Dashboard is Vite + React. Control plane is Express + TypeScript + Prisma + PostgreSQL + Redis. Voice engine is Python `livekit-agents`: Deepgram STT, Groq LLM, Cartesia TTS, or PersonaPlex / Moshi speech-to-speech. GPU workers on RunPod for PersonaPlex.

## How it was deployed

Hosted at tahiramjad.com. Control plane and voice worker run under PM2. LiveKit Cloud for rooms.

## Extra screens

![Neurodek Voice Agent](https://image.thum.io/get/width/1200/crop/750/noanimate/https://tahiramjad.com)

## Open live product

[tahiramjad.com](https://tahiramjad.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#voice-agent)
