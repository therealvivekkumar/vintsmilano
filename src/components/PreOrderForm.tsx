import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { products } from "@/data/products";
import { GOOGLE_SCRIPT_URL } from "@/config";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, or apostrophes"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .email("Enter a valid email address"),
  productId: z.string().min(1, "Please select a fragrance"),
  quantity: z.coerce.number().min(1, "Minimum quantity is 1").max(10, "Maximum 10 items"),
  address: z.string().min(10, "Please enter your full delivery address"),
  city: z.string().min(2, "City is required").regex(/^[a-zA-Z\s]+$/, "Enter a valid city name"),
  state: z.string().min(2, "State is required").regex(/^[a-zA-Z\s]+$/, "Enter a valid state name"),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit Indian pincode"),
  notes: z.string().optional(),
});

export function PreOrderForm({
  preselectedProductId,
  preselectedQuantity,
  negotiatedPrice,
}: {
  preselectedProductId?: string;
  preselectedQuantity?: number;
  negotiatedPrice?: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [qty, setQty] = useState(preselectedQuantity || 1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      productId: preselectedProductId || "",
      quantity: preselectedQuantity || 1,
      address: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (preselectedProductId) form.setValue("productId", preselectedProductId);
    if (preselectedQuantity) {
      setQty(preselectedQuantity);
      form.setValue("quantity", preselectedQuantity);
    }
  }, [preselectedProductId, preselectedQuantity, form]);

  const handleQtyChange = (delta: number) => {
    const next = Math.min(10, Math.max(1, qty + delta));
    setQty(next);
    form.setValue("quantity", next, { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            negotiatedPrice: negotiatedPrice ?? 2499,
            timestamp: new Date().toISOString(),
          }),
        });
      } else {
        // Fallback for development
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setIsSuccess(true);
      setTimeout(() => {
        document.getElementById("preorder-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch {
      setErrorMsg("Something went wrong. Please try again or contact us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="preorder-form" className="py-16 md:py-32 bg-background scroll-mt-20 md:scroll-mt-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <Card className="bg-[#f4f2ee] border-none rounded-none shadow-none">
            <CardContent className="pt-12 pb-12 px-6 md:pt-16 md:pb-16 md:px-16">
              <div className="w-12 h-12 mx-auto border border-primary/30 flex items-center justify-center rounded-full mb-8">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <h3 className="text-4xl font-serif text-foreground mb-6">Reservation Confirmed</h3>
              <p className="text-muted-foreground mb-12 font-light leading-relaxed">
                Thank you for your pre-order. Your selection from our inaugural batch has been reserved. We will contact you shortly with payment and dispatch details.
              </p>
              <Button
                variant="outline"
                className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-[0.2em] text-xs h-14 px-8"
                onClick={() => { setIsSuccess(false); form.reset(); setQty(1); }}
              >
                Reserve Another
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="preorder-form" className="py-16 md:py-32 bg-[#f4f2ee] scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Secure Your Fragrance</h2>
          <p className="text-muted-foreground text-sm lg:text-base tracking-wide max-w-md mx-auto font-light">
            Reserve your fragrance from our limited inaugural batch. No payment required until dispatch.
          </p>
          {negotiatedPrice !== undefined && (
            <div className="mt-8 md:mt-10 inline-flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Your Reserved Price</span>
              <span className="text-3xl font-serif text-foreground">₹{negotiatedPrice.toLocaleString()}</span>
              <div className="w-8 h-[1px] bg-primary/40 mt-2" />
            </div>
          )}
        </div>

        <div className="bg-card p-6 md:p-16 border-t border-border shadow-sm">
          {errorMsg && (
            <div className="mb-10 p-4 bg-destructive/5 border border-destructive/20 text-destructive text-sm text-center font-medium">
              {errorMsg}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50" placeholder="Enter Your Full Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50"
                          placeholder="XXXXXXXXXX"
                          maxLength={10}
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50" placeholder="arjun@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )} />
              </div>

              <div className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField control={form.control} name="productId" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Select Fragrance</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus:ring-0 px-0 h-10 shadow-none text-foreground font-light">
                            <SelectValue placeholder="Choose a scent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-border">
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id} className="font-light focus:bg-primary/10">
                              {p.name} (₹{(negotiatedPrice ?? p.price).toLocaleString()})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Quantity</label>
                    <div className="flex items-center border-b border-border h-10">
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-full w-10 px-0 rounded-none border-none hover:bg-transparent hover:text-primary flex-shrink-0"
                        onClick={() => handleQtyChange(-1)}
                        disabled={qty <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="flex-1 text-center text-sm font-medium">{qty}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-full w-10 px-0 rounded-none border-none hover:bg-transparent hover:text-primary flex-shrink-0"
                        onClick={() => handleQtyChange(1)}
                        disabled={qty >= 10}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    {qty > 1 && (
                      <p className="text-[10px] text-muted-foreground mt-2">
                        ₹{(negotiatedPrice ?? 2499).toLocaleString()} × {qty} = <span className="text-foreground font-medium tracking-wide">₹{((negotiatedPrice ?? 2499) * qty).toLocaleString()}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Delivery Address</FormLabel>
                    <FormControl>
                      <Textarea className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 shadow-none resize-none min-h-[60px] text-foreground font-light placeholder:text-muted-foreground/50" placeholder="Flat / House No., Street, Landmark..." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">City</FormLabel>
                      <FormControl>
                        <Input className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50" placeholder="Bengaluru" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">State</FormLabel>
                      <FormControl>
                        <Input className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50" placeholder="Karnataka" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="pincode" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Pincode</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50"
                          placeholder="560001"
                          maxLength={6}
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light" />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 px-0 h-10 shadow-none text-foreground font-light placeholder:text-muted-foreground/50" placeholder="Special delivery instructions..." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-light" />
                  </FormItem>
                )} />
              </div>

              <div className="pt-10 flex flex-col items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[280px] rounded-none h-14 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium transition-colors"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Confirm Pre-Order"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
