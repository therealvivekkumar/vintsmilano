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
      setIsSuccess(true);
    } catch {
      setErrorMsg("Something went wrong. Please try again or contact us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="preorder-form" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Card className="bg-card border-primary/20 rounded-none">
            <CardContent className="pt-12 pb-12 px-6">
              <h3 className="text-3xl font-serif text-primary mb-4">Reservation Confirmed</h3>
              <p className="text-muted-foreground mb-8">
                Thank you for your pre-order. Your selection from our inaugural batch has been reserved. We will contact you shortly with payment and dispatch details.
              </p>
              <Button
                variant="outline"
                className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs"
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
    <section id="preorder-form" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Secure Your Fragrance</h2>
          <p className="text-muted-foreground text-sm tracking-wide max-w-md mx-auto">
            Reserve your fragrance from our limited inaugural batch. No payment required until dispatch.
          </p>
          {negotiatedPrice !== undefined && (
            <div className="mt-6 inline-flex items-center gap-3 border border-primary/30 px-6 py-3 bg-primary/5">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Your Reserved Price</span>
              <span className="text-2xl font-serif text-primary">₹{negotiatedPrice.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="bg-card p-8 border border-border">
          {errorMsg && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {errorMsg}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</FormLabel>
                    <FormControl><Input className="rounded-none bg-background border-border h-12" placeholder="Enter Your Full Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none bg-background border-border h-12"
                        placeholder="XXXXXXXXXX"
                        maxLength={10}
                        inputMode="numeric"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                  <FormControl><Input type="email" className="rounded-none bg-background border-border h-12" placeholder="arjun@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="productId" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Select Fragrance</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none bg-background border-border h-12">
                          <SelectValue placeholder="Choose a scent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-border">
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} — ₹{(negotiatedPrice ?? p.price).toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Quantity</label>
                  <div className="flex items-center border border-border h-12">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-full w-12 rounded-none border-none hover:bg-muted flex-shrink-0"
                      onClick={() => handleQtyChange(-1)}
                      disabled={qty <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="flex-1 text-center text-sm font-medium">{qty}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-full w-12 rounded-none border-none hover:bg-muted flex-shrink-0"
                      onClick={() => handleQtyChange(1)}
                      disabled={qty >= 10}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  {qty > 1 && (
                    <p className="text-xs text-muted-foreground">
                      ₹{(negotiatedPrice ?? 2499).toLocaleString()} × {qty} = <span className="text-foreground font-medium">₹{((negotiatedPrice ?? 2499) * qty).toLocaleString()}</span>
                    </p>
                  )}
                </div>
              </div>

              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Delivery Address</FormLabel>
                  <FormControl><Textarea className="rounded-none bg-background border-border resize-none min-h-[100px]" placeholder="Flat / House No., Street, Landmark..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">City</FormLabel>
                    <FormControl><Input className="rounded-none bg-background border-border h-12" placeholder="Bengaluru" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">State</FormLabel>
                    <FormControl><Input className="rounded-none bg-background border-border h-12" placeholder="Karnataka" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pincode" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Pincode</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none bg-background border-border h-12"
                        placeholder="560001"
                        maxLength={6}
                        inputMode="numeric"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Additional Notes (Optional)</FormLabel>
                  <FormControl><Textarea className="rounded-none bg-background border-border resize-none" placeholder="Special delivery instructions..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.2em] uppercase font-medium mt-8"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Pre-Order"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
