import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductModal } from "./components/ProductModal";
import { Cart } from "./components/Cart";
import { ParaenseCard } from "./components/ParaenseCard";
import type { CartItem } from "./components/ProductModal";
import litroAcai from "figma:asset/9f2ef6887d1c0d43000fe1603992aa3e8c17173b.png";
import tapioca from "figma:asset/f09074ab5b588ec5813c9920415866be217b8fc1.png";
import farinha from "figma:asset/8a8883b0809e3a9b2c300a0f73136329f8dcda38.png";
import acaiSuper from "figma:asset/d25c0364f70a51378a291fec6b33026631f908a4.png";
import acaiEspecial from "figma:asset/18cab179bbc671c6b2786ef83a09112cf122334b.png";
import acaiOvomaltine from "figma:asset/7bb43040d5ee1fa792697a1d6248bc7a6105d84d.png";
import acaiNegresco from "figma:asset/9d635a2effe48e22485abe70bdfd16f9e4baebc1.png";
import acaiChocolate from "figma:asset/7e563ed4f5b6564d086efdd836320784de63b104.png";
import monteSeu from "figma:asset/8c65409a03f31b7dead15085ffc60bfc9072cccd.png";
import backgroundImage from "figma:asset/9042eed576f8f7d90b7cef4308696be4e6236114.png";

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  type: "pronto" | "monte";
  ingredients?: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Açaí Super",
    description: "Para os que adoram sonho de valsa",
    basePrice: 12,
    image: acaiSuper,
    type: "pronto",
    ingredients: [
      "Açaí",
      "Leite Condensado",
      "Granola",
      "Leite Ninho",
      "Sonho de Valsa",
      "Cobertura",
    ],
  },
  {
    id: "2",
    name: "Açaí Especial",
    description: "Combinação especial de sabores",
    basePrice: 12,
    image: acaiEspecial,
    type: "pronto",
    ingredients: [
      "Açaí",
      "Leite Condensado",
      "Leite Ninho",
      "Bis",
      "Disquete",
      "Cobertura",
    ],
  },
  {
    id: "3",
    name: "Açaí Ovomaltine",
    description: "O clássico favorito com Ovomaltine",
    basePrice: 12,
    image: acaiOvomaltine,
    type: "pronto",
    ingredients: [
      "Açaí",
      "Leite Condensado",
      "Leite Ninho",
      "Ovomaltine",
      "Amendoim",
      "Cobertura",
    ],
  },
  {
    id: "4",
    name: "Açaí Negresco",
    description: "Para os apaixonados por Negresco",
    basePrice: 12,
    image: acaiNegresco,
    type: "pronto",
    ingredients: ["Açaí", "Leite Condensado", "Leite Ninho", "Negresco", "Cobertura"],
  },
  {
    id: "5",
    name: "Açaí Chocolate",
    description: "Explosão de chocolate",
    basePrice: 12,
    image: acaiChocolate,
    type: "pronto",
    ingredients: ["Açaí", "Leite Condensado", "Negresco", "Oreo", "Bis", "Cobertura"],
  },
  {
    id: "6",
    name: "Monte o Seu",
    description: "Crie seu açaí personalizado do seu jeito",
    basePrice: 12,
    image: monteSeu,
    type: "monte",
    ingredients: [
      "Escolha até 4 complementos",
      "Leite Condensado",
      "Negresco",
      "Bis",
      "Banana",
      "Granola",
      "Oreo",
      "Ovomaltine",
      "Disquete",
      "Leite Ninho",
      "Paçoca",
      "Amendoim",
    ],
  },
];

const PARAENSE_PRODUCTS = [
  {
    id: "p1",
    name: "Porção de Camarão 100g",
    price: "R$ 8,00",
    image: "https://images.unsplash.com/photo-1758972572427-fc3d4193bbd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaHJpbXAlMjBwcmF3bnMlMjBwbGF0ZXxlbnwxfHx8fDE3NjQ4MDgyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "p2",
    name: "Litro de Açaí",
    price: "Consultar Valor",
    image: litroAcai,
    isConsulta: true,
  },
  {
    id: "p3",
    name: "Tapioca",
    price: "R$ 3,00",
    image: tapioca,
  },
  {
    id: "p4",
    name: "Kg de Farinha",
    price: "R$ 7,00",
    image: farinha,
  },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const message = cartItems
      .map((item) => {
        const extrasText =
          item.extras.length > 0
            ? "\n" +
              item.extras
                .map((extra) => `  + ${extra.quantity}x ${extra.name}`)
                .join("\n")
            : "";
        const itemTotal =
          (item.price +
            item.extras.reduce(
              (sum, extra) => sum + extra.price * extra.quantity,
              0
            )) *
          item.quantity;
        return `- ${item.name} (${item.size}) x${item.quantity}${extrasText}\n  Subtotal: R$ ${itemTotal.toFixed(2)}`;
      })
      .join("\n\n");

    const total = cartItems.reduce((sum, item) => {
      const extrasPrice = item.extras.reduce(
        (eSum, extra) => eSum + extra.price * extra.quantity,
        0
      );
      return sum + (item.price + extrasPrice) * item.quantity;
    }, 0);

    const whatsappMessage = encodeURIComponent(
      `Olá! Gostaria de fazer o seguinte pedido:\n\n${message}\n\n*Total: R$ ${total.toFixed(2)}*`
    );

    window.open(
      `https://api.whatsapp.com/send/?phone=5591985344280&text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Header com título */}
      <header className="sticky top-0 z-40 bg-purple-900/80 backdrop-blur-sm py-3 md:py-6 shadow-lg relative">
        <div className="container mx-auto px-4">
          <h1
            className="text-white text-center tracking-wider"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            MINA DE AÇAÍ
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Produtos Prontos */}
        <section className="mb-12 bg-gradient-to-br from-[#4a1a6b]/30 to-[#6a0dad]/20 rounded-3xl p-8">
          <h2 className="text-white mb-6">Açaís Prontos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.type === "pronto").map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={`A partir de R$ ${product.basePrice}`}
                image={product.image}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </section>

        {/* Monte o Seu */}
        <section className="mb-12 bg-gradient-to-br from-[#6a0dad]/30 to-[#8b1bb8]/20 rounded-3xl p-8">
          <h2 className="text-white mb-6">Monte o Seu Açaí</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.type === "monte").map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={`A partir de R$ ${product.basePrice}`}
                image={product.image}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </section>

        {/* Produtos Paraense Raiz */}
        <section className="mb-12 bg-gradient-to-br from-[#8b1bb8]/30 to-[#9c27b0]/20 rounded-3xl p-8">
          <div className="bg-orange-50 rounded-2xl p-6 mb-6 border-2 border-orange-200">
            <h2 className="text-orange-700">🌴 Paraense Raiz</h2>
            <p className="text-sm text-gray-600 mt-2">Produtos típicos da nossa terra</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARAENSE_PRODUCTS.map((product) => (
              <ParaenseCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                isConsulta={product.isConsulta}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#4a1a6b]/90 border-t border-purple-900 relative">
        <div className="container mx-auto px-4 py-8 text-center text-purple-200">
          <p>© 2024 Mina de Açaí - Delivery de açaí</p>
        </div>
      </footer>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart */}
      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}