# Production Environment Configuration

## Frontend Environment Variables

For Vercel deployment, configure these environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Backend Deployment

The backend API needs to be deployed separately. Recommended platforms:
- Railway
- Heroku
- AWS
- DigitalOcean

After deploying the backend, update the NEXT_PUBLIC_API_URL to point to your backend domain.

## Vercel Deployment Steps

1. Deploy the backend API to a separate hosting service
2. Set the NEXT_PUBLIC_API_URL environment variable in Vercel to your backend URL
3. Deploy the frontend to Vercel

## Alternative: Next.js API Routes

For a fully integrated solution on Vercel, consider moving the backend functionality to Next.js API routes.

## Security Considerations

- Store JWT_SECRET_KEY securely in environment variables
- Use HTTPS for all API communications
- Implement proper CORS policies for production