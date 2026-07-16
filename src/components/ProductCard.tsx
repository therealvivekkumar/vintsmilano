import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

export function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <Card className="group border-none bg-transparent overflow-hidden rounded-none shadow-none cursor-pointer" onClick={onSelect}>
      <CardContent className="p-0 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] bg-[#f4f2ee] overflow-hidden mb-4 md:mb-8 flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={product.productImage} 
            alt={product.name} 
            className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 ${product.outOfStock ? "opacity-60 grayscale-[0.3]" : ""}`}
          />
          {product.outOfStock && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 bg-background/90 backdrop-blur-sm border border-border px-2 py-1 md:px-3 md:py-1.5">
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium text-foreground/70">Out of Stock</span>
            </div>
          )}
        </div>
        
        <h3 className="font-serif text-lg md:text-3xl mb-1 md:mb-3 text-foreground group-hover:text-primary transition-colors text-center">
          {product.name}
        </h3>
        
        <p className="text-[11px] md:text-sm text-muted-foreground tracking-wide mb-3 md:mb-6 text-center px-1 md:px-4 line-clamp-1 font-serif">
          {product.tagline}
        </p>
        
        <div className="flex items-center justify-between w-full px-1 md:px-2 mb-4 md:mb-8 border-t border-border pt-3 md:pt-4">
          <span className="text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium text-muted-foreground">{product.size}</span>
          <span className="text-foreground font-serif text-sm md:text-lg">Rs. {product.price.toLocaleString()}</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full rounded-none border-border hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[9px] md:text-xs h-10 md:h-14"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
