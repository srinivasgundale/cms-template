# Roles & Access Control

## Overview

This project uses a **hardcoded role-based access control (RBAC)** system built on top of Payload CMS's access control API. Roles are stored per user in the database and embedded into the JWT on login — meaning every permission check is evaluated in memory with no additional database queries.

---

## Role Hierarchy

```
super-admin
    └── admin
            └── editor
                    └── viewer
```

Each role inherits all permissions of the roles below it. A user can hold multiple roles simultaneously (the highest role wins).

---

## Role Definitions

### `super-admin`
Full unrestricted access to everything.
- Create, read, update, delete any content
- Create, read, update, delete any user
- **Only role that can assign or change roles** on other users
- Sees all collections in the admin panel nav

### `admin`
Full content management + limited user management.
- Create, read, update, delete any content (posts, pages, media, categories)
- Create and update users (but cannot assign `admin` or `super-admin` roles)
- Cannot delete users
- Sees the Users collection in the admin panel nav

### `editor`
Content creation and editing only.
- Create and update posts, pages, media, categories
- **Cannot delete** any content
- Cannot see or manage users (can only view/edit their own profile)
- Users collection is hidden from their admin panel nav

### `viewer`
Read-only access.
- Read published content (same as an unauthenticated visitor for public collections)
- Read draft content when authenticated
- Cannot create, update, or delete anything
- Cannot see or manage users (can only view/edit their own profile)
- Users collection is hidden from their admin panel nav

---

## Permission Matrix

| Operation | super-admin | admin | editor | viewer |
|---|:---:|:---:|:---:|:---:|
| **Admin panel login** | ✓ | ✓ | ✓ | ✓ |
| **Posts — create** | ✓ | ✓ | ✓ | ✗ |
| **Posts — read** | ✓ | ✓ | ✓ | ✓ |
| **Posts — update** | ✓ | ✓ | ✓ | ✗ |
| **Posts — delete** | ✓ | ✓ | ✗ | ✗ |
| **Pages — create** | ✓ | ✓ | ✓ | ✗ |
| **Pages — read** | ✓ | ✓ | ✓ | ✓ |
| **Pages — update** | ✓ | ✓ | ✓ | ✗ |
| **Pages — delete** | ✓ | ✓ | ✗ | ✗ |
| **Media — create** | ✓ | ✓ | ✓ | ✗ |
| **Media — read** | ✓ | ✓ | ✓ | ✓ |
| **Media — update** | ✓ | ✓ | ✓ | ✗ |
| **Media — delete** | ✓ | ✓ | ✗ | ✗ |
| **Categories — create** | ✓ | ✓ | ✓ | ✗ |
| **Categories — read** | ✓ | ✓ | ✓ | ✓ |
| **Categories — update** | ✓ | ✓ | ✓ | ✗ |
| **Categories — delete** | ✓ | ✓ | ✗ | ✗ |
| **Users — create** | ✓ | ✓ | ✗ | ✗ |
| **Users — read (all)** | ✓ | ✓ | ✗ | ✗ |
| **Users — read (self)** | ✓ | ✓ | ✓ | ✓ |
| **Users — update (all)** | ✓ | ✓ | ✗ | ✗ |
| **Users — update (self)** | ✓ | ✓ | ✓ | ✓ |
| **Users — delete** | ✓ | ✗ | ✗ | ✗ |
| **Assign/change roles** | ✓ | ✗ | ✗ | ✗ |
| **Users visible in nav** | ✓ | ✓ | ✗ | ✗ |

---

## File Structure

```
src/
├── access/
│   ├── roles.ts              # Core role helper functions
│   ├── isAdminOrHigher.ts    # Payload Access function: admin+
│   ├── isEditorOrHigher.ts   # Payload Access function: editor+
│   ├── authenticated.ts      # Payload Access function: any logged-in user
│   ├── anyone.ts             # Payload Access function: public
│   └── authenticatedOrPublished.ts  # Authenticated or published content
└── collections/
    ├── Users/index.ts        # roles field defined here
    ├── Posts/index.ts        # uses isEditorOrHigher / isAdminOrHigher
    ├── Pages/index.ts        # uses isEditorOrHigher / isAdminOrHigher
    ├── Media.ts              # uses isEditorOrHigher / isAdminOrHigher
    └── Categories.ts         # uses isEditorOrHigher / isAdminOrHigher
```

---

## How It Works at Runtime

```
1. User logs in
        ↓
2. Payload creates a JWT containing:
   { id: 1, email: "...", roles: ["admin"] }
   (roles included because saveToJWT: true on the roles field)
        ↓
3. User makes a request (e.g. DELETE /api/posts/123)
        ↓
4. Payload decodes JWT → req.user = { id: 1, roles: ["admin"] }
        ↓
5. Posts delete access function runs:
   isAdminOrHigher(req.user) → roles includes "admin" → true → allowed
        ↓
6. Operation proceeds
```

