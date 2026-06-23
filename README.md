# How to Run

## Requirements

- PHP 8.2+
- Composer
- Node.js & npm

## Setup (first time only)

```bash
cd C:\xampp\htdocs\xampp\laravel_react_crud

composer install
npm install

copy .env.example .env
php artisan key:generate

php artisan migrate --seed
php artisan storage:link
```

## Run the app

```bash
composer dev
```

Open **http://127.0.0.1:8000** in your browser.

---

**Or run in two terminals:**

Terminal 1:
```bash
php artisan serve
```

Terminal 2:
```bash
npm run dev
```

Then open **http://127.0.0.1:8000**.
