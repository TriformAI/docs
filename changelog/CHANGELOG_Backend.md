# Changelog

## August 22, 2025 - October 22, 2025

**Period Overview:** 2 months of development  
**Total Commits:** 256  
**Files Changed:** 1,292  
**Lines Added:** 84,523  
**Lines Deleted:** 34,611

---

## 🎯 Major Features

### Chat Agent & Conversational AI
- **Chat Agent Implementation** - Complete chat agent with flow building tools and project wrapper integration
- **Chat with Tools** - Added tool support for chat agents with proper message handling
- **Chat without Tools** - Implemented chat functionality without tool dependencies
- **Variable Widget** - New widget system for dynamic variable handling
- **Widget Implementation** - Complete widget system with metadata and JSON schema support
- **Trichat Tools** - Added comprehensive trichat tools with project context
- **Message Cancellation** - Implemented chat message cancellation via Redis
- **Message History** - Improved message history processing and adaptation

### Builder System Improvements
- **Builder Refactor** - Complete refactor with full integration with main chat agent
- **Action Builder Enhancements** - Multiple UX improvements and bug fixes
- **Requirements System** - Complete requirements gathering, completion tooling, and schema improvements
- **Requirements API** - Added requirements endpoints and event models
- **Component API Client** - Added components API client with agent message models
- **Flow Builder** - Implemented complete flow builder with graph dependency tracking
- **Graph Writer** - Added graph pipeline with UIContext integration
- **I/O Builder** - Enhanced input/output builder with better validation
- **Remote Builder** - Support for remote builder execution

### Agent System
- **Agent Improvements** - Multiple improvements to agent reliability and performance
- **Agent Settings** - Togglable agent settings with flexible configuration
- **Agent Messages I/O** - More sensible defaults for agent message schemas
- **System Prompting** - Enhanced system prompt handling
- **Agent Memory** - Fixed memory offset and duplicate decorator issues
- **Loopable Nodes** - Added support for looping nodes in flows (WIP)

### Triggers & Automation
- **Global Triggers** - Migrated triggers from flow/agent to project level
- **Default Chat Trigger** - Added default trigger for chat interactions
- **Trigger Migration** - SQL migration script for trigger system updates

### Environment & Configuration
- **Environment Variables Support** - Complete support for environment variables on projects
- **Env Vars on Chat Agent** - Added environment variables to chat agent context
- **Configuration Steps** - Added steps during agent configuration
- **Read Environment Files** - Ability to read and parse environment files

### Widget System
- **Widget Models** - Initial widget models and implementation
- **Widget Complete Message** - Fixed widget completion messaging
- **Widget Resume** - Fixed widget resume functionality

---

## 🔧 Infrastructure & Deployment

### AI Gateway & LLM Integration
- **LiteLLM Integration** - Routed all LLM requests through LiteLLM with load balancing
- **AI Gateway** - Added LiteLLM as AI gateway with configuration bundling
- **Model Additions:**
  - Added `llama-3.1-8b-instant`
  - Added `qwen3-coder-30b-a3b-instruct`
  - Added Kimi fallback via Fireworks
  - Deprecated `kimi-k2-instruct` in favour of `kimi-k2-instruct-0905`
  - Dropped `gemma2-9b-it` and replaced with Llama
  - Added DeepInfra support
  - Added Moonshot pricing
- **Fallback Model System** - Added fallback model fallback to bot template
- **Model Pricing Fixes** - Updated and fixed pricing information

### Database & Storage
- **Drizzle Migration Service** - Added dedicated migration service
- **Redis Improvements:**
  - Fixed slow executions by moving to Redis pool
  - Redis pub/sub implementation
  - Redis streams support
  - Trim Redis streams for memory management
  - Use node Redis in cache
- **PostgreSQL Setup** - SQL setup scripts for development
- **Migration Fixes** - Multiple migration script fixes and improvements

### Docker & Container Management
- **Docker Improvements:**
  - Added `.dockerignore` files for API and builder
  - Updated Dockerfiles for dev and production
  - Fixed Docker stack configuration
- **Container Optimization** - Multiple container optimization and resource allocation improvements

### Kubernetes & Orchestration
- **K8s Deployment:**
  - Adjusted K8s specs and resource allocations
  - Bumped replicas for better load distribution
  - Added health checks before logger initialization
- **Service Scaling** - Execution on multiple workers

