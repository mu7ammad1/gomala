# Gomlla - E-commerce Platform

## Overview

Gomlla (جملة) is an Arabic-language e-commerce platform built with Next.js 16 and Supabase. The application serves as a wholesale/retail shopping platform featuring product listings, shopping cart functionality, order management, and user authentication. The interface is primarily right-to-left (RTL) to support Arabic content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 16 with App Router and React 19
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Animations**: Motion (Framer Motion) with custom animate-ui components
- **Theme Support**: next-themes for dark/light mode switching
- **Typography**: Custom fonts - Rubik for body text, Momo Trust Display for branding

### Component Structure
- `src/components/ui/` - Reusable shadcn/ui components (Button, Card, Input, etc.)
- `src/components/sections/` - Page section components (ProductCard, CategoryCard, EventCard)
- `src/components/tutorial/` - Layout components (Navbar, Header)
- `src/components/animate-ui/` - Animated component primitives
- `src/components/blocks/` - Complex composed components (Carousel)

### Backend Architecture
- **API Routes**: Next.js API routes in `src/app/api/`
- **Authentication**: Supabase Auth with SSR support via @supabase/ssr
- **Session Management**: Middleware-based session updates in `middleware.ts`
- **Database**: Supabase (PostgreSQL) for orders and data storage

### Key Pages
- `/` - Homepage with product listings, categories, and promotional carousels
- `/product/[product]` - Individual product detail pages
- `/checkout` - Order checkout flow
- `/orders` - Order listing page
- `/orders/[orderId]` - Single order detail view
- `/auth/login`, `/auth/sign-up` - Authentication pages

### Data Flow
1. Products are currently defined as static data in page components
2. Orders are stored in Supabase with a structured schema including customer info, product details, and order status
3. API routes handle CRUD operations for orders (`/api/checkout`, `/api/orders/[orderId]`)

### State Management
- Client-side state uses React hooks (useState, useEffect)
- Controlled state hook for form inputs (`use-controlled-state`)
- Mobile detection hook (`use-mobile`)
- Animation view detection (`use-is-in-view`)

## External Dependencies

### Supabase Integration
- **Purpose**: Authentication and database
- **Client Libraries**: @supabase/supabase-js, @supabase/ssr
- **Configuration**: Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
- **Tables**: `orders` table for order management with fields for product info, customer details, status, and payment info

### Image Hosting
- External images allowed from: placehold.co, static.mobilemasr.com, assets-dubaiphone.dubaiphone.net
- Configured in `next.config.ts` via `remotePatterns`

### UI Dependencies
- Radix UI primitives for accessible components
- Embla Carousel for product/banner carousels with autoplay
- Lucide React for iconography
- class-variance-authority for component variants