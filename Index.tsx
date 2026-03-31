import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import heroImage from "@/assets/hero-soccer.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 4 });
        setProducts(data?.data?.products?.edges || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Soccer player in action" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1 border border-electric rounded-full mb-6"
            >
              <span className="text-electric text-sm font-display tracking-widest uppercase">New Collection</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-none mb-6">
              <span className="text-foreground">STRIVE</span>
              <br />
              <span className="text-electric text-glow">FURTHER</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Premium soccer gear built for athletes who push beyond limits. Every sprint, every tackle, every goal.
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-electric text-primary-foreground hover:bg-electric-glow glow-electric font-display text-lg tracking-wider px-8">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-foreground text-foreground hover:border-electric hover:text-electric font-display text-lg tracking-wider px-8">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Speed lines decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
      </section>

      {/* Values */}
      <section className="py-20 speed-lines">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Electric Performance", desc: "Engineered for speed and agility on the pitch" },
              { icon: Trophy, title: "Champion Quality", desc: "Premium materials trusted by serious athletes" },
              { icon: Target, title: "Precision Fit", desc: "Designed to move with you, not against you" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-surface border border-border rounded-lg p-8 text-center group hover:border-electric transition-colors"
              >
                <item.icon className="w-10 h-10 text-electric mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              FEATURED <span className="text-electric">GEAR</span>
            </h2>
            <p className="text-muted-foreground mt-4">Curated picks for peak performance</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface rounded-lg animate-pulse">
                  <div className="aspect-square bg-secondary" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found yet.</p>
              <p className="text-muted-foreground text-sm mt-2">Add products to your Shopify store to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.node.id} product={product} index={i} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="border-electric text-electric hover:bg-electric hover:text-primary-foreground font-display tracking-wider">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-electric/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-foreground">NEVER STOP</span>
              <br />
              <span className="text-electric text-glow">STRIVING</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join the movement. Gear up with Strivera and push your game to the next level.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-electric text-primary-foreground hover:bg-electric-glow glow-electric font-display text-xl tracking-wider px-12 py-6">
                Shop The Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
