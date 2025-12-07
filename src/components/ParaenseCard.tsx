import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

interface ParaenseCardProps {
  name: string;
  price: string;
  image: string;
  isConsulta?: boolean;
}

export function ParaenseCard({ name, price, image, isConsulta = false }: ParaenseCardProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre: ${name}${!isConsulta ? ` - ${price}` : ''}`
    );
    window.open(
      `https://api.whatsapp.com/send/?phone=5591985344280&text=${message}`,
      "_blank"
    );
  };

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
        <h3 className="text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className={`${isConsulta ? 'text-orange-600' : 'text-purple-600'}`}>
            {price}
          </span>
          <Button
            onClick={handleWhatsApp}
            size="sm"
            className="bg-green-600 hover:bg-green-700 rounded-full"
          >
            <MessageCircle className="size-4 mr-1" />
            {isConsulta ? 'Consultar' : 'Pedir'}
          </Button>
        </div>
      </div>
    </div>
  );
}