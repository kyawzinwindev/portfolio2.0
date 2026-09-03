import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ChromeHeader from "@/components/ChromeHeader";
import StatusBar from "@/components/StatusBar";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

const fallbackNotes = [
  {
    slug: "designing-role-permission-systems-in-laravel",
    title: "Designing role-permission systems in Laravel",
    timestamp: "2025-01-10T09:32Z",
    readTime: "8 min read",
    tags: ["auth", "laravel", "architecture"],
    excerpt:
      "How I moved from a simple boolean `is_admin` to a full 23-permission matrix without breaking anything in production. The real challenge wasn't the permissions — it was making it extensible...",
    content: `# Designing role-permission systems in Laravel

Moving from a simple boolean \`is_admin\` flag to a robust, scalable role-permission matrix is a defining milestone in any application's architecture.

### The Problem with Boolean Flags
In the early days of an application, it's tempting to add an \`is_admin\` column on the users table. But systems grow:
- Editorial staff need to publish posts without viewing billing information.
- Support teams need to read user profiles without mutating sensitive tokens.
- Auditing teams need access to traffic logs and compliance reports.

### Designing the Relational Matrix
Instead of storing permissions as arrays or JSON blobs that can't be easily queried with foreign keys, a clean relational model consists of:
- \`users\`
- \`roles\`
- \`permissions\`
- \`role_user\` pivot
- \`permission_role\` pivot

### Extensibility & Production Safety
The key to avoiding database bottlenecks is eager-loading user permissions into a fast in-memory cache (like Redis) tagged by the user's session ID. When permissions are modified by an admin, invalidate only the specific user's cache key.

\`\`\`php
// Middleware verification
public function handle(Request $request, Closure $next, string $permission)
{
    if (!$request->user()?->hasPermission($permission)) {
        abort(403, 'Unauthorized access to restricted resource.');
    }
    return $next($request);
}
\`\`\`

Designing for permissions upfront saves countless hours of painful data migrations down the line.`,
  },
  {
    slug: "thinking-beyond-crud",
    title: "Thinking beyond CRUD",
    timestamp: "2024-12-28T14:12Z",
    readTime: "6 min read",
    tags: ["database", "design", "thinking"],
    excerpt:
      "Most tutorials teach you to build CRUD apps. No one tells you that real systems are about state transitions, not rows. Here's how I started thinking about data differently...",
    content: `# Thinking beyond CRUD

Most web frameworks and tutorials push developers into a CRUD mindset: Create, Read, Update, Delete. You have a table, you create a row, and you mutate columns.

### State Transitions vs Row Updates
In real-world applications (financial ledgers, delivery tracking, multi-tenant SaaS), updates are rarely arbitrary field edits. They are **state transitions**:
- An order doesn't just change status from "PENDING" to "SHIPPED". It triggers stock reservation, payment capture, invoice generation, and courier notification.
- If you simply execute \`UPDATE orders SET status = 'shipped'\`, you lose the temporal log of *who* shipped it, *when*, and *why*.

### Event-Driven Auditing
Instead of raw row mutations, adopt an append-only or event-sourced mindset for critical entities:
1. Record immutable domain events.
2. Update read projections for fast queries.
3. Guarantee idempotency on webhook and background job consumers.`,
  },
  {
    slug: "mistakes-i-made-as-a-junior-backend-developer",
    title: "Mistakes I made as a junior backend developer",
    timestamp: "2024-11-15T08:00Z",
    readTime: "5 min read",
    tags: ["junior", "mistakes", "lessons"],
    excerpt:
      "Fat controllers. No service layer. `is_admin = 1`. Hardcoded values everywhere. Here's everything I got wrong in my first year and what I replaced each one with...",
    content: `# Mistakes I made as a junior backend developer

Every backend engineer has a graveyard of architectural mistakes from their early days. Looking back at my first year, here are the core anti-patterns and what replaced them:

### 1. Fat Controllers
Placing business logic, validation, third-party API calls, and email sending directly in HTTP controllers.
- **The Fix:** Thin controllers that delegate to Single-Action Service classes and dispatch asynchronous jobs.

### 2. The N+1 Query Dilemma
Looping through an array of models and making a database query in every iteration.
- **The Fix:** Strict eager-loading in development environments and query count monitoring.

### 3. Missing Database Indexes
Querying non-indexed columns in where clauses and wondering why query latency skyrocketed from 2ms to 450ms under load.
- **The Fix:** Adding compound and foreign key indexes during initial migration planning.`,
  },
  {
    slug: "building-scalable-admin-systems",
    title: "Building scalable admin systems",
    timestamp: "2024-10-02T08:00Z",
    readTime: "7 min read",
    tags: ["admin", "scalable", "systems"],
    excerpt:
      "What makes an admin dashboard still readable at 10,000 users? What breaks first? Here's how I approached the Jaraye platform dashboard architecture for long-term maintainability...",
    content: `# Building scalable admin systems

What makes an administrative dashboard maintainable when user records hit tens of thousands?

### The Pitfalls of Naive Admin Dashboards
Standard admin dashboards often fetch entire collections, perform client-side filtering, and collapse under large dataset payloads.

### Architectural Tenets for Resilient Admin Panels
- **Server-Driven Pagination & Filtering:** Never dump unpaginated rows into a client bundle.
- **Optimized Aggregate Views:** Pre-aggregate high-traffic stats into Redis counters or summary tables rather than running heavy \`COUNT(*)\` queries on every page render.
- **Granular RBAC:** Separate super-admin operations from standard tenant administration.`,
  },
];

