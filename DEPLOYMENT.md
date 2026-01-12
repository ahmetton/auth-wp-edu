# Vercel Deployment Guide

This guide will help you deploy the authentication system to Vercel.

## Prerequisites

- A Vercel account
- A database (PostgreSQL recommended for production)
- (Optional) OAuth credentials for Google/Facebook
- (Optional) SMTP credentials for email

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Create a new Postgres database
4. Vercel will automatically set the `DATABASE_URL` environment variable

### Option B: External Database

Use any PostgreSQL provider (Supabase, Railway, Neon, etc.):

1. Create a PostgreSQL database
2. Get the connection string
3. Add it to Vercel environment variables as `DATABASE_URL`

## Step 2: Update Prisma Schema

For production with PostgreSQL, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

## Step 3: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required Variables

```
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

### Optional OAuth Variables (for social login)

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

**Important OAuth Setup:**
- Update OAuth redirect URIs in provider consoles to include your production URL
- Google: `https://your-domain.vercel.app/api/auth/callback/google`
- Facebook: `https://your-domain.vercel.app/api/auth/callback/facebook`

### Optional Email Variables (for password reset)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## Step 4: Deploy to Vercel

### Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

### Deploy via CLI

```bash
npm i -g vercel
vercel
```

## Step 5: Run Database Migrations

After first deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Run migration: `vercel env pull .env.local && npx prisma migrate deploy`

Or use Vercel's Postgres dashboard to run migrations.

## Step 6: Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `mawredalhuda.com`)
4. Update DNS records as shown by Vercel
5. Update `NEXTAUTH_URL` environment variable to use custom domain
6. Update OAuth redirect URIs to use custom domain

### DNS Configuration

Add these records at your domain registrar:

- **A Record**: `@` pointing to Vercel's IP (shown in Vercel dashboard)
- **CNAME Record**: `www` pointing to `cname.vercel-dns.com`

**Note:** DNS propagation can take up to 48 hours, but usually completes within a few hours.

## Troubleshooting

### Prisma Client Initialization Error

**Symptom:** `PrismaClientInitializationError` in production

**Solution:** The build script now includes `prisma generate` automatically. If you still see this error:

1. Check that `package.json` has: `"build": "prisma generate && next build"`
2. Redeploy the application
3. Check Vercel build logs for errors

### OAuth Provider Errors

**Symptom:** HTML error pages instead of JSON from `/api/auth/providers`

**Solutions:**

1. **Missing Environment Variables:**
   - Verify `NEXTAUTH_SECRET` is set in Vercel
   - Verify `NEXTAUTH_URL` matches your domain
   - If not using OAuth, leave `GOOGLE_CLIENT_ID` etc. empty (don't set them)

2. **Incorrect OAuth Configuration:**
   - Verify redirect URIs in provider console match production URL exactly
   - Check OAuth credentials are valid
   - Ensure OAuth providers are enabled in provider console

3. **Conditional Provider Loading:**
   - The app only loads OAuth providers if BOTH ID and SECRET are set
   - Empty or missing variables will skip that provider (this is correct behavior)

### 405 Method Not Allowed

**Symptom:** POST requests to `/api/auth/_log` fail

**Explanation:** The `/api/auth/_log` endpoint is an internal NextAuth.js endpoint that may not be properly configured. This usually happens when:

1. NextAuth.js version mismatch
2. Browser extensions interfering with requests
3. Middleware blocking requests

**Solutions:**

1. Clear browser cache and cookies
2. Disable browser extensions
3. Check middleware configuration in `middleware.js` (if exists)
4. Verify NextAuth.js version is compatible

### Database Connection Issues

**Symptom:** Cannot connect to database

**Solutions:**

1. Verify `DATABASE_URL` is correctly formatted
2. Check database allows connections from Vercel's IP ranges
3. For Vercel Postgres, ensure the database is in the same region as deployment
4. Check database credentials are correct

### Domain/DNS Issues

**Symptom:** Custom domain not resolving correctly

**Solutions:**

1. **Clear Caches:**
   - Browser cache: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
   - Cloudflare cache: Purge cache in Cloudflare dashboard (if using)

2. **Verify DNS:**
   - Use DNS checker tool: https://dnschecker.org/
   - Verify A/CNAME records are correctly set
   - Check for conflicting records

3. **Check SSL:**
   - Vercel automatically provisions SSL certificates
   - Wait a few minutes after domain configuration
   - Check certificate status in Vercel dashboard

## Build Optimization

The application now automatically:

1. Generates Prisma Client during build (`prisma generate`)
2. Optimizes for production (minification, tree-shaking)
3. Generates static pages where possible

## Security Checklist

Before going live:

- [ ] Generate and set a strong `NEXTAUTH_SECRET`
- [ ] Use HTTPS (automatic with Vercel)
- [ ] Set correct `NEXTAUTH_URL` for your domain
- [ ] Use production database (not SQLite)
- [ ] Review and restrict database access
- [ ] Enable rate limiting (consider using Vercel's Edge Config)
- [ ] Set up monitoring and error tracking (Sentry, LogRocket, etc.)
- [ ] Review OAuth credentials and scopes
- [ ] Set up proper SMTP for email sending

## Monitoring

Add environment variables for error tracking:

```
SENTRY_DSN=your-sentry-dsn  # Optional
```

## Cost Considerations

- **Vercel:** Free tier includes 100 GB bandwidth/month
- **Database:** Postgres pricing varies by provider
- **Email:** Gmail SMTP is free for low volumes, consider SendGrid/Mailgun for production

## Support

For deployment issues:

1. Check Vercel deployment logs
2. Review build logs for errors
3. Check environment variables are set correctly
4. Verify database migrations ran successfully

## Next Steps

After successful deployment:

1. Test all authentication flows (sign in, sign up, password reset)
2. Test OAuth providers (if configured)
3. Monitor error rates
4. Set up automated backups for your database
5. Configure monitoring and alerting

---

**Note:** This guide assumes you're using the latest version of the application with the Prisma Client fix in the build script.
