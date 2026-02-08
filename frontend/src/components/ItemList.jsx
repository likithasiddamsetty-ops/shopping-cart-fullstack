import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Package, History, LogOut, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ItemList = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchItems();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      toast.error('Error loading items');
    }
  };

  const addToCart = async (itemId) => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/carts',
        { itemId },
        getAuthHeader()
      );
      toast.success('Item added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const viewCart = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/carts',
        getAuthHeader()
      );
      setCartItems(response.data.items || []);
      
      if (response.data.items && response.data.items.length > 0) {
        const cartInfo = response.data.items
          .map(item => `${item.itemId.name} (Qty: ${item.quantity})`)
          .join('\n');
        window.alert(`Your Cart:\n\n${cartInfo}`);
      } else {
        window.alert('Your cart is empty!');
      }
    } catch (error) {
      window.alert('Error loading cart');
    }
  };

  const viewOrderHistory = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/orders',
        getAuthHeader()
      );
      setOrders(response.data);
      
      if (response.data.length > 0) {
        const orderInfo = response.data
          .map((order, index) => 
            `Order ${index + 1}: $${order.totalAmount.toFixed(2)} - ${new Date(order.createdAt).toLocaleDateString()}`
          )
          .join('\n');
        window.alert(`Your Order History:\n\n${orderInfo}`);
      } else {
        window.alert('No orders yet!');
      }
    } catch (error) {
      window.alert('Error loading order history');
    }
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/orders',
        {},
        getAuthHeader()
      );
      toast.success('Order placed successfully!');
      setCartItems([]);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/users/logout',
        {},
        getAuthHeader()
      );
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      onLogout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-sm text-gray-600">Welcome, {username}!</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={checkout}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Package size={18} />
                Checkout
              </button>
              
              <button
                onClick={viewCart}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Cart
              </button>
              
              <button
                onClick={viewOrderHistory}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <History size={18} />
                Orders
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Items Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Items</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items available yet.</p>
            <p className="text-gray-500 text-sm mt-2">
              Use the backend API to add items to the store.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item._id)}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemList;
