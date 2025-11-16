import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Wine,
  Coffee,
  Milk,
  ShoppingCart,
  User,
  Package,
} from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const remainingOrders = 12;
  const maxOrders = 15;

  const categories = [
    { id: "bieres", name: "Bières", icon: Wine, count: 24 },
    { id: "sodas", name: "Sodas", icon: Coffee, count: 18 },
    { id: "jus", name: "Jus", icon: Milk, count: 12 },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Casier Flag 65cl",
      price: 12000,
      supplier: "Dépôt Central",
      image: "🍺",
      stock: "En stock",
    },
    {
      id: 2,
      name: "Casier Coca-Cola 1L",
      price: 8500,
      supplier: "Boissons Express",
      image: "🥤",
      stock: "En stock",
    },
    {
      id: 3,
      name: "Pack Jus Tropical 1L",
      price: 6000,
      supplier: "Dépôt Central",
      image: "🧃",
      stock: "En stock",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">N'Djam'Boisson Pro</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/client/cart")}
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-background">
                Plan STARTER
              </Badge>
              <span className="text-sm font-medium text-foreground">
                Reste {remainingOrders} commandes sur {maxOrders}
              </span>
            </div>
            <Button variant="link" size="sm" className="text-primary">
              Upgrader au PRO
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Rechercher des produits..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Catégories
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all hover:border-primary"
                  onClick={() => navigate(`/client/catalog?category=${category.id}`)}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.count} produits
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Produits populaires
            </h2>
            <Button
              variant="link"
              onClick={() => navigate("/client/catalog")}
              className="text-primary"
            >
              Voir tout
            </Button>
          </div>
          <div className="grid gap-4">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/client/catalog`)}
              >
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
                        {product.stock}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20"
            onClick={() => navigate("/client/orders")}
          >
            <Package className="w-5 h-5 mr-2" />
            Mes commandes
          </Button>
          <Button
            variant="outline"
            className="h-20"
            onClick={() => navigate("/client/catalog")}
          >
            <Search className="w-5 h-5 mr-2" />
            Catalogue complet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
