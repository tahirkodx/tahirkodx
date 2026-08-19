# Trainero

**The coaching platform coaches actually live in.**

Long-term product work on a European coaching business: trainer app, client app, workouts, chat, white-label. Vue / Quasar on the apps, AWS APIs behind them.

**Stack:**
![Vue.js](https://img.shields.io/badge/Vue.js-35495e?style=flat-square&logo=vuedotjs&logoColor=4FC08D)
![Quasar](https://img.shields.io/badge/Quasar-1976D2?style=flat-square&logo=quasar&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=FF9900)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**Live:** [trainero.com](https://trainero.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#trainero)

![Trainero homepage](../docs/screens/trainero/home.jpg)

![Trainero pricing](../docs/screens/trainero/pricing.jpg)

![Trainero white label](../docs/screens/trainero/white-label.jpg)

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

Homepage, pricing, and white-label stills from the live product.

![Trainero homepage](../docs/screens/trainero/home.jpg)

![Trainero pricing](../docs/screens/trainero/pricing.jpg)

![Trainero white label](../docs/screens/trainero/white-label.jpg)

## Open live product

[trainero.com](https://trainero.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#trainero)
