# Laravel React CRUD

## Tech Stack

- **Backend:** Laravel 12, MySQL
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Routing:** React Router (client-side) + Laravel API (`/api/*`)

---

## Requirements

| Tool | Version | Notes |
|------|---------|-------|
| PHP | 8.2+ | Included with XAMPP |
| Composer | 2.x | PHP dependency manager |
| Node.js | 18+ | Includes npm (frontend build) |
| MySQL | 5.7+ or 8.x | Included with XAMPP |

**Recommended for local development:** [XAMPP](https://www.apachefriends.org/) on Windows.

---

## Install tools (first time only)

Do this once on a new machine before running the project.

### 1. Install XAMPP

1. Download and install [XAMPP](https://www.apachefriends.org/) (PHP 8.2+).
2. Default install path: `C:\xampp`
3. PHP will be at: `C:\xampp\php\php.exe`

### 2. Install Composer

1. Download [Composer-Setup.exe](https://getcomposer.org/download/) (Windows installer).
2. When the installer asks for the PHP executable, browse to:
   ```
   C:\xampp\php\php.exe
   ```
3. Finish the installer — Composer is added to your PATH automatically.
4. Verify in a **new** terminal:

```bash
php --version
composer --version
```

You should see PHP 8.2.x (from XAMPP) and Composer 2.x.

### 3. Install Node.js

1. Download [Node.js LTS](https://nodejs.org/) and run the installer.
2. Verify:

```bash
node --version
npm --version
```

### 4. Add PHP to PATH (if commands fail)

If `php` is not recognized but XAMPP is installed, add this folder to your system **PATH**:

```
C:\xampp\php
```

Then close and reopen your terminal.

---

## Setup (from scratch)

### 1. Get the project

Clone or download the repository, then open a terminal in the project folder:

```bash
cd C:\xampp\htdocs\xampp\laravel_react_crud
```

> On macOS/Linux, use your own project path instead.

### 2. Start MySQL

1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL**.
3. Leave Apache stopped — Laravel uses its own dev server (`php artisan serve`).

### 3. Create the database

1. Open **phpMyAdmin**: http://localhost/phpmyadmin
2. Click **New** (or **Databases**).
3. Create a database named `laravel_react_crud`.
4. Collation: `utf8mb4_unicode_ci` (default is fine).

### 4. Install dependencies

```bash
composer install
npm install
```

### 5. Configure environment

Copy the example environment file and generate an application key:

**Windows (Command Prompt / PowerShell):**
```bash
copy .env.example .env
php artisan key:generate
```

**macOS / Linux:**
```bash
cp .env.example .env
php artisan key:generate
```

Open `.env` and confirm the database settings match your MySQL setup:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_crud
DB_USERNAME=root
DB_PASSWORD=
```

> If your MySQL root user has a password, set `DB_PASSWORD` accordingly.

### 6. Run migrations and seed data

This creates all tables and seeds the three default page sections:

```bash
php artisan migrate --seed
```

### 7. Link storage (required for image uploads)

```bash
php artisan storage:link
```

This connects `public/storage` to `storage/app/public` so uploaded post images are accessible in the browser.

---

## Run the app

### Option A — One command (recommended)

Starts the Laravel server, queue worker, and Vite dev server together:

```bash
composer dev
```

### Option B — Two terminals

**Terminal 1 — Laravel API & web shell:**
```bash
php artisan serve
```

**Terminal 2 — Vite (React hot reload):**
```bash
npm run dev
```

### Open in browser

Visit: **http://127.0.0.1:8000**

> Both `php artisan serve` and `npm run dev` must be running in development. If the page loads but styles or React are missing, make sure Vite is running.

---

## App routes (React)

| URL | Page |
|-----|------|
| `/` | Home — view all sections and posts |
| `/add-unique-home-page` | Add post to "Unique Home Page" |
| `/add-stunning-inner-pages` | Add post to "Stunning Inner Pages" |
| `/add-features` | Add post to "Our Features" |
| `/edit/:section` | Edit/delete posts in a section |
| `/edit-content/:id` | Edit a single post |
| `/add-section-title` | Manage page section titles |

## API endpoints (Laravel)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts?section={name}` | List posts for a section |
| `POST` | `/api/posts` | Create a post (multipart/form-data for images) |
| `GET` | `/api/posts/{id}` | Get a single post |
| `PUT` | `/api/posts/{id}` | Update a post |
| `DELETE` | `/api/posts/{id}` | Delete a post |
| `GET` | `/api/page-sections` | List all page sections |
| `POST` | `/api/page-sections` | Create a page section |
| `GET` | `/api/page-sections/{id}` | Get a section |
| `PUT` | `/api/page-sections/{id}` | Update a section |
| `DELETE` | `/api/page-sections/{id}` | Delete a section |

---

## Production build (optional)

Build optimized frontend assets:

```bash
npm run build
```

Then serve the app with your web server pointing to the `public/` directory. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `SQLSTATE[HY000] [1049] Unknown database` | Create the `laravel_react_crud` database in phpMyAdmin (Step 3). |
| `SQLSTATE[HY000] [1045] Access denied` | Check `DB_USERNAME` and `DB_PASSWORD` in `.env`. |
| Page loads but no styles / blank React app | Run `npm run dev` or use `composer dev`. |
| Uploaded images return 404 | Run `php artisan storage:link`. |
| Port 8000 already in use | Stop the other process or run `php artisan serve --port=8001`. |
| `composer` or `php` not found | Install [Composer](https://getcomposer.org/download/) and point it to `C:\xampp\php\php.exe`. Add `C:\xampp\php` to PATH if needed. |
| `composer` works but uses wrong PHP | Re-run Composer-Setup and select `C:\xampp\php\php.exe` as the PHP executable. |

---

## Quick reference (already set up)

If dependencies, `.env`, migrations, and storage link are already done, you only need:

```bash
composer dev
```

Then open **http://127.0.0.1:8000**.
