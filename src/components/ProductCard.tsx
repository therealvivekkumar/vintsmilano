import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

export function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <Card className="group border-none bg-transparent overflow-hidden rounded-none shadow-none cursor-pointer" onClick={onSelect}>
      <CardContent className="p-0 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] bg-card overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={product.productImage} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground tracking-wide mb-4 text-center px-4 line-clamp-1 italic">
          {product.tagline}
        </p>
        
        <div className="flex items-center justify-between w-full px-2 mb-6">
          <span className="text-sm tracking-widest uppercase font-medium">{product.size}</span>
          <span className="text-primary font-medium tracking-wide">Rs. {product.price.toLocaleString()}</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full rounded-none border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 uppercase tracking-widest text-xs h-12"
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
