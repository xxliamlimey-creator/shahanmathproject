import React, { useState } from 'react';
import { Product, CartItem } from '../../types';
import { PRODUCTS } from '../../data/products';
import { LegoButton } from '../LegoButton';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface Screen3ShoppingProps {
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
  onNext: () => void;
}

export const Screen3Shopping: React.FC<Screen3ShoppingProps> = ({
  cart,
  onUpdateCart,
  onNext,
}) => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + 1,
      };
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    onUpdateCart(updatedCart);

    setNotification(`Added ${product.name}!`);
    setTimeout(() => {
      setNotification(null);
    }, 1500);
  };

  const handleCartQtyAdjust = (productId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    onUpdateCart(updated);
  };

  const handleRemoveFromCart = (productId: string) => {
    onUpdateCart(cart.filter((item) => item.product.id !== productId));
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 w-full">
      {/* Simple Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
          Mini Shop
        </h1>
        <p className="text-gray-300 text-sm">
          Click &quot;Add to Cart&quot; to buy items
        </p>
      </div>

      {/* Simple Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 text-sm font-bold shadow">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Products Grid (No pictures) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCTS.map((product) => {
              const inCartItem = cart.find((c) => c.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-slate-800 p-5 flex flex-col justify-between border border-slate-700"
                >
                  {/* Name and Price (No pictures per user request) */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {product.name}
                      </h3>
                      {inCartItem && (
                        <span className="text-xs text-yellow-400 font-semibold">
                          In Cart: {inCartItem.quantity}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${product.price}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <LegoButton
                    onClick={() => handleAddToCart(product)}
                    variant="blue"
                    size="sm"
                    className="w-full"
                  >
                    Add to Cart {inCartItem ? `(${inCartItem.quantity})` : ''}
                  </LegoButton>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 p-5 sticky top-4 border border-slate-700">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                Cart
              </h2>
              <span className="bg-yellow-400 text-black font-bold text-xs px-2 py-0.5">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">
                Your cart is empty.
              </div>
            ) : (
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-slate-900 p-3 flex items-center justify-between gap-2 border border-slate-700"
                  >
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-gray-300 text-xs">
                        ${item.product.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCartQtyAdjust(item.product.id, -1)}
                        className="w-6 h-6 bg-red-600 text-white flex items-center justify-center font-bold text-xs"
                        aria-label={`Decrease ${item.product.name}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-white font-bold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCartQtyAdjust(item.product.id, 1)}
                        className="w-6 h-6 bg-green-600 text-white flex items-center justify-center font-bold text-xs"
                        aria-label={`Increase ${item.product.name}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="w-6 h-6 bg-gray-700 text-white flex items-center justify-center ml-1"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 mt-3 border-t border-gray-700">
              {cart.length === 0 && (
                <p className="text-xs text-yellow-300 mb-2 text-center">
                  Add at least 1 item to continue
                </p>
              )}
              <LegoButton
                onClick={onNext}
                disabled={cart.length === 0}
                variant="green"
                size="lg"
                className="w-full"
              >
                Next →
              </LegoButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
