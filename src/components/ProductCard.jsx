import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageSlider } from "./ImageSlider";
import { ShoppingCart, Eye } from "lucide-react";

export function ProductCard({ product, onAddToCart, onViewDetails }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-200">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageSlider
            images={Array.isArray(product.images) ? product.images : [product.image]}
            alt={product.name}
            className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
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

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full p-2 bg-white/90 hover:bg-white"
              onClick={() => onViewDetails(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="text-orange-900 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Origin: {product.origin}</span>
            <span>•</span>
            <span>{product.weight}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-orange-200 text-orange-700">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl text-orange-600">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}