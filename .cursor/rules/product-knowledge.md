---
description: ThoughtSpot product terminology and domain knowledge including Answer, Liveboard, SpotIQ, Worksheet, Monitor, Connection, and SpotApp concepts. Use when prototypes reference ThoughtSpot features, user roles, or product-specific UI patterns. Do NOT load for generic UI work unrelated to ThoughtSpot features.
alwaysApply: false
---

# ThoughtSpot Product Knowledge

Context for building components and features aligned with ThoughtSpot's product.

## Product Overview

ThoughtSpot is an **AI-powered analytics platform** that enables business users to search and analyze data using natural language. The platform democratizes data access without requiring SQL or technical expertise.

## Core Product Concepts

### Primary Objects

| Object | Description | Usage |
|--------|-------------|-------|
| **Answer** | A saved search query result (chart, table, or visualization) | Users create Answers by searching data |
| **Liveboard** | A collection of pinned Answers forming a dashboard | Users pin Answers to Liveboards |
| **Worksheet** | A curated data model for searching (also called Data Model) | Admins create Worksheets for users |
| **Connection** | A link to an external data source (Snowflake, BigQuery, etc.) | Admins configure Connections |
| **SpotIQ** | AI-powered automated insights feature | Analyzes data to surface insights |
| **Monitor** | Scheduled alert on data thresholds | Users set up Monitors on KPIs |
| **SpotApp** | Pre-built analytics application template | Admins deploy SpotApps |

### User Roles

| Role | Typical Actions |
|------|-----------------|
| **Business User** | Search data, create Answers, build Liveboards, set Monitors |
| **Data Analyst** | Create Worksheets, share insights, build SpotApps |
| **Admin** | Manage Connections, configure security, deploy SpotApps |

## UI Terminology

### Navigation & Layout

- **Search bar** - Primary interface for natural language queries
- **Data panel** - Shows available columns/attributes for searching
- **Chart builder** - Interface for customizing visualizations
- **Side panel** - Contextual settings and filters
- **Hamburger menu** - Main navigation on mobile/collapsed views

### Actions

| User Says | System Term |
|-----------|-------------|
| "Save this chart" | Create Answer |
| "Add to dashboard" | Pin to Liveboard |
| "Share this" | Share (generates link or email) |
| "Download" | Export (CSV, PDF, etc.) |
| "Set an alert" | Create Monitor |
| "Drill into this" | Drill down |

### Data Terms

| Term | Context |
|------|---------|
| **Attribute** | Dimension/category column (text, date) |
| **Measure** | Numeric/aggregatable column |
| **Formula** | Calculated field defined in Worksheet |
| **Join** | Relationship between tables in Data Model |
| **Filter** | Constraint on data in Answer/Liveboard |

## Integration Points

ThoughtSpot commonly integrates with:

### Data Sources (Connections)
- Snowflake, Databricks, BigQuery, Redshift
- Azure Synapse, Oracle, SQL Server
- CSV uploads, Google Sheets

### Embedding
- ThoughtSpot Everywhere (embedded analytics SDK)
- REST API for programmatic access
- Liveboard embedding in external apps

## Common Workflows

### Analyst Creating a Dashboard
1. Connect to data source (Connection)
2. Model data (Worksheet)
3. Search and create visualizations (Answers)
4. Pin visualizations (Liveboard)
5. Share with team

### Business User Exploring Data
1. Open Search bar
2. Type natural language query
3. View AI-generated Answer
4. Pin interesting insights to Liveboard
5. Set Monitor for key metrics

## Brand Voice Attributes

When building UI for ThoughtSpot, the tone should be:

- **Approachable** - Friendly, not intimidating
- **Genuine** - Honest, transparent about actions
- **Smart** - Concise, efficient language
- **Pioneering** - Forward-thinking, AI-first

## Common Component Use Cases

### When Building Alerts/Notifications
- Success: Answer saved, Liveboard shared, Monitor triggered
- Warning: Data refresh pending, Connection issue
- Error: Query failed, Permission denied
- Info: New features, Tips

### When Building Forms
- Create Connection wizard
- Worksheet column configuration
- Monitor threshold settings
- Share permissions dialog

### When Building Navigation
- Switch between Answers, Liveboards, Data
- Breadcrumbs for drill-down context
- Tab navigation within Answers

---

**Note:** This is a template. Expand with specific product knowledge as needed for your implementation context.
