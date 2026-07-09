import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

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
    <section id="preorder" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-2xl">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Make Your Offer</h2>
          <p className="text-muted-foreground text-sm tracking-wide max-w-md mx-auto">
            Every handcrafted bottle begins with a conversation.
          </p>
        </div>

        <div className="bg-card border border-border p-8 md:p-12">

          {/* Retail price display */}
          <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Retail Price</span>
            <span className="text-2xl font-serif text-foreground">₹{RETAIL.toLocaleString()}</span>
          </div>

          {/* IDLE / INPUT STATE */}
          {(phase.type === "idle" || phase.type === "rejected_low") && (
            <div className="space-y-6">
              {phase.type === "rejected_low" && (
                <div className="bg-primary/5 border border-primary/20 p-4 text-center">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    We'd love to, but that would be difficult for a small independent brand. 💛
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                    You have <span className="text-primary font-semibold">{phase.attemptsLeft}</span> more {phase.attemptsLeft === 1 ? "attempt" : "attempts"} to make your best offer.
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Your Offer</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-serif text-lg">₹</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={offerInput}
                    onChange={(e) => { setOfferInput(e.target.value.replace(/\D/g, "")); setInputError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                    placeholder="Enter your best price"
                    className="rounded-none bg-background border-border h-14 pl-10 text-lg font-serif [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                {inputError && <p className="text-destructive text-xs mt-2">{inputError}</p>}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary shrink-0" />
                  <span>You have <span className="text-foreground font-medium">{attemptsLeft}</span> {attemptsLeft === 1 ? "attempt" : "attempts"} to make your best offer.</span>
                </p>
                <Button
                  onClick={handleContinue}
                  className="rounded-none h-12 px-10 bg-primary text-primary-foreground hover:bg-primary/90 text-xs tracking-[0.2em] uppercase font-medium w-full sm:w-auto"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* COUNTER OFFER STATE */}
          {phase.type === "counter" && (
            <div className="space-y-6 text-center">
              <div className="py-6">
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  You're close! We can't accept that price, but we can reserve your bottle for
                </p>
                <p className="text-4xl font-serif text-primary my-4">₹{phase.counterPrice.toLocaleString()}</p>
                <p className="text-sm text-foreground/70 font-medium">Deal?</p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={phase.attemptsLeft > 0 ? handleTryAgain : () => setPhase({ type: "exhausted" })}
                  className="flex-1 rounded-none h-12 border-border text-xs tracking-widest uppercase hover:bg-background"
                >
                  {phase.attemptsLeft > 0 ? `Try Again (${phase.attemptsLeft} left)` : "Decline"}
                </Button>
                <Button
                  onClick={() => handleAcceptCounter(phase.counterPrice)}
                  className="flex-1 rounded-none h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-xs tracking-[0.2em] uppercase font-medium"
                >
                  Accept — ₹{phase.counterPrice.toLocaleString()}
                </Button>
              </div>
            </div>
          )}

          {/* ACCEPTED STATE */}
          {phase.type === "accepted" && (
            <div className="space-y-6 text-center">
              <div className="py-6">
                <p className="text-3xl mb-3">🎉</p>
                {phase.finalPrice > RETAIL ? (
                  <>
                    <p className="text-lg font-serif text-foreground mb-2">Thank you for supporting an independent perfume house. 💛</p>
                    <p className="text-sm text-muted-foreground">We'd be honored to accept your generous offer.</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-serif text-foreground mb-2">Deal! Your offer has been accepted.</p>
                    <p className="text-muted-foreground text-sm">Your reserved price</p>
                  </>
                )}
                <p className="text-4xl font-serif text-primary mt-4">₹{phase.finalPrice.toLocaleString()}</p>
              </div>
              <Button
                onClick={() => handleAcceptDeal(phase.finalPrice)}
                className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.2em] uppercase font-medium"
              >
                Secure Your Fragrance →
              </Button>
            </div>
          )}

          {/* EXHAUSTED STATE */}
          {phase.type === "exhausted" && (
            <div className="space-y-6 text-center">
              <div className="py-6">
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  We've reached our limit on negotiations, but we'd still love to have you in our first batch.
                </p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">Retail Price</p>
                <p className="text-4xl font-serif text-primary">₹{RETAIL.toLocaleString()}</p>
              </div>
              <Button
                onClick={() => handleAcceptDeal(RETAIL)}
                className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.2em] uppercase font-medium"
              >
                Proceed at ₹{RETAIL.toLocaleString()} →
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
