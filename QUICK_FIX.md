# 🔥 QUICK FIX - Your Site is Empty

## The Problem

Your site https://atv-front.vercel.app is deployed but showing only the footer because **Vercel doesn't know where your backend is**.

## The Solution (3 steps, 5 minutes)

### 1️⃣ Add Environment Variable in Vercel

```
Go to: https://vercel.com/dashboard
→ Click your project (atv-front)
→ Settings → Environment Variables
→ Add New

Name:  VITE_API_BASE_URL
Value: https://your-render-backend-url.onrender.com

✓ Check "Production"
→ Save
```

### 2️⃣ Redeploy

```
→ Deployments tab
→ Click ⋮ (three dots) on latest deployment
→ Redeploy
```

### 3️⃣ Test

```
Visit: https://atv-front.vercel.app/debug

Should show:
✅ "VITE_API_BASE_URL: https://your-backend.onrender.com"
✅ "Backend is reachable"

Then check:
- /atv → Should show vehicles
- /contact → Should show contact info
- /login → Should work without errors
```

## What Was Already Fixed

✅ **404 errors on reload** - Fixed with `vercel.json`  
✅ **Background images** - Fixed in `Fleet.scss`  
✅ **Routing issues** - All routes work now

## What Still Needs Fixing

❌ **Backend connection** - Need to set environment variable (see above)

## Files Changed

```bash
# Commit and push these changes:
git add .
git commit -m "Add Vercel config, debug page, and fix background images"
git push origin main
```

New files:

- `vercel.json` - Handles SPA routing
- `src/pages/Debug.jsx` - Shows current API configuration
- `VERCEL_SETUP.md` - Detailed setup guide
- `DEPLOYMENT_GUIDE.md` - Complete deployment docs

Modified files:

- `src/pages/Home/sections/Fleet.jsx` - Removed inline background
- `src/pages/Home/sections/Fleet.scss` - Added background in CSS
- `src/pages/ATVs/ATVs.jsx` - Removed inline background styles
- `src/pages/ATVs/ATVs.scss` - Added background images in CSS
- `src/App.jsx` - Added /debug route

## Next Actions

1. **NOW**: Set environment variable in Vercel (see step 1 above)
2. **NOW**: Redeploy (see step 2 above)
3. **NOW**: Test /debug page (see step 3 above)
4. **THEN**: Commit and push the code changes
5. **AFTER**: Configure CORS in your backend to allow Vercel domain

## Your Backend CORS (Important!)

In your Render backend, make sure CORS allows your Vercel URL:

```javascript
// backend/server.js
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://atv-front.vercel.app", // Add this!
    ],
    credentials: true,
  })
);
```

## Help Resources

- **Quick Guide**: See `VERCEL_SETUP.md`
- **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- **Debug Tool**: Visit `/debug` on your site after setting the variable

---

**TL;DR**: Add `VITE_API_BASE_URL` in Vercel settings, redeploy, done! 🚀
