import { useEffect, useState } from 'react';
import { products as configProducts, Product } from '../config/site';
import { getProductBySlug } from '../lib/orderService';
import OrderForm from '../components/OrderForm';
import { Loader2 } from 'lucide-react';

export default function OrderCreatorAudit() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      // Try to get from database first
      const result = await getProductBySlug('creator-audit');
      if (result.product) {
        // Map DB product to config product format
        const dbProduct = result.product;
        setProduct({
          id: dbProduct.id,
          slug: dbProduct.slug,
          name: dbProduct.name,
          shortDescription: dbProduct.description || '',
          longDescription: dbProduct.description || '',
          priceEur: dbProduct.price_eur,
          priceMad: dbProduct.price_mad,
          period: dbProduct.period as 'one-time' | '/month',
          features: dbProduct.features || [],
          deliverables: dbProduct.deliverables || [],
          cta: 'Order Now',
        });
      } else {
        // Fallback to config
        const configProduct = configProducts.find(p => p.slug === 'creator-audit');
        if (configProduct) {
          setProduct(configProduct);
        }
      }
      setLoading(false);
    }
    loadProduct();
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-slate-400">Product not found</p>
      </div>
    );
  }

  return <OrderForm product={product} />;
}
