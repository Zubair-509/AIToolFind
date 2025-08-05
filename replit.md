# AI Tools Finder

## Overview

AI Tools Finder is a full-stack web application that helps users discover the perfect AI tools for their business needs. Users describe their business requirements, and the application provides personalized AI tool recommendations using Google's Gemini AI. The app features a clean, modern interface built with React and shadcn/ui components, backed by an Express.js server with PostgreSQL database support.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates

- Updated Gemini API prompt to specifically request 3 paid and 4 unpaid/free AI tools per recommendation
- Configured system to provide exactly 7 tools total with proper distribution between free/freemium and paid options

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API with structured error handling and request logging
- **Request Processing**: JSON parsing with URL-encoded form support
- **Development**: Hot module replacement with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database provider
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Drizzle Kit for database schema migrations and management
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Data Types**: JSONB storage for flexible AI tool recommendation data

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic session infrastructure prepared with connect-pg-simple
- **Security**: Standard Express security headers and CORS handling

### External Service Integrations
- **AI Service**: Google Gemini AI (Gemini 2.5 Flash model) for generating tool recommendations
- **API Integration**: Structured JSON responses with schema validation
- **Error Handling**: Comprehensive error handling for AI service failures
- **Rate Limiting**: Handled through API key management and service quotas

### Development Tools and Configuration
- **TypeScript**: Strict mode configuration with path mapping for clean imports
- **Code Quality**: ESLint integration through Vite for code consistency
- **Development Server**: Vite dev server with hot reload and error overlay
- **Build Process**: Separate client and server build processes with esbuild for server bundling
- **Environment**: Replit-optimized configuration with development banner integration

### Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type Safety**: End-to-end TypeScript with shared schema validation
- **Component Architecture**: Reusable UI components with consistent styling patterns
- **Error Boundaries**: Comprehensive error handling at both client and server levels
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration for generating tool recommendations
- **@neondatabase/serverless**: Neon PostgreSQL serverless database client
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web framework for the backend API server

### UI and Frontend
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling with validation
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library for React

### Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for server code
- **@replit/vite-plugin-***: Replit-specific development tools and optimizations

### Database and Validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **zod**: Runtime type validation and schema parsing
- **connect-pg-simple**: PostgreSQL session store for Express

### Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **class-variance-authority**: Utility for creating type-safe variant APIs
- **nanoid**: Unique ID generation