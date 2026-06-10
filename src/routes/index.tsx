import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroBurger from "@/assets/hero-burger.jpg";
import burger1 from "@/assets/burger-1.jpg";
import burger2 from "@/assets/burger-2.jpg";
import burger3 from "@/assets/burger-3.jpg";
import burger4 from "@/assets/burger-4.jpg";
import { Flame, MapPin, Phone, Clock, Star, Truck, ChefHat, Award, Gift, Sparkles, Crown } from "lucide-react";
import { CheckoutDialog, type CheckoutItem } from "@/components/CheckoutDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brasa & Brioche — Hambúrgueres Artesanais" },
      { name: "description", content: "Os melhores hambúrgueres artesanais da cidade. Carne 100% angus, pão brioche feito na casa. Peça já!" },
      { property: "og:title", content: "Brasa & Brioche — Hambúrgueres Artesanais" },
      { property: "og:description", content: "Hambúrgueres suculentos, preço justo. Delivery em até 30 min." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  component: Index,
});

const burgers = [
  { name: "Clássico da Brasa", desc: "Blend bovino 180g, cheddar inglês, alface, tomate, picles e maionese da casa no pão brioche.", price: "29,90", img: heroBurger, tag: "MAIS PEDIDO" },
  { name: "Double Bacon", desc: "Dois smash 100g, cheddar duplo, bacon crocante e cebola caramelizada.", price: "36,90", img: burger1, tag: "NOVO" },
  { name: "BBQ Smokehouse", desc: "Blend 180g, bacon, cebola roxa, molho barbecue defumado e mostarda dijon.", price: "33,90" , img: burger2 },
  { name: "Veggie Gourmet", desc: "Hambúrguer de cogumelos, brie derretido, rúcula e geleia de pimenta no pão integral.", price: "31,90", img: burger3 },
  { name: "Inferno Picante", desc: "Blend 180g, pepper jack, jalapeños frescos, chipotle e cebola crispy. Para os corajosos.", price: "34,90", img: burger4, tag: "🔥 PICANTE" },
  { name: "Cheddar Lover", desc: "Blend 180g banhado em molho cheddar artesanal, bacon em cubos e cebola crispy.", price: "35,90", img: burger1 },
  { name: "Texas Triple", desc: "Três smashes 90g, cheddar, bacon, anéis de cebola empanados e molho BBQ artesanal.", price: "42,90", img: burger2, tag: "GIGANTE" },
  { name: "Trufado Black", desc: "Blend angus 200g, queijo gruyère, cogumelos salteados e maionese de trufa negra.", price: "44,90", img: burger3, tag: "PREMIUM" },
];

const sides = [
  { name: "Batata Rústica", desc: "Porção generosa com alecrim e flor de sal.", price: "16,90" },
  { name: "Onion Rings", desc: "Anéis de cebola empanados, crocantes por fora, macios por dentro.", price: "18,90" },
  { name: "Nuggets da Casa", desc: "8 unidades de frango empanado com molho honey mustard.", price: "22,90" },
  { name: "Mac & Cheese", desc: "Macarrão cremoso com mix de quatro queijos gratinados.", price: "24,90" },
];

const drinks = [
  { name: "Refri Lata 350ml", desc: "Coca, Guaraná, Sprite ou Fanta.", price: "7,90" },
  { name: "Suco Natural 500ml", desc: "Laranja, limão, maracujá ou abacaxi.", price: "12,90" },
  { name: "Milkshake 500ml", desc: "Ovomaltine, morango, chocolate belga ou baunilha.", price: "19,90" },
  { name: "Cerveja Artesanal", desc: "IPA, Pilsen ou Weiss da cervejaria local.", price: "16,90" },
];

const combos = [
  {
    name: "Combo Solo",
    desc: "Perfeito pra matar a fome sozinho.",
    items: ["1 Clássico da Brasa", "Batata rústica média", "Refri lata 350ml"],
    oldPrice: "54,70",
    price: "39,90",
    icon: Flame,
  },
  {
    name: "Combo Duplo",
    desc: "Pra dividir com quem você ama.",
    items: ["2 Double Bacon", "2 Batatas rústicas", "2 Refris 350ml", "1 Brownie de sobremesa"],
    oldPrice: "118,50",
    price: "89,90",
    icon: Sparkles,
    highlight: true,
  },
  {
    name: "Combo Família",
    desc: "Festa garantida pra galera toda.",
    items: ["4 Hambúrgueres à escolha", "2 Batatas G", "Onion rings", "4 Refris", "2 Milkshakes"],
    oldPrice: "229,00",
    price: "169,90",
    icon: Crown,
  },
];

