import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCart, Trash2, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import type { CartItem } from "./ProductModal";

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onRemoveItem, onCheckout }: CartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const extrasPrice = item.extras.reduce(
      (eSum, extra) => eSum + extra.price * extra.quantity,
      0
    );
    return sum + (item.price + extrasPrice) * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed top-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 md:p-3 shadow-lg transition-transform hover:scale-110">
          <ShoppingCart className="size-5 md:size-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white rounded-full size-5 md:size-6 flex items-center justify-center p-0 text-xs">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="size-5" />
            Meu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="size-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const itemTotal =
                  (item.price +
                    item.extras.reduce(
                      (sum, extra) => sum + extra.price * extra.quantity,
                      0
                    )) *
                  item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.size}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {item.extras.length > 0 && (
                      <div className="space-y-1">
                        {item.extras.map((extra, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            + {extra.quantity}x {extra.name}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">
                        Quantidade: {item.quantity}
                      </span>
                      <span className="text-purple-600">
                        R$ {itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-900">Total</span>
                  <span className="text-purple-600">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={onCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 rounded-full py-6"
                  disabled={items.length === 0}
                >
                  <MessageCircle className="size-5 mr-2" />
                  Finalizar no WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}