import { useState, useEffect, useRef, type TouchEvent } from "react";
import { useRoute, useLocation } from "wouter";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const product = products.find((p) => p.id === params?.id);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setImageIndex(0);
  }, [params?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="font-serif text-2xl">Fragrance Not Found</p>
        <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs" onClick={() => setLocation("/")}>
          Return to Collection
        </Button>
      </div>
    );
  }

  const allImages = [
    product.modelImage,
    ...(product.additionalImages ?? []),
  ];

  const handlePrev = () => setImageIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const handleNext = () => setImageIndex((i) => (i + 1) % allImages.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const swipeThreshold = 40;
    if (allImages.length > 1) {
      if (touchDeltaX.current > swipeThreshold) {
        handlePrev();
      } else if (touchDeltaX.current < -swipeThreshold) {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handlePreorderClick = () => {
    setLocation(`/?preorder=${product.id}&qty=${quantity}#preorder`);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col lg:flex-row">
      {/* Mobile Back Button - Pinned Top */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center p-4 bg-gradient-to-b from-black/30 to-transparent lg:hidden">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Back</span>
        </button>
      </div>

      {/* Desktop Back Button */}
      <div className="hidden lg:flex fixed top-8 left-8 z-50">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mix-blend-difference"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Back to Collection</span>
        </button>
      </div>

      {/* Image Gallery Panel */}
      <div 
        className="relative w-full lg:w-[55%] h-[60dvh] lg:h-[100dvh] bg-[#f4f2ee] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={imageIndex}
            src={allImages[imageIndex]}
            alt={`${product.name} - Image ${imageIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain p-8 lg:p-24"
            draggable={false}
          />
        </AnimatePresence>

        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors border border-white/10 text-black"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors border border-white/10 text-black"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`h-1.5 transition-all duration-300 ${i === imageIndex ? "bg-foreground w-6" : "bg-foreground/30 w-1.5"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details Panel */}
      <div className="w-full lg:w-[45%] bg-card flex flex-col border-l border-border/50">
        <div className="flex-1 overflow-y-auto px-6 py-12 lg:px-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4">
              <Badge variant="outline" className="rounded-none border-primary/30 text-primary uppercase tracking-[0.2em] text-[10px] px-3 py-1">
                {product.size}
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-serif text-foreground mb-4 leading-tight">{product.name}</h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 font-serif">"{product.tagline}"</p>
            
            <div className="w-12 h-[1px] bg-primary/40 mb-8" />
            
            <p className="text-foreground/80 leading-relaxed mb-12 text-sm lg:text-base font-light">{product.description}</p>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-border pt-8 mb-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Longevity</h4>
                <p className="text-sm font-medium">{product.longevity}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Projection</h4>
                <p className="text-sm font-medium">{product.projection}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Occasion</h4>
                <p className="text-sm font-medium">{product.occasion}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Footer (Sticky) */}
        <div className="bg-card border-t border-border p-6 lg:p-8 sticky bottom-0 z-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-2xl font-serif text-primary">Rs. {(product.price * quantity).toLocaleString()}</span>
              {quantity > 1 && (
                <p className="text-xs text-muted-foreground mt-1">Rs. {product.price.toLocaleString()} × {quantity}</p>
              )}
            </div>
            <div className="flex items-center border border-border bg-background">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none border-none hover:bg-muted text-foreground" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none border-none hover:bg-muted text-foreground" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            className="w-full rounded-none h-14 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium transition-colors"
            onClick={handlePreorderClick}
          >
            Reserve Your Fragrance
          </Button>
        </div>
      </div>
    </div>
  );
}
