"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import updateProducts from "@/app/actions/Products/updateProducts";
const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [basket, setBasket] = useState([]);

  useEffect(async () => {
    let getItem = localStorage.getItem("cart");
    let getItemParse = JSON.parse(getItem);
    if (getItemParse) {
      const res = await updateProducts(getItemParse);
      localStorage.setItem("cart", JSON.stringify(res));
      setBasket(res);
    }
  }, []);

  const addToBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];

      const Index = upBasket.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );
      if (Index !== -1) {
        upBasket[Index].quantity += newItem.quantity || 1;
      } else {
        upBasket = [...upBasket, newItem];
      }

      setBasket(upBasket);
      localStorage.setItem("cart", JSON.stringify(upBasket));
    },
    [basket]
  );

  const removeBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];
      const Index = upBasket.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (Index !== -1) {
        upBasket.splice(Index, 1);
        setBasket(upBasket);
        localStorage.setItem("cart", JSON.stringify(upBasket));
      }
    },
    [basket]
  );

  const emptyBasket = useCallback(() => {
    setBasket([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  let value = {
    basket,
    addToBasket,
    removeBasket,
    emptyBasket,
  };
  return <CartContext.Provider value={value} {...props} />;
};

const UseCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("Bir hata durumu mevcut");
  }
  return context;
};

export default UseCart;
