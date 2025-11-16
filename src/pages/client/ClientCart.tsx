import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, AlertCircle } from "lucide-react";

const ClientCart = () => {
  const navigate = useNavigate();

  // Données simulées du panier
  const cartItems = [
    { id: 1, name: "Casier Flag 65cl", price: 12000, quantity: 5, supplier: "Dépôt Central", image: "🍺" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const commission = subtotal * 0.1;
  const total = subtotal + commission;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/client/catalog")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Mon Panier</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.supplier}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.price.toLocaleString()} FCFA × {item.quantity}
                    </span>
                    <Badge variant="secondary">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Price Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Récapitulatif
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-foreground">
              <span>Sous-total</span>
              <span className="font-medium">{subtotal.toLocaleString()} FCFA</span>
            </div>
            
            <div className="flex justify-between text-foreground">
              <span className="flex items-center gap-2">
                Commission (10%)
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
              </span>
              <span className="font-medium text-primary">
                {commission.toLocaleString()} FCFA
              </span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">{total.toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              ℹ️ La commission de 10% couvre les frais de plateforme et de logistique.
            </p>
          </div>
        </Card>

        {/* Info Box */}
        <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            📦 <strong>Livraison estimée :</strong> 2-4 heures après confirmation
          </p>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container mx-auto">
          <Button
            className="w-full h-14 text-lg"
            onClick={() => navigate("/client/checkout")}
          >
            Passer la commande • {total.toLocaleString()} FCFA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientCart;
