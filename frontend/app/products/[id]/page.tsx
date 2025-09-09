'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

type Review = {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Carica prodotto
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // Carica recensioni
  useEffect(() => {
    fetch(`http://localhost:3001/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  const handleAddReview = async () => {
    if (!user) return alert('Devi fare il login per scrivere una recensione');

    const res = await fetch('http://localhost:3001/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        product_id: id,
        rating,
        comment,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setReviews([...reviews, { id: data.id, user_id: user.id, rating, comment }]);
      setComment('');
      setRating(5);
    } else {
      alert(data.error);
    }
  };

  if (!product) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{product.name}</h1>
      <img src={`/images/${product.image}`} alt={product.name} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p><strong>Prezzo:</strong> €{product.price}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Recensioni</h2>
      {reviews.map(r => (
        <div key={r.id} style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'white' }}>Utente {r.user_id}:</strong> {r.comment} (⭐{r.rating})
        </div>
      ))}

      {user && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Aggiungi una recensione</h3>
          <label>
            Voto:
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <br />
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Scrivi la tua recensione..."
            style={{ width: '100%', height: '80px', marginTop: '0.5rem' }}
          />
          <br />
          <button onClick={handleAddReview} style={{ marginTop: '0.5rem' }}>Invia recensione</button>
        </div>
      )}
    </div>
  );
}
