import { createContext, useContext, useEffect,  useState } from "react";
import { ContextOfUser } from "./UserContext";
import { message } from "antd";
import { db } from "../utility/Firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export const ContextOfCart = createContext();

export const ContextOfCartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const userDetail = useContext(ContextOfUser);
  const { islogin } = userDetail

  const cartRef = userDetail?.uid
    ? doc(collection(db, "carts"), userDetail.uid)
    : null;

  useEffect(() => {
    const fetchCart = async () => {
      if (cartRef) {
        try {
          const cartSnapshot = await getDoc(cartRef);
          if (cartSnapshot.exists()) {
            setCartItem(cartSnapshot.data().items || []);
          } else {
            setCartItem([]);
          }
        } catch (error) {
          message.error("Failed to load cart data from Firestore");
        }
      }
    };
    fetchCart();
  }, [cartRef,userDetail,islogin]);

  const syncCartWithFirestore = async (newCart) => {
    if (cartRef) {
      try {
        await setDoc(cartRef, { items: newCart });
      } catch (error) {
        message.error("Failed to sync cart with Firestore");
      }
    }
  };

  const addItemToCart = async (item) => {
    if (!userDetail?.uid) {
      message.warning("You need to Register or Login first");
      return;
    }
    setCartItem((prevItems) => {
      const existIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      )
      let updatedItems;
      if (existIndex !== -1) {
        updatedItems = [...prevItems];
        updatedItems[existIndex].quantity += 1;
      } else {
        updatedItems = [
          ...prevItems,
          { ...item, quantity: 1, userId: userDetail.uid },
        ];
      }

      syncCartWithFirestore(updatedItems);
      return updatedItems;
    });
  };

  const isItemAdded = (id) => {
    if (userDetail?.uid) { 
      let items = cartItem?.find((item) => item.id == id);
      return items ? items : null;
    }
  };

  const updateItemsAfterOrder = async () => {
    if (cartRef) {
      try {
        await updateDoc(cartRef, { items: [] });
        setCartItem([]); 
      } catch (error) {
        message.error("Failed to update cart after order.");
      }
    }
  };

  const removeItemFromCart = async (id) => {
    const updatedCart = cartItem.filter((item) => item.id !== id);
    setCartItem(updatedCart);
    await syncCartWithFirestore(updatedCart);
  };



  const updateQuantity = async (productId, newQuantity) => {
    if (!userDetail?.uid) {
      message.warning("You need to Register or Login first");
      return;
    }
    setCartItem((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      syncCartWithFirestore(updatedItems);
      return updatedItems; 
    });
  };
  

  return (
    <ContextOfCart.Provider
      value={{
        cartItem,
        setCartItem,
        addItemToCart,
        removeItemFromCart,
        isItemAdded,
        updateQuantity,
        updateItemsAfterOrder
        
      }}
    >
      {children}
    </ContextOfCart.Provider>
  );
};
