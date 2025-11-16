import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Search, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  supplier: string;
  image: string;
  category: string;
  unit: string;
}

const ClientCatalog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});

  const products: Product[] = [
    { id: 1, name: "Casier Flag 65cl", price: 12000, supplier: "Dépôt Central", image: "🍺", category: "bieres", unit: "casier" },
    { id: 2, name: "Casier 33 Export 33cl", price: 11500, supplier: "Boissons Plus", image: "🍺", category: "bieres", unit: "casier" },
    { id: 3, name: "Casier Gala 65cl", price: 11000, supplier: "Dépôt Central", image: "🍺", category: "bieres", unit: "casier" },
    { id: 4, name: "Casier Coca-Cola 1L", price: 8500, supplier: "Boissons Express", image: "🥤", category: "sodas", unit: "casier" },
    { id: 5, name: "Casier Sprite 1L", price: 8000, supplier: "Boissons Express", image: "🥤", category: "sodas", unit: "casier" },
    { id: 6, name: "Casier Fanta 1L", price: 8000, supplier: "Dépôt Central", image: "🥤", category: "sodas", unit: "casier" },
    { id: 7, name: "Pack Jus Tropical 1L", price: 6000, supplier: "Dépôt Central", image: "🧃", category: "jus", unit: "pack" },
    { id: 8, name: "Pack Jus Orange 1L", price: 6500, supplier: "Boissons Plus", image: "🧃", category: "jus", unit: "pack" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateCart = (productId: number, delta: number) => {
    setCart((prev) => {
      const newQuantity = (prev[productId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const addToCart = (product: Product) => {
    updateCart(product.id, 1);
    toast({
      title: "Ajouté au panier",
      description: `${product.name} ajouté au panier`,
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/client/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground flex-1">
              Catalogue Produits
            </h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Rechercher..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Products List */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} produits disponibles • Triés par prix
          </p>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product) => {
            const quantity = cart[product.id] || 0;
            return (
              <Card key={product.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{product.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.supplier}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {product.price.toLocaleString()} FCFA
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {product.unit}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCart(product.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold text-foreground w-8 text-center">
                          {quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCart(product.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-20">
          <Button
            className="w-full max-w-md mx-auto shadow-2xl h-14 text-lg"
            onClick={() => navigate("/client/cart")}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Voir le panier ({totalItems})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientCatalog;
