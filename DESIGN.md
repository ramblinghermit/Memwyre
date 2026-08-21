---
name: Memwyre
description: Decoupled Universal AI Brain Vault & Memory Infrastructure
colors:
  primary: "#D97757"
  primary-hover: "#C4654A"
  accent: "#D97757"
  accent-hover: "#C4654A"
  bg-app: "#F9FAFB"
  bg-surface: "#FFFFFF"
  bg-surface-2: "#F3F4F6"
  bg-elevated: "#FFFFFF"
  bg-app-dark: "#0B0B0C"
  bg-surface-dark: "#161618"
  bg-surface-2-dark: "#222225"
  bg-elevated-dark: "#1E1E21"
  text-primary: "#111827"
  text-secondary: "#4B5563"
  text-muted: "#9CA3AF"
  text-primary-dark: "#F3F4F6"
  text-secondary-dark: "#9CA3AF"
  text-muted-dark: "#6B7280"
  border-light: "rgba(17, 24, 39, 0.08)"
  border-dark: "rgba(255, 255, 255, 0.08)"
  success: "#10B981"
  warning: "#F59E0B"
  danger: "#EF4444"
  info: "#3B82F6"
typography:
  display:
    fontFamily: "'DM Serif Text', serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-surface:
    backgroundColor: "{colors.bg-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview
Memwyre combines an editorial, high-signal aesthetic with precision data ergonomics. The visual direction balances warm humanistic terracotta tones (`#D97757`) with crisp typographic hierarchies (`DM Serif Text` for hero titles and `Inter` for functional data views), creating a trustworthy, distraction-free environment for organizing personal and professional AI memory.

## Colors
- **Primary Accent (`#D97757`)**: Warm terracotta orange used for primary CTAs, active memory nodes, and focused highlights.
- **Light Theme Backgrounds**: Pure White (`#FFFFFF`) cards layered over subtle Gray-50 (`#F9FAFB`) with ultra-fine border dividers (`rgba(17, 24, 39, 0.08)`).
- **Dark Theme Backgrounds**: Ultra-deep `#0B0B0C` neutral dark background with `#161618` card surfaces and `#222225` interactive panels.
- **Status & Feedback**: Forest Emerald (`#10B981`) for verified memories and healthy sync states, Amber (`#F59E0B`) for decay/pruning warnings, and Crimson (`#EF4444`) for deletions/errors.

## Typography
- **Display (`'DM Serif Text', serif`)**: Used for editorial hero statements, high-impact value propositions, and section anchors.
- **Interface & Data (`Inter, sans-serif`)**: Primary workhorse for memory lists, document viewers, JSON inspectors, and technical controls. Tight negative tracking on headings (`-0.015em`) for modern density.

## Layout
- **Fluid Container Widths**: Max-width `1280px` for landing/dashboard views with responsive `px-4 sm:px-6 lg:px-8` gutters.
- **Visual Rhythm**: 8-point baseline grid (`8px`, `16px`, `24px`, `32px`, `48px`) maintaining strict vertical cadence across cards and toolbars.

## Elevation & Depth
- **Border-First Depth**: Minimal heavy drop-shadows. Elevation is achieved through subtle 1px border lines (`border-black/8` in light mode, `border-white/8` in dark mode) paired with slight tonal shifts between surface layers.
- **Interactive Hover Depth**: Smooth `translate-y-[-2px]` lift with subtle soft glow on cards and key interactive triggers.

## Shapes
- **Corner Radii**: Standardized on `rounded-lg` (`10px` to `16px`) for container cards and dialogs; `rounded-md` (`6px` to `8px`) for input fields, badges, and buttons.
- **Capsule Pills**: `rounded-full` reserved for status tags, filter pills, and navigation chips.

## Components
- **Primary Buttons**: Solid terracotta background with crisp white text, bold font weight, and micro-press scale animations (`active:scale-[0.98]`).
- **Memory Cards**: Clean structural surfaces featuring timestamp badges, source icons (PDF, Chrome, MCP), decaying relevance indicators, and direct quick-action toggles.
- **Input Fields & Search**: Clean border-driven inputs with focused terracotta ring outlines and contextual keyboard shortcut hints (`⌘K`).

## Do's and Don'ts
- **DO**:
  - Maintain high contrast and readable line lengths (`max-w-prose` for markdown notes).
  - Use smooth 200ms ease transitions for theme toggles and hover states.
  - Keep data density high in memory management views while allowing breathable margins in landing sections.
- **DON'T**:
  - Don't use harsh pure-black shadows on light backgrounds.
  - Don't mix multiple conflicting serif typefaces.
  - Don't use neon/saturated accent colors that clash with the warm terracotta palette.
