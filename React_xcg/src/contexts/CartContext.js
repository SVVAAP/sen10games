import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext()
const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
// item amount state 
const [itemAmount , setItemAmount]= useState(0); 
//  total price state
const [total , setTotal ]= useState(0);

useEffect(()=>{
  const total = cart.reduce((accumulator , currentItem)=>{
    return accumulator + currentItem.price * currentItem.amount;
  }, 0);
  setTotal(total);
});

// update item amount 
useEffect(() => {
  if (cart) {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount;
    }, 0);
    setItemAmount(amount); 
  }
}, [cart]);


  // add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    //  check if the item is already in the cart 
    const CartItem = cart.find((item) => {
      return item.id === id;
    });
    console.log("Cart Item", CartItem)
    if (CartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id == id) {
          return { ...item, amount: CartItem.amount + 1 };
        } else { return item; }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item, id !== id;
    });
    setCart(newCart);
  };

// clear cart 
const clearCart = ()=>{
  setCart([]);
};

// increae  by one
const increaseAmount = (id)=>{
  const CartItem = cart.find((item)=> item.id === id);
  addToCart(CartItem , id);
};

// decrease  by one
const decreaseAmount = (id)=>{
  const CartItem = cart.find((item)=> {
return item.id === id;
  });
  if(CartItem){
    const newCart = cart.map((item)=> {
      if(item.id===id){
        return{...item,amount:CartItem.amount-1};
      }else{
        return item;
      }
    });
    setCart(newCart);
  }
    
  if(CartItem.amount<2){
      removeFromCart(id);
    }
  
  
};
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart , increaseAmount , decreaseAmount , itemAmount , total,setItemAmount, }}>{children}</CartContext.Provider>
  );
};
export default CartProvider;
