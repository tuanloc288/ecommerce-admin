# Admin dashboard with Next.js 13 App Router: React, Tailwind + Shadcn UI, Prisma, MongoDB

![Dashboard](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694095970/dashboard_brsspf.png)
![Product](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694092563/product_ezuya7.png)
![APIs](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694092563/apis_igixnd.png)
![Light mode](https://res.cloudinary.com/dbiliw2ja/image/upload/v1694092563/light_zw7rvf.png)

This project served as an admin dashboard for your customizable store, build with Next.js 13 App Router: 
    React, Tailwind + Shadcn UI, Prisma + MySQL (PlanetScale), 
    NextJS, Zustand, Clerk, Recharts, Cloudinary, Stripe

Features:

- Tailwind design
- Tailwind animations and effects
- Fully responsive design
- Light, dark and system mode
- Redirect unauthorized users when accessing protected routes
- Google authentication using Clerk
- Form validation and handling using react-hook-form
- Notification using react-hot-toast
- Page loading state
- Each account can have multiple store running as the same time
- Simple chart and orders data for analysis
- Fully customizable store content such as store name, billboard, category, product, color , size
- The admin dashboard itself also provide multiple apis for each customizable content list above, these apis will be used by the admin dashboard but also some will be used by the store
- Can also copy these customizable content id for your desired use case.

### Prerequisites

**Node version 14.x**

**NextJS version 13.x**

### Cloning the repository

```shell
git clone https://github.com/tuanloc288/ecommerce-admin.git
```

### Install packages

```shell
npm install
```

### Setup .env file
I using PlanetScale for my MySQL db, so i rcm you do the same to make sure this can work

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=

# cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# stripe secret key
STRIPE_API_KEY=
FRONTEND_STORE_URL=

STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma / MySQL 

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```
