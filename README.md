# Open Kalendo

📅 open-kalendo
The "Community Hub" Starter Kit. A lightweight, self-hosted event calendar and knowledge base for modern communities.

Built on top of NextForge, open-kalendo is a production-ready GitHub template designed for hobbyist groups, local clubs, non-profits, and developer circles who need a central place to share events and documentation without the bloat of enterprise tools.

**✨ Features**
- Public Event List: A clean, mobile-friendly interface for everyone to see what's happening. Supports monthly views and list agendas.
- Minimalist Knowledge Base: Share guides, rules, or resources. Perfect for "About Us" pages or community wikis.
- Role-Based Access Control: Public: View events and read-only access to the knowledge base. Admin: Secure dashboard to create, edit, and delete events and docs.
- Deploy: Optimized for Vercel thanks to NextForge.
- Dark Mode and fully responsive design powered by Tailwind CSS and Shadcn/UI.

## Setup
Detailed setup instructions can be found in the [next-forge documentation](https://www.next-forge.com/docs/setup/env). Here is a quick summary:

1. Clone the repository to create your own project.
2. Open the project in your IDE and navigate to the `apps/app` folder. Copy the `.env.example` file's content to `.env.local` and start filling in the required values:
   1. Go to [Neon DB](https://console.neon.tech/) and create a free database. After creating the database, copy the connection string into `DATABASE_URL` in:
      - `apps/app/.env.local`
      - `packages/database/.env`
   2. Once you have the database connection string, run the following command from the root folder:
      - `pnpm migrate`
      This will format the schema, generate the Prisma client, and push the database schema to your database. New tables should then appear in your Neon DB console.
   3. Go to [Clerk](https://clerk.com/) and create a free account. Copy the publishable key and secret key into:
      - `apps/app/.env.local`
3. Install dependencies:
   - `pnpm install`
4. Build the app:
   - `pnpm run build --filter app`
   After a few build steps, you should see the log `Tasks: 3 successful, 3 total`.
5. Run the app:
   - `pnpm run dev --filter app`
   You should see the log `- Local: http://localhost:3000`.

## Deployment
1. Go to [Vercel](https://vercel.com/) and create a free account.
2. Import your GitHub project, set up the Vercel integration with GitHub, and select the `app` project when asked during setup.
3. Copy the values from `apps/app/.env.local` to the Vercel environment variables. Skip `VERCEL_PROJECT_PRODUCTION_URL` (it's set automatically). `NEXT_PUBLIC_APP_URL` can be updated later with your production URL.
4. After the deployment is complete, go to your dashboard and open the app URL to see it running.

## Original NextForge Documentation

# ▲ / next-forge

**Production-grade Turborepo template for Next.js apps.**

<div>
  <img src="https://img.shields.io/npm/dy/next-forge" alt="" />
  <img src="https://img.shields.io/npm/v/next-forge" alt="" />
  <img src="https://img.shields.io/github/license/vercel/next-forge" alt="" />
</div>

## Overview

[next-forge](https://github.com/vercel/next-forge) is a production-grade [Turborepo](https://turborepo.com) template for [Next.js](https://nextjs.org/) apps. It's designed to be a comprehensive starting point for building SaaS applications, providing a solid, opinionated foundation with minimal configuration required.

Built on a decade of experience building web applications, next-forge balances speed and quality to help you ship thoroughly-built products faster.

### Philosophy

next-forge is built around five core principles:

- **Fast** — Quick to build, run, deploy, and iterate on
- **Cheap** — Free to start with services that scale with you
- **Opinionated** — Integrated tooling designed to work together
- **Modern** — Latest stable features with healthy community support
- **Safe** — End-to-end type safety and robust security posture

## Demo

Experience next-forge in action:

- [Web](https://demo.next-forge.com) — Marketing website
- [App](https://app.demo.next-forge.com) — Main application
- [Storybook](https://storybook.demo.next-forge.com) — Component library
- [API](https://api.demo.next-forge.com/health) — API health check

## Features

next-forge comes with batteries included:

### Apps

- **Web** — Marketing site built with Tailwind CSS and TWBlocks
- **App** — Main application with authentication and database integration
- **API** — RESTful API with health checks and monitoring
- **Docs** — Documentation site powered by Mintlify
- **Email** — Email templates with React Email
- **Storybook** — Component development environment

### Packages

- **Authentication** — Powered by [Clerk](https://clerk.com)
- **Database** — Type-safe ORM with migrations
- **Design System** — Comprehensive component library with dark mode
- **Payments** — Subscription management via [Stripe](https://stripe.com)
- **Email** — Transactional emails via [Resend](https://resend.com)
- **Analytics** — Web ([Google Analytics](https://developers.google.com/analytics)) and product ([Posthog](https://posthog.com))
- **Observability** — Error tracking ([Sentry](https://sentry.io)), logging, and uptime monitoring ([BetterStack](https://betterstack.com))
- **Security** — Application security ([Arcjet](https://arcjet.com)), rate limiting, and secure headers
- **CMS** — Type-safe content management for blogs and documentation
- **SEO** — Metadata management, sitemaps, and JSON-LD
- **AI** — AI integration utilities
- **Webhooks** — Inbound and outbound webhook handling
- **Collaboration** — Real-time features with avatars and live cursors
- **Feature Flags** — Feature flag management
- **Cron** — Scheduled job management
- **Storage** — File upload and management
- **Internationalization** — Multi-language support
- **Notifications** — In-app notification system

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) (or npm/yarn/bun)
- [Stripe CLI](https://docs.stripe.com/stripe-cli) for local webhook testing

### Installation

Create a new next-forge project:

```sh
npx next-forge@latest init
```

### Setup

1. Configure your environment variables
2. Set up required service accounts (Clerk, Stripe, Resend, etc.)
3. Run the development server

For detailed setup instructions, read the [documentation](https://www.next-forge.com/docs).

## Structure

next-forge uses a monorepo structure managed by Turborepo:

```
next-forge/
├── apps/           # Deployable applications
│   ├── web/        # Marketing website (port 3001)
│   ├── app/        # Main application (port 3000)
│   ├── api/        # API server
│   ├── docs/       # Documentation
│   ├── email/      # Email templates
│   └── storybook/  # Component library
└── packages/       # Shared packages
    ├── design-system/
    ├── database/
    ├── auth/
    └── ...
```

Each app is self-contained and independently deployable. Packages are shared across apps for consistency and maintainability.

## Documentation

Full documentation is available at [next-forge.com/docs](https://www.next-forge.com/docs), including:

- Detailed setup guides
- Package documentation
- Migration guides for swapping providers
- Deployment instructions
- Examples and recipes

## Contributing

We welcome contributions! See the [contributing guide](https://github.com/vercel/next-forge/blob/main/.github/CONTRIBUTING.md) for details.

## Contributors

<a href="https://github.com/vercel/next-forge/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vercel/next-forge" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## License

MIT
