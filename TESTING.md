# Testing Guide

Run the client and server, seed the database, then execute these tests. API tests can be completed in Postman using the endpoint table in `README.md`.

| ID | Test | Steps | Expected Result |
|---|---|---|---|
| T01 | Contact required fields | Submit an empty contact form | Browser blocks required fields |
| T02 | Invalid email/phone | Submit invalid values in Postman | API returns `422` with safe validation message |
| T03 | Successful inquiry | Complete and submit valid contact form | Success toast shows a unique `AIS-...` reference; MongoDB stores inquiry |
| T04 | Admin login success | Use seeded credentials | Admin dashboard loads and JWT is stored |
| T05 | Admin login failure | Use incorrect password repeatedly | Generic error shown; rate limit applies after 10 attempts |
| T06 | Protected route | Call `/api/admin/dashboard` without token | API returns `401` |
| T07 | Status update | Change inquiry to In Progress | Status persists and KPI updates |
| T08 | Search/filter | Search by reference/name and select status | Matching inquiries shown; empty state shown for no matches |
| T09 | Notes | Add notes and leave the notes field | Notes persist in MongoDB |
| T10 | Delete confirmation | Delete an inquiry | Confirmation appears; confirmed item is removed |
| T11 | Responsive layout | Test at 375px, 768px, and 1440px | Navigation, cards, forms, tables, and admin remain usable |
| T12 | Browser compatibility | Test current Chrome, Edge, and Firefox | Core workflows and layout work consistently |
| T13 | Security headers | Inspect API response headers | Helmet security headers present |
| T14 | XSS basic sanitisation | Submit `<script>` in text fields | Angle brackets stripped before storage |

## Demonstration Flow

1. Show the responsive public pages and portfolio.
2. Submit a customer requirement through Contact Us and retain the reference.
3. Sign in as admin and show the inquiry in Recent Inquiries.
4. Search for the reference, open the inquiry, add notes, and change its status.
5. Return to the dashboard to show updated analytics.
