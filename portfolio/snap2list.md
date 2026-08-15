# Snap2List

**Photo in. eBay listing out. Inventory stays in sync.**

Live: [snap2list.com](https://snap2list.com) · [Open in portfolio](https://tahirkodx.github.io/tahirkodx/#snap2list)

## Problem

Listing one item at a time in eBay's UI does not match how a warehouse actually works. They needed capture on the floor and listing, price revise, and labels in one dashboard.

## What we discussed

Split capture and ops. React Native handles barcode, photo, and packages on the floor. The Vite dashboard owns catalog, eBay listing, bulk price revise, and label print. Supabase holds the data both sides share.

## What shipped

- Inventory dashboard at snap2list.com
- Catalog and SKU tracking
- eBay listing generation
- Bulk price revise
- SKU label print
- React Native companion for barcode and capture

## How it was built

React 18 + TypeScript + Vite dashboard (TanStack Query, React Router, jsbarcode / label print). React Native warehouse app with ML Kit barcode scanning. Supabase for the shared backend.

## How it was deployed

Live at snap2list.com. Dashboard has production and staging deploy scripts.

## Extra screens

![Snap2List](https://image.thum.io/get/width/1200/crop/750/noanimate/https://www.snap2list.com)

## Open live product

[snap2list.com](https://snap2list.com)

[All case studies](index.md) · [Interactive portfolio](https://tahirkodx.github.io/tahirkodx/#snap2list)
