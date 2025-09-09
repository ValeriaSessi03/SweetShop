"use client";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.price) * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrello</h1>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>€ {item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Totale: € {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
