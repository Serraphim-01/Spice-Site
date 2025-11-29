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

// Updated spice collection data
const sampleProducts = [
  {
    id: "1",
    name: "Black Pepper",
    price: 3000,
    image: "spices/spices-main/BlackPepper.png",
    images: [
      "spices/spices-main/BlackPepper.png",
      "/spices/BlackPepper-70g.jpg",
      "/spices/BlackPepper-70g-3.jpg",
    ],
    description: "Premium quality black pepper with bold, pungent flavor. Essential for every kitchen.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Ground", "Pungent", "Essential"]
  },
  {
    id: "2",
    name: "Ginger Powder",
    price: 3500,
    image: "spices/spices-main/GingerPowder.png",
    images: [
      "spices/spices-main/GingerPowder.png",
      "/spices/GingerPowder-70g.jpg",
      "/spices/GingerPowder-70g-4.jpg"
    ],
    description: "Freshly ground ginger with intense aroma and warming properties. Perfect for teas and savory dishes.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Ground", "Aromatic", "Warming"]
  },
  {
    id: "3",
    name: "Garlic Powder",
    price: 3000,
    image: "spices/spices-main/GarlicPowder.png",
    images: [
      "spices/spices-main/GarlicPowder.png",
      "/spices/GarlicPowder-70g.jpg",
      "/spices/GarlicPowder-70g-4.jpg"
    ],
    description: "Rich, savory garlic powder with robust flavor. Adds depth to any dish.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Ground", "Savory", "Essential"]
  },
  {
    id: "4",
    name: "Cinnamon Powder",
    price: 3000,
    image: "/spices/CinnamonPowder-70g-5.jpg",
    images: [
      "/spices/CinnamonPowder-70g-5.jpg",
      "/spices/CinnamonPowder-70g-3.jpg",

    ],
    description: "Sweet and warming cinnamon with intense aroma. Perfect for desserts and beverages.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Ground", "Sweet", "Warming"]
  },
  {
    id: "5",
    name: "Bayleaf",
    price: 1800,
    image: "/spices/BayLeaf.jpg",
    images: [
      "/spices/BayLeaf.jpg",
      "/spices/BayLeaf-100g-3.jpg",
      "/spices/BayLeaf-100g-4.jpg",
      "/spices/BayLeaf-100g-6.jpg"
    ],
    description: "Fragrant bay leaves with subtle bitterness. Essential for soups, stews, and braises.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Whole Spice", "Aromatic", "Essential"]
  },
  {
    id: "6",
    name: "Coriander",
    price: 1800,
    image: "spices/spices-main/CorianderPowder.png",
    images: [
      "spices/spices-main/CorianderPowder.png",
      "/spices/CorianderPowder-70g.jpg",
      "/spices/CorrianderPowder-100g-3.jpg"
    ],
    description: "Freshly ground coriander with citrusy, slightly sweet flavor. Perfect for curries and marinades.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Ground", "Citrusy", "Versatile"]
  },
  {
    id: "7",
    name: "Suya Spice",
    price: 1000,
    image: "spices/spices-main/SuyaSpice.png",
    images: [
      "spices/spices-main/SuyaSpice.png",
      "/spices/SuyaSpice-70g.jpg",
      "/spices/SuyaSpice-70g-3.jpg",
      "/spices/SuyaSpice-70g-4.jpg"
    ],
    description: "Authentic Nigerian suya spice blend with perfect heat and flavor balance. Ideal for grilled meats.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Blend", "Spicy", "Traditional"]
  },
  {
    id: "8",
    name: "Paprika",
    price: 2700,
    image: "/spices/Paprika-100g.jpg",
    images: [
      "/spices/spices-main/Paprika.png",
      "/spices/Paprika-100g-2.jpg",
      "/spices/Paprika-100g-6.jpg",
      "/spices/Paprika-100g-8.jpg",
      "/spices/Paprika-100g-10.jpg",
    ],
    description: "Rich, vibrant paprika with deep red color and mild sweetness. Adds color and flavor to any dish.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Ground", "Sweet", "Rich Color"]
  },
  {
    id: "9",
    name: "All Purpose",
    price: 2700,
    image: "/spices/AllPurposeSpice.jpg",
    images: [
      "/spices/AllPurposeSpice-100g-2.jpg",
      "/spices/AllPurposeSpice-100g-3.jpg",
      "/spices/AllPurposeSpice-100g-5.jpg",
      "/spices/AllPurposeSpice-100g-10.jpg",
    ],
    description: "Versatile all-purpose spice blend with balanced flavors. Perfect for everyday cooking.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Blend", "Versatile", "Balanced"]
  },
  {
    id: "10",
    name: "Curry Powder",
    price: 2700,
    image: "/spices/CurrySpice-100g.jpg",
    images: [
      "/spices/spices-main/CurrySpice.png",
      "/spices/CurrySpice-100g-2.jpg",
      "/spices/CurrySpice-100g-3.jpg",
      "/spices/CurrySpice-100g-4.jpg",
      "/spices/CurrySpice-100g-8.jpg",
    ],
    description: "Traditional curry powder blend with complex flavors. Adds authentic taste to curries and stews.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Blend", "Complex", "Traditional"]
  },
  {
    id: "11",
    name: "100g Herb Mix",
    price: 10000,
    image: "/spices/spices-main/BigSpices.png",
    images: [
      "/spices/spices-main/BigSpices.png",
      "/spices/100g-Spices-3.jpg",
      "/spices/100g-spices.jpg"
    ],
    description: "Rich and robust herb blend with concentrated Mediterranean flavors. Ideal for hearty dishes and larger portions.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Blend", "Concentrated", "Hearty"]
  },
  {
    id: "14",
    name: "All Herb Mix",
    price: 2700,
    image: "/spices/spices-main/AllSpices.png",
    images: [
      "/spices/spices-main/AllSpices.png",
      "/spices/All-Spices-3.jpg"
    ],
    description: "Balanced herb seasoning blend with Mediterranean flavors. Versatile for all types of dishes.",
    origin: "Nigeria",
    weight: "70g & 100g",
    inStock: true,
    tags: ["Blend", "Versatile", "Balanced"]
  },
  {
    id: "13",
    name: "70g Herb Mix",
    price: 2700,
    image: "/spices/spices-main/SmallSpices.png",
    images: [
      "/spices/spices-main/SmallSpices.png",
      "/spices/70g-spices-3.jpg",
      "/spices/70g-Spices-4.jpg"
    ],
    description: "Light and aromatic herb blend with delicate flavors. Perfect for everyday cooking and lighter meals.",
    origin: "Nigeria",
    weight: "70g",
    inStock: true,
    tags: ["Blend", "Aromatic", "Everyday"]
  },
  {
    id: "12",
    name: "Pepper Soup",
    price: 3000,
    image: "/spices/PeppersoupSpice.jpg",
    images: [
      "/spices/spices-main/PeppersoupSpice.png",
      "/spices/PepperSoupSpice-100g-2.jpg",
      "/spices/PepperSoupSpice-100g-4.jpg",
      "/spices/PepperSoupSpice-100g-3.jpg",
      "/spices/PepperSoupSpice-100g-13.jpg",
    ],
    description: "Spicy pepper soup spice blend with authentic Nigerian flavors. Perfect for traditional pepper soup.",
    origin: "Nigeria",
    weight: "100g",
    inStock: true,
    tags: ["Blend", "Spicy", "Traditional"]
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
                Why Choose RichJoash?
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