const brindes = [
  { min: "80", title: "Brownie de Brinde", desc: "Sobremesa quentinha com calda de chocolate belga.", icon: Gift },
  { min: "150", title: "Milkshake Grátis", desc: "Escolha qualquer sabor de 500ml por nossa conta.", icon: Sparkles },
  { min: "250", title: "Combo Solo Grátis", desc: "Próximo pedido com um Combo Solo completo de cortesia.", icon: Crown },
];

const reviews = [
  { name: "Marina Castelo", text: "O melhor hambúrguer que já comi! A carne é absurda de suculenta e o atendimento é nota mil.", rating: 5 },
  { name: "Rafael Andrade", text: "Peço todo final de semana. Chega quentinho, bem embalado e o preço cabe no bolso. Recomendo demais!", rating: 5 },
  { name: "Juliana Reis", text: "Ambiente acolhedor e o Inferno Picante é viciante. Já trouxe meio escritório aqui hahaha", rating: 5 },
  { name: "Pedro Salles", text: "Pão brioche perfeito, batata crocante e molho da casa de outro nível. Vale cada centavo.", rating: 5 },
];

function Index() {
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);
  const openCheckout = (item: CheckoutItem) => setCheckoutItem(item);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CheckoutDialog open={!!checkoutItem} onOpenChange={(v) => !v && setCheckoutItem(null)} item={checkoutItem} />
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Flame className="w-7 h-7 text-primary" />
            <span className="text-2xl font-display tracking-wider">Brasa & Brioche</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#cardapio" className="hover:text-primary transition">Cardápio</a>
            <a href="#combos" className="hover:text-primary transition">Combos</a>
            <a href="#avaliacoes" className="hover:text-primary transition">Avaliações</a>
            <a href="#contato" className="hover:text-primary transition">Contato</a>
          </nav>
          <a href="#cardapio" className="bg-fire text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm shadow-[var(--shadow-ember)] hover:scale-105 transition">
            Peça agora
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.68_0.21_40/0.25),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/30 text-xs font-semibold tracking-widest text-primary">
              <Flame className="w-3.5 h-3.5" /> NA BRASA DESDE 2018
            </span>
            <h1 className="mt-6 text-6xl md:text-8xl font-display leading-[0.9]">
              SABOR QUE<br /><span className="text-fire">EXPLODE</span><br />NA BOCA.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Hambúrgueres artesanais com carne 100% angus, pão brioche feito todo dia e molhos exclusivos. Delivery rápido em até 30 minutos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#cardapio" className="bg-fire text-primary-foreground px-8 py-4 rounded-full font-bold shadow-[var(--shadow-ember)] hover:scale-105 transition">
                Ver Cardápio
              </a>
              <a href="#contato" className="px-8 py-4 rounded-full border border-border font-semibold hover:bg-card transition">
                (11) 4002-8922
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-gold text-gold" /><strong className="text-foreground">4.9</strong> · 2.３k avaliações</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Delivery 30 min</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-fire opacity-30 blur-3xl rounded-full" />
            <img
              src={heroBurger}
              alt="Hambúrguer artesanal Clássico da Brasa"
              width={1536}
              height={1536}
              className="relative rounded-3xl shadow-[var(--shadow-card)] object-cover aspect-square"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-[var(--shadow-card)] rotate-[-4deg]">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">A partir de</p>
              <p className="text-5xl font-display text-fire">R$ 29,90</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-fire text-primary-foreground rounded-2xl px-5 py-3 rotate-[6deg] shadow-[var(--shadow-ember)]">
              <p className="text-xs font-bold">🔥 MAIS PEDIDO</p>
            </div>
          </div>
        </div>
      </section>

      {/* SELLING POINTS */}
      <section className="border-y border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ChefHat, t: "Carne Angus", s: "100% premium" },
            { icon: Flame, t: "Na Brasa", s: "Sabor defumado" },
            { icon: Truck, t: "Delivery 30min", s: "Quentinho na porta" },
            { icon: Award, t: "Top 10 SP", s: "Guia BurgerFest" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-fire/10 border border-primary/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold">{t}</p>
                <p className="text-xs text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARDÁPIO */}
      <section id="cardapio" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm">NOSSO CARDÁPIO</span>
          <h2 className="text-5xl md:text-6xl font-display mt-2">Escolha seu favorito</h2>
          <p className="text-muted-foreground mt-4">Todos acompanham batata rústica e molho especial da casa.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {burgers.map((b) => (
            <article key={b.name} className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition shadow-[var(--shadow-card)] flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={b.img} alt={b.name} loading="lazy" width={768} height={576} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                {b.tag && (
                  <span className="absolute top-4 left-4 bg-fire text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {b.tag}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-display tracking-wide">{b.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-1">{b.desc}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Preço</p>
                    <p className="text-4xl font-display text-fire leading-none">R$ {b.price}</p>
                  </div>
                  <button onClick={() => openCheckout({ name: b.name, price: b.price })} className="bg-fire text-primary-foreground px-5 py-3 rounded-full font-bold text-sm shadow-[var(--shadow-ember)] hover:scale-105 transition">
                    Pedir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ACOMPANHAMENTOS & BEBIDAS */}
        <div className="mt-24 grid lg:grid-cols-2 gap-10">
          {[
            { title: "Acompanhamentos", items: sides },
            { title: "Bebidas", items: drinks },
          ].map((group) => (
            <div key={group.title} className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-3xl font-display mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-fire rounded-full" /> {group.title}
              </h3>
              <ul className="divide-y divide-border">
                {group.items.map((it) => (
                  <li key={it.name} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold">{it.name}</p>
                      <p className="text-sm text-muted-foreground">{it.desc}</p>
                    </div>
                    <p className="text-2xl font-display text-fire whitespace-nowrap">R$ {it.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* COMBOS */}
      <section id="combos" className="bg-gradient-to-br from-card to-background border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-widest text-sm">COMBOS IMPERDÍVEIS</span>
            <h2 className="text-5xl md:text-6xl font-display mt-2">Mais sabor, menos preço</h2>
            <p className="text-muted-foreground mt-4">Monte sua refeição completa com economia de até 30%.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {combos.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.name}
                  className={`relative rounded-3xl p-8 flex flex-col border transition shadow-[var(--shadow-card)] ${
                    c.highlight
                      ? "bg-fire text-primary-foreground border-transparent scale-[1.03] md:scale-105"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  {c.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border border-primary/40">
                      ⭐ MAIS PEDIDO
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${c.highlight ? "bg-background/20" : "bg-fire/10 border border-primary/30"}`}>
                    <Icon className={`w-6 h-6 ${c.highlight ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <h3 className="text-3xl font-display">{c.name}</h3>
                  <p className={`text-sm mt-1 ${c.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{c.desc}</p>

                  <ul className={`mt-6 space-y-2 text-sm flex-1 ${c.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    {c.items.map((i) => (
                      <li key={i} className="flex gap-2"><span>✓</span>{i}</li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-current/20">
                    <p className={`text-sm line-through ${c.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>De R$ {c.oldPrice}</p>
                    <p className={`text-5xl font-display leading-none ${c.highlight ? "text-primary-foreground" : "text-fire"}`}>R$ {c.price}</p>
                    <button
                      onClick={() => openCheckout({ name: c.name, price: c.price })}
                      className={`mt-5 w-full py-4 rounded-full font-bold transition hover:scale-[1.02] ${
                        c.highlight
                          ? "bg-background text-primary shadow-lg"
                          : "bg-fire text-primary-foreground shadow-[var(--shadow-ember)]"
                      }`}
                    >
                      Pedir agora
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRINDES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-primary font-semibold tracking-widest text-sm">
            <Gift className="w-4 h-4" /> PROGRAMA RECOMPENSA
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-2">Comprou bem? Ganhou brinde!</h2>
          <p className="text-muted-foreground mt-4">Quanto maior seu pedido, mais delícias por nossa conta. Vale para qualquer pedido único.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {brindes.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="relative bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-fire opacity-10 blur-2xl" />
                <span className="text-xs font-bold tracking-widest text-muted-foreground">NÍVEL {idx + 1}</span>
                <p className="mt-2 text-sm text-muted-foreground">Acima de</p>
                <p className="text-5xl font-display text-fire">R$ {b.min}</p>
                <div className="mt-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-fire flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display">{b.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* AVALIAÇÕES */}
      <section id="avaliacoes" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold tracking-widest text-sm">QUEM PROVOU, APROVOU</span>
          <h2 className="text-5xl md:text-6xl font-display mt-2">Avaliações reais</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-gold text-gold" />)}
            <span className="ml-2 text-lg"><strong>4.9</strong> de 5 · 2.341 avaliações</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition">
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
              <p className="mt-4 font-semibold text-sm">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="bg-card/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, t: "Localização", l: ["Rua das Brasas, 1234", "Vila Madalena · São Paulo/SP"] },
            { icon: Phone, t: "Telefone & WhatsApp", l: ["(11) 4002-8922", "WhatsApp: (11) 98765-4321"] },
            { icon: Clock, t: "Horário", l: ["Ter – Dom: 18h às 23h30", "Segunda: fechado"] },
          ].map(({ icon: Icon, t, l }) => (
            <div key={t} className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-fire flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display">{t}</h3>
              {l.map((line) => <p key={line} className="text-muted-foreground mt-1">{line}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-display tracking-wider">Brasa & Brioche</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Brasa & Brioche · Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
