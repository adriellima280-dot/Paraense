import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  type: 'pronto' | 'monte';
  ingredients?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  extras: { name: string; quantity: number; price: number }[];
  quantity: number;
}

const SIZES = [
  { value: "300ml", label: "300ml", price: 12, complements: 4 },
  { value: "400ml", label: "400ml", price: 15, complements: 5 },
  { value: "500ml", label: "500ml", price: 18, complements: 5 },
];

const EXTRAS = [
  { name: "Granola", price: 2 },
  { name: "Leite Condensado", price: 2 },
  { name: "Leite Ninho", price: 3 },
  { name: "Negresco", price: 3 },
  { name: "Bis", price: 3 },
  { name: "Oreo", price: 3 },
  { name: "Ovomaltine", price: 3 },
  { name: "Disquete", price: 3 },
  { name: "Paçoca", price: 2.5 },
  { name: "Amendoim", price: 2 },
  { name: "Banana", price: 2 },
  { name: "Morango", price: 4 },
  { name: "Cobertura Chocolate", price: 2 },
  { name: "Cobertura Caramelo", price: 2 },
];

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("400ml");
  const [extras, setExtras] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);

  const handleExtraChange = (extraName: string, delta: number) => {
    setExtras((prev) => {
      const currentQty = prev[extraName] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [extraName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [extraName]: newQty };
    });
  };

  const calculateTotal = () => {
    if (!product) return 0;
    const sizePrice = SIZES.find((s) => s.value === selectedSize)?.price || 0;
    const extrasPrice = Object.entries(extras).reduce((sum, [name, qty]) => {
      const extra = EXTRAS.find((e) => e.name === name);
      return sum + (extra ? extra.price * qty : 0);
    }, 0);
    return (sizePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const sizePrice = SIZES.find((s) => s.value === selectedSize)?.price || 0;
    const extrasArray = Object.entries(extras).map(([name, qty]) => {
      const extra = EXTRAS.find((e) => e.name === name);
      return {
        name,
        quantity: qty,
        price: extra ? extra.price : 0,
      };
    });

    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      size: selectedSize,
      price: sizePrice,
      extras: extrasArray,
      quantity,
    };

    onAddToCart(item);
    setExtras({});
    setQuantity(1);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagem */}
          <div className="aspect-video relative rounded-xl overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Descrição */}
          {product.ingredients && (
            <div>
              <p className="text-sm text-gray-600">
                <span className="text-gray-900">Ingredientes: </span>
                {product.ingredients.join(", ")}
              </p>
            </div>
          )}

          {/* Tamanhos */}
          <div>
            <h4 className="text-gray-900 mb-3">Escolha o tamanho</h4>
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedSize === size.value
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-gray-900">{size.label}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {size.complements} complementos
                  </div>
                  <div className="text-purple-600 mt-2">R$ {size.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Adicionais */}
          <div>
            <h4 className="text-gray-900 mb-3">Adicionais</h4>
            <div className="space-y-2">
              {EXTRAS.map((extra) => {
                const qty = extras[extra.name] || 0;
                return (
                  <div
                    key={extra.name}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-gray-900">{extra.name}</span>
                      <span className="text-sm text-purple-600 ml-2">
                        +R$ {extra.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 rounded-full"
                        onClick={() => handleExtraChange(extra.name, -1)}
                        disabled={qty === 0}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-8 text-center text-gray-900">{qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 rounded-full border-purple-600 text-purple-600 hover:bg-purple-50"
                        onClick={() => handleExtraChange(extra.name, 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantidade */}
          <div>
            <h4 className="text-gray-900 mb-3">Quantidade</h4>
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="outline"
                className="size-10 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="text-gray-900 min-w-[2rem] text-center">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                className="size-10 rounded-full border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Botão Adicionar */}
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-full py-6"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="size-5 mr-2" />
            Adicionar ao Carrinho • R$ {calculateTotal().toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
