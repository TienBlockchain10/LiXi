# System Architecture Guide

## Overview

This is a full-stack web application built with a modern TypeScript stack featuring a React frontend and Express backend. The application appears to be a waitlist signup system with a comprehensive UI component library based on shadcn/ui.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Comprehensive component library based on Radix UI primitives (shadcn/ui)

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware for JSON parsing and logging
- **Database**: PostgreSQL with Drizzle ORM
- **Cloud Database**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod schemas shared between frontend and backend

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type-safe shared schemas
- **Tables**: 
  - `users` (id, username, password)
  - `waitlist_entries` (id, email, name, monthly_amount, created_at)
- **Validation**: Drizzle-Zod integration for runtime validation

### API Layer
- **Pattern**: RESTful API with consistent error handling
- **Endpoints**: 
  - `POST /api/waitlist` - Join waitlist
  - `GET /api/waitlist` - Retrieve waitlist entries
- **Error Handling**: Centralized middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging

### Frontend Components
- **UI System**: Complete component library with consistent theming
- **Forms**: Type-safe forms with validation feedback
- **State Management**: React Query for caching and synchronization
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

1. **User Interaction**: Forms capture user input with real-time validation
2. **Client Validation**: Zod schemas validate data before submission
3. **API Request**: TanStack Query manages HTTP requests with error handling
4. **Server Validation**: Backend re-validates using shared Zod schemas
5. **Database Operation**: Drizzle ORM handles type-safe database interactions
6. **Response Handling**: Consistent JSON responses with success/error states
7. **UI Updates**: React Query automatically updates UI state

## External Dependencies

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Development server and build tooling
- **Tailwind CSS**: Utility-first styling framework
- **PostCSS**: CSS processing with Autoprefixer

### Production Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessibility
- **Validation**: Zod for schema validation
- **HTTP Client**: Native fetch with custom wrapper
- **Date Handling**: date-fns for date utilities

### UI Component Library
- Comprehensive set of accessible components
- Consistent theming with CSS custom properties
- Support for both light and dark modes
- Mobile-responsive design patterns

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild compiles TypeScript server code to `dist/index.js`
- **Database**: Drizzle Kit manages schema migrations

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Uses tsx for TypeScript execution
- **Production**: Compiled JavaScript with Node.js

### Development Workflow
- Hot module replacement via Vite
- Type checking with TypeScript compiler
- Database schema changes via `db:push` command
- Shared type safety between frontend and backend

### Key Architectural Decisions

1. **Shared Schema**: Using a shared schema in the `shared/` directory ensures type safety between frontend and backend while avoiding duplication.

2. **Drizzle ORM**: Chosen for its TypeScript-first approach and excellent developer experience with migrations and type inference.

3. **Neon Database**: Serverless PostgreSQL solution provides scalability without infrastructure management overhead.

4. **shadcn/ui**: Provides a complete, accessible UI component system that can be customized and extended as needed.

5. **Monorepo Structure**: Frontend (`client/`), backend (`server/`), and shared code (`shared/`) in a single repository for easier development and deployment.