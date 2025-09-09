'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null); // rimuove utente da stato e localStorage
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link href="/" className="text-xl font-bold text-black">🍪 SweetShop</Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#000' }}>Home</Link>

        <Link href="/cart" style={{ position: 'relative', color: '#000' }}>
          Carrello
          {cart.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'red',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '0.75rem'
            }}>
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span style={{ color: '#000' }}>Ciao, {user.name}</span>
            <button onClick={handleLogout} style={{ cursor: 'pointer', color: 'black' }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{ color: '#000' }}>Login</Link>
            <Link href="/auth/register" style={{ color: '#000' }}>Registrati</Link>
          </>
        )}
      </div>
    </nav>
  );
}
