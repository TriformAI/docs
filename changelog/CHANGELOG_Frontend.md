# Changelog

## October 2025

### Week of October 28
- **BREAKING**: Removed legacy Canvas API, added Visual Graph API
- **Feature**: Added automatic docs update and PR creation to docs-publisher workflow
- **Bug Fix**: Improved Claude response parsing with better YES/NO detection
- **Bug Fix**: Replaced claude CLI with Anthropic SDK Node.js approach
- **Bug Fix**: Added better error handling and debugging output for git diff
- **Bug Fix**: Fixed YAML syntax error in multiline string
- **Feature**: Added 300 line cap to diff stats
- **Feature**: Updated docs workflow to get relevant commits from claude
- **Bug Fix**: Fixed diff command to get full patch content
- **Feature**: Added diff stats to claude prompt alongside commit history
- **Feature**: Added explicit frontend repo checkout with full git history
- **Feature**: Added frontend commits and debug output
- **Feature**: Updated workflow to use claude with prompt via stdin
- **Feature**: Added claude-code installation and opening in docs repo
- **Bug Fix**: Fixed escaped variable in workflow string
- **Bug Fix**: Fixed workflow YAML format and completed docs-publisher workflow

### Week of October 20-21
- **Reverted**: Toolboxes feature reverted to previous state
- **UI**: Improved navigation to root when reverting changes
- **UI**: Aligned logo positioning
- **UI**: Fixed height styling (`h-full`)
- **Bug Fix**: Fixed agent settings functionality
- **UI**: Fixed props panel scroll and transition behavior
- **Bug Fix**: Resolved step display issues
- **UI**: Improved tab styling across interface
- **Refactor**: Renamed projects to toolboxes throughout codebase

### Week of October 13-17
- **Feature**: Added variable widget functionality
- **Feature**: Implemented message reverting capability
- **Bug Fix**: Fixed potential crash scenarios
- **Bug Fix**: Resolved broken trigger chat functionality
- **Bug Fix**: Fixed missing array initialization
- **Feature**: Added "Build a Tool" functionality
- **UI**: Added fallback avatar display
- **UI**: Open button now displays on hover
- **Storage**: Persist selected tools in local storage
- **Bug Fix**: Fixed widget disclosure logic
- **Feature**: Added input/output handling on steps
- **UI**: Improved step interaction visualization
- **Feature**: Added default chat trigger

