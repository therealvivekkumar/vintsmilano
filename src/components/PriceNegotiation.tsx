import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Phase =
  | { type: "idle" }
  | { type: "rejected_low"; attemptsLeft: number }
  | { type: "counter"; counterPrice: number; attemptsLeft: number }
  | { type: "accepted"; finalPrice: number }
  | { type: "exhausted" };

const RETAIL = 2499;
const MAX_ATTEMPTS = 3;

export function PriceNegotiation({ onDealAccepted }: { onDealAccepted: (price: number) => void }) {
  const [offerInput, setOfferInput] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [phase, setPhase] = useState<Phase>({ type: "idle" });
  const [inputError, setInputError] = useState("");

  const handleContinue = () => {
    const offer = parseInt(offerInput.replace(/[^0-9]/g, ""), 10);
    if (!offer || offer <= 0) {
      setInputError("Please enter a valid offer amount.");
      return;
    }
    setInputError("");

    const remaining = attemptsLeft - 1;

    if (offer > RETAIL) {
      setPhase({ type: "accepted", finalPrice: offer });
      return;
    }

    if (offer >= 2100) {
      setPhase({ type: "accepted", finalPrice: offer });
      return;
    }

    if (offer >= 1999) {
      const counter = offer + 100;
      setAttemptsLeft(remaining);
      setPhase({ type: "counter", counterPrice: counter, attemptsLeft: remaining });
      return;
    }

    if (remaining <= 0) {
      setPhase({ type: "exhausted" });
      return;
    }

    setAttemptsLeft(remaining);
    setPhase({ type: "rejected_low", attemptsLeft: remaining });
  };

  const handleTryAgain = () => {
    setOfferInput("");
    setInputError("");
    setPhase({ type: "idle" });
  };

  const handleAcceptCounter = (price: number) => {
    setPhase({ type: "accepted", finalPrice: price });
  };

  const handleAcceptDeal = (price: number) => {
    onDealAccepted(price);
  };

  return (
    <section id="preorder" className="py-16 md:py-32 bg-background scroll-mt-16 md:scroll-mt-20">
      <div className="container mx-auto px-6 max-w-3xl">

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Make Your Offer</h2>
          <p className="text-muted-foreground text-sm lg:text-base tracking-wide max-w-md mx-auto font-light">
            Every handcrafted bottle begins with a conversation.
          </p>
        </div>

        <div className="bg-card p-6 md:p-16 border-t border-border shadow-sm">
          {/* Retail price display */}
          <div className="flex flex-col items-center justify-center border-b border-border/50 pb-6 mb-8 md:pb-8 md:mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Retail Price</span>
            <span className="text-3xl font-serif text-foreground">₹{RETAIL.toLocaleString()}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={phase.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* IDLE / INPUT STATE */}
              {(phase.type === "idle" || phase.type === "rejected_low") && (
                <div className="space-y-6 md:space-y-8 max-w-md mx-auto">
                  {phase.type === "rejected_low" && (
                    <div className="bg-[#f4f2ee] p-6 text-center border-l-2 border-primary">
                      <p className="text-sm text-foreground/80 leading-relaxed font-serif">
                        We'd love to, but that would be difficult for a small independent brand. 💛
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-2 uppercase tracking-normal md:tracking-widest">
                        You have <span className="text-primary font-semibold">{phase.attemptsLeft}</span> more {phase.attemptsLeft === 1 ? "attempt" : "attempts"} to make your best offer.
                      </p>
                    </div>
                  )}

                  <div className="text-center">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 md:mb-6 block">Your Offer</label>
                    <div className="relative max-w-[240px] mx-auto">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground font-serif text-2xl">₹</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={offerInput}
                        onChange={(e) => { setOfferInput(e.target.value.replace(/\D/g, "")); setInputError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                        className="rounded-none bg-transparent border-0 border-b border-border hover:border-primary focus-visible:border-primary focus-visible:ring-0 h-16 pl-14 pr-14 text-xl md:text-3xl font-serif text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-none"
                      />
                    </div>
                    {inputError && <p className="text-destructive text-xs mt-4">{inputError}</p>}
                  </div>

                  <div className="flex flex-col items-center pt-2 md:pt-4 gap-4 md:gap-6">
                    <Button
                      onClick={handleContinue}
                      className="rounded-none h-14 px-12 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium w-full transition-colors"
                    >
                      Continue
                    </Button>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground tracking-tight md:tracking-[0.1em] uppercase whitespace-nowrap">
                      You have <span className="text-foreground font-medium">{attemptsLeft}</span> {attemptsLeft === 1 ? "attempt" : "attempts"} to make your best offer.
                    </p>
                  </div>
                </div>
              )}

              {/* COUNTER OFFER STATE */}
              {phase.type === "counter" && (
                <div className="space-y-8 text-center max-w-md mx-auto">
                  <div className="py-4">
                    <p className="text-base text-foreground/80 leading-relaxed mb-6 font-serif">
                      You're close! We can't accept that price, but we can reserve your bottle for
                    </p>
                    <p className="text-5xl font-serif text-primary my-6">₹{phase.counterPrice.toLocaleString()}</p>
                    <p className="text-sm text-foreground/70 font-medium">Deal?</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => handleAcceptCounter(phase.counterPrice)}
                      className="w-full rounded-none h-14 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium"
                    >
                      Accept — ₹{phase.counterPrice.toLocaleString()}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={phase.attemptsLeft > 0 ? handleTryAgain : () => setPhase({ type: "exhausted" })}
                      className="w-full rounded-none h-14 border border-border text-foreground hover:bg-muted text-xs tracking-[0.2em] uppercase"
                    >
                      {phase.attemptsLeft > 0 ? `Try Again (${phase.attemptsLeft} left)` : "Decline"}
                    </Button>
                  </div>
                </div>
              )}

              {/* ACCEPTED STATE */}
              {phase.type === "accepted" && (
                <div className="space-y-8 text-center max-w-md mx-auto">
                  <div className="py-4">
                    <div className="w-12 h-12 mx-auto border border-primary/30 flex items-center justify-center rounded-full mb-6">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    {phase.finalPrice > RETAIL ? (
                      <>
                        <p className="text-xl font-serif text-foreground mb-4">Thank you for supporting an independent perfume house. 💛</p>
                        <p className="text-sm text-muted-foreground font-light">We'd be honored to accept your generous offer.</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-serif text-foreground mb-4">Deal! Your offer has been accepted.</p>
                        <p className="text-sm text-muted-foreground font-light">Your reserved price</p>
                      </>
                    )}
                    <p className="text-5xl font-serif text-primary mt-8">₹{phase.finalPrice.toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => handleAcceptDeal(phase.finalPrice)}
                    className="w-full rounded-none h-14 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium"
                  >
                    Secure Your Fragrance →
                  </Button>
                </div>
              )}

              {/* EXHAUSTED STATE */}
              {phase.type === "exhausted" && (
                <div className="space-y-8 text-center max-w-md mx-auto">
                  <div className="py-4">
                    <p className="text-base text-foreground/80 leading-relaxed mb-8 font-serif">
                      We've reached our limit on negotiations, but we'd still love to have you in our first batch.
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Retail Price</p>
                    <p className="text-4xl font-serif text-foreground">₹{RETAIL.toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => handleAcceptDeal(RETAIL)}
                    className="w-full rounded-none h-14 bg-foreground text-background hover:bg-foreground/90 text-xs tracking-[0.2em] uppercase font-medium"
                  >
                    Proceed at ₹{RETAIL.toLocaleString()} →
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
