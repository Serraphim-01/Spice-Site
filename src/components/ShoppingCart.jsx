import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 1500; // Free shipping over ₦10,000
  const total = subtotal + shipping;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-900">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cartItems.length})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border border-orange-100 rounded-lg">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-orange-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.weight}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 border-orange-200"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm min-w-[2ch] text-center">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 border-orange-200"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-orange-600">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-gray-500">
                          ₦{item.price.toLocaleString()} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-orange-100 pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}
                </span>
              </div>
              {subtotal < 10000 && shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Add ₦{(10000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
              <Separator />
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="text-orange-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
