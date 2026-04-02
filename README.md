# Projectile — HTML Editor & Studio

> A fully browser-based HTML editing studio with live preview, real-time collaboration, AI assistance, multi-page management, version control, and a built-in AI presentation generator. No installation, no build step — open and code.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Core Editor](#core-editor)
- [Features](#features)
  - [Live Preview](#live-preview)
  - [AI Assistant](#ai-assistant)
  - [Real-Time Collaboration](#real-time-collaboration)
  - [Go Live — Deploy & Host](#go-live--deploy--host)
  - [Multi-Page Editor](#multi-page-editor)
  - [Version Control — ArchiveX](#version-control--archivex)
  - [Drag-and-Drop Element Library](#drag-and-drop-element-library)
  - [Design to Code](#design-to-code)
  - [Template Library](#template-library)
  - [Color Themes](#color-themes)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Search & PDF Export](#search--pdf-export)
  - [QR Code Preview](#qr-code-preview)
- [Projectile PPT — AI Presentation Generator](#projectile-ppt--ai-presentation-generator)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [AI Integration](#ai-integration)
- [Firebase Backend](#firebase-backend)
- [Configuration](#configuration)
- [Security Notes](#security-notes)

---

## Overview

**Projectile** is a dark-themed, browser-based HTML editor with a split-pane layout — code on the left, live preview on the right. It is designed to be opened directly as an HTML file in any modern browser. Every feature is self-contained: no servers to run, no packages to install.

The editor is built around CodeMirror and extended with a rich set of modular plugins loaded from the `features/` directory. It also ships with **Projectile PPT**, a separate AI-powered presentation builder that generates complete, styled HTML slide decks from a single topic prompt.

---

## Project Structure

```
projectile/
│
├── index.html          # Main editor — open this to launch the app
├── ppt.html               # Projectile PPT — standalone AI slide generator
│
└── features/
    ├── ppt-2.js           # Projectile PPT core logic
    ├── theme.js           # Color theme switcher (10 themes)
    ├── fe.js              # Editor keyboard shortcuts + help panel
    ├── features.js        # AI-powered drag-and-drop element library
    ├── dnd.js             # Pre-built template library with drag-and-drop
    ├── files.js           # Multi-page / tab manager
    ├── version.js         # ArchiveX version control system
    ├── image.js           # Design-to-code from image upload
    ├── qr.js              # QR code generator for preview URL
    └── ps.js              # Editor search + PDF export
```

---

## Getting Started

1. Download or clone the repository.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. Start writing HTML in the editor pane on the left.
4. Press **`Ctrl + Enter`** or click **Preview** to render the output on the right.
5. Access all tools via the **Menu** dropdown in the top toolbar.

To use the AI Presentation Generator, open `ppt.html` in the browser separately.

> **No internet connection required** for the editor itself. An internet connection is required for AI features (Gemini API), collaboration (Firebase), deployment (Firebase), and CDN-loaded libraries.

---

## Core Editor

The editor is powered by **CodeMirror 5** with full HTML/CSS/JavaScript mixed-mode syntax highlighting.

| Setting | Value |
|---|---|
| Mode | `htmlmixed` (HTML + CSS + JS) |
| Theme | Custom dark-on-white pane |
| Font size | 13px |
| Tab size | 2 spaces |
| Features | Line numbers, line wrapping, bracket matching, auto-close brackets, active line highlight |

The editor instance is exposed globally as `window.compiler.editor` for plugin access.

---

## Features

### Live Preview

Click **Preview** or press `Ctrl + Enter` to render the current editor content in the iframe on the right. The preview loads in a sandboxed iframe and executes all HTML, CSS, and JavaScript exactly as a browser would.

---

### AI Assistant

**File:** Inline in `index.html` | **Model:** Gemini 2.5 Flash Lite

Accessible from **Menu → AI Assistant**. The assistant understands the context of the current code and adapts its behavior based on the type of request.

#### Modes of operation

| Request type | What happens |
|---|---|
| **Generate** — editor is empty | Generates a complete HTML page from scratch |
| **Modify** — editor has code + edit request | Returns a targeted diff: shows old vs. new code before applying |
| **Fix** — editor has code + error/bug request | Analyzes the code, identifies exact faulty segments, shows fixes with line references |
| **Question / Analysis** — conversational query | Returns a plain text response in a readable modal, with a copy button |

#### Smart modification flow

When modifying or fixing code, the AI does not replace the entire file. Instead it returns a structured JSON payload with `old_code` → `new_code` pairs. A review modal shows each change side-by-side (red for removed, green for added). The user clicks **Apply All Changes** to patch the editor.

#### Typing animation

When generating new code from scratch, the assistant types the output character-by-character into the editor for a live feel.

#### Trigger shortcut

Inside the AI input box, `Ctrl + Enter` (or `Cmd + Enter`) sends the prompt without clicking the button.

---

### Real-Time Collaboration

**Technology:** Firebase Realtime Database
**Accessed via:** Menu → Collaborate

#### Starting a session

1. Click **Collaborate** in the Menu.
2. Enter your name in the prompt.
3. A unique session ID is appended to the URL (`?session=XXXXXX`).
4. The link is copied to the clipboard automatically. Share it with collaborators.

#### Joining a session

1. Open the shared URL.
2. Enter your name.
3. A join request is sent to the session owner.
4. The owner sees a modal with three options: **Allow Edit**, **Read Only**, or **Deny**.

#### Permission management (owner only)

The owner sees all active collaborators listed below the editor. Clicking on any collaborator opens a management panel to:
- Toggle between **Write** and **Read Only** access
- **Remove** the user from the session entirely

Removed users are blocked from rejoining the same session (tracked via a Firebase `removedUsers` node).

#### Sync behavior

- Code changes sync to Firebase with a 300ms debounce.
- When a remote change arrives, the cursor position and scroll state are preserved.
- A 30-second heartbeat keeps the active user list accurate.
- All Firebase listeners are cleaned up on tab close (`beforeunload`).

---

### Go Live — Deploy & Host

**Accessed via:** Menu → Go Live
**Authentication:** Google Sign-In (Firebase Auth)
**Hosting:** Firebase Realtime Database
**Expiry:** 24 hours per deployment

#### How it works

1. Click **Go Live** and sign in with your Google account.
2. Click **Deploy Current Code**.
3. Enter a site title.
4. The code is written to `deployedSites/<siteId>` in Firebase.
5. A public URL is generated: `<origin>/view?s=<siteId>`.

#### Limits

- Maximum **4 live sites** per account at any time.
- Sites automatically expire after 24 hours.
- Expired sites are cleaned up from Firebase on the next dashboard open.

#### Multi-page deployment

If the Multi-Page Editor is active with multiple pages, **Deploy Current Code** packages all pages into a single multi-page site object in Firebase, preserving inter-page navigation links.

#### Dashboard actions

| Action | Description |
|---|---|
| Open Site | Opens the live URL in a new tab |
| Copy URL | Copies the live URL to clipboard |
| Update | Replaces the deployed code with current editor content and resets the expiry timer |
| Delete | Immediately removes the site from Firebase |

---

### Multi-Page Editor

**File:** `features/files.js`
**Accessed via:** The page selector dropdown in the main toolbar

Allows managing multiple named HTML pages within a single session. Each page has its own independent code buffer stored in memory.

#### Operations

- **New Page** — creates a new blank page with a default name
- **Rename** — double-click a page tab or use the rename option in the dropdown
- **Switch** — click any page in the dropdown to load it into the editor (current page is saved automatically)
- **Delete** — removes the page and its buffer (with confirmation)
- **Preview link handler** — internal `<a>` links between pages are intercepted and resolved within the editor session, enabling realistic multi-page navigation in the preview iframe

---

### Version Control — ArchiveX

**File:** `features/version.js`
**Accessed via:** Menu → ArchiveX
**Storage:** `sessionStorage` (cleared when the tab is closed)

#### Saving versions

- Click **Save Current Version** in the modal and optionally name it.
- Press `Enter` in the name field to save quickly.
- **Auto-save** runs every 5 minutes in the background.
- Identical consecutive saves are skipped automatically.
- Maximum of **50 versions** are kept; oldest auto-saves are dropped first when the limit is reached.

#### Restoring versions

Click **Restore** on any version card. A confirmation dialog prevents accidental overwrites. The editor content, language mode, and stdin value are all restored.

#### Managing versions

| Action | Description |
|---|---|
| Restore | Replaces current editor content with the saved snapshot |
| Delete | Removes a single version with confirmation |
| Clear All | Wipes the entire version history |
| Export All | Downloads all versions as a dated `.json` file |
| Import | Merges versions from a `.json` file, deduplicating by timestamp ID |

---

### Drag-and-Drop Element Library

**File:** `features/features.js`
**Model:** Gemini 2.5 Flash Lite
**Accessed via:** Elements panel (toggled from toolbar)

A panel of pre-built UI components organized by category. Elements can be dragged directly onto the canvas in the preview area or inserted at the cursor position in the editor.

#### Built-in element categories

| Category | Elements |
|---|---|
| Layout | Hero Section |
| Content | Card, Pricing Card, Testimonial, Feature Box, Text Block |
| Interactive | Button, Icon Button |
| Media | Image, Avatar, Video Player |

#### AI-generated elements

A text field at the bottom of the panel lets you describe a custom component in plain language. The AI generates the HTML and adds it to the panel as a new draggable element for the current session.

---

### Design to Code

**File:** `features/image.js`
**Model:** Gemini 2.5 Flash Lite (Vision)
**Accessed via:** Menu → Design to Code

Upload a screenshot, mockup, wireframe, or design image. The Gemini Vision API analyzes the visual layout and generates equivalent HTML/CSS code, which is then typed into the editor with the same character-by-character animation as the AI Assistant.

Supported formats: PNG, JPEG, WebP (any format the browser can encode as base64).

---

### Template Library

**File:** `features/dnd.js`
**Accessed via:** Templates panel (toggled from toolbar)

A curated library of complete, production-quality HTML snippets with hover effects, responsive styles, and modern design. Templates are organized into sections including Cards, Layouts, and more.

Available templates include:

- **Minimal Card** — clean hover-lift card with image and action button
- **Glass Profile Card** — frosted-glass avatar card with connect/message actions
- **Premium Pricing Card** — bordered pricing table with feature checklist
- **Feature Showcase Card** — icon-led feature highlight card with gradient icon box

Templates can be inserted at the cursor or dragged into the live preview canvas.

---

### Color Themes

**File:** `features/theme.js`
**Accessed via:** Menu → Color Theme

10 built-in accent themes that restyle the editor's glow effects, animated dividers, button borders, and text shadows. Theme selection is saved to `sessionStorage` and restored on page reload.

| Theme | Primary Color |
|---|---|
| Red | `#ff0000` |
| Blue | `#0066ff` |
| Green | `#00ff00` |
| Purple | `#9900ff` |
| Cyan | `#00ffff` |
| Orange | `#ff6600` |
| Yellow | `#ffff00` |
| Pink | `#ff0099` |
| White | `#ffffff` |
| Violet | `#8800ff` |

Each theme defines: primary color, light/dark variants, gradient, box-shadow glow, border color, text shadow, and background radial gradient.

---

### Keyboard Shortcuts

**File:** `features/fe.js`
**Accessed via:** Menu → Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Run preview |
| `Ctrl + Shift + D` | Duplicate current line |
| `Ctrl + Shift + K` | Delete current line |
| `Alt + ↑` | Move current line up |
| `Alt + ↓` | Move current line down |

All shortcuts are registered directly on the CodeMirror `extraKeys` option and are active whenever the editor is focused.

---

### Search & PDF Export

**File:** `features/ps.js`
**Accessed via:** Menu → Search in Editor / Export as PDF

**Search** opens a find-and-replace dialog operating on the raw CodeMirror content.

**PDF Export** renders the current editor content through the browser's print engine and exports it as a downloadable `.pdf` file.

---

### QR Code Preview

**File:** `features/qr.js`
**Library:** QRCode.js (CDN)
**Accessed via:** Menu → QR Code

Generates a QR code for the current page URL (including the session ID if in a collaborative session). Useful for quickly loading the preview on a mobile device connected to the same network.

---

## Projectile PPT — AI Presentation Generator

**Entry point:** `ppt.html`
**Logic:** `features/ppt-2.js`
**Model:** Gemini 2.5 Flash Lite

A standalone AI-powered slide deck builder. Each slide is generated as a self-contained, styled HTML page and rendered live in an iframe thumbnail.

### How to use

1. Open `ppt.html` in the browser.
2. Type a presentation topic (e.g. *"The History of the Internet"*).
3. Choose the number of slides (3–10) and a visual theme.
4. Click **Generate**.

Slides are generated sequentially. The sidebar shows live thumbnail previews as each slide completes, with a spinner for slides still in progress. Clicking any thumbnail jumps the main preview to that slide.

### Visual themes

| Theme | Description |
|---|---|
| Clean | White background, warm brown (`#8b5e3c`) accents, professional sans-serif typography |
| Bold | Cream background, large bold warm-brown headlines, strong visual hierarchy |
| Dark | Very dark (`#1a1612`) background, cream text, amber (`#c4894a`) accents |
| Gradient | Cream-to-warm-sand gradient background, organic shapes, elegant feel |
| Minimal | Pure white, single accent color element, extreme whitespace, ultra-clean |

### Navigation

- Click any thumbnail in the sidebar to jump directly to that slide.
- Use the `‹` and `›` arrow buttons in the preview bar to step sequentially.
- The slide label at the top shows the current slide's title.

### Export

Click **Export PPT** to download the generated slides as a `.pptx` file, compatible with Microsoft PowerPoint, Google Slides, and LibreOffice Impress.

### Fallback handling

If a slide fails to generate due to an API error or timeout, a styled fallback slide is inserted automatically so the deck remains complete and consistent.

---

## Tech Stack & Dependencies

All dependencies load from CDN. Nothing is bundled or installed locally.

| Library | Version | Purpose |
|---|---|---|
| CodeMirror | 5.65.0 | Code editor with syntax highlighting |
| Tailwind CSS | Latest (CDN play) | Utility-first UI styling |
| Firebase App (compat) | 9.6.10 | Firebase initialization |
| Firebase Database (compat) | 9.6.10 | Realtime collaboration and deployment storage |
| Firebase Auth (compat) | 9.6.10 | Google Sign-In for Go Live feature |
| QRCode.js | 1.0.0 | Client-side QR code generation |
| Google Fonts | — | Inter, Space Grotesk (editor); DM Sans, DM Serif Display (PPT) |
| Google Gemini API | — | AI assistant, design-to-code, PPT slide generation |

---

## AI Integration

Three separate features call the **Google Gemini 2.5 Flash Lite** API. All calls are made client-side via `fetch`.

| Feature | File | Input sent |
|---|---|---|
| AI Assistant | `index.html` | Current editor code + user prompt |
| Design to Code | `features/image.js` | Base64-encoded image + generation prompt |
| Element Library | `features/features.js` | Element description prompt |
| PPT Generator | `features/ppt-2.js` | Topic + slide index + slide count + theme context prompt |

Responses are parsed either by regex (extracting HTML code blocks from markdown) or by structured JSON parsing (for modification and fix payloads).

Generation config: `temperature: 0.7`, `maxOutputTokens: 8192`.

---

## Firebase Backend

Firebase Realtime Database is used for two separate systems: collaboration sessions and site deployment.

### Collaboration sessions

```
htmlSessions/
  <sessionId>/
    code                      — full editor content, synced live
    owner                     — user ID of session creator
    createdAt
    lastActivity
    users/
      <userId>/
        name, color, active, isOwner, lastActive
    permissions/
      <userId>                — "write" | "readonly"
    joinRequests/
      <userId>/
        userId, userName, color, status, requestedAt
    removedUsers/
      <userId>/
        removedAt, removedBy
```

### Deployed sites

```
deployedSites/
  <siteId>/
    type                      — "single" | "multipage"
    code                      — HTML string (single page only)
    pages/                    — keyed page map (multipage only)
      <pageId>/
        title, fileName, content, isHome
    title
    userId
    deployedAt
    lastUpdated

userSites/
  <uid>/
    <siteId>: true
```

Session data persists in Firebase until manually cleared. Deployed site expiry (24 hours) is enforced client-side on dashboard open.

---

## Configuration

The following values are hardcoded in the source and must be replaced to run your own instance:

| Value | File(s) | What it is |
|---|---|---|
| `GEMINI_API_KEY` | `index.html`, `features/features.js`, `features/image.js`, `features/ppt-2.js` | Google AI Studio API key |
| `firebaseConfig` object | `index.html` (two locations) | Firebase project credentials |

**To configure:**
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com), enable Realtime Database and Google Authentication, then copy the config object.
2. Get a Gemini API key at [aistudio.google.com](https://aistudio.google.com).
3. Find and replace all instances of the existing keys in the source files.

---

## Security Notes

- **API keys are exposed in client-side JavaScript.** For any public or shared deployment, proxy all Gemini API calls through a backend service and restrict the key in Google Cloud Console to specific origins or referrers.
- **Firebase Database Rules** should be tightened for production. The current setup relies on session ID as the only access control. Add user-based rules using Firebase Auth UIDs.
- **Deployed sites** are publicly accessible to anyone with the URL for 24 hours. There is no password protection or visibility setting.
- **Collaborator removal** is enforced client-side only. Without corresponding Firebase Security Rules, a determined user could still write to the session directly via the Firebase SDK.
