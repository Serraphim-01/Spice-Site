import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { ShoppingCart } from "./components/ShoppingCart";
import { Checkout } from "./components/Checkout";
import { ProductModal } from "./components/ProductModal";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Premium Nigerian Turmeric Powder",
    price: 3500,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1634114627043-9a2abf455494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzJTIwdHVybWVyaWMlMjBwYXByaWthfGVufDF8fHx8MTc1NzU3OTA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Pure, sun-dried turmeric from Nigerian farms. Rich in curcumin with powerful anti-inflammatory properties.",
    origin: "Nigeria",
    weight: "250g",
    inStock: true,
    tags: ["Anti-inflammatory", "Organic", "Ground"]
  },
  {
    id: "2",
    name: "Authentic Cardamom Pods",
    price: 7800,
    image: "https://images.unsplash.com/photo-1624351251625-cf02b018223c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYW1vbSUyMGNpbm5hbW9uJTIwc3RpY2tzfGVufDF8fHx8MTc1NzU3OTA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Premium green cardamom pods with intense aroma. Perfect for teas, desserts, and savory dishes.",
    origin: "Ethiopia",
    weight: "100g",
    inStock: true,
    tags: ["Whole Spice", "Aromatic", "Premium"]
  },
  {
    id: "3",
    name: "Fresh Ground Black Pepper",
    price: 4200,
    originalPrice: 5000,
    image: "https://images.unsplash.com/photo-1621800971835-ba546089bd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBlcHBlciUyMGdpbmdlciUyMHJvb3R8ZW58MXx8fHwxNzU3NTc5MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Freshly ground black pepper with bold, pungent flavor. Essential for every African kitchen.",
    origin: "Ghana",
    weight: "200g",
    inStock: true,
    tags: ["Ground", "Pungent", "Essential"]
  },
  {
    id: "4",
    name: "Traditional Curry Powder Blend",
    price: 5500,
    image: "https://images.unsplash.com/photo-1650559347569-09a6bbed5f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJyeSUyMHBvd2RlciUyMHNwaWNlJTIwYmxlbmR8ZW58MXx8fHwxNzU3NTc5MDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A perfect blend of 12 traditional African spices. Adds authentic flavor to stews and rice dishes.",
    origin: "Morocco",
    weight: "300g",
    inStock: true,
    tags: ["Blend", "Traditional", "Complex"]
  },
  {
    id: "5",
    name: "Coriander & Cumin Seed Mix",
    price: 3800,
    image: "https://images.unsplash.com/photo-1639322752435-9c248abfacdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JpYW5kZXIlMjBjdW1pbiUyMHNlZWRzfGVufDF8fHx8MTc1NzU3OTA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hand-selected coriander and cumin seeds. Perfect for toasting and grinding fresh spice blends.",
    origin: "Kenya",
    weight: "150g",
    inStock: false,
    tags: ["Whole Seeds", "Toast & Grind", "Aromatic"]
  },
  {
    id: "6",
    name: "Smoked Paprika Powder",
    price: 4800,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1634114627043-9a2abf455494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzJTIwdHVybWVyaWMlMjBwYXByaWthfGVufDF8fHx8MTc1NzU3OTA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Rich, smoky paprika with deep red color. Adds warmth and complexity to meat and vegetable dishes.",
    origin: "South Africa",
    weight: "180g",
    inStock: true,
    tags: ["Smoky", "Ground", "Rich Color"]
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartTotal > 10000 ? 0 : 1500;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <Hero />
        <ProductGrid
          products={sampleProducts}
          onAddToCart={addToCart}
          onViewDetails={handleViewDetails}
        />

        {/* About Section */}
        <section id="about" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-orange-900 mb-4">
                Why Choose AfriSpice?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to bringing you the most authentic African spices,
                sourced directly from farmers and processed using traditional methods.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-orange-900 mb-2">100% Natural</h3>
                <p className="text-gray-600 text-sm">
                  No artificial preservatives, colors, or additives. Just pure, natural spices.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-orange-900 mb-2">Authentic Origins</h3>
                <p className="text-gray-600 text-sm">
                  Sourced directly from traditional spice-growing regions across Africa.
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-orange-900 mb-2">Supporting Farmers</h3>
                <p className="text-gray-600 text-sm">
                  Fair trade practices that support local farming communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl text-orange-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about our spices or need help with your order?
              We're here to help!
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-orange-50 rounded-xl">
                <h3 className="text-orange-900 mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center justify-center gap-2">
                    <span>📞</span> +234 (0) 123 456 7890
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span>✉️</span> hello@afrispice.com
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span>📍</span> Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="p-6 bg-orange-50 rounded-xl">
                <h3 className="text-orange-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={total}
        onOrderComplete={handleOrderComplete}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />

      <Toaster />
    </div>
  );
}
