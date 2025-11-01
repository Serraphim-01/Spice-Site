import { ProductGrid } from "./ProductGrid";
import { ProductModal } from "./ProductModal";
import { useState } from "react";

const sampleProducts = [
  {
    id: "1",
    name: "Premium Cameroon Pepper",
    price: 8500,
    originalPrice: 10000,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Rich, aromatic Cameroon pepper with a distinctive heat and complex flavor profile. Perfect for traditional African dishes.",
    origin: "Cameroon",
    weight: "100g",
    inStock: true,
    tags: ["Hot", "Aromatic", "Traditional"]
  },
  {
    id: "2",
    name: "Ethiopian Berbere Spice",
    price: 7200,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Authentic Ethiopian berbere spice blend with chili peppers, garlic, ginger, and traditional spices. Essential for Ethiopian cuisine.",
    origin: "Ethiopia",
    weight: "150g",
    inStock: true,
    tags: ["Spice Blend", "Ethiopian", "Bold"]
  },
  {
    id: "3",
    name: "Ghanaian Alligator Pepper",
    price: 6500,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Traditional Ghanaian alligator pepper, known for its medicinal properties and unique peppery taste. Used in West African cooking.",
    origin: "Ghana",
    weight: "80g",
    inStock: false,
    tags: ["Medicinal", "Traditional", "West African"]
  },
  {
    id: "4",
    name: "Nigerian Curry Powder",
    price: 5800,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Authentic Nigerian curry powder blend with turmeric, coriander, cumin, and local spices. Perfect for Nigerian and West African dishes.",
    origin: "Nigeria",
    weight: "120g",
    inStock: true,
    tags: ["Curry", "Nigerian", "Blend"]
  },
  {
    id: "5",
    name: "Kenyan Cardamom",
    price: 9200,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Premium Kenyan cardamom with a sweet, aromatic flavor. Grown in the fertile highlands of Kenya for exceptional quality.",
    origin: "Kenya",
    weight: "90g",
    inStock: true,
    tags: ["Aromatic", "Sweet", "Highland"]
  },
  {
    id: "6",
    name: "South African Peri-Peri",
    price: 7800,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3BpY2VzfGVufDF8fHx8MTc1NzU3OTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Authentic South African peri-peri spice blend with African bird's eye chilies. Famous for its distinctive heat and flavor.",
    origin: "South Africa",
    weight: "110g",
    inStock: true,
    tags: ["Hot", "Peri-Peri", "South African"]
  }
];

const Products = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductGrid
        products={sampleProducts}
        onAddToCart={onAddToCart}
        onViewDetails={handleViewDetails}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default Products;
