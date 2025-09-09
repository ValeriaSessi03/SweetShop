'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Biscotti Shop</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img src={`/images/${p.image}`} alt={p.name} style={{ width: '100%' }} />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <p>€{p.price}</p>
            <button onClick={() => addToCart(p)} style={{ cursor: 'pointer' }}>Aggiungi al carrello</button> 
            <Link href={`/products/${p.id}`}>Informazioni</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
