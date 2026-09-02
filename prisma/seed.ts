import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Admin User
  const adminEmail = "kyawzinw469@gmail.com";
  const rawPassword = "k29z8w2002";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Default Site Settings
  const defaultSettings = [
    { key: "github_url", value: "https://github.com/kyawzinwin" },
    { key: "linkedin_url", value: "https://linkedin.com/in/kyawzinwin" },
    { key: "contact_email", value: "contact@kyawzinwin.dev" },
    { key: "site_title", value: "Kyaw Zin Win — Backend Engineer | KZW OS" },
    { key: "site_tagline", value: "Backend engineer · System thinker · Myanmar" },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log(`✅ Seeded ${defaultSettings.length} site settings`);

  // 3. Seed Initial Blog Posts / System Notes
  const initialPosts = [
    {
      title: "Designing role-permission systems in Laravel",
      slug: "designing-role-permission-systems-in-laravel",
      excerpt:
        "How I moved from a simple boolean is_admin to a full 23-permission matrix without breaking anything in production. The real challenge wasn't the permissions — it was making it extensible...",
      content: `## The Problem with is_admin

Every developer starts here:

\`\`\`php
if ($user->is_admin) {
    // allow access
}
\`\`\`

It works on Day 1. But by Day 90, you need:
- **Finance admins** who can only view invoices
- **Support staff** who can reset passwords but cannot delete accounts
- **Auditors** with read-only privileges across all tables

### Moving to a Permission Matrix

Instead of assigning roles directly to routes, we attach permissions to capabilities:

\`\`\`php
// Laravel Gate definition
Gate::define('posts.publish', function (User $user) {
    return $user->hasPermission('posts.publish');
});
\`\`\`

### Schema Design

1. \`roles\` table (\`id\`, \`name\`, \`slug\`)
2. \`permissions\` table (\`id\`, \`name\`, \`slug\`, \`module\`)
3. \`permission_role\` pivot table
4. \`role_user\` pivot table

### Key Takeaway

Cache user permissions in Redis tagged with their user ID. Invalidate on role update. Never run query joins inside route middleware.`,
      tags: JSON.stringify(["auth", "laravel", "architecture"]),
      isPublished: true,
      readingTime: "8 min read",
      publishedAt: new Date("2025-01-10T09:32:00Z"),
    },
    {
      title: "Thinking beyond CRUD",
      slug: "thinking-beyond-crud",
      excerpt:
        "Most tutorials teach you to build CRUD apps. No one tells you that real systems are about state transitions, not rows. Here's how I started thinking about data differently...",
      content: `## Tables are not forms, and rows are not entities

In beginner tutorials, every database model maps 1:1 to an HTML form:
- \`users\` table -> User profile form
- \`orders\` table -> Order checkout form

### The State Machine Mindset

Real production systems don't just "update" rows. They transition between states:

\`\`\`
[PENDING] ---> [PAID] ---> [PROCESSING] ---> [SHIPPED] ---> [DELIVERED]
      |            |
      v            v
  [CANCELLED]  [REFUNDED]
\`\`\`

When an order is marked as paid, 4 distinct actions occur:
1. Lock inventory decrement
2. Dispatch payment receipt email
3. Trigger warehouse webhook
4. Log audit trail timestamp

### Event-Driven Architecture in Backend

Instead of bundling all logic inside the controller, dispatch state events:

\`\`\`php
event(new OrderPaid($order));
\`\`\`

Controllers remain thin, and event listeners handle isolated side effects independently.`,
      tags: JSON.stringify(["database", "design", "thinking"]),
      isPublished: true,
      readingTime: "6 min read",
      publishedAt: new Date("2024-12-28T14:12:00Z"),
    },
    {
      title: "Mistakes I made as a junior backend developer",
      slug: "mistakes-i-made-as-a-junior-backend-developer",
      excerpt:
        "Fat controllers. No service layer. is_admin = 1. Hardcoded values everywhere. Here's everything I got wrong in my first year and what I replaced each one with...",
      content: `## 1. Fat Controllers

Writing 400-line controller methods combining validation, DB queries, third-party API calls, and email dispatching in a single block.

**Solution:** Adopt Single Responsibility Principles with Actions or Service Classes.

## 2. Ignoring Database Indexes

Running queries without checking \`EXPLAIN\`. As the dataset grew to 50k rows, queries jumped from 2ms to 650ms.

**Solution:** Always index foreign keys and columns frequently queried in \`WHERE\` or \`ORDER BY\` clauses.

## 3. Synchronous Third-Party Calls

Sending transactional emails directly inside user web requests. If the SMTP provider stalled for 5 seconds, the user waited 5 seconds.

**Solution:** Push all non-blocking I/O to background queues (Redis / SQS).`,
      tags: JSON.stringify(["junior", "mistakes", "lessons"]),
      isPublished: true,
      readingTime: "5 min read",
      publishedAt: new Date("2024-11-15T08:00:00Z"),
    },
    {
      title: "Building scalable admin systems",
      slug: "building-scalable-admin-systems",
      excerpt:
        "What makes an admin dashboard still readable at 10,000 users? What breaks first? Here's how I approached the Jaraye platform dashboard architecture for long-term maintainability...",
      content: `## Admin Dashboards at Scale

When building administrative dashboards, developer ergonomics and query performance become paramount.

### What breaks first:
1. **Unpaginated count aggregations**: \`COUNT(*)\` on million-row tables halts database IO.
2. **N+1 query loading**: Loading user profiles without eager loading related metadata.
3. **Unfiltered audit logs**: Rendering unbounded historical logs in memory.

### The Solution:
- Use keyset or cursor-based pagination for high-volume logs.
- Cache global metric counters with incremental counters.
- Strictly separate read-only reporting replicas from primary transaction databases.`,
      tags: JSON.stringify(["admin", "scalable", "systems"]),
      isPublished: true,
      readingTime: "7 min read",
      publishedAt: new Date("2024-10-02T08:00:00Z"),
    },
  ];

  for (const post of initialPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ Seeded ${initialPosts.length} posts`);

  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
