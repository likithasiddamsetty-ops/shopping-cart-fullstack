# 🛒 Shopping Cart Full Stack Application

Complete e-commerce shopping cart application with Node.js backend and React frontend.

## 📋 Features

- ✅ User Registration & Login
- ✅ Single Device Login (Token-based)
- ✅ Add Items to Cart
- ✅ View Cart Items
- ✅ Place Orders
- ✅ View Order History
- ✅ Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React Icons

## 📁 Project Structure

```
shopping-cart-fullstack/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   └── ItemList.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally on port 27017)

### Step 1: Extract Project

1. Extract the downloaded ZIP file
2. Open the folder in VS Code or your preferred editor

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

Backend will run on: `http://localhost:5000`

### Step 3: Frontend Setup

Open a **NEW terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 4: Add Sample Items (Optional)

You can add items using Postman or any REST client:

**POST** `http://localhost:5000/items`

**Body (JSON):**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "imageUrl": "https://via.placeholder.com/300x200?text=Laptop"
}
```

Add more items:

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "imageUrl": "https://via.placeholder.com/300x200?text=Mouse"
}
```

```json
{
  "name": "Mechanical Keyboard",
  "description": "RGB mechanical keyboard",
  "price": 79.99,
  "imageUrl": "https://via.placeholder.com/300x200?text=Keyboard"
}
```

```json
{
  "name": "USB-C Hub",
  "description": "7-in-1 USB-C hub",
  "price": 39.99,
  "imageUrl": "https://via.placeholder.com/300x200?text=USB+Hub"
}
```

## 📱 How to Use

### 1. Sign Up

- Open `http://localhost:5173`
- Click "Don't have an account? Sign Up"
- Enter username and password
- Click "Sign Up"

### 2. Login

- Enter your username and password
- Click "Login"
- **Note:** You can only be logged in from one device at a time

### 3. Shopping

- Browse available items
- Click "Add" button to add items to cart
- Click "Cart" to view your cart items
- Click "Checkout" to place an order
- Click "Orders" to view your order history

### 4. Logout

- Click "Logout" button to end your session
- This will clear your token and allow you to login from another device

## 🔑 API Endpoints

### User Routes

- `POST /users` - Create new user (signup)
- `GET /users` - List all users
- `POST /users/login` - User login
- `POST /users/logout` - User logout (requires auth)

### Item Routes

- `POST /items` - Create new item
- `GET /items` - List all items

### Cart Routes (Protected)

- `POST /carts` - Add item to cart
- `GET /carts` - Get user's cart
- `GET /carts/all` - List all carts

### Order Routes (Protected)

- `POST /orders` - Create order from cart
- `GET /orders` - Get user's orders
- `GET /orders/all` - List all orders

## 🔒 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Token is generated on login
- Token is stored in user's database record
- Only one active token per user (single device login)
- Token is sent with protected requests in Authorization header
- Token is cleared on logout

## ⚠️ Important Notes

1. **MongoDB must be running** before starting the backend
2. **Backend must be running** before starting the frontend
3. Default credentials can be created via signup
4. Items must be added via API before they appear in the UI

## 🐛 Troubleshooting

### Backend won't start

- Check if MongoDB is running
- Verify `.env` file exists with correct configuration
- Run `npm install` in backend folder

### Frontend won't start

- Run `npm install` in frontend folder
- Check if backend is running on port 5000

### Can't login

- Make sure you've created an account first
- Check if you're already logged in on another device
- Verify backend is running

### No items showing

- Add items using the POST /items API
- Check backend console for errors

## 📦 Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variables
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin requests

### Frontend

- react: UI library
- axios: HTTP client
- react-hot-toast: Notifications
- lucide-react: Icons
- tailwindcss: Styling

## 🎯 Assignment Requirements Met

✅ User signup and login
✅ Single device login enforcement
✅ JWT token-based authentication
✅ Add items to cart
✅ View cart items
✅ Place orders
✅ View order history
✅ React frontend with Tailwind CSS
✅ Responsive design
✅ Toast notifications
✅ Error handling

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as part of ABCDE Ventures Assignment

---

**Happy Shopping! 🛍️**