No database query is made for the role check — it reads from the in-memory JWT payload.

---

## Core Logic (`src/access/roles.ts`)

```ts
const getUserRoles = (user) => {
  if (!user) return []
  const roles = user.roles
  // Backward-compat: users created before roles were added default to viewer
  return roles?.length ? roles : ['viewer']
}

isSuperAdmin  → roles includes 'super-admin'
isAdminOrHigher  → roles includes 'super-admin' OR 'admin'
isEditorOrHigher → roles includes 'super-admin' OR 'admin' OR 'editor'
```

---

## The `roles` Field (`src/collections/Users/index.ts`)

```ts
{
  name: 'roles',
  type: 'select',
  hasMany: true,
  saveToJWT: true,          // embedded in JWT — no DB lookup per request
  defaultValue: ['viewer'], // new users are viewers by default
  options: [
    { label: 'Super Admin', value: 'super-admin' },
    { label: 'Admin',       value: 'admin'       },
    { label: 'Editor',      value: 'editor'      },
    { label: 'Viewer',      value: 'viewer'      },
  ],
  access: {
    create: isAdminOrHigher,  // admin+ can set a role when creating a user
    update: isSuperAdmin,     // only super-admin can change roles after creation
  },
}
```

---

## Database Storage

Because `hasMany: true`, roles are stored in a **separate table** — not as a column on the `users` row.

```
Table: users_roles
┌────┬───────┬───────────┬─────────────┐
│ id │ order │ parent_id │    value    │
├────┼───────┼───────────┼─────────────┤
│  1 │   1   │     1     │ super-admin │
│  2 │   1   │     2     │ editor      │
│  3 │   2   │     2     │ viewer      │
└────┴───────┴───────────┴─────────────┘
parent_id → references users.id
```

### Useful SQL queries

```sql
-- View all users and their roles
SELECT u.id, u.name, u.email, r.value AS role
FROM users u
LEFT JOIN users_roles r ON r.parent_id = u.id
ORDER BY u.id;

-- Assign a role to a user
INSERT INTO users_roles ("order", parent_id, value)
VALUES (1, <user_id>, '<role>');

-- Change a user's role (delete old, insert new)
DELETE FROM users_roles WHERE parent_id = <user_id>;
INSERT INTO users_roles ("order", parent_id, value)
VALUES (1, <user_id>, '<new_role>');

-- Remove a specific role from a user
DELETE FROM users_roles
WHERE parent_id = <user_id> AND value = '<role>';
```

Valid role values: `super-admin` | `admin` | `editor` | `viewer`

---

## Assigning Roles via the Admin Panel

1. Log in as a user with `super-admin` role
2. Navigate to **Users** in the left nav
3. Open any user record
4. The **Roles** field appears in the right sidebar
5. Select one or more roles and save
6. The user must **log out and log back in** for the new role to take effect (JWT refresh)

> **Note:** The Roles field is read-only for everyone except super-admins. Admins can create users but cannot change roles after creation.

---

## First-Time Setup

No super-admin exists initially. Use SQL to bootstrap the first user:

```sql
-- Find your user ID
SELECT id, email FROM users;

-- Assign super-admin
INSERT INTO users_roles ("order", parent_id, value)
VALUES (1, <your_user_id>, 'super-admin');
```

Then log out and back in.

---

## Adding a New Role

1. Add the value to the `options` array in `src/collections/Users/index.ts`
2. Add the value to the `UserRole` type in `src/access/roles.ts`
3. Update the helper functions in `src/access/roles.ts` to include the new role in the appropriate hierarchy level
4. Run `npx payload generate:types` to regenerate TypeScript types
5. Update collection access functions if the new role needs different permissions than existing roles

Example — adding a `moderator` role between editor and admin:

```ts
// src/access/roles.ts
export type UserRole = 'super-admin' | 'admin' | 'moderator' | 'editor' | 'viewer'

export const isAdminOrHigher = (user) =>
  getUserRoles(user).some(r => r === 'super-admin' || r === 'admin')

// New function for moderator+
export const isModeratorOrHigher = (user) =>
  getUserRoles(user).some(r => ['super-admin', 'admin', 'moderator'].includes(r))

export const isEditorOrHigher = (user) =>
  getUserRoles(user).some(r => ['super-admin', 'admin', 'moderator', 'editor'].includes(r))
```

---

## Security Notes

- **`saveToJWT: true`** means a role change only takes effect after the user's next login. There is no instant revocation — if you need immediate revocation, you would need to invalidate sessions.
- **Field-level access** on the `roles` field prevents non-super-admins from elevating their own or others' privileges via the API.
- **Local API** calls with `overrideAccess: true` (Payload's default) bypass all role checks. Always pass `overrideAccess: false` when acting on behalf of a user.
- Roles default to `['viewer']` for any authenticated user with no roles assigned, preventing lockout of legacy users while keeping permissions minimal.
