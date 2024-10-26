import { RightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";

import { ContextOfCart } from "../context/CartContext";
import { ContextOfUser } from "../context/UserContext";
import { message } from "antd";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utility/Firebase";
import ConfirmationMessage from "../components/ConfirmMessage";
import ServiceLines from "../components/ServiceLines";


function Checkout() {
  const userDetail = useContext(ContextOfUser);
  const { cartItem,updateItemsAfterOrder } = useContext(ContextOfCart);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cash",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false); 

  const totalAmount = cartItem.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const objectValues = Object.values(formData);

  const handlePlaceOrder = async () => {
    const hasValidValue = objectValues.every(
      (value) => value.trim() !== ""
    );

    if (!hasValidValue) {
      message.error("Please fill in all required fields.");
      return;
    }
    try {
      setIsPlacingOrder(true); 

      const orderItems = cartItem.map((item) => ({ ...item }));
      const orderRef = doc(collection(db, "orders"), userDetail?.uid);

      await setDoc(orderRef, {
        orders: orderItems,
        customerInfo: formData,
        orderPlacedAt: new Date(),
        Orderby : userDetail?.uid , 
        totalAmount,
      });
      message.success("Order placed successfully!"); 
      setFormData({
        name: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        paymentMethod: "cash",
      })
      
      updateItemsAfterOrder()
       setIsOrderPlaced(true);

    } catch (error) {
      console.error("Error placing order:", error);
      message.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false); 
    }
  };

 

  return (
    
    <section className="poppins-regular">
      <div className="h-72 flex justify-center flex-col items-center pageTopBg">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="font-semibold text-4xl">Checkout</h1>
        <p>
          <span className="font-semibold">
            Home <RightOutlined className="icon" />
          </span>
          Checkout
        </p>
      </div>

      <div className="h-16 bg-[#FFF3E3]"></div>

      <div className="min-h-[400px] p-1 xl-p-10 content-center sm-p-10 border">
        {
          isOrderPlaced ? <ConfirmationMessage/>
          :
          <div className="max-w-6xl mx-auto rounded-lg">
          <div className="grid md:grid-cols-2 gap-x-20 p-8">
            
            <form className="space-y-6">
              <h3 className="text-xl font-bold">Billing Detail</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-3 border rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 border rounded"
                required
              />
            </form>

            
            <div className="space-y-5 py-10">
              <h3 className="text-base font-bold">Order Summary</h3>
              {cartItem.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {item.name} ({item.quantity})
                  </span>
                  <span>Rs. {item.price}</span>
                </div>
              ))}

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-yellow-500">
                  Rs. {totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="border rounded"
                />
                <p>Cash on delivery</p>
              </div>

              <p>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={handlePlaceOrder}
                  type="button"
                  className="hover:bg-yellow-500 bg-yellow-600 w-1/2 text-white border border-white p-3 rounded-md mt-4"
                  disabled={isPlacingOrder} // Disable while placing order
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>

        </div>
        }

      </div>
      <ServiceLines/>
    </section>
  );
}

export default Checkout;
