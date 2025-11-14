# Deployment Guide for ATV Rent

## 🚨 CRITICAL: Environment Variable Not Set

**Your site is deployed but showing no content because the environment variable is missing!**

### Immediate Fix Required:

1. Go to: https://vercel.com/dashboard → **Your Project** → **Settings** → **Environment Variables**
2. Add: `VITE_API_BASE_URL` with your Render backend URL
3. **Redeploy** the application

**Debug Page**: Visit https://atv-front.vercel.app/debug to see your current configuration and what's wrong.

### Symptoms You're Experiencing:

- ✅ Pages load (no 404 error) - **FIXED**
- ❌ Only footer shows, no content - **Backend not configured**
- ❌ Login shows "Network error" - **Backend not configured**
- ❌ Empty pages on mobile and desktop - **Backend not configured**

### Root Cause:

Your frontend is trying to fetch data from `http://localhost:5000` (the default) instead of your Render backend URL.

---

## Issues Fixed

### 1. ✅ Background Image Issues (Fleet.jsx & ATVs.jsx)

- **Problem**: SVG backgrounds weren't loading in production when using inline styles
- **Solution**: Moved background images from inline styles to CSS files
- **Changed**:
  - `Fleet.scss` now includes `background-image: url('../../../assets/atvBackground.svg');`
  - `ATVs.scss` now includes background images for desktop and mobile views

### 2. ✅ 404 on Page Reload

- **Problem**: Vercel returned 404 when refreshing pages like `/atv`, `/contact`, etc.
- **Solution**: Created `vercel.json` with SPA routing configuration
- **What it does**: Redirects all routes to `index.html` so React Router can handle routing

### 3. ✅ Route Access

- **Problem**: Routes weren't accessible (same as #2)
- **Solution**: Fixed by `vercel.json` configuration

## Deployment Steps

### Step 1: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to: **Settings** → **Environment Variables**
3. Add the following variable:

```
Name: VITE_API_BASE_URL
Value: https://your-backend-name.onrender.com
Environment: Production
```

**Important**: Replace `https://your-backend-name.onrender.com` with your actual Render backend URL (without trailing slash).

### Step 2: Configure CORS on Your Backend (Render)

Your backend needs to allow requests from your Vercel frontend. Add your Vercel URL to the CORS configuration:

```javascript
// In your backend server configuration
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://your-vercel-app.vercel.app", // Your Vercel domain
      "https://your-custom-domain.com", // If you have a custom domain
    ],
    credentials: true,
  })
);
```

### Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Fix: Add Vercel SPA routing config and fix background images"
git push origin main
```

Vercel will automatically redeploy when you push to your connected branch.

### Step 4: Verify Deployment

After deployment completes:

1. ✅ Test navigation: Click through all pages
2. ✅ Test reload: Try refreshing pages like `/atv`, `/contact`, `/terms`
3. ✅ Test background: Check if Fleet section backgrounds display correctly
4. ✅ Test API: Verify data loads from your Render backend
5. ✅ Test admin: Try logging in and accessing `/admin` route

## Files Created/Modified

### New Files:

- ✅ `vercel.json` - Vercel SPA routing configuration

### Modified Files:

- ✅ `src/pages/Home/sections/Fleet.jsx` - Removed inline background style
- ✅ `src/pages/Home/sections/Fleet.scss` - Added background-image in CSS
- ✅ `src/pages/ATVs/ATVs.jsx` - Removed inline background styles
- ✅ `src/pages/ATVs/ATVs.scss` - Added background images in CSS

## Environment Variables Setup

### Local Development

Create a `.env.local` file in the project root (already in .gitignore):

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Production (Vercel)

Set in Vercel Dashboard:

```
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

## Troubleshooting

### Still Getting 404 Errors?

1. Make sure `vercel.json` is in the root directory
2. Redeploy your project after adding the file
3. Clear browser cache and try again

### Background Images Not Showing?

1. Check that `src/assets/atvBackground.svg` exists
2. Verify the file is committed to git
3. Check browser console for any 404 errors on assets

### API Not Working?

1. Verify `VITE_API_BASE_URL` is set correctly in Vercel
2. Check that your Render backend is running
3. Verify CORS is configured correctly on the backend
4. Check browser console for CORS errors

### Backend URL Format

- ✅ Correct: `https://your-backend.onrender.com`
- ❌ Wrong: `https://your-backend.onrender.com/`
- ❌ Wrong: `https://your-backend.onrender.com/api`

## Additional Vercel Configuration (Optional)

If you want to add custom headers or redirects, you can expand `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Next Steps

1. Set the environment variable in Vercel
2. Configure CORS in your backend
3. Push these changes to trigger a redeploy
4. Test all functionality

## Support

If you encounter any issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Ensure backend is accessible from the browser