### Logging & Monitoring
- **Global Loki Logging** - Implemented comprehensive logging with Loki
- **Execution Logs** - Added detailed execution logging
- **API Logging & Metrics** - Comprehensive API request logging and metrics
- **Stdout Logging** - Added stdout logging in production
- **Tracing Fixes** - Multiple tracing and observability improvements
- **WebSocket Tracing** - Added WebSocket endpoint for real-time tracing

---

## 🐛 Bug Fixes

### Critical Fixes
- **Pretty Critical Bug** (Oct 20) - Fixed a critical system bug
- **Accidental Duplication** - Removed duplicate code
- **Null on Agent Settings** - Allow null values on agent settings
- **Missing Array Fix** - Fixed missing array initialization
- **Really Dumb Inngest Error** - Fixed Inngest configuration issue
- **Broken Flash Alias** - Fixed broken model alias

### Builder & Component Fixes
- **Flow Wiring** - Fixed flow wiring and action I/O parsing in builder
- **Project Update Conflicts** - Fixed project update conflicts
- **Missing Node Inputs** - Handle missing node inputs properly
- **Step Status** - Added and fixed step status tracking
- **Parent ID Consistency** - Fixed parent ID consistency for nested steps
- **Step IDs for Nested Steps** - Fixed step_ids for nested steps
- **Message Store Field Names** - Fixed field naming issues

### Execution & Runtime Fixes
- **Cancel Error Triggers** - Fixed cancel error not triggered on certain HTTP status codes
- **Cancellation Logic** - Corrected cancellation logic across the system
- **Chat Executions Fix** - Fixed chat execution handling
- **Streaming Events** - Fixed streaming events and transaction wrapping
- **Force Flow Event Order** - Ensured correct event ordering
- **SSE Buffering** - Fixed server-sent events buffering issues

### Action & Template Fixes
- **Action Template Updates** - Updated actions templating to use new inputs/outputs paradigm
- **Triform Attribute Check** - Fixed triform attribute validation (allow optional/not required fields)
- **Duplicate Decorators** - Fixed duplicate decorators in generated code
- **Output Class Parsing** - Removed decorated output class in favor of TypedDict validation
- **Tool Reliability** - Improved tool reliability and consistency in trichat

### UI & Widget Fixes
- **Widget Resume** - Fixed widget resume functionality
- **Widget Complete Message** - Fixed completion messaging
- **Structured Output Hack** - Fixed structured output handling
- **Visual Fixes** - Multiple small visual improvements

### Packager & Build Fixes
- **UV Cache Issues** - Fixed UV not returning build errors directly
- **Ignored Packages** - Added key about ignored packages in packager output
- **Build Errors** - Stringify build errors for better reporting
- **Component Update on Build** - Send component update notifications

---

## ⚡ Performance Improvements

### Execution Performance
- **Executor Optimizations:**
  - Network bootstrap via Python
  - Slirp exit-fd improvements
  - Reduced waits and logging overhead
  - Bumped executor timeout for complex operations
  - Run bwrap in helper netns
  - Minimize /dev and mask mount info

### Builder Performance
- **Action Building Speed** - General improvements to speed up action building process
- **Completioner Model** - Switched to `gpt-4.1-mini` for better performance
- **Concurrent Builds** - Support for concurrent component builds
- **Concurrent Tests** - Concurrent example action tests

### API & Worker Performance
- **Buffer Size** - Increased buffer size for better throughput
- **Execution Efficiency** - Made executions more efficient (with revert and reapply)
- **Redis Pool** - Moved to Redis connection pooling
- **Packager Health Check** - Added health check endpoint

---

## 🔄 Breaking Changes & Migrations

### Schema & Type System
- **JSON Schema** - Renamed `type` to `schema` across the system
- **Input/Output Paradigm** - Migrated to new inputs/outputs schema
- **TypedDict Validation** - Replaced decorated output classes with TypedDict validation
- **Requirements Model** - Made requirements nullable in schema
- **Context as Array** - Changed context from single value to array

### Database Migrations
- 25+ database migrations including:
  - Global triggers migration
  - Project-level triggers
  - Requirements on projects
  - Environment variables on projects
  - Widget models
  - Agent settings
  - Invites system
  - Deletable projects

### Component System
- **Component ID** - Made `componentId` and `projectId` nullable
- **BaseComponent Generic** - Made BaseComponent generic over ComponentsModel
- **Component Requirements** - Added component ID to requirements events

---

## 🎨 User Experience Improvements

### Authentication & Users
- **Magic Link** - Implemented magic link authentication
- **Invites System** - Complete invite system for users
- **Polar Integration** - Initial Polar integration for billing
- **Encrypted Session** - Session encryption for trichat with bearer token support
- **Mail Fixes** - Multiple email system improvements

