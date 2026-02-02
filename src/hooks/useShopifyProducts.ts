import { useState, useEffect } from 'react';
import { ShopifyProduct, fetchShopifyProducts } from '@/lib/shopify';

interface UseShopifyProductsResult {
  products: ShopifyProduct[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useShopifyProducts(limit: number = 50, query?: string): UseShopifyProductsResult {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchShopifyProducts(limit, query);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit, query]);

  return { products, isLoading, error, refetch: fetchProducts };
}

// Filter products by category based on product_type
export function filterProductsByCategory(products: ShopifyProduct[], category: string): ShopifyProduct[] {
  const normalizedCategory = category.toLowerCase();
  
  if (normalizedCategory === 'all') {
    return products;
  }
  
  if (normalizedCategory === 'mens' || normalizedCategory === 'womens') {
    return products.filter(p => 
      p.node.variants.edges[0]?.node.price && 
      !['accessories', 'accessory'].some(acc => 
        (p.node as any).productType?.toLowerCase().includes(acc)
      )
    );
  }
  
  if (normalizedCategory === 'accessories') {
    return products.filter(p => {
      const tags = (p.node as any).tags?.toLowerCase() || '';
      const productType = (p.node as any).productType?.toLowerCase() || '';
      return tags.includes('accessories') || productType.includes('accessories');
    });
  }
  
  return products;
}
