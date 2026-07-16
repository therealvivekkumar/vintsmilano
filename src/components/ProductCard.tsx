import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

export function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <Card className="group border-none bg-transparent overflow-hidden rounded-none shadow-none cursor-pointer" onClick={onSelect}>
      <CardContent className="p-0 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] bg-[#f4f2ee] overflow-hidden mb-8 flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={product.productImage} 
            alt={product.name} 
            className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 ${product.outOfStock ? "opacity-60 grayscale-[0.3]" : ""}`}
          />
          {product.outOfStock && (
            <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/70">Out of Stock</span>
            </div>
          )}
        </div>
        
        <h3 className="font-serif text-3xl mb-3 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground tracking-wide mb-6 text-center px-4 line-clamp-1 font-serif">
          {product.tagline}
        </p>
        
        <div className="flex items-center justify-between w-full px-2 mb-8 border-t border-border pt-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-muted-foreground">{product.size}</span>
          <span className="text-foreground font-serif text-lg">Rs. {product.price.toLocaleString()}</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full rounded-none border-border hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 uppercase tracking-[0.2em] text-xs h-14"
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
