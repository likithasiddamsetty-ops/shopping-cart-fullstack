# 🚀 QUICK START GUIDE - TELUGU

## స్టెప్ 1: ప్రాజెక్ట్ ఎక్స్‌ట్రాక్ట్ చేయండి

1. ZIP file ని extract చేయండి
2. Documents folder లో paste చేయండి
3. VS Code లో folder open చేయండి

## స్టెప్ 2: Backend Setup

### Terminal 1 లో:

```bash
# Backend folder లోకి వెళ్ళండి
cd Documents/shopping-cart-fullstack/backend

# Dependencies install చేయండి
npm install

# Server start చేయండి
npm start
```

✅ Output చూడాలి:
```
✅ Connected to MongoDB
🚀 Server is running on http://localhost:5000
```

## స్టెప్ 3: Frontend Setup

### కొత్త Terminal 2 open చేసి:

```bash
# Frontend folder లోకి వెళ్ళండి
cd Documents/shopping-cart-fullstack/frontend

# Dependencies install చేయండి
npm install

# Dev server start చేయండి
npm run dev
```

✅ Output చూడాలి:
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

## స్టెప్ 4: Sample Items Add చేయండి (Optional)

Postman లేదా Thunder Client use చేసి:

**Method:** POST  
**URL:** `http://localhost:5000/items`  
**Body (JSON):**

```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "imageUrl": "https://via.placeholder.com/300x200?text=Laptop"
}
```

మరిన్ని items add చేయండి (keyboard, mouse, etc.)

## స్టెప్ 5: ఉపయోగించండి!

1. Browser లో `http://localhost:5173` open చేయండి
2. Sign Up చేయండి (username + password)
3. Login చేయండి
4. Items browse చేసి cart కి add చేయండి
5. Checkout click చేసి order place చేయండి

## ⚠️ Important Notes:

1. **MongoDB running undela ensure చేయండి** (service automatic ga run avutundi)
2. **రెండు terminals run avvaలి** - Backend + Frontend
3. Backend port: 5000, Frontend port: 5173

## 🐛 Problems Aithe:

### Backend start kavatle?
```bash
# MongoDB service check
services.msc → MongoDB Server → Start
```

### Frontend start kavatle?
```bash
# npm install repeat cheyyi
cd frontend
npm install
npm run dev
```

### Items kanipinchataledha?
- Postman use chesi items add cheyyi
- Backend console lo errors check cheyyi

---

**All the best! 🎉**
