import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart, Star, Shield, Truck, Award } from "lucide-react";

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!product) return null;

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-900">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  -{discount}%
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-gray-800 text-white">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-700">Authentic</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) 124 reviews</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl text-orange-600">₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-orange-200 text-orange-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-orange-900">Description</h4>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Origin:</span>
                <p className="text-orange-800">{product.origin}</p>
              </div>
              <div>
                <span className="text-gray-600">Weight:</span>
                <p className="text-orange-800">{product.weight}</p>
              </div>
              <div>
                <span className="text-gray-600">Processing:</span>
                <p className="text-orange-800">Sun-dried, Natural</p>
              </div>
              <div>
                <span className="text-gray-600">Shelf Life:</span>
                <p className="text-orange-800">24 months</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="text-orange-900">Why Choose Our Spices?</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>No artificial preservatives or colors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Sourced directly from farmers</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Traditional processing methods</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Rich in essential oils and nutrients</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-800">Shipping Information</span>
              </div>
              <p className="text-xs text-gray-600">
                Free shipping on orders over ₦10,000. Delivery within 2-5 business days.
              </p>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
