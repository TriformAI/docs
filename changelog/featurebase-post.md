# 🚀 Major Platform Update: Storage, Widgets & Enhanced Monitoring

**November 11 - December 1, 2025**

We're excited to share our biggest update yet! Over the past three weeks, we've shipped **112 commits** across frontend and backend, adding **23,000+ lines** of carefully crafted code. This release brings four major new capabilities and significant improvements across the platform.

---

## 🎯 What's New

### 📦 Complete Storage System

You can now store and retrieve files directly in your workflows!

**What you can do:**
- Upload and download files via the new storage API
- Store files scoped to your project
- Use built-in `save_file()` and `get_file()` functions in Python actions
- Configure storage through project modifiers

**Perfect for:**
- Processing uploaded documents
- Generating and storing reports
- Image manipulation workflows
- Data export workflows

### 🎨 Interactive OAuth Widgets

Say goodbye to page refreshes during OAuth authentication!

**What's changed:**
- Authenticate with Google, Microsoft, and other providers directly in chat
- Windows auto-close after successful authentication
- Real-time status updates
- No more leaving your conversation to connect services

**Why it matters:**
Building workflows with third-party APIs is now seamless and intuitive.

### ⏰ Cron Triggers (Scheduled Workflows)

Schedule your workflows to run automatically!

**What you can do:**
- Use standard cron expressions to schedule workflows
- Set up daily, weekly, monthly automations
- Timezone-aware scheduling
- Monitor scheduled executions

**Great for:**
- Daily data syncs
- Weekly reports
- Scheduled maintenance tasks
- Periodic backups

### 📊 Executions Dashboard

A dedicated page to monitor all your workflow executions!

**New features:**
- View complete execution history
- Real-time execution status
- Filter and search through executions
- Better debugging with detailed execution info
- Clean tabbed layout

---

## 🤖 New AI Models

We've added **5 new AI models** to give you more options:

- **Claude Haiku 4.5** (via AWS Bedrock) — Ultra-fast, cost-effective responses
- **Gemini 3 Pro Preview** — Google's latest flagship model
- **GPT-5.1** — Next-generation OpenAI model
- **Flash 2.5** — High-speed fallback option
- **Kimi** — Now our default chat model for better conversations

---

## ⚡ Performance & Reliability

**Redis Optimization**
- Fixed anti-patterns for better performance
- Improved caching strategies
- Reduced memory usage

**Enhanced Monitoring**
- Prometheus integration for real-time metrics
- Better health checks
- Improved error tracking

**Cache Management**
- Smarter cache invalidation
- Faster metadata generation
- Force cache clear on updates

---

## 🎨 UI/UX Improvements

**Cleaner Workspace**
- Properties panel hidden by default
- Auto-opens when you select a node
- More screen space for your canvas

**Better Chat Experience**
- More concise formatting
- Improved autoscroll behavior
- Quick reply buttons in agent messages
- Chat actions for interactive workflows

**Tabbed Navigation**
- New navbar layout
- Better information organization
- Easier navigation between sections

---

## 🐛 Bug Fixes

We've fixed over **20 bugs** this release, including:

✅ Execution endpoint triggers now work reliably  
✅ Project requirements parsing issues resolved  
✅ OAuth modifiers work correctly in chat  
✅ Fixed crash on empty executions page  
✅ Better handling of unresolved modifiers  
✅ Improved flow opening behavior  
✅ Fixed various schema validation issues

---

## 📈 By The Numbers

- **112 commits** in 21 days
- **23,731 net lines** of code added
- **4 major features** shipped
- **5 new AI models** added
- **20+ bug fixes**
- **Zero breaking changes**

---

## 🔮 What This Means For You

**Build More Powerful Workflows**
- Process and store files
- Schedule automations
- Monitor everything

**Better Development Experience**
- Authenticate services without friction
- Debug with comprehensive execution data
- Choose from more AI models

**Production Ready**
- Better performance and reliability
- Enhanced monitoring
- Improved error handling

---

## 🚀 Try It Now

All these features are live and ready to use! Here's how to get started:

1. **Storage**: Create a storage modifier in your project settings
2. **Cron Triggers**: Add a cron trigger to any flow or agent
3. **Executions Dashboard**: Check out your new executions page
4. **OAuth Widgets**: Next time you authenticate, enjoy the seamless experience

---

## 🙏 Thank You

This massive update wouldn't be possible without your feedback and support. We're committed to building the most powerful workflow automation platform, and we're just getting started.

Have questions or feedback? Drop us a message or join our [Discord community](#).

Happy automating! 🎉

— The Triform Team

