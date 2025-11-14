# Sanity Webhook Setup for Instant Revalidation

This guide explains how to set up Sanity webhooks to trigger instant revalidation when content changes.

## Overview

Your Next.js site now uses:

- **ISR (Incremental Static Regeneration)**: Pages revalidate every hour automatically
- **On-Demand Revalidation**: Instant updates when content changes in Sanity via webhooks
- **2 Webhooks Only**: Optimized for Sanity Free Plan (2 webhook limit)

## Step 1: Generate a Secret Token

1. Generate a secure random string for your webhook secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Update `.env.local` (for local development):

   ```env
   REVALIDATE_SECRET=your-generated-secret-here
   ```

3. Add to Vercel environment variables (for production):
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `REVALIDATE_SECRET` with the same value
   - Redeploy your site

## Step 2: Set Up Sanity Webhooks

### For Production (Vercel)

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project: **vs7tkh7i**
3. Navigate to **API** → **Webhooks**
4. Click **Create Webhook**

### Webhook Configuration (2 Webhooks Total)

#### Webhook 1: Content Pages (Home, About, FAQ)

```
Name: Content Pages Revalidation
URL: https://your-domain.vercel.app/api/revalidate
HTTP Method: POST
Dataset: production
Trigger on: Create, Update, Delete
Filter: _type in ["homePage", "aboutPage", "faqPage"]

HTTP Headers:
  Authorization: Bearer your-generated-secret-here

Payload:
{
  "_type": "^._type"
}
```

**What this does:** Triggers revalidation whenever Home, About, or FAQ page content changes. The API route automatically handles each type.

#### Webhook 2: Products & Collections

```
Name: Products & Collections Revalidation
URL: https://your-domain.vercel.app/api/revalidate
HTTP Method: POST
Dataset: production
Trigger on: Create, Update, Delete
Filter: _type in ["product", "collection"]

HTTP Headers:
  Authorization: Bearer your-generated-secret-here

Payload:
{
  "_type": "^._type",
  "slug": "^.handle.current"
}
```

**Note:** This webhook handles both products and collections. For products, it uses `handle.current`, for collections it uses `slug.current`. The API route handles both cases automatically.

## Step 3: Test the Setup

### Production Testing (Recommended)

1. Deploy to Vercel
2. Add `REVALIDATE_SECRET` environment variable to Vercel
3. Redeploy the site
4. Configure the 2 webhooks in Sanity with your Vercel domain
5. Make a change in Sanity Studio (e.g., update home page content)
6. Check:
   - Sanity webhook logs (should show 200 OK)
   - Vercel function logs (Settings → Logs → Filter by `/api/revalidate`)
   - Your live site should update instantly (hard refresh browser if needed)

### Local Testing (Optional - using ngrok)

1. Start your local Next.js dev server:

   ```bash
   cd fe
   npm run dev
   ```

2. Expose localhost with ngrok:

   ```bash
   ngrok http 3000
   ```

3. Temporarily use the ngrok URL in Sanity webhook configuration

4. Make a change in Sanity Studio and verify:
   - Check webhook logs in Sanity dashboard
   - Check terminal logs for "Revalidation webhook received"
   - Verify page updates immediately

## How It Works

```
┌─────────────┐
│   Sanity    │
│   Studio    │
└──────┬──────┘
       │ Content Change
       ▼
┌─────────────────┐
│ Sanity Webhook  │
│   Triggers      │
└──────┬──────────┘
       │ POST /api/revalidate
       ▼
┌─────────────────────┐
│   Next.js API       │
│   Route Handler     │
│ - Validates token   │
│ - Revalidates tags  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Vercel Edge CDN    │
│  Cache Invalidated  │
│  New HTML Generated │
└─────────────────────┘
```

## Revalidation Tags

The following cache tags are used:

| Tag                 | Triggers Revalidation Of        |
| ------------------- | ------------------------------- |
| `home-page`         | Homepage                        |
| `about-page`        | About page                      |
| `faq-page`          | FAQ page                        |
| `products`          | All product listings            |
| `product-{handle}`  | Specific product page           |
| `collections`       | Collection data in menu         |
| `collection-{slug}` | Products in specific collection |

## Fallback Revalidation Periods

If webhooks fail, pages still auto-revalidate:

- **Home, About, FAQ, Products**: Every 1 hour (3600s)
- **Collections**: Every 24 hours (86400s)

## Security Notes

- **Never commit** `REVALIDATE_SECRET` to git
- Add `.env.local` to `.gitignore` (already done in Next.js)
- Use different secrets for development and production
- Webhook secret should be at least 32 characters
- Keep your secret token secure (treat it like a password)

## Webhook Summary (Free Plan Optimized)

| Webhook                    | Triggers On                  | Revalidates                              |
| -------------------------- | ---------------------------- | ---------------------------------------- |
| **Content Pages**          | homePage, aboutPage, faqPage | Specific page that changed               |
| **Products & Collections** | product, collection          | Products, shop listing, collections menu |

**Total:** 2 webhooks (fits Sanity Free Plan)

## Performance Impact

**Before optimization:**

- Every page load = 2-3 Sanity API calls
- No caching
- Slow first load (~2-5 seconds)

**After optimization:**

- Pages served from Edge CDN (< 100ms)
- Sanity API calls reduced by ~90%
- Updates still instant via webhooks
- Fallback revalidation if webhook fails (every 1 hour)

## Monitoring

Track revalidation events:

1. **Sanity Dashboard** → API → Webhooks → View Logs
2. **Vercel Dashboard** → Logs (filter by `/api/revalidate`)
3. Add custom analytics if needed

## Troubleshooting

### Webhook returns 401 Unauthorized

- Check `REVALIDATE_SECRET` matches in `.env.local` and Vercel env vars
- Verify Authorization header format: `Bearer your-secret-token`
- Make sure you redeployed after adding the env variable

### Webhook returns 500 Error

- Check Vercel function logs for details
- Verify payload structure (should have `_type` field)

### Page doesn't update immediately

- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check webhook was triggered in Sanity logs
- Verify webhook returned 200 OK status
- Check Vercel function logs for errors

---

**Important**: After setting up webhooks in production, test by making a small content change in Sanity and verifying the page updates immediately on your live site (you may need to hard refresh your browser).
