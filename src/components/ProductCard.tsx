import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  onClick: () => void;
}

export function ProductCard({ name, description, price, image, onClick }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-[#4a1a6b] hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-purple-600">{price}</span>
          <Button
            onClick={onClick}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 rounded-full"
          >
            <Plus className="size-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}