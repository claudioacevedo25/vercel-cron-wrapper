# ⏰ Vercel Cron Wrapper

This project is a lightweight wrapper using [Vercel Scheduled Functions](https://vercel.com/docs/cron-jobs) to trigger a cron job that hits an external NestJS backend endpoint.

## 🚀 What It Does

It runs a serverless function every day at `10:00 (Spain time)` and sends a `POST` request to:
https://<YOUR_BACKEND_URL>/scheduler/track-all-products

The backend handles the actual scraping, price tracking, and notification logic.

---

## 📁 Project Structure

.
├── api/
│ └── track-prices.ts # Serverless function triggered by the cron
├── vercel.json # Cron schedule configuration
├── .env # Environment variables
├── .gitignore
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
NEST_API_URL=https://your-backend-url.com
INTERNAL_API_KEY=your-secret-key # For send header authorization
```
