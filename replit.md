# AI ToolPilot

## Overview

AI ToolPilot is a full-stack web application that helps users discover the perfect AI tools and AI agents for their business needs. Users describe their business requirements, and the application provides personalized recommendations for both traditional AI tools and modern AI agents (like Replit Agent, Bolt.new, Lovable, v0.dev, etc.) using Google's Gemini AI. The app features a clean, modern interface built with React and shadcn/ui components, backed by an Express.js server with PostgreSQL database support.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates

- Successfully migrated from Replit Agent to standard Replit environment (January 2025)
- Configured Gemini API key for AI recommendations functionality
- Verified all systems working: Express server, frontend, database schema, and API endpoints
- Maintained security practices with proper client-server separation
- Expanded scope to include AI agents (Replit Agent, Bolt.new, Lovable, v0.dev, etc.) in addition to traditional AI tools
- Updated distribution to 5 free/freemium + 4 paid recommendations (9 total)
- Added retry mechanism to ensure correct number of recommendations
- Updated UI text throughout app to reflect "AI Tools & Agents" branding
- Rebranded application name to "AI ToolPilot" as requested by user
- Enhanced Gemini API prompt to specifically include AI agents alongside traditional tools
- Redesigned results page with modern dark theme, smooth animations, and glass morphism effects
- Improved mobile and desktop responsiveness with optimized card layouts
- Enhanced tool cards with gradient borders, hover animations, and better visual hierarchy
- Added multi-provider AI support with OpenAI, Anthropic, xAI, and Gemini APIs
- Enhanced PDF export with smart content fitting and page management
- Added provider fallback system for reliable AI recommendations
- Added functional model selection dropdown allowing users to choose preferred AI provider
- Implemented smart fallback system that switches from failed providers (e.g. Deepseek R1 credit issues) to working ones (Gemini)
- Enhanced UI with real-time provider availability indicators and "Auto-select" option

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