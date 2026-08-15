# Trainero

**The coaching platform coaches actually live in.**

Live: [trainero.com](https://trainero.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#trainero)

## Problem

A coaching business cannot live in a spreadsheet and a WhatsApp thread. They needed trainer and client apps that stay in sync, including white-label for partner studios.

## What we discussed

This is a long-term seat, not a one-off build. Scope stays in the live trainer and client codebases: workouts, messaging, and the white-label path. Updates ship into apps coaches already use every week.

## What shipped

- Trainer app and client app
- Workouts, chat, white-label
- Client app as a Quasar / Vue Capacitor wrap (camera, push, health hooks)
- AWS APIs behind the apps

## How it was built

Vue 3 and Quasar on the client app, Capacitor for store wraps, Vuex, i18n, socket.io for live chat. AWS SDK in the client. PostgreSQL on the API side.

## How it was deployed

Live at trainero.com. Client app ships as a Capacitor wrap. Product work continues in the same codebases.

## Extra screens

![Trainero](https://image.thum.io/get/width/1200/crop/750/noanimate/https://trainero.com)

## Open live product

[trainero.com](https://trainero.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#trainero)
