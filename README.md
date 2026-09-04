# CRM + ERP Platform

A modular CRM and ERP platform built with Laravel, React, TypeScript, Inertia.js, MySQL, Redis, Docker, and Nginx.

The long-term goal of the project is to build a complete business management platform that combines customer relationship management, sales, project management, finance, procurement, inventory, human resources, reporting, automation, and administration in a single system.

This repository is intended both as a real-world learning project and as a portfolio-grade application demonstrating full-stack architecture, domain modeling, Laravel development, React/TypeScript frontend development, Docker-based infrastructure, and incremental delivery of complex business modules.

---

## Table of Contents

- [Project Vision](#project-vision)
- [Goals](#goals)
- [Technology Stack](#technology-stack)
- [High-Level Architecture](#high-level-architecture)
- [Core Business Flows](#core-business-flows)
- [CRM Modules](#crm-modules)
- [Sales Modules](#sales-modules)
- [ERP Modules](#erp-modules)
- [Finance and Accounting Modules](#finance-and-accounting-modules)
- [Procurement Modules](#procurement-modules)
- [Inventory and Warehouse Modules](#inventory-and-warehouse-modules)
- [Project Management Modules](#project-management-modules)
- [HR and Workforce Modules](#hr-and-workforce-modules)
- [Support and Service Modules](#support-and-service-modules)
- [Marketing Modules](#marketing-modules)
- [Automation and Workflow Modules](#automation-and-workflow-modules)
- [Documents and Knowledge Modules](#documents-and-knowledge-modules)
- [Analytics and Reporting Modules](#analytics-and-reporting-modules)
- [Administration and Security Modules](#administration-and-security-modules)
- [Integration Modules](#integration-modules)
- [AI Modules](#ai-modules)
- [Suggested Domain Structure](#suggested-domain-structure)
- [Frontend Structure](#frontend-structure)
- [Database Design Principles](#database-design-principles)
- [Development Roadmap](#development-roadmap)
- [Current Development Status](#current-development-status)
- [Local Development](#local-development)
- [Testing Strategy](#testing-strategy)
- [Future Improvements](#future-improvements)

---

# Project Vision

The application is designed as a unified business platform combining:

```text
CRM
+
Sales
+
ERP
+
Projects
+
Finance
+
Procurement
+
Inventory
+
HR
+
Support
+
Marketing
+
Automation
+
Analytics
```

Instead of creating isolated CRUD modules, the system should model complete business processes.

Example:

```text
Lead
  ↓
Qualification
  ↓
Client / Company
  ↓
Opportunity
  ↓
Quote
  ↓
Sales Order
  ↓
Project / Delivery
  ↓
Invoice
  ↓
Payment
  ↓
Customer Success / Support
```

For physical products:

```text
Supplier
  ↓
Purchase Request
  ↓
Purchase Order
  ↓
Goods Receipt
  ↓
Warehouse
  ↓
Inventory
  ↓
Sales Order
  ↓
Shipment
  ↓
Invoice
  ↓
Payment
```

---

# Goals

The main project goals are:

- Build a realistic CRM + ERP system from scratch.
- Use Laravel as the backend application framework.
- Use React + TypeScript with Inertia.js for the frontend.
- Keep business logic modular and maintainable.
- Model realistic business workflows instead of isolated CRUD screens.
- Use Eloquent relationships, enums, policies, events, jobs, services, DTOs, and actions.
- Support future multi-company and multi-user usage.
- Introduce role-based access control.
- Support automation and asynchronous background jobs.
- Create a strong portfolio project suitable for backend, full-stack, and software architecture interviews.
- Build the system incrementally so each module can be completed, tested, and committed separately.

---

# Technology Stack

## Backend

- PHP 8.4
- Laravel 13
- Laravel Eloquent ORM
- Laravel Validation
- Laravel Policies
- Laravel Events and Listeners
- Laravel Jobs and Queues
- Laravel Notifications
- Laravel Scheduler
- MySQL 8
- Redis

## Frontend

- React
- TypeScript
- Inertia.js
- Tailwind CSS
- Vite

## Infrastructure

- Docker
- Docker Compose
- Nginx
- PHP-FPM
- Node.js
- MySQL
- Redis

## Possible Future Infrastructure

- Laravel Horizon
- Laravel Telescope
- Laravel Pulse
- S3-compatible object storage
- Mailpit for local mail testing
- Elasticsearch / OpenSearch
- Meilisearch
- RabbitMQ
- GitHub Actions
- AWS / DigitalOcean / Hetzner
- Kubernetes

---

# High-Level Architecture

The project should evolve toward a modular architecture organized around business domains.

```text
app/
├── Domain/
│   ├── CRM/
│   ├── Sales/
│   ├── Finance/
│   ├── Procurement/
│   ├── Inventory/
│   ├── Projects/
│   ├── HR/
│   ├── Support/
│   ├── Marketing/
│   ├── Automation/
│   └── Shared/
│
├── Actions/
├── DTOs/
├── Enums/
├── Events/
├── Jobs/
├── Listeners/
├── Notifications/
├── Policies/
├── Services/
└── Http/
```

The initial implementation may remain closer to standard Laravel conventions while the project is small. Domain extraction should happen gradually when business logic becomes complex.

---

# Core Business Flows

## CRM Flow

```text
Lead
  ↓
Contact
  ↓
Qualification
  ↓
Opportunity
  ↓
Client
```

## B2B Flow

```text
Company
├── Contacts
├── Opportunities
├── Quotes
├── Orders
├── Projects
├── Invoices
├── Payments
└── Support Tickets
```

## Sales Flow

```text
Opportunity
  ↓
Quote
  ↓
Quote Approval
  ↓
Sales Order
  ↓
Invoice
  ↓
Payment
```

## Procurement Flow

```text
Purchase Request
  ↓
Approval
  ↓
Purchase Order
  ↓
Goods Receipt
  ↓
Supplier Invoice
  ↓
Supplier Payment
```

## Inventory Flow

```text
Product
  ↓
Warehouse Stock
  ↓
Reservation
  ↓
Picking
  ↓
Shipment
  ↓
Stock Movement
```

## Project Flow

```text
Client
  ↓
Project
  ↓
Milestones
  ↓
Tasks
  ↓
Time Entries
  ↓
Expenses
  ↓
Billing
```

---

# CRM Modules

## 1. Leads

Core lead management.

Possible features:

- Lead creation
- Lead profile
- Lead source
- Lead status
- Lead owner
- Lead score
- Lead priority
- Lead tags
- Lead custom fields
- Lead notes
- Lead activities
- Lead tasks
- Lead reminders
- Lead attachments
- Lead email history
- Lead call history
- Lead meetings
- Lead conversion
- Lead merge
- Duplicate detection
- Lead import
- Lead export
- Bulk actions
- Lead archive
- Lead soft delete
- Lead restoration

Suggested statuses:

```text
new
contacted
qualified
proposal
negotiation
won
lost
```

---

## 2. Contacts / Clients

Customer contact management.

Possible features:

- Client profile
- Contact information
- Multiple emails
- Multiple phone numbers
- Addresses
- Social profiles
- Birthday
- Job title
- Department
- Preferred language
- Timezone
- Notes
- Activities
- Tasks
- Files
- Tags
- Custom fields
- Contact relationships
- Company association
- Account manager
- Communication preferences
- Marketing consent
- Customer status
- Customer lifetime value

---

## 3. Companies / Accounts

B2B customer organization management.

Possible features:

- Company profile
- Legal name
- Trading name
- Registration number
- VAT number
- Website
- Industry
- Company size
- Revenue range
- Billing address
- Shipping address
- Contacts
- Account owner
- Parent company
- Subsidiaries
- Tags
- Notes
- Activities
- Opportunities
- Quotes
- Orders
- Projects
- Contracts
- Invoices
- Payments
- Support tickets
- Company custom fields

---

## 4. Opportunities / Deals

Sales opportunity pipeline.

Possible fields:

- Name
- Company
- Contact
- Owner
- Stage
- Probability
- Estimated value
- Currency
- Expected close date
- Source
- Loss reason
- Competitor
- Notes

Suggested stages:

```text
discovery
qualification
proposal
negotiation
contract
won
lost
```

Possible features:

- Kanban board
- Drag and drop
- Forecasting
- Weighted revenue
- Sales velocity
- Stage history
- Deal aging
- Probability rules

---

## 5. CRM Pipeline

Configurable pipeline system.

Features:

- Multiple pipelines
- Custom stages
- Stage ordering
- Stage colors
- Required fields per stage
- Stage automation
- Stage transition rules
- Lost reasons
- Won reasons
- Pipeline analytics

---

## 6. CRM Activities

Unified activity timeline.

Activity types:

- Lead created
- Status changed
- Note added
- Task created
- Task completed
- Email sent
- Email received
- Phone call
- Meeting
- Quote created
- Quote accepted
- Order created
- Invoice created
- Payment received
- Ticket created
- File uploaded

Future implementation can use polymorphic relations.

---

## 7. Notes

Reusable notes module.

Features:

- Notes for leads
- Notes for clients
- Notes for companies
- Notes for opportunities
- Notes for projects
- Pin important notes
- Markdown support
- Mentions
- Attachments
- Visibility
- Edit history

---

## 8. CRM Tasks and Follow-ups

Features:

- Task title
- Description
- Due date
- Priority
- Status
- Assignee
- Related entity
- Reminder
- Recurring task
- Checklist
- Comments
- Attachments
- Calendar integration

---

## 9. Tags

Universal tagging system.

Examples:

```text
VIP
Enterprise
Warm Lead
Partner
High Risk
Renewal
Priority
```

Features:

- Polymorphic tags
- Tag colors
- Tag groups
- Tag filtering
- Tag reporting

---

## 10. Custom Fields

Admin-defined fields.

Field types:

- Text
- Number
- Decimal
- Date
- DateTime
- Boolean
- Select
- Multi-select
- Email
- Phone
- URL
- Currency

Applicable to:

- Leads
- Clients
- Companies
- Deals
- Products
- Projects
- Orders

---

# Sales Modules

## 11. Product and Service Catalog

One of the first ERP/Sales modules.

Fields:

```text
SKU
Name
Type
Description
Price
Cost
Tax Rate
Unit
Currency
Active
```

Types:

```text
product
service
subscription
bundle
digital
```

Future features:

- Categories
- Product variants
- Units of measure
- Price lists
- Product images
- Product attachments
- Cost history
- Supplier links
- Inventory tracking
- Serial number tracking
- Batch tracking

---

## 12. Product Categories

Features:

- Nested categories
- Parent category
- Slug
- Description
- Status
- Sorting
- Category-specific attributes

---

## 13. Price Lists

Features:

- Standard price
- Wholesale price
- Partner price
- Customer-specific price
- Currency-specific price
- Quantity discounts
- Date-based pricing
- Promotional pricing

---

## 14. Quotes / Proposals

Fields:

- Quote number
- Client
- Company
- Opportunity
- Currency
- Issue date
- Expiry date
- Status
- Notes
- Terms
- Subtotal
- Discount
- Tax
- Total

Statuses:

```text
draft
sent
viewed
accepted
rejected
expired
cancelled
```

Features:

- Quote items
- Product selection
- Custom line items
- Discounts
- Taxes
- PDF export
- Email quote
- Customer acceptance
- Revision history
- Quote versioning
- Convert quote to order
- Convert quote to invoice

---

## 15. Quote Items

Fields:

- Product
- Description
- Quantity
- Unit
- Unit price
- Discount
- Tax rate
- Line subtotal
- Line tax
- Line total
- Position

---

## 16. Sales Orders

Fields:

- Order number
- Customer
- Company
- Quote
- Order date
- Status
- Currency
- Billing address
- Shipping address
- Payment terms
- Delivery terms
- Total

Statuses:

```text
draft
confirmed
processing
partially_fulfilled
fulfilled
cancelled
```

---

## 17. Sales Order Items

Features:

- Product
- Quantity
- Reserved quantity
- Shipped quantity
- Unit price
- Discounts
- Taxes
- Warehouse
- Fulfillment status

---

## 18. Contracts

Features:

- Contract number
- Customer
- Start date
- End date
- Renewal date
- Contract value
- Currency
- Status
- Terms
- Attachments
- Signatures
- Renewal reminders
- Version history

---

## 19. Subscriptions

Features:

- Customer
- Product/service
- Billing interval
- Quantity
- Price
- Start date
- Renewal date
- Status
- Trial period
- Cancellation
- Recurring invoices
- Subscription upgrades/downgrades

---

# ERP Modules

## 20. Invoices

Fields:

- Invoice number
- Client
- Company
- Sales order
- Currency
- Issue date
- Due date
- Payment terms
- Status
- Subtotal
- Discount
- Tax
- Total
- Amount paid
- Balance due

Statuses:

```text
draft
sent
partially_paid
paid
overdue
void
cancelled
```

Features:

- Invoice items
- PDF generation
- Email delivery
- Payment tracking
- Credit notes
- Recurring invoices
- Overdue reminders
- Multi-currency
- Tax calculation

---

## 21. Payments

Features:

- Payment number
- Invoice
- Customer
- Amount
- Currency
- Payment date
- Payment method
- Transaction reference
- Status
- Notes

Methods:

```text
bank_transfer
card
cash
paypal
stripe
other
```

---

## 22. Credit Notes

Features:

- Credit note number
- Original invoice
- Reason
- Items
- Tax adjustment
- Total
- Refund status

---

## 23. Expenses

Fields:

- Expense category
- Supplier
- Employee
- Project
- Amount
- Tax
- Currency
- Expense date
- Payment method
- Receipt
- Status
- Description

Features:

- Approval workflow
- Reimbursements
- Attachments
- Project allocation
- Cost center allocation

---

## 24. Budgets

Features:

- Department budget
- Project budget
- Annual budget
- Monthly budget
- Planned amount
- Actual amount
- Variance
- Forecast

---

## 25. Cost Centers

Features:

- Cost center hierarchy
- Department
- Responsible manager
- Expenses
- Budgets
- Reporting

---

# Finance and Accounting Modules

## 26. Chart of Accounts

Possible future advanced ERP module.

Account types:

- Assets
- Liabilities
- Equity
- Revenue
- Expenses

---

## 27. General Ledger

Features:

- Journal entries
- Debit
- Credit
- Account
- Posting date
- Reference
- Source document
- Period locking

---

## 28. Accounts Receivable

Features:

- Customer balances
- Open invoices
- Aging report
- Overdue invoices
- Payment allocation
- Credit limits

---

## 29. Accounts Payable

Features:

- Supplier balances
- Supplier invoices
- Payment schedules
- Aging report
- Supplier payments

---

## 30. Bank Accounts

Features:

- Bank account configuration
- Transactions
- Reconciliation
- Incoming payments
- Outgoing payments
- Bank statement import

---

## 31. Cash Flow

Features:

- Cash inflows
- Cash outflows
- Forecast
- Period analysis
- Projected balances

---

## 32. Tax Management

Features:

- Tax rates
- Tax groups
- VAT
- Reverse charge
- Country-specific tax rules
- Tax reports

---

## 33. Multi-Currency

Features:

- Base currency
- Supported currencies
- Exchange rates
- Rate history
- Currency conversion
- Gain/loss calculation

---

# Procurement Modules

## 34. Vendors / Suppliers

Features:

- Supplier profile
- Contact persons
- Address
- VAT number
- Payment terms
- Currency
- Products supplied
- Purchase history
- Supplier rating
- Attachments
- Notes

---

## 35. Purchase Requests

Features:

- Requester
- Department
- Requested items
- Quantity
- Required date
- Estimated cost
- Approval status

---

## 36. Purchase Orders

Fields:

- PO number
- Supplier
- Currency
- Order date
- Expected delivery date
- Status
- Items
- Tax
- Total

Statuses:

```text
draft
approved
sent
partially_received
received
cancelled
```

---

## 37. Purchase Order Items

Features:

- Product
- Description
- Quantity
- Unit
- Cost
- Tax
- Received quantity
- Remaining quantity

---

## 38. Goods Receipts

Features:

- Purchase order
- Warehouse
- Received items
- Quantities
- Batch numbers
- Serial numbers
- Damaged quantity
- Receipt date

---

## 39. Supplier Invoices

Features:

- Supplier
- Purchase order
- Invoice number
- Issue date
- Due date
- Amount
- Tax
- Approval
- Payment status

---

## 40. Supplier Payments

Features:

- Supplier
- Invoice
- Bank account
- Amount
- Payment date
- Reference

---

# Inventory and Warehouse Modules

## 41. Warehouses

Features:

- Warehouse name
- Code
- Address
- Manager
- Active status
- Storage locations

---

## 42. Warehouse Locations / Bins

Structure:

```text
Warehouse
└── Zone
    └── Rack
        └── Shelf
            └── Bin
```

---

## 43. Inventory

Features:

- Product stock
- Available quantity
- Reserved quantity
- Incoming quantity
- Reorder level
- Safety stock
- Warehouse stock

---

## 44. Stock Movements

Movement types:

```text
purchase_receipt
sale
transfer
adjustment
return
production
write_off
reservation
release
```

Fields:

- Product
- Warehouse
- Quantity
- Direction
- Source
- Destination
- Reference entity
- Date
- User

---

## 45. Inventory Transfers

Features:

- Source warehouse
- Destination warehouse
- Products
- Quantities
- Transfer status
- Shipment
- Receipt confirmation

---

## 46. Inventory Adjustments

Features:

- Physical count
- Expected quantity
- Actual quantity
- Difference
- Reason
- Approval

---

## 47. Stock Reservations

Features:

- Sales order
- Product
- Warehouse
- Reserved quantity
- Expiration

---

## 48. Serial Numbers

Useful for electronics and equipment.

Features:

- Serial number
- Product
- Warehouse
- Status
- Customer
- Warranty
- History

---

## 49. Batch / Lot Tracking

Features:

- Lot number
- Manufacturing date
- Expiration date
- Quantity
- Warehouse
- Supplier
- Traceability

---

## 50. Returns / RMA

Features:

- Customer return
- Supplier return
- Reason
- Product condition
- Refund
- Replacement
- Stock disposition

---

# Project Management Modules

## 51. Projects

Fields:

- Name
- Client
- Company
- Owner
- Status
- Start date
- Deadline
- Budget
- Description

Statuses:

```text
planned
active
on_hold
completed
cancelled
```

---

## 52. Project Milestones

Features:

- Project
- Name
- Due date
- Status
- Progress
- Dependencies

---

## 53. Project Tasks

Features:

- Title
- Description
- Assignee
- Priority
- Status
- Due date
- Estimated hours
- Actual hours
- Parent task
- Dependencies
- Checklist
- Comments

---

## 54. Kanban Boards

Features:

- Columns
- Drag and drop
- WIP limits
- Filters
- Swimlanes
- Task cards

---

## 55. Time Tracking

Features:

- User
- Project
- Task
- Start time
- End time
- Duration
- Billable
- Hourly rate
- Approval

---

## 56. Project Expenses

Features:

- Project
- Expense
- User
- Cost
- Billable amount
- Client billing

---

## 57. Resource Planning

Features:

- Employees
- Workload
- Availability
- Project allocation
- Capacity planning
- Utilization

---

# HR and Workforce Modules

## 58. Employees

Features:

- Employee profile
- Department
- Position
- Manager
- Start date
- Employment status
- Contact details
- Documents
- Emergency contacts

---

## 59. Departments

Features:

- Department hierarchy
- Manager
- Employees
- Cost center
- Budget

---

## 60. Positions / Job Roles

Features:

- Job title
- Department
- Description
- Salary range
- Skills

---

## 61. Attendance

Features:

- Clock in
- Clock out
- Work schedule
- Overtime
- Attendance reports

---

## 62. Leave Management

Leave types:

- Vacation
- Sick leave
- Personal leave
- Unpaid leave

Features:

- Leave requests
- Approval workflow
- Balance
- Calendar

---

## 63. Timesheets

Features:

- Employee
- Week/month
- Time entries
- Approval
- Billable time
- Export

---

## 64. Payroll Integration

Possible future module:

- Salary
- Bonuses
- Deductions
- Payroll periods
- Payroll export

---

## 65. Recruitment / ATS

Features:

- Vacancies
- Candidates
- Applications
- Interview stages
- Interview notes
- Offers
- Hiring pipeline

---

## 66. Employee Performance

Features:

- Goals
- Reviews
- Feedback
- KPIs
- Development plans

---

# Support and Service Modules

## 67. Support Tickets

Fields:

- Ticket number
- Customer
- Contact
- Subject
- Description
- Priority
- Status
- Assignee
- Category
- SLA

Statuses:

```text
new
open
pending
resolved
closed
```

---

## 68. Ticket Comments

Features:

- Internal comments
- Customer replies
- Attachments
- Mentions

---

## 69. SLA Management

Features:

- Response deadline
- Resolution deadline
- Priority rules
- SLA breach alerts
- SLA reporting

---

## 70. Knowledge Base

Features:

- Articles
- Categories
- Search
- Internal/public visibility
- Revision history

---

## 71. Customer Portal

Features:

- Customer login
- Quotes
- Orders
- Invoices
- Payments
- Projects
- Tickets
- Documents

---

# Marketing Modules

## 72. Marketing Campaigns

Features:

- Campaign
- Channel
- Budget
- Start/end date
- Leads generated
- Opportunities
- Revenue
- ROI

---

## 73. Email Campaigns

Features:

- Lists
- Segments
- Templates
- Scheduling
- Open tracking
- Click tracking
- Unsubscribe

---

## 74. Segments

Examples:

- VIP customers
- Inactive customers
- New leads
- High-value opportunities
- Customers with overdue invoices

---

## 75. Lead Sources

Examples:

- Website
- Referral
- LinkedIn
- Google Ads
- Conference
- Cold outreach
- Partner

Analytics:

- Leads per source
- Conversion rate
- Revenue per source

---

## 76. Forms

Features:

- Lead forms
- Contact forms
- Public form builder
- Form submissions
- Auto-create lead
- Spam protection

---

# Automation and Workflow Modules

## 77. Workflow Automation

Concept:

```text
Trigger
  ↓
Conditions
  ↓
Actions
```

Example:

```text
When opportunity becomes WON
    → create project
    → create invoice
    → assign onboarding task
    → send notification
```

Possible triggers:

- Lead created
- Lead status changed
- Opportunity won
- Quote accepted
- Invoice overdue
- Payment received
- Task completed
- Ticket created

Possible actions:

- Create task
- Send email
- Send notification
- Change status
- Assign owner
- Create project
- Create invoice
- Call webhook

---

## 78. Approval Workflows

Useful for:

- Discounts
- Quotes
- Expenses
- Purchase orders
- Leave requests
- Supplier invoices

---

## 79. Notifications

Channels:

- In-app
- Email
- Slack
- SMS
- Webhook

Features:

- User preferences
- Notification center
- Read/unread
- Notification templates

---

## 80. Reminders

Features:

- Entity reminders
- Task reminders
- Invoice reminders
- Contract renewal reminders
- Follow-up reminders

---

## 81. Scheduled Jobs

Examples:

- Daily overdue invoice check
- Quote expiration
- Subscription renewals
- Exchange rate update
- Automated reports
- Data cleanup

---

# Documents and Knowledge Modules

## 82. File Attachments

Polymorphic attachments for:

- Leads
- Clients
- Companies
- Projects
- Quotes
- Orders
- Invoices
- Tickets

Features:

- Upload
- Download
- Preview
- File size
- MIME type
- User ownership

---

## 83. Document Management

Features:

- Folders
- Permissions
- Version history
- Search
- Metadata
- Document categories

---

## 84. Templates

Templates for:

- Emails
- Quotes
- Invoices
- Contracts
- Notifications
- Documents

---

## 85. E-Signatures

Future integration:

- Contracts
- Quotes
- Approvals
- Signature status
- Audit log

---

# Analytics and Reporting Modules

## 86. Dashboard

Possible widgets:

- Leads this month
- Conversion rate
- Open opportunities
- Pipeline value
- Revenue
- Overdue invoices
- Payments received
- Expenses
- Profit
- Tasks due
- Support tickets
- Inventory alerts

---

## 87. CRM Reports

Examples:

- Lead conversion
- Lead source performance
- Sales pipeline
- Deal win rate
- Lost reasons
- Sales rep performance
- Customer acquisition

---

## 88. Sales Reports

Examples:

- Revenue by period
- Revenue by product
- Revenue by customer
- Average order value
- Quote conversion
- Sales forecast

---

## 89. Finance Reports

Examples:

- Profit and loss
- Cash flow
- Accounts receivable aging
- Accounts payable aging
- Tax report
- Expense report
- Revenue vs expenses

---

## 90. Inventory Reports

Examples:

- Stock levels
- Stock valuation
- Low stock
- Dead stock
- Inventory turnover
- Warehouse movement
- Batch expiration

---

## 91. Project Reports

Examples:

- Project profitability
- Budget vs actual
- Time utilization
- Milestone performance
- Billable hours

---

## 92. Custom Reports

Future report builder:

- Select entity
- Select fields
- Filters
- Grouping
- Aggregation
- Charts
- Export CSV/XLSX/PDF

---

# Administration and Security Modules

## 93. Users

Features:

- User profile
- Status
- Avatar
- Email
- Password
- Last login
- Timezone
- Language

---

## 94. Roles and Permissions

Possible implementation using Laravel Policies and/or Spatie Laravel Permission.

Example roles:

```text
Super Admin
Admin
Sales Manager
Sales Representative
Account Manager
Project Manager
Finance Manager
Warehouse Manager
Support Agent
Employee
```

Permission examples:

```text
leads.view
leads.create
leads.update
leads.delete

invoices.view
invoices.create
invoices.approve

purchase_orders.approve
```

---

## 95. Teams

Features:

- Team
- Members
- Manager
- Shared records
- Team pipeline
- Team reports

---

## 96. Multi-Tenancy / Workspaces

Future SaaS architecture:

```text
Workspace
├── Users
├── Leads
├── Clients
├── Companies
├── Products
├── Orders
└── Invoices
```

Features:

- Organization/workspace
- Membership
- Invitations
- Workspace switching
- Tenant isolation
- Subscription plan

---

## 97. Audit Log

Track:

- User
- Action
- Entity
- Old values
- New values
- IP
- Timestamp

Examples:

```text
Lead updated
Invoice deleted
Payment created
Permission changed
```

---

## 98. Login / Security History

Features:

- Login history
- Failed login attempts
- Device sessions
- Session revocation
- Password reset history

---

## 99. Two-Factor Authentication

Possible future security enhancement.

---

## 100. Application Settings

Possible settings:

- Company profile
- Logo
- Default currency
- Timezone
- Locale
- Date format
- Invoice numbering
- Quote numbering
- Tax defaults
- Email configuration

---

# Integration Modules

## 101. Email Integration

Possible providers:

- Gmail
- Microsoft Outlook
- SMTP

Features:

- Send email
- Receive email
- Email timeline
- Attach email to CRM entity

---

## 102. Calendar Integration

Possible providers:

- Google Calendar
- Microsoft Calendar

Features:

- Meetings
- Events
- Task deadlines
- Two-way synchronization

---

## 103. Payment Gateway Integration

Possible providers:

- Stripe
- PayPal

Features:

- Online invoice payment
- Payment status
- Refunds
- Webhooks

---

## 104. Accounting Integrations

Possible future integrations:

- QuickBooks
- Xero
- Pohoda
- Money S3

---

## 105. Communication Integrations

Possible integrations:

- Slack
- Microsoft Teams
- Telegram
- Twilio

---

## 106. Webhooks

Features:

- Outgoing webhooks
- Event subscriptions
- Retry policy
- Delivery logs
- Secret signing

---

## 107. Public REST API

Possible resources:

```text
/api/v1/leads
/api/v1/clients
/api/v1/companies
/api/v1/products
/api/v1/orders
/api/v1/invoices
```

Features:

- API tokens
- Rate limiting
- Permissions
- Pagination
- Versioning
- OpenAPI / Swagger

---

## 108. Import / Export

Formats:

- CSV
- XLSX
- JSON

Entities:

- Leads
- Contacts
- Companies
- Products
- Orders
- Invoices
- Inventory

---

# AI Modules

AI features should be added only after core business workflows are stable.

## 109. AI CRM Assistant

Possible features:

- Ask questions about CRM data
- Summarize customer history
- Summarize lead timeline
- Generate follow-up suggestions
- Generate email drafts

---

## 110. Lead Scoring

AI-assisted lead prioritization based on:

- Source
- Company
- Activity
- Engagement
- Historical conversion patterns

---

## 111. Sales Forecasting

Possible features:

- Revenue prediction
- Opportunity probability
- Expected close dates
- Pipeline risk detection

---

## 112. Email Classification

Possible classes:

- Sales inquiry
- Support
- Complaint
- Invoice
- Payment
- Spam

---

## 113. Document Extraction

Extract structured data from:

- Supplier invoices
- Receipts
- Purchase orders
- Contracts

---

## 114. AI Search

Natural-language search examples:

```text
Show me all overdue invoices from German clients.

Find leads contacted in the last 30 days with no follow-up task.

Which customers generated the most profit this year?
```

---

## 115. AI Automation Suggestions

Examples:

- Detect stale leads
- Suggest next sales action
- Detect overdue projects
- Detect unusual expenses
- Detect low inventory risk

---

# Suggested Domain Structure

Long-term target:

```text
app/
└── Domain/
    ├── CRM/
    │   ├── Lead/
    │   ├── Contact/
    │   ├── Client/
    │   ├── Company/
    │   ├── Opportunity/
    │   └── Pipeline/
    │
    ├── Sales/
    │   ├── Product/
    │   ├── PriceList/
    │   ├── Quote/
    │   ├── SalesOrder/
    │   ├── Contract/
    │   └── Subscription/
    │
    ├── Finance/
    │   ├── Invoice/
    │   ├── Payment/
    │   ├── Expense/
    │   ├── Tax/
    │   └── Accounting/
    │
    ├── Procurement/
    │   ├── Vendor/
    │   ├── PurchaseRequest/
    │   ├── PurchaseOrder/
    │   └── GoodsReceipt/
    │
    ├── Inventory/
    │   ├── Warehouse/
    │   ├── Stock/
    │   ├── StockMovement/
    │   └── InventoryTransfer/
    │
    ├── Projects/
    │   ├── Project/
    │   ├── Milestone/
    │   ├── ProjectTask/
    │   └── TimeEntry/
    │
    ├── HR/
    │   ├── Employee/
    │   ├── Department/
    │   ├── Leave/
    │   └── Timesheet/
    │
    ├── Support/
    │   ├── Ticket/
    │   └── SLA/
    │
    ├── Automation/
    │   ├── Workflow/
    │   └── Approval/
    │
    └── Shared/
        ├── Activity/
        ├── Attachment/
        ├── Tag/
        ├── Address/
        └── Money/
```

Do not move everything into this structure immediately. Refactor toward it gradually as modules gain real business logic.

---

# Frontend Structure

Suggested long-term structure:

```text
resources/js/
├── Components/
│   ├── UI/
│   ├── Forms/
│   ├── Tables/
│   ├── Modals/
│   └── Charts/
│
├── Features/
│   ├── Leads/
│   ├── Clients/
│   ├── Companies/
│   ├── Products/
│   ├── Quotes/
│   ├── Invoices/
│   └── Inventory/
│
├── Layouts/
│   └── CRMLayout.tsx
│
├── Pages/
│   ├── Dashboard/
│   ├── Leads/
│   ├── Clients/
│   ├── Companies/
│   ├── Products/
│   ├── Quotes/
│   ├── Orders/
│   ├── Invoices/
│   ├── Payments/
│   ├── Vendors/
│   ├── PurchaseOrders/
│   ├── Warehouses/
│   ├── Inventory/
│   ├── Projects/
│   ├── Reports/
│   └── Settings/
│
├── types/
├── hooks/
├── utils/
└── app.tsx
```

---

# Database Design Principles

The project should follow these principles:

- Use foreign keys wherever practical.
- Use soft deletes for important business records.
- Avoid deleting financial history.
- Store monetary values with decimal types, never float.
- Store currency explicitly where multi-currency may be needed.
- Use enums for stable domain states.
- Keep status history when status transitions matter.
- Prefer auditability over destructive deletion.
- Use polymorphic relationships for reusable features where appropriate.
- Use indexes for frequently searched fields.
- Add unique constraints for business identifiers.
- Use transaction boundaries for multi-step business operations.

Examples of business identifiers:

```text
LEAD-2026-000001
Q-2026-000001
SO-2026-000001
INV-2026-000001
PO-2026-000001
TKT-2026-000001
```

---

# Development Roadmap

The project should be developed in phases.

## Phase 0 — Foundation

- [x] Laravel application
- [x] React
- [x] TypeScript
- [x] Inertia.js
- [x] Tailwind CSS
- [x] Docker
- [x] Nginx
- [x] MySQL
- [x] Redis
- [x] Authentication
- [ ] Git repository
- [ ] CI pipeline
- [ ] Testing foundation

---

## Phase 1 — CRM Core

- [x] Leads
- [x] Lead profile
- [x] Lead notes
- [x] Lead activities
- [x] Lead tasks
- [x] Lead status pipeline
- [x] Lead-to-client conversion
- [x] Clients
- [ ] Companies
- [ ] Contact-company relations
- [ ] Lead ownership
- [ ] Tags
- [ ] Custom fields
- [ ] Search
- [ ] Filters
- [ ] Pagination
- [ ] Bulk actions

Goal:

```text
Lead → Client → Company
```

---

## Phase 2 — Sales Foundation

- [ ] Products and Services
- [ ] Product categories
- [ ] Units
- [ ] Tax rates
- [ ] Price lists
- [ ] Opportunities
- [ ] Pipelines
- [ ] Quotes
- [ ] Quote items
- [ ] Quote PDF
- [ ] Quote acceptance

Goal:

```text
Opportunity → Quote
```

---

## Phase 3 — Sales Orders and Billing

- [ ] Sales orders
- [ ] Sales order items
- [ ] Order statuses
- [ ] Invoices
- [ ] Invoice items
- [ ] Payments
- [ ] Credit notes
- [ ] Payment reminders
- [ ] Invoice PDF

Goal:

```text
Quote → Order → Invoice → Payment
```

---

## Phase 4 — Project Management

- [ ] Projects
- [ ] Project milestones
- [ ] Project tasks
- [ ] Project comments
- [ ] Time tracking
- [ ] Project expenses
- [ ] Project billing
- [ ] Project profitability

Goal:

```text
Client → Project → Work → Billing
```

---

## Phase 5 — Procurement

- [ ] Vendors
- [ ] Vendor contacts
- [ ] Purchase requests
- [ ] Purchase approvals
- [ ] Purchase orders
- [ ] Purchase order items
- [ ] Goods receipts
- [ ] Supplier invoices
- [ ] Supplier payments

Goal:

```text
Request → Purchase Order → Receipt → Supplier Invoice
```

---

## Phase 6 — Inventory

- [ ] Warehouses
- [ ] Warehouse locations
- [ ] Stock
- [ ] Stock movements
- [ ] Reservations
- [ ] Transfers
- [ ] Adjustments
- [ ] Reorder levels
- [ ] Serial numbers
- [ ] Batch tracking
- [ ] Returns

Goal:

```text
Purchase → Inventory → Sale → Shipment
```

---

## Phase 7 — Finance

- [ ] Expenses
- [ ] Expense categories
- [ ] Budgets
- [ ] Cost centers
- [ ] Accounts receivable
- [ ] Accounts payable
- [ ] Bank accounts
- [ ] Reconciliation
- [ ] Cash flow
- [ ] Tax reporting
- [ ] Multi-currency

---

## Phase 8 — HR

- [ ] Employees
- [ ] Departments
- [ ] Roles
- [ ] Attendance
- [ ] Leave
- [ ] Timesheets
- [ ] Performance reviews
- [ ] Recruitment

---

## Phase 9 — Support

- [ ] Tickets
- [ ] Ticket comments
- [ ] SLA
- [ ] Knowledge base
- [ ] Customer portal

---

## Phase 10 — Marketing

- [ ] Campaigns
- [ ] Lead sources
- [ ] Email campaigns
- [ ] Segments
- [ ] Forms
- [ ] Campaign analytics

---

## Phase 11 — Automation

- [ ] Workflow engine
- [ ] Triggers
- [ ] Conditions
- [ ] Actions
- [ ] Approval workflows
- [ ] Notifications
- [ ] Scheduled jobs
- [ ] Webhooks

---

## Phase 12 — Security and SaaS

- [ ] Roles
- [ ] Permissions
- [ ] Teams
- [ ] Audit logs
- [ ] Two-factor authentication
- [ ] Workspaces
- [ ] Multi-tenancy
- [ ] Invitations
- [ ] Subscription plans
- [ ] Feature limits

---

## Phase 13 — Analytics

- [ ] Dashboard
- [ ] CRM reports
- [ ] Sales reports
- [ ] Finance reports
- [ ] Inventory reports
- [ ] Project reports
- [ ] Custom report builder
- [ ] CSV export
- [ ] XLSX export
- [ ] PDF export

---

## Phase 14 — Integrations

- [ ] Gmail
- [ ] Outlook
- [ ] Google Calendar
- [ ] Stripe
- [ ] PayPal
- [ ] Slack
- [ ] Microsoft Teams
- [ ] Accounting integrations
- [ ] REST API
- [ ] Webhooks

---

## Phase 15 — AI

- [ ] AI CRM assistant
- [ ] Customer summary
- [ ] Lead scoring
- [ ] Follow-up suggestions
- [ ] Sales forecasting
- [ ] Email classification
- [ ] Document extraction
- [ ] Natural-language CRM search
- [ ] Anomaly detection
- [ ] Workflow suggestions

---

# Recommended Immediate Development Order

The next practical implementation sequence is:

```text
Companies
    ↓
Products / Services
    ↓
Opportunities
    ↓
Quotes
    ↓
Quote Items
    ↓
Sales Orders
    ↓
Invoices
    ↓
Payments
    ↓
Projects
    ↓
Vendors
    ↓
Purchase Orders
    ↓
Warehouses
    ↓
Inventory
```

This order gives the application a complete business flow early instead of creating many disconnected modules.

---

# Current Development Status

Current implemented or partially implemented functionality:

- Authentication
- CRM layout
- Dashboard
- Leads list
- Lead profile
- Lead notes
- Lead activity timeline
- Lead tasks
- Lead status pipeline
- Lead-to-client conversion
- Clients

Current planned next modules:

- Companies
- Product and Service Catalog
- Opportunities
- Quotes
- Invoices
- Payments

---

# Local Development

## Clone

```bash
git clone git@github.com:alfared/laravel-crm-erp.git
cd laravel-crm-erp
```

## Environment

```bash
cp .env.example .env
```

Recommended Docker database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=crm_db
DB_PORT=3306
DB_DATABASE=crm
DB_USERNAME=root
DB_PASSWORD=root
```

## Start Docker

```bash
docker compose up -d
```

## Install PHP dependencies

```bash
docker exec -it crm_app composer install
```

## Generate application key

```bash
docker exec -it crm_app php artisan key:generate
```

## Run migrations

```bash
docker exec -it crm_app php artisan migrate --seed
```

## Install frontend dependencies

```bash
docker exec -it crm_node npm install
```

## Start Vite

```bash
docker exec -it crm_node npm run dev
```

Application:

```text
http://crm.local:8080
```

---

# Development User

For local development only:

```text
Email: admin@crm.local
Password: password
```

Do not use default development credentials in production.

---

# Useful Development Commands

Clear Laravel caches:

```bash
docker exec -it crm_app php artisan optimize:clear
```

Fresh database:

```bash
docker exec -it crm_app php artisan migrate:fresh --seed
```

Route list:

```bash
docker exec -it crm_app php artisan route:list
```

Run tests:

```bash
docker exec -it crm_app php artisan test
```

Build frontend:

```bash
docker exec -it crm_node npm run build
```

---

# Testing Strategy

The project should gradually include:

## Backend

- Unit tests
- Feature tests
- Validation tests
- Policy tests
- Workflow tests
- Database tests
- API tests

Priority workflows to test:

```text
Lead → Client
Quote → Sales Order
Invoice → Payment
Purchase Order → Goods Receipt
Stock movement
```

## Frontend

Possible future setup:

- Vitest
- React Testing Library
- Playwright

---

# CI/CD Plan

Suggested GitHub Actions pipeline:

```text
Push / Pull Request
        ↓
PHP dependencies
        ↓
PHP lint / static analysis
        ↓
Laravel tests
        ↓
Node dependencies
        ↓
TypeScript check
        ↓
Frontend build
        ↓
Optional Docker build
```

Possible tools:

- PHPUnit / Pest
- PHPStan / Larastan
- Laravel Pint
- ESLint
- Prettier
- TypeScript compiler
- Vitest
- Playwright

---

# Future Improvements

Possible advanced improvements:

- Multi-tenancy
- Event-driven architecture
- Domain events
- CQRS for complex reporting
- Search indexing
- Elasticsearch / Meilisearch
- Redis caching
- Background workers
- Queue monitoring
- WebSockets
- Real-time notifications
- Full audit history
- API versioning
- OAuth
- SSO
- Mobile application
- Customer portal
- Vendor portal
- AI assistant
- Business intelligence dashboards
- Plugin architecture
- Localization
- Multi-company support
- Multi-currency accounting
- International tax rules

---

# Project Philosophy

The project should be developed incrementally.

Each module should ideally follow this development cycle:

```text
Domain model
    ↓
Migration
    ↓
Eloquent model
    ↓
Enums / Value Objects
    ↓
Validation
    ↓
Service / Action
    ↓
Controller
    ↓
Policy
    ↓
Routes
    ↓
React + TypeScript UI
    ↓
Tests
    ↓
Git commit
```

The goal is not simply to create a large number of tables and CRUD pages.

The goal is to build complete, realistic, connected business workflows.

---

# Long-Term Target

The final platform should be capable of supporting the majority of day-to-day operations of a small or medium-sized company.

```text
                    CRM
                     │
                     ▼
                  SALES
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
       PROJECTS               ORDERS
          │                     │
          ▼                     ▼
     TIME / COSTS            INVENTORY
          │                     │
          └──────────┬──────────┘
                     ▼
                   FINANCE
                     │
             ┌───────┴───────┐
             ▼               ▼
          INVOICES         EXPENSES
             │               │
             └───────┬───────┘
                     ▼
                 REPORTING
```

This roadmap is intentionally broad. Not every module needs to be implemented immediately. The project should prioritize complete end-to-end workflows and strong architecture over raw feature count.

---

# Author

Vitaliy Holovka

GitHub: https://github.com/alfared