### Projects & Organization
- **Default Project** - Automatic default project creation with README
- **Project Socket** - Real-time project updates via WebSocket
- **Deletable Projects** - Added ability to delete projects
- **Project Ordering** - Order projects by creation date
- **Intention on Projects** - Added intention field to projects

### Developer Experience
- **Sample Payload Generation** - Generate sample payloads for testing
- **Tab Complete** - Added tab completion support
- **Discord Integration** - Force users into Discord for support
- **Provider Prefix** - Added and managed provider prefixes
- **AI File** - Added `.ai` configuration file support

---

## 🛠️ Development & Testing

### Testing Improvements
- **Test Suite Expansion:**
  - Cache date serialization tests
  - Entire flow tests
  - Example actions tests
  - Get sample payload tests
  - Python parser tests
  - Redis pub/sub tests
  - Redis streams tests
  - Restore snapshot tests
  - Type schema validation tests
- **Concurrent Tests** - Added concurrent test execution

### Code Quality
- **Biome Integration** - Added `biome.json` for code formatting
- **Remove Failing Print Statements** - Cleanup of debug code
- **Prompt Refinements** - Improved prompts across the board
- **Namespace Fixes** - Fixed namespacing issues
- **Error Handling** - Let agent handle tool errors properly

### Documentation
- **README Updates** - Updated documentation across components
- **Claude.md** - Added AI-specific documentation
- **Deployment Documentation** - Comprehensive deployment guides
- **TODO.md** - Maintained task tracking

---

## 📦 Dependencies & Package Management

### Package Updates
- **Bun Integration** - Using Bun instead of Node.js/npm/pnpm
- **Bump Dependencies** - Multiple dependency updates across all services
- **Patch Management** - Applied patches for `@hono/zod-validator`
- **UV Cache Control** - Per-job UV cache control via `disable_uv_cache`

### New Dependencies
- Added cffi, cryptography, pycparser to builder
- Bumped Inngest version
- Updated Redis client libraries

---

## 🔐 Security & Stability

### Security Improvements
- **Session Encryption** - Encrypted sessions for API access
- **Bearer Token Support** - Added ability to use session as bearer token
- **Namespacing** - Fixed namespace collision issues

### Stability Improvements
- **Cancellation Flow** - Improved cancellation logic with proper cleanup
- **Step Closing** - Better step closing and status management
- **Error Status** - Added error status to batch canceled steps
- **Context Enrichment** - Enhanced context enrichment for chat agent
- **Prevent Coder Getting Stuck** - Added safeguards against infinite loops

---

## 🎯 Component-Specific Changes

### API (`/api`)
- Redis pool implementation
- Drizzle adjustments and migrations
- Hono server improvements
- Inngest integration fixes
- Sample payload generation
- Requirements endpoints

### AI Gateway (`/ai-gateway`)
- LiteLLM proxy configuration
- Model routing and load balancing
- Configuration bundling
- Health check improvements

### Builder (`/builder`)
- Complete refactor with UIContext
- Async Redis client integration
- Cancellation consolidation
- Graph pipeline improvements
- Component factory updates
- Action template updates

### Worker (`/worker`)
- Multiple worker support
- Proper xread function usage
- Buffer size optimization
- Event ordering improvements

### Executor (`/executor`)
- Network isolation improvements
- Sandbox security enhancements
- Performance optimizations
- Triform.py updates with ctx singleton

### Packager (`/packager`)
- UV cache control
- Build error handling
- Health check endpoint
- Per-job configuration

---

## 📊 Statistics Summary

- **Development Period:** 2 months (Aug 22 - Oct 22, 2025)
- **Total Commits:** 256
- **Contributors:** 3 (zulvskog, Hannes Fant, Patrik Engborg)
- **Files Modified:** 1,292
- **Net Lines Added:** ~50,000 (84,523 inserted, 34,611 deleted)
- **Database Migrations:** 25+
- **New Models Added:** 7+
- **Critical Bugs Fixed:** 15+

---

## 🚀 Looking Forward

This changelog represents a significant evolution of the Nexus platform with:
- Enhanced AI agent capabilities
- Improved builder system with requirements gathering
- Better performance and reliability
- Comprehensive monitoring and logging
- Scalable infrastructure with Kubernetes support
- Enhanced developer experience

The platform is now more robust, scalable, and feature-rich than ever before, with a solid foundation for future enhancements.

