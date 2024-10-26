import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";

import { ContextOfCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ServiceLines from "../components/ServiceLines";

function AllCart() {
  const { cartItem, removeItemFromCart } = useContext(ContextOfCart);
  const totalAmount = cartItem.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const totalQuantity = cartItem.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const navigate = useNavigate();
  const GoToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section>
      <div className="h-72 flex justify-center flex-col items-center pageTopBg text-center">
        <img src={logo} alt="logo" className="w-10 mb-4" />
        <h1 className="font-semibold text-4xl">Cart</h1>
        <div className="flex gap-2 items-center">
          <p className="text-gray-000 font-semibold">Home</p>
          <RightOutlined className="icon text-black" />
          <p className="text-gray-600">Cart</p>
        </div>
      </div>
      {cartItem.length === 0 ? (
        <div className="container px-4 lg:px-10 mx-auto my-10 lg:my-20 flex flex-col lg:flex-row gap-10">
          <div className="w-full content-center  flex justify-center">
            <div className="bg-[#FFF3E3] w-full max-w-[600px] h-[200px] flex flex-col justify-center items-center gap-5 p-6 rounded-lg shadow-lg">
                <p className="font-bold text-xl">Empty cart</p>
                <p>No Item Added to Cart</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container px-4 lg:px-10 mx-auto my-10 lg:my-20 flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/4 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead className="bg-[#FFF3E3]">
                  <tr>
                    <th className="p-4 text-center border">Product</th>
                    <th className="p-4 text-center border">Price</th>
                    <th className="p-4 text-center border">Quantity</th>
                    <th className="p-4 text-center border">Subtotal</th>
                    <th className="p-4 text-center border"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((items) => {
                    return (
                      <tr key={items.id} className="text-center border-b  ">
                        <td className="p-4 flex items-center gap-4">
                          <img
                            className="w-20 rounded-md"
                            src={items.thumbnail}
                            alt="product image"
                          />
                          <span>{items.name}</span>
                        </td>
                        <td className="p-4">Rs. {items.price}</td>
                        <td className="p-4">{items.quantity}</td>
                        <td className="p-4">
                          Rs. {items.price * items.quantity}
                        </td>
                        <td className="p-4">
                          <DeleteOutlined
                            onClick={() => removeItemFromCart(items.id)}
                            className="cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full content-center lg:w-1/4  lg:justify-end">
            <div className="bg-[#FFF3E3] w-full max-w-[300px] mx-auto p-6 rounded-lg shadow-lg">
              <h2 className="font-bold text-xl text-center pb-4">
                Cart Totals
              </h2>
              <div className="flex justify-between p-2">
                <p>Total Quantity</p>
                <span>({totalQuantity})</span>
              </div>
              <div className="flex justify-between p-2">
                <p>Total</p>{" "}
                <span className="text-yellow-500">
                  Rs {totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                onClick={GoToCheckout}
                className="bg-black text-white w-full rounded-lg my-4 p-2 hover:bg-gray-800"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}

      <ServiceLines />
    </section>
  );
}

export default AllCart;
