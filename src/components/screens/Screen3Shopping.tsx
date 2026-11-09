import React, { useState } from 'react';
import { Product, CartItem } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ProductIllustration } from '../LegoProductIllustrations';
import { LegoButton } from '../LegoButton';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

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

  // Directly adds 1 item on click, clicking again increments by 1
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

    setNotification(`Added ${product.name} to cart!`);
    setTimeout(() => {
      setNotification((curr) => (curr?.includes(product.name) ? null : curr));
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
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      {/* Clean Title Banner without protruding squares */}
      <div className="bg-[#006CB7] border-4 border-[#003B66] p-4 text-center mb-6 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#FFE600] drop-shadow-[0_2px_0_#997300]">
          Mini Shop
        </h1>
        <p className="mt-1 text-sm sm:text-base font-bold font-sans text-white uppercase tracking-wide">
          Click &quot;Add to Cart&quot; to pick your items!
        </p>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#00852B] border-4 border-[#004D1A] text-white px-5 py-3 shadow-2xl font-sans font-black text-sm flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-yellow-300" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 7 Products Grid without little edge squares */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCTS.map((product) => {
              const inCartItem = cart.find((c) => c.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-[#0E2643] border-4 border-[#0055BF] p-4 shadow-xl flex flex-col justify-between"
                >
                  {/* Real Product Photo */}
                  <div className="border-2 border-[#163B66] bg-white p-2 mb-3 relative">
                    <ProductIllustration id={product.id} name={product.name} className="w-full h-44" />
                    {inCartItem && (
                      <div className="absolute top-2 right-2 bg-[#FFD200] text-black font-black text-xs px-2.5 py-1 border-2 border-black uppercase tracking-wider shadow">
                        In Cart: {inCartItem.quantity}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex items-center justify-between mb-4 border-b-2 border-[#163B66] pb-2">
                    <h3 className="text-lg font-black font-sans text-white uppercase tracking-wide">
                      {product.name}
                    </h3>
                    <span className="text-2xl font-black font-sans text-[#FFE600] bg-black/40 px-2 py-0.5 border border-[#FFE600]/40">
                      ${product.price}
                    </span>
                  </div>

                  {/* Single Add to Cart Button (Clicking adds 1, clicking again adds more) */}
                  <LegoButton
                    onClick={() => handleAddToCart(product)}
                    variant={
                      product.color === 'red'
                        ? 'red'
                        : product.color === 'yellow'
                        ? 'yellow'
                        : product.color === 'green'
                        ? 'green'
                        : product.color === 'orange'
                        ? 'orange'
                        : 'blue'
                    }
                    size="sm"
                    className="w-full py-2.5 text-sm"
                  >
                    Add to Cart {inCartItem ? `(${inCartItem.quantity})` : ''}
                  </LegoButton>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shopping Cart Sidebar without edge squares */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-[#0E2643] border-4 border-[#FFD200] p-5 shadow-2xl">
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#1E4976]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-black font-sans uppercase tracking-wider text-white">
                  Cart
                </h2>
              </div>
              <span className="bg-[#FFD200] text-black font-black text-xs px-2.5 py-1 border border-black uppercase tracking-wider">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Cart List */}
            {cart.length === 0 ? (
              <div className="py-10 text-center text-slate-400">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#08182B] flex items-center justify-center border-2 border-dashed border-[#1E4976]">
                  <ShoppingBag className="w-6 h-6 text-slate-500" />
                </div>
                <p className="font-bold text-white text-base">Cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">
                  Click &quot;Add to Cart&quot; on items to begin.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-[#08182B] border-2 border-[#1E4976] p-2.5 flex items-center justify-between gap-2 shadow"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-12 h-12 bg-white p-0.5 border border-slate-300 shrink-0 flex items-center justify-center">
                        <ProductIllustration id={item.product.id} name={item.product.name} className="w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate uppercase tracking-tight">
                          {item.product.name}
                        </p>
                        <p className="text-yellow-400 text-xs font-bold">
                          ${item.product.price} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCartQtyAdjust(item.product.id, -1)}
                        className="w-6 h-6 bg-[#E3000B] text-white flex items-center justify-center font-bold text-xs border border-[#8B0006]"
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
                        className="w-6 h-6 bg-[#00852B] text-white flex items-center justify-center font-bold text-xs border border-[#004D1A]"
                        aria-label={`Increase ${item.product.name}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="w-6 h-6 bg-slate-700 hover:bg-red-700 text-white flex items-center justify-center ml-1"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Next Button */}
            <div className="pt-4 mt-4 border-t-2 border-[#1E4976]">
              {cart.length === 0 && (
                <p className="text-xs text-amber-300 font-bold mb-2 text-center uppercase tracking-wide">
                  ⚠️ Cart must have at least 1 item
                </p>
              )}
              <LegoButton
                onClick={onNext}
                disabled={cart.length === 0}
                variant="green"
                size="lg"
                className="w-full text-base"
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
