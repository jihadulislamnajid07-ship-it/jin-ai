# JN Ai — Enhanced Starter

Features added:
- Chat API proxy to your jin 1 model
- Admin panel unlocked by code (stores session token in cookie)
- File upload for training data (stores temporarily on server; recommend S3/Supabase)
- OCR via Tesseract.js client-side (no server dependency)
- Voice flow: client-side recording, upload to /api/stt (proxy to external STT service or model)
- Live Camera: capture snapshot and send to /api/analyze (placeholder for model)
- Vector DB placeholders for document search (Pinecone)

Follow .env.example and update env vars before deploying.
