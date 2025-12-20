# Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- Sanity project deployed and accessible
- Environment variables ready (see `.env.local.example`)

## Environment Variables

Both the frontend and Sanity Studio need environment variables:

### Frontend (fe/)
Create `.env.local` with:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=vs7tkh7i
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Sanity Studio (studio/)
Environment variables are in `sanity.config.ts` - no `.env` needed.

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

#### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Set Root Directory to `fe`
5. Add environment variables from `.env.local`
6. Click "Deploy"

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from the fe/ directory
cd fe
vercel --prod
```

### Option 2: Deploy Sanity Studio

The Sanity Studio needs to be deployed separately:

```bash
cd studio

# Deploy to Sanity's hosting
npm run deploy

# Or deploy GraphQL API
npm run deploy-graphql
```

After deployment, add your Vercel domain to CORS origins in Sanity:
1. Go to [sanity.io/manage](https://manage.sanity.io)
2. Select your project
3. Go to API settings
4. Add your Vercel domain to CORS origins

## Maintenance Mode

To enable maintenance mode while updating content:

1. Open `fe/middleware.ts`
2. Change `MAINTENANCE_MODE` from `false` to `true`:
   ```typescript
   const MAINTENANCE_MODE = true
   ```
3. Commit and push (or redeploy)
4. All visitors will see the maintenance page
5. When ready, set back to `false`

## Transferring Deployment Between Vercel Accounts

### Method 1: Transfer Ownership (Existing Deployment)
1. Go to your Vercel project settings → General
2. Scroll to "Transfer Project"
3. Enter client's Vercel email
4. Client accepts the transfer

### Method 2: Client Imports from GitHub
1. Make your GitHub repo accessible (public or give access)
2. Client goes to Vercel → Add New Project
3. Client pastes your GitHub repo URL
4. Vercel imports it to their account
5. Client sets up environment variables
6. Client deploys

### Method 3: Manual CLI Deployment (No GitHub)
Client can deploy directly from their machine:
```bash
npm i -g vercel
vercel login  # Client logs in
cd /path/to/sara-francuz/fe
vercel --prod
```

## Domain Setup

After deployment:
1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown by Vercel
4. Wait for DNS propagation (can take up to 48 hours)

## Revalidation Webhook (Optional)

To instantly update content when publishing in Sanity:

1. Deploy the frontend first to get the Vercel URL
2. In Sanity Studio, add webhook:
   - Go to [sanity.io/manage](https://manage.sanity.io)
   - Select project → API → Webhooks
   - Add webhook: `https://your-domain.vercel.app/api/revalidate`
   - Add a secret token
3. Add the token to Vercel environment variables:
   ```
   REVALIDATE_SECRET=your-secret-token
   ```

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure `fe/` is set as root directory in Vercel
- Check Node.js version (should be 18.x or higher)

### Content Not Updating
- Check revalidation settings in pages (currently set to 1 hour)
- Use webhook for instant updates
- Force revalidate via API: `POST /api/revalidate`

### Sanity Studio Can't Connect
- Add Vercel domain to CORS origins in Sanity dashboard
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Ensure Sanity project is deployed

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Sanity Studio deployed
- [ ] Environment variables set
- [ ] CORS origins configured in Sanity
- [ ] Custom domain connected (if applicable)
- [ ] Content appears correctly
- [ ] Forms and cart working
- [ ] Images loading properly
- [ ] Test on mobile and desktop