### Week of October 10-12
- **Feature**: Chat with tools implementation
- **Bug Fix**: Fixed deploy button wrapping issue
- **Performance**: Optimized component library loading (don't load entire library on project load)
- **UI**: Fixed buttons on mobile devices
- **Dependencies**: Bumped package dependencies
- **Bug Fix**: Fixed endpoint token creation (part 1 and 2)

### Week of October 8-9
- **Feature**: Initial execution state storage implementation
- **Dependencies**: Updated ESLint configuration
- **Refactor**: Major chat refactoring
- **Bug Fix**: Fixed overlapping nodes issue
- **Feature**: Implemented global triggers
- **Bug Fix**: Fixed invites page functionality

### Week of October 3-6
- **Refactor**: Environment variables renamed to project variables
- **Bug Fix**: Fixed panel scrolling behavior
- **Bug Fix**: Fixed chat functionality issues
- **UI**: Improved chat loading states
- **Refactor**: Refactored invite page
- **Feature**: Added rudimentary mobile support
- **UI**: Improved chat formatting
- **Bug Fix**: Fixed step display issues
- **Feature**: Added `.new` prompt functionality
- **Feature**: New prompt page improvements

### Week of October 1-2
- **Feature**: Added project deletion capability
- **Bug Fix**: Fixed deployment socket issues
- **Removal**: Dropped Twipla analytics
- **Feature**: Improved deploy button functionality
- **Code Quality**: Switched from tabs to spaces
- **Feature**: Implemented user invites system
- **Bug Fix**: Fixed select behavior on node creation
- **Bug Fix**: Fixed triggers not showing
- **Bug Fix**: Fixed project creation issue

## September 2025

### Week of September 29-30
- **Feature**: Added execution cancellation logic
- **Feature**: Added project nodes functionality
- **Integration**: Added Featurebase user identification
- **UI**: Implemented highlight for mentions in agent messages
- **UI**: Single open panel item at a time
- **UI**: Single click to open functionality
- **Feature**: Implemented global variables
- **Bug Fix**: Fixed metadata text display
- **UI**: Hide handles in certain contexts
- **Bug Fix**: Fixed props panel growth issues
- **Feature**: Added markdown support
- **Feature**: Added text nodes
- **Authentication**: Implemented magic link login
- **UI**: Made execute button sticky
- **Feature**: Agent adjustments and improvements
- **Bug Fix**: Fixed input docstring display
- **Feature**: Let agent handle tool errors
- **Bug Fix**: Fixed error display issues
- **Feature**: Added running state and stack trace visualization
- **Bug Fix**: Fixed nullish value handling
- **Bug Fix**: Fixed loop detection logic
- **Migration**: Migrated inputs schema

### Week of September 25-26
- **Context**: Added current container to context
- **Bug Fix**: Multiple small fixes
- **Bug Fix**: Fixed highlight rendering
- **Feature**: Enhanced chat functionality
- **WebSocket**: Use WebSocket for execution tracing
- **Feature**: Implemented execution cancellation

### Week of September 22-24
- **UI**: Allow toggling agent advanced settings
- **Feature**: Loop adjustments and improvements
- **Feature**: Initial loop implementation
- **UI**: Added execute button to code editor

### Week of September 17-19
- **Documentation**: Added default project README
- **UI**: Centered port connections
- **UX**: Allow drag start from + button
- **Feature**: Intercept Ctrl+S for saving
- **UI**: Hide I/O in agent view
- **UI**: Let nodes grow dynamically
- **Types**: Updated TypeScript types
- **UI**: Hide view button for non-admin members
- **Feature**: Redirect to new project after creation
- **UI**: Hide generate button (temporary)
- **Bug Fix**: Fixed input edges sometimes not showing
- **Bug Fix**: Fixed label display
- **UI**: Removed auto-focus behavior
- **Feature**: Build action runs in background
- **UI**: Various visual tweaks
- **UI**: Added tooltips throughout interface
- **Feature**: Environment variables on projects
- **UI**: Hide + button on action I/O
- **WebSocket**: Implemented project socket
- **UI**: Added canvas title display
- **Dependencies**: Bumped dependencies
- **Feature**: Added project icon support
- **UI**: Conditional handle opacity
- **UI**: Large create button design

### Week of September 11-15
- **Feature**: Allow building actions without requirements
- **Bug Fix**: Reset build state on failure
- **UI**: Ghost handles UX fixes
- **Bug Fix**: Fixed ghost handle creation
- **Bug Fix**: Fixed I/O list display
- **UI**: Prevent port overflow
- **UI**: Progress plain option
- **Feature**: Nestable steps implementation
- **Bug Fix**: Fixed chat spinner
- **Dev**: Added build context action in development mode
- **Feature**: Execution tracing visualization
- **Backend**: Use remote builder for actions
- **Accessibility**: Added IDs to port elements
- **Feature**: Allow follow-up completions
- **Feature**: Added tab completion
- **Accessibility**: Added IDs to prompt editors
- **UX**: Builder experience adjustments
- **Bug Fix**: Remove old edges on action I/O rename
- **UI**: Show build deps button only in requirements tab
- **Bug Fix**: Fixed execution of top-level flows

### Week of September 8-10
- **UI**: Added info tips throughout interface
- **Bug Fix**: Fixed variable listing
- **Bug Fix**: Fixed nested executions with variables
- **UI**: Only open panels if minified
- **Feature**: Default agent configuration and error catching
- **UI**: Remove provider prefix from display
- **Feature**: Save model on change
- **Feature**: Generate sample payloads
- **Bug Fix**: Fixed infinite requirements loop
- **Accessibility**: Added data-tf-container-type attributes
- **Feature**: Sample payload generation
- **Workaround**: Temporary fix for payload issues
- **UI**: Show only triggers for top-level nodes
- **UX**: Add node on right-click
- **Bug Fix**: Context menu fixes
- **Accessibility**: Added IDs to UI elements (PROD)
- **UI**: Small visual tweaks
- **Feature**: Add triggers to agent
- **Bug Fix**: Fixed resolved agent issues
- **Removal**: Dropped default board
- **Integration**: Added Featurebase (PROD)
- **Feature**: Wait for load before interactions (PROD)
- **CI/CD**: Fixed auto prod build CI
- **Integration**: Added Twipla analytics (PROD)
- **Feature**: Insert input into prompt
- **Models**: Added back Groq & Gemini model support

### Week of September 2-5
- **Feature**: Initial agent prompt redesign
- **Bug Fix**: Fixed disappearing trigger panel item (Patrik)
- **Bug Fix**: Fixed unaligned label (Patrik)
- **Feature**: Set isConnectable to false for handles inside agents (Patrik)
- **UI**: Made ghost input wider (Patrik)
- **UI**: Added label for create node in agent context (Patrik)
- **UI**: Improved text contrast for confirm button (Patrik)
- **UI**: Don't show input node for agents (Patrik)
- **UX**: Reset CreateNode after success (Patrik)
- **Bug Fix**: Disabled auto-open temporarily
- **Feature**: Align nodes automatically
- **API**: Moved requirements generation to API & added for projects
- **Refactor**: Moved edit name, context array, requirements/metadata split
- **Code Quality**: Removed debug log statements
- **CI/CD**: Auto-build prod image if commit starts with PROD:
- **Bug Fix**: Fixed adding outputs to agents
- **Integration**: Added Usetiful onboarding
- **UI**: Fixed initial width and dynamic resizing of chat panel (Patrik)
- **Chat**: Don't show user_message in chat (Patrik)
- **Refactor**: Cleaned up Navbar component (Patrik)
- **Bug Fix**: Fixed page.data error caused by Navbar (Patrik)
- **UX**: Keep chat closed if empty, open on generate action (Patrik)
- **WebSocket**: Get message history from socket instead of GET endpoint (Patrik)
- **UI**: Added confirm modal to deploy button (Patrik)
- **UI**: Fixed height and scroll behavior for panel items (Patrik)
- **Bug Fix**: Disabled SSR for specific components
- **Bug Fix**: Temporary fix for rendering issues
- **Types**: Fixed type definitions

### Week of August 26 - September 1
- **UI**: Added build action button to panel header for components (Patrik)
- **Feature**: Added generate requirements button (Patrik)
- **Event**: Added component ID to requirements event
- **Refactor**: Updated component naming
- **CI/CD**: Production build action setup
- **Schema**: Component requirements event model
- **Bug Fix**: Fixed projectIsEmpty check (Patrik)
- **Bug Fix**: Fixed localStorage problem (Patrik)
- **Validation**: Prevent connections between I/O nodes (Patrik)
- **Feature**: Added deploy button (Patrik)
- **Bug Fix**: Fixed empty item in breadcrumbs (Patrik)
- **Feature**: Copy schema when creating edge
- **Types**: Default to 'any' instead of 'string' for type inference
- **Models**: Added more LLM providers
- **Bug Fix**: Fixed missing array brackets
- **UI**: Color only active breadcrumb for more visual pop
- **UX**: Auto-open nodes on creation
- **Bug Fix**: Fixed ordered node layout calculation
- **Refactor**: Renamed default action function
- **Schema**: JSON schema implementation & type→schema rename
- **UI**: Added name step to CreateNode (Patrik)
- **UX**: Harmonized CreateNode and SelectorNode (Patrik)
- **UI**: Centered breadcrumbs and added icons (Patrik)
- **Removal**: Temporarily removed component library (Patrik)
- **Validation**: Prevent edge dragging from input node (Patrik)
- **Feature**: Show stdout & stderr in execution output
- **Bug Fix**: Fixed I/O not updating on actions
- **Feature**: Added metadata and requirements to project panel (Patrik)
- **Bug Fix**: Fixed horizontal overflow in chat (Patrik)
- **Feature**: Added requirements to metadata (Patrik)
- **Bug Fix**: Fixed action build button
- **Context**: Pass component ID as context
- **UI**: Adjusted spinner animation
- **Feature**: Agent messages I/O handling
- **UI**: Show spinning logo when AI is thinking (Patrik)
- **Bug Fix**: Permanent solution for startId issue (Patrik)
- **Bug Fix**: Fixed logout functionality (Patrik)
- **UI**: Made editors in code panel fluid in height (Patrik)
- **Performance**: Improved flaky loading of Monaco editor (Patrik)
- **Notifications**: Added toast notifications
- **Error Handling**: Handle chat errors gracefully
- **UX**: Send chat messages on Enter, Shift for new line (Patrik)
- **Bug Fix**: Use latest startId value
- **Bug Fix**: Fixed empty chat not showing new messages - startId fix (Patrik)

## August 2025

### Week of August 22-23
- **UI**: Hide handles in agent view
- **Bug Fix**: Last trigger functionality fix
- **UI**: Added gap spacing
- **Bug Fix**: More trigger-related fixes
- **Bug Fix**: Fixed triggers not visible when nesting
- **UI**: Icon updates throughout interface
- **UI**: Multiple small visual fixes
- **WebSocket**: Handle new user message acknowledgment
- **Feature**: Step parsing by Opus 4.1
- **Bug Fix**: Semi-temporary fix for undefined startId
- **Bug Fix**: Fixed cursor jumping in editors
- **UI**: Minor visual tweaks (Patrik)
- **Performance**: Fixed throttled scroll in socket.onmessage (Patrik)
- **Bug Fix**: Send to actual message correctly (Patrik)
- **UX**: Improved inserting mention at right position and cursor position (Patrik)
- **Refactor**: Code refactoring and added sanitizeMessage (Patrik)
- **Feature**: Added node mentions to chat (Patrik)

---

## Contributors
- Hannes Fant (Primary Developer)
- Patrik Engborg (UI/UX Contributions)

## Summary Statistics
- **Total Commits**: 265 commits over 2 months
- **Major Features Added**:
  - Chat system with tool integration
  - Project/Toolbox management
  - Agent system with advanced settings
  - Execution state tracking and cancellation
  - Magic link authentication
  - Deploy functionality
  - Variable management (global and project-level)
  - Loop implementation
  - WebSocket-based real-time updates
  - Mobile responsiveness
  - Invite system
  
- **Key Integrations**:
  - Featurebase (user feedback)
  - Plausible (analytics)
  - Usetiful (user onboarding)
  - Multiple LLM providers (Groq, Gemini, etc.)

- **Performance Improvements**:
  - Optimized component library loading
  - Improved Monaco editor loading
  - WebSocket implementation for real-time features
  - Reduced unnecessary re-renders

- **Code Quality**:
  - Major refactoring of chat system
  - TypeScript type improvements
  - ESLint updates
  - Consistent code formatting (tabs → spaces)
  - CI/CD improvements with auto-build for production

