# Jitsi Bitsi Spider

Generative poster system for a lecture series. You feed it data about a speaker — name, title, date, a few images — and it outputs an animated, interactive poster. Each poster style is a self-contained Svelte component with its own animation logic and visual language.

## The idea

A lecture series invites different speakers. Each one needs a poster. Instead of designing each poster from scratch, this system lets you pick a style and fill in the data. The styles are designed to be visually distinct — one speaker gets kinetic typography, another gets hover-revealed images, another gets generative grid layouts.

The system is extensible: adding a new poster style means adding one Svelte component and one Storybook story.

## Current poster styles

- **Jutta Bauer** — Image reveal on hover, layered composition
- **Studio Moniker** — Kinetic typography, animated text fields
- **Marco Land** — Large-scale typographic layout with viewport units
- **Prem Krishnamurthy** — Structured grid with interactive elements
- **Nontsikelelo Mutiti** — Graphic pattern composition
- **Stefan Marx** — Illustration-driven, hand-drawn quality

## Stack

SvelteKit, Storybook, Tailwind CSS. Each poster component has a corresponding `.stories.svelte` file. The component architecture follows atoms/organisms/posters.

## Run locally

```
npm install
npm run dev          # SvelteKit at localhost:5173
npm run storybook    # Component explorer at localhost:6006
```

## Context

Built for "Jitsi Bitsi Spider," a lecture series at Kunsthochschule Weißensee, Berlin (2020). The name is a nod to the nursery rhyme and the Jitsi video calls the lectures happened on — this was early pandemic, before everyone had settled on Zoom.
