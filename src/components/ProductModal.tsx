import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { useState } from "react";
import { Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductModal({
  productId,
  open,
  onOpenChange,
  onPreorder,
}: {
  productId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreorder: (id: string, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  const allImages = [
    product.modelImage,
    ...(product.additionalImages ?? []),
  ];

  const handlePrev = () => setImageIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const handleNext = () => setImageIndex((i) => (i + 1) % allImages.length);

  const handlePreorderClick = () => {
    onPreorder(product.id, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setTimeout(() => { setQuantity(1); setImageIndex(0); }, 300);
    }}>
      <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden gap-0 rounded-none sm:rounded-none">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">{product.description}</DialogDescription>

        <div className="flex flex-col md:flex-row max-h-[90vh] md:max-h-[88vh] overflow-y-auto md:overflow-hidden">

          {/* Image panel with carousel */}
          <div className="relative w-full md:w-1/2 shrink-0 bg-background" style={{ minHeight: "320px" }}>
            <img
              key={imageIndex}
              src={allImages[imageIndex]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              style={{ minHeight: "320px", maxHeight: "88vh" }}
            />

            {/* Carousel controls — only show if more than one image */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === imageIndex ? "bg-primary w-4" : "bg-foreground/40"}`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details panel */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col md:overflow-y-auto">
            <div className="mb-3">
              <Badge variant="outline" className="rounded-none border-primary/30 text-primary uppercase tracking-widest text-[10px] px-3 py-1">
                {product.size}
              </Badge>
            </div>

            <h2 className="text-4xl font-serif text-foreground mb-2">{product.name}</h2>
            <p className="text-lg text-muted-foreground italic mb-6 font-serif">{product.tagline}</p>
            <p className="text-foreground/80 leading-relaxed mb-8 text-sm">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6 mb-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Longevity</h4>
                <p className="text-sm font-medium">{product.longevity}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Projection</h4>
                <p className="text-sm font-medium">{product.projection}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Occasion</h4>
                <p className="text-sm font-medium">{product.occasion}</p>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="text-right">
                  <span className="text-2xl font-serif text-primary">Rs. {(product.price * quantity).toLocaleString()}</span>
                  {quantity > 1 && (
                    <p className="text-xs text-muted-foreground mt-0.5">Rs. {product.price.toLocaleString()} × {quantity}</p>
                  )}
                </div>
                <div className="flex items-center border border-border">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-none hover:bg-background" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-none hover:bg-background" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.2em] uppercase font-medium"
                onClick={handlePreorderClick}
              >
                Reserve Your Fragrance
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
