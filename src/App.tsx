import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientAuth from "./pages/client/ClientAuth";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientCatalog from "./pages/client/ClientCatalog";
import ClientCart from "./pages/client/ClientCart";
import ClientCheckout from "./pages/client/ClientCheckout";
import ClientTracking from "./pages/client/ClientTracking";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import SupplierOrders from "./pages/supplier/SupplierOrders";
import DriverDeliveries from "./pages/driver/DriverDeliveries";
import DriverConfirm from "./pages/driver/DriverConfirm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Client Routes */}
          <Route path="/client/auth" element={<ClientAuth />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/catalog" element={<ClientCatalog />} />
          <Route path="/client/cart" element={<ClientCart />} />
          <Route path="/client/checkout" element={<ClientCheckout />} />
          <Route path="/client/tracking" element={<ClientTracking />} />
          
          {/* Supplier Routes */}
          <Route path="/fournisseur/dashboard" element={<SupplierDashboard />} />
          <Route path="/fournisseur/orders" element={<SupplierOrders />} />
          
          {/* Driver Routes */}
          <Route path="/livreur/tournee" element={<DriverDeliveries />} />
          <Route path="/livreur/confirm/:orderId" element={<DriverConfirm />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
