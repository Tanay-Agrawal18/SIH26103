---
name: zangoh-light-minimalist-ui
description: Recreate the ultra-clean, minimalist, high-contrast light mode SaaS aesthetic seen on Zangoh.com.
---

# Zangoh Light Minimalist UI Skill

This skill provides the exact blueprint for building high-conversion, ultra-clean SaaS interfaces that rely on typography, negative space, and stark contrast rather than heavy visual effects.

## 📸 Visual Reference
![Zangoh UI Reference](https://image.thum.io/get/width/1200/crop/1000/https://zangoh.com/)

---

## 🎨 The Aesthetic DNA

### 1. Minimalist Foundation
*   **Backgrounds:** Pure white (`#FFFFFF`) or slightly off-white (`#F9FAFB`). Absolutely no gradients or noisy background textures.
*   **High Contrast:** Use pure black (`#000000`) for primary headings to create stark contrast.
*   **Borders:** Use incredibly subtle borders for cards (`border border-gray-200`) instead of heavy shadows.

### 2. Typography First
*   **Fonts:** Modern geometric sans-serifs (Inter, Geist, or Satoshi).
*   **Weight:** Rely heavily on font-weight for hierarchy. Use ExtraBold or Black for `h1` headings with tight letter spacing (`tracking-tight`). Keep body text at Regular or Medium.

### 3. Bento Grid Layouts
*   Use CSS Grid (`grid-cols-1 md:grid-cols-3`) to create asymmetrical feature sections.
*   Cards should have generous internal padding (`p-8` or `p-10`) to let the content breathe.

---

## ⚡ The Tech Stack

1.  **Framework**: Next.js (App Router) + Tailwind CSS.
2.  **Components**: **Shadcn UI** is the primary driver here for clean, accessible components.
3.  **Animations**: Keep animations minimal. Use Framer Motion for simple, fast `fade-in-up` reveals as the user scrolls. Do not use complex hover effects.

---

## 🛠️ Implementation Rules

1.  **Hero Section:** Center the content. No background image. Massive black heading, a clean gray subtitle, and a solid black CTA button.
2.  **Navigation:** Clean white header with a subtle bottom border (`border-b border-gray-100`).
3.  **Hover States:** Keep it simple. A slight background color shift on buttons (`hover:bg-gray-800` for black buttons) is all that's needed.

## 🚦 Prompting the Agent
> *"Use the `zangoh-light-minimalist-ui` skill to build a pricing page. Keep it paper-white, use heavy black typography, and subtle gray borders for the pricing cards."*
