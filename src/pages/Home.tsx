import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Collection } from '@/components/Collection';
import { WhyUs } from '@/components/WhyUs';
import { PriceNegotiation } from '@/components/PriceNegotiation';
import { PreOrderForm } from '@/components/PreOrderForm';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [, setLocation] = useLocation();
  const [preorderData, setPreorderData] = useState<
    { id: string; qty: number } | undefined
  >();
  const [negotiatedPrice, setNegotiatedPrice] = useState<number | null>(null);

  // Check URL params for pre-order redirects from product detail page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preorderId = params.get("preorder");
    const qty = params.get("qty");
    
    if (preorderId) {
      setPreorderData({ id: preorderId, qty: qty ? parseInt(qty, 10) : 1 });

      // Figure out which section to scroll to (default: the negotiation form)
      const targetId = window.location.hash
        ? window.location.hash.replace("#", "")
        : "preorder";

      // Clean up URL without triggering navigation
      window.history.replaceState({}, "", window.location.pathname);

      // Client-side (SPA) navigation doesn't trigger the browser's native
      // hash-scroll behavior, so we scroll to the target section manually.
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, []);

  const handleSelectProduct = (id: string) => {
    setLocation(`/product/${id}`);
  };

  const handleDealAccepted = (price: number) => {
    setNegotiatedPrice(price);
    setTimeout(() => {
      document.getElementById('preorder-form')?.scrollIntoView({ behavior: 'smooth' });
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
    </div>
  );
}
