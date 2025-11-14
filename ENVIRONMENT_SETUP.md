# Environment Setup Guide

## Overview

Your project is now configured to automatically use the correct backend URL based on your environment:

- **Development** (local): `http://localhost:5000`
- **Production** (Render): `https://atv-back.onrender.com`

## How It Works

The project uses environment variables to switch between local and production backends:

- `src/config/api.js` - Central API configuration file
- Environment variables control which backend URL is used

## Setup Instructions

### Step 1: Create Environment Files

You need to create two environment files in the **root** of your project:

#### 1. Create `.env.development`

Create a file named `.env.development` in the root directory with:

```
VITE_API_BASE_URL=http://localhost:5000
```

#### 2. Create `.env.production`

Create a file named `.env.production` in the root directory with:

```
VITE_API_BASE_URL=https://atv-back.onrender.com
```

### Step 2: Running Your Project

#### For Local Development (with local backend):

```bash
npm run dev
```

This will use `.env.development` → connects to `http://localhost:5000`

#### For Production Build:

```bash
npm run build
```

This will use `.env.production` → connects to `https://atv-back.onrender.com`

## Testing Your Setup

### Test Local Development:

1. Make sure your local backend is running on `http://localhost:5000`
2. Run `npm run dev`
3. Open your browser and check if data loads from your local backend

### Test Production Connection:

1. Temporarily create a `.env.local` file with:
   ```
   VITE_API_BASE_URL=https://atv-back.onrender.com
   ```
2. Run `npm run dev`
3. Check if data loads from Render
4. Delete `.env.local` when done testing

## Environment Files Priority

Vite loads environment files in this order (highest priority first):

1. `.env.local` (always ignored by git) - highest priority
2. `.env.development` or `.env.production` (based on mode)
3. `.env`

## Important Notes

- ✅ `.env` and `.env.local` are in `.gitignore` - they won't be committed
- ✅ You can commit `.env.development` and `.env.production` safely
- ✅ All API calls now use the centralized configuration
- ✅ No code changes needed when switching environments

## Updated Files

The following files now import from `src/config/api.js`:

- `src/pages/Login/Login.jsx`
- `src/pages/Admin/components/AtvPageAdmin.jsx`
- `src/pages/Admin/components/AboutPageAdmin.jsx`
- `src/pages/ATVs/ATVs.jsx`
- `src/pages/Home/sections/Fleet.jsx`
- `src/pages/Contact/Contact.jsx`

## Troubleshooting

**Issue**: API calls fail in development

- **Solution**: Check if `.env.development` exists and has correct URL
- **Solution**: Make sure your local backend is running on port 5000

**Issue**: Can't connect to production backend

- **Solution**: Check if Render backend is running: https://atv-back.onrender.com
- **Solution**: Verify CORS is enabled on your backend for your frontend domain

**Issue**: Environment variables not loading

- **Solution**: Restart your dev server (`npm run dev`)
- **Solution**: Make sure environment variable names start with `VITE_`
