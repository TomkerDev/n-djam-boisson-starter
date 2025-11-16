import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Banknote, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DriverConfirm = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [verificationCode, setVerificationCode] = useState("");
  const [amountReceived, setAmountReceived] = useState("");

  const orderAmount = 66000;

  const handleConfirm = () => {
    if (paymentMethod === "cash" && !amountReceived) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le montant reçu",
        variant: "destructive",
      });
      return;
    }

    if (!verificationCode) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le code de vérification",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Livraison confirmée !",
      description: "Le paiement a été enregistré avec succès",
    });
    navigate("/livreur/tournee");
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/livreur/tournee")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              Confirmation de Livraison
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Order Summary */}
        <Card className="p-6 mb-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-3">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Bar Le Relax
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              Commande {orderId}
            </p>
            <p className="text-sm text-muted-foreground">
              5 × Casier Flag 65cl
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Montant à collecter
              </p>
              <p className="text-3xl font-bold text-primary">
                {orderAmount.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">
            Mode de paiement reçu
          </h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <Label
              htmlFor="cash"
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === "cash"
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <RadioGroupItem value="cash" id="cash" />
              <Banknote className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                Paiement Cash
              </span>
            </Label>

            <Label
              htmlFor="mobile"
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all mt-3 ${
                paymentMethod === "mobile"
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <RadioGroupItem value="mobile" id="mobile" />
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                Mobile Money
              </span>
            </Label>
          </RadioGroup>
        </Card>

        {/* Amount Verification */}
        {paymentMethod === "cash" && (
          <Card className="p-6 mb-6">
            <Label htmlFor="amount" className="text-foreground mb-2 block">
              Montant reçu (FCFA)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="66000"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              className="text-lg"
            />
          </Card>
        )}

        {/* Verification Code */}
        <Card className="p-6 mb-6">
          <Label htmlFor="code" className="text-foreground mb-2 block">
            Code de vérification
          </Label>
          <Input
            id="code"
            placeholder="Code fourni par le manager"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="text-lg text-center tracking-widest"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Entrez le code fourni par le manager logistique
          </p>
        </Card>

        {/* Instructions */}
        <Card className="p-4 bg-muted">
          <p className="text-sm text-foreground">
            ℹ️ Assurez-vous que le client a bien reçu tous les produits avant de confirmer la livraison.
          </p>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container mx-auto">
          <Button
            className="w-full h-14 text-lg bg-success hover:bg-success/90"
            onClick={handleConfirm}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Confirmer la Livraison
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverConfirm;
