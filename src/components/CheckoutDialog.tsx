import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, Copy, CreditCard, Banknote, QrCode, Loader2 } from "lucide-react";

export type CheckoutItem = { name: string; price: string };

type Method = "pix" | "card" | "cash";

const formatBRL = (v: number) => v.toFixed(2).replace(".", ",");
const parsePrice = (p: string) => parseFloat(p.replace(",", "."));

const PIX_KEY = "00020126360014BR.GOV.BCB.PIX0114+5511940028922520400005303986540539.905802BR5917Brasa e Brioche6009Sao Paulo62070503***6304E1F2";

export function CheckoutDialog({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: CheckoutItem | null;
}) {
  const [method, setMethod] = useState<Method>("pix");
  const [stage, setStage] = useState<"choose" | "processing" | "done">("choose");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setMethod("pix");
      setStage("choose");
      setCopied(false);
    }
  }, [open]);

  if (!item) return null;

  const subtotal = parsePrice(item.price);
  const delivery = 6.9;
  const total = subtotal + delivery;

  const handlePay = () => {
    setStage("processing");
    setTimeout(() => setStage("done"), 1800);
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        {stage === "done" ? (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-fire flex items-center justify-center mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-display text-center">Pedido confirmado!</DialogTitle>
              <DialogDescription className="text-center">
                Seu {item.name} já foi pro fogo. Chegará em até 30 minutos. 🔥
              </DialogDescription>
            </DialogHeader>
            <p className="mt-4 text-xs text-muted-foreground">
              (Esta é uma simulação — nenhum pagamento real foi processado.)
            </p>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-6 w-full bg-fire text-primary-foreground py-3 rounded-full font-bold shadow-[var(--shadow-ember)] transition hover:scale-[1.02]"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">Finalizar pedido</DialogTitle>
              <DialogDescription>{item.name}</DialogDescription>
            </DialogHeader>

            <div className="bg-background/50 rounded-xl p-4 border border-border text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ {formatBRL(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Entrega</span><span>R$ {formatBRL(delivery)}</span></div>
              <div className="flex justify-between pt-2 mt-2 border-t border-border font-bold text-base">
                <span>Total</span><span className="text-fire text-xl font-display">R$ {formatBRL(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "pix" as const, label: "PIX", icon: QrCode },
                { id: "card" as const, label: "Cartão", icon: CreditCard },
                { id: "cash" as const, label: "Dinheiro", icon: Banknote },
              ]).map((m) => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition ${
                      active ? "border-primary bg-fire/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="animate-in fade-in duration-300">
              {method === "pix" && (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-40 h-40 bg-white rounded-xl p-3 grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`rounded-[1px] ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                  <button onClick={copyPix} className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border hover:border-primary/50 text-sm">
                    <Copy className="w-4 h-4" /> {copied ? "Copiado!" : "Copiar código PIX"}
                  </button>
                </div>
              )}
              {method === "card" && (
                <div className="space-y-2">
                  <input placeholder="Número do cartão" className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="MM/AA" className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none" />
                    <input placeholder="CVV" className="bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none" />
                  </div>
                  <input placeholder="Nome no cartão" className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none" />
                </div>
              )}
              {method === "cash" && (
                <div className="text-sm text-muted-foreground bg-background/50 rounded-xl p-4 border border-border">
                  Pagamento na entrega. Tenha o valor de <strong className="text-foreground">R$ {formatBRL(total)}</strong> em mãos ou peça troco no campo de observações.
                </div>
              )}
            </div>

            <button
              onClick={handlePay}
              disabled={stage === "processing"}
              className="w-full bg-fire text-primary-foreground py-4 rounded-full font-bold shadow-[var(--shadow-ember)] transition hover:scale-[1.02] disabled:opacity-70 inline-flex items-center justify-center gap-2"
            >
              {stage === "processing" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
              ) : (
                <>Pagar R$ {formatBRL(total)}</>
              )}
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              Pagamento simulado — apenas demonstração.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
