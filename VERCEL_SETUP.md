# 🚀 Vercel Environment Setup - Quick Guide

## Why Your Site Shows Empty Pages

Your Vercel deployment is **working** but can't load content because it doesn't know where your backend is located.

**Current behavior:**

- Frontend tries to connect to: `http://localhost:5000` ❌
- But your backend is on: `https://your-backend.onrender.com` ✅

## Step-by-Step Fix (5 minutes)

### Step 1: Get Your Render Backend URL

1. Go to https://dashboard.render.com
2. Click on your backend service
3. Copy the URL at the top (looks like: `https://atv-backend-xyz.onrender.com`)
4. **Important**: Copy it WITHOUT trailing slash

```
✅ Correct: https://atv-backend-xyz.onrender.com
❌ Wrong:   https://atv-backend-xyz.onrender.com/
❌ Wrong:   https://atv-backend-xyz.onrender.com/api
```

### Step 2: Add Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your **atv-front** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New** button
6. Fill in:
   ```
   Key:   VITE_API_BASE_URL
   Value: https://your-backend-xyz.onrender.com
   ```
7. Select: **Production** (check the box)
8. Click **Save**

### Step 3: Redeploy

1. Stay in Vercel dashboard
2. Click **Deployments** tab
3. Find the latest deployment (top of the list)
4. Click the **three dots** (⋮) on the right
5. Click **Redeploy**
6. Click **Redeploy** again to confirm

### Step 4: Verify It Works

Wait 1-2 minutes for deployment to complete, then:

1. Visit: https://atv-front.vercel.app/debug
   - Should show your Render URL (not localhost)
   - Should show "✅ Backend is reachable"
2. Visit: https://atv-front.vercel.app/atv
   - Should show ATV cards with images
3. Visit: https://atv-front.vercel.app/contact
   - Should show contact information
4. Visit: https://atv-front.vercel.app/login
   - Try logging in (should work without "Network error")

## Visual Checklist

```
Environment Variables in Vercel:
┌─────────────────────────────────────────────┐
│ Name:  VITE_API_BASE_URL                   │
│ Value: https://your-backend.onrender.com   │
│ [ ✓ ] Production                           │
│ [ ✓ ] Preview                              │
│ [   ] Development                          │
└─────────────────────────────────────────────┘
```

## Common Mistakes

### ❌ Mistake 1: Wrong URL format

```bash
# Don't add /api at the end
VITE_API_BASE_URL=https://backend.onrender.com/api  # ❌ WRONG

# Don't add trailing slash
VITE_API_BASE_URL=https://backend.onrender.com/     # ❌ WRONG

# Just the base URL
VITE_API_BASE_URL=https://backend.onrender.com      # ✅ CORRECT
```

### ❌ Mistake 2: Not redeploying

Adding the environment variable is not enough. You **must redeploy** for changes to take effect.

### ❌ Mistake 3: Forgot to enable Production

Make sure the "Production" checkbox is selected when adding the variable.

## Backend CORS Configuration

Your backend also needs to allow requests from Vercel. In your backend code, make sure CORS is configured:

```javascript
// backend/server.js (or wherever you configure CORS)
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://atv-front.vercel.app", // Your Vercel domain
    ],
    credentials: true,
  })
);
```

If you have a custom domain, add it to the `origin` array as well.

## Still Having Issues?

### Check Browser Console

1. Open your site: https://atv-front.vercel.app/atv
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Look for errors:

```
❌ "Failed to fetch" → Backend is down or CORS issue
❌ "net::ERR_NAME_NOT_RESOLVED" → Wrong backend URL
❌ "localhost:5000" in network tab → Environment variable not set
✅ "your-backend.onrender.com" in network tab → Configuration correct!
```

### Check Network Tab

1. Open developer tools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for requests to `/api/atvs` or `/api/contact`
5. Check which URL they're calling:
   - If showing `localhost:5000` → Variable not set ❌
   - If showing `your-backend.onrender.com` → Variable set correctly ✅

### Debug Page

Visit: https://atv-front.vercel.app/debug

This shows:

- Current backend URL being used
- Whether environment variable is set
- Connection test results

## After Everything Works

Once your site is working:

1. **Remove the debug page** (optional, for security):

   ```bash
   git rm src/pages/Debug.jsx
   # Also remove the route from src/App.jsx
   ```

2. **Test all features**:

   - [ ] Home page loads
   - [ ] ATV page shows vehicles
   - [ ] Contact page shows information
   - [ ] Login works
   - [ ] Admin panel accessible after login

3. **Update CORS** to only allow your production domain (remove wildcards)

## Need Help?

If you're still stuck:

1. Share a screenshot of:

   - Your Vercel environment variables page
   - The `/debug` page output
   - Browser console errors (F12 → Console tab)

2. Verify:
   - [ ] Backend is running on Render
   - [ ] Backend URL is correct (no typos)
   - [ ] Environment variable is set in Vercel
   - [ ] You redeployed after adding the variable
   - [ ] CORS is configured on backend