async function getPostData(slug: string) {
  // 1. Check database first
  const dbPost = await prisma.post
    .findUnique({
      where: { slug },
    })
    .catch(() => null);

  if (dbPost) {
    let parsedTags: string[] = [];
    try {
      parsedTags = JSON.parse(dbPost.tags);
      if (!Array.isArray(parsedTags)) parsedTags = [];
    } catch {
      parsedTags = dbPost.tags ? dbPost.tags.split(",").map((s) => s.trim()) : [];
    }

    const dateToFormat = dbPost.publishedAt || dbPost.createdAt;
    const formattedDate = dateToFormat
      ? new Date(dateToFormat).toISOString().replace(/\.\d{3}Z$/, "Z")
      : "2025-01-01T00:00Z";

    return {
      title: dbPost.title,
      slug: dbPost.slug,
      excerpt: dbPost.excerpt,
      content: dbPost.content,
      tags: parsedTags,
      readTime: dbPost.readingTime || "5 min read",
      timestamp: formattedDate,
      isPublished: dbPost.isPublished,
    };
  }

  // 2. Check fallback notes
  const fallback = fallbackNotes.find((n) => n.slug === slug);
  if (fallback) {
    return {
      ...fallback,
      isPublished: true,
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: "Note Not Found // KZW OS",
      description: "The requested system note record could not be located.",
    };
  }

  return {
    title: `${post.title} // system.notes`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="font-mono text-sm font-semibold text-[var(--violet)] mt-6 mb-2"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="font-mono text-base font-semibold text-[var(--text-primary)] mt-8 mb-3 pb-1 border-b border-[var(--border-dim)]"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1
            key={idx}
            className="font-mono text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-6 mb-3"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li
            key={idx}
            className="ml-5 font-mono text-xs sm:text-sm text-[var(--text-dim)] list-disc leading-relaxed my-1"
          >
            {line.replace(/^[-*]\s+/, "")}
          </li>
        );
      }
      if (line.startsWith("```")) {
        return (
          <div
            key={idx}
            className="font-mono text-[11px] text-[var(--violet)] bg-[var(--bg-elevated)] px-3 py-2 rounded-lg border border-[var(--border)] my-2 overflow-x-auto"
          >
            {line}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p
          key={idx}
          className="font-mono text-xs sm:text-sm text-[var(--text-dim)] leading-relaxed my-1.5"
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-200">
      <ChromeHeader />

      <main className="flex-1 wrapper py-8 sm:py-12 max-w-3xl mx-auto w-full px-4">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-dim)] flex-wrap">
          <Link
            href="/#notes"
            className="font-mono text-xs text-[var(--violet)] hover:underline flex items-center gap-1.5 min-h-[44px] touch-manipulation pointer-events-auto"
          >
            <span>←</span>
            <span>cd .. // return to system.notes</span>
          </Link>

          <div className="font-mono text-[10px] text-[var(--text-muted)] flex items-center gap-2">
            <span>FILE:</span>
            <span className="text-[var(--text-primary)]">{post.slug}.md</span>
          </div>
        </div>

        {/* Note Article Frame */}
        <article className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Metadata Block */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
              <span className="text-[var(--amber)]">{post.timestamp}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-dim)]">{post.readTime}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--green)] bg-[var(--green)]/10 border border-[var(--green)]/20 px-2 py-0.5 rounded text-[10px]">
                sys.record // verified
              </span>
            </div>

            <h1 className="font-mono text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded px-2 py-0.5 font-mono text-[10px] text-[var(--text-dim)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-dim)]" />

          {/* Excerpt Lead Box */}
          <div className="p-4 rounded-lg bg-[var(--bg-elevated)] border-l-2 border-[var(--violet)] font-mono text-xs text-[var(--text-dim)] leading-relaxed italic">
            {post.excerpt}
          </div>

          {/* Full Markdown Content */}
          <div className="space-y-2 pt-2">
            {renderMarkdown(post.content || post.excerpt)}
          </div>

          <div className="border-t border-[var(--border-dim)] pt-6 mt-8 flex items-center justify-between flex-wrap gap-4 font-mono text-xs">
            <Link
              href="/#notes"
              className="text-[var(--violet)] hover:underline flex items-center gap-1 min-h-[44px] touch-manipulation pointer-events-auto"
            >
              <span>←</span>
              <span>Back to all system notes</span>
            </Link>

            <span className="text-[var(--text-muted)] text-[10px]">
              KZW OS // TECHNICAL_BUILD_RECORD
            </span>
          </div>
        </article>
      </main>

      <StatusBar />
    </div>
  );
}
