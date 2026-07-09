import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { ProductModal } from "@/components/ProductModal";
import { WhyUs } from "@/components/WhyUs";
import { PriceNegotiation } from "@/components/PriceNegotiation";
import { PreOrderForm } from "@/components/PreOrderForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [preorderData, setPreorderData] = useState<{ id: string; qty: number } | undefined>();
  const [negotiatedPrice, setNegotiatedPrice] = useState<number | null>(null);

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const handlePreorder = (id: string, quantity: number) => {
    setPreorderData({ id, qty: quantity });
    setTimeout(() => {
      document.getElementById("preorder")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleDealAccepted = (price: number) => {
    setNegotiatedPrice(price);
    setTimeout(() => {
      document.getElementById("preorder-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Collection onSelectProduct={handleSelectProduct} />
      <WhyUs />
      <PriceNegotiation onDealAccepted={handleDealAccepted} />
      {negotiatedPrice !== null && (
        <PreOrderForm
          preselectedProductId={preorderData?.id}
          preselectedQuantity={preorderData?.qty}
          negotiatedPrice={negotiatedPrice}
        />
      )}
      <FAQ />
      <Footer />

      <ProductModal
        productId={selectedProductId}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onPreorder={handlePreorder}
      />
    </div>
  );
}
