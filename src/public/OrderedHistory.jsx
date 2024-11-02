import { RightOutlined } from "@ant-design/icons";
import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { ContextOfUser } from "../context/UserContext";
import { db } from "../utility/Firebase";
import { collection, getDocs } from "firebase/firestore";
import ServiceLines from "../components/ServiceLines";
import Spinner from "../components/Spinner";
import dayjs from "dayjs"


function OrderHistory() {
  const userDetail = useContext(ContextOfUser);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (userDetail?.uid) {
          const orderCollection = collection(db, "orders");
          const orderSnapshot = await getDocs(orderCollection);
          const userOrders = orderSnapshot.docs.map((doc) => doc.data());
          setOrderHistory(userOrders);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userDetail]);

  
  const filteredOrders = orderHistory?.flatMap((item) => {
    return (
      item?.orderHistory?.filter(
        (orderDetail) => orderDetail?.userId === userDetail?.uid
      ) || []
    );
  });

  return (
    <section className="poppins-regular">
      <div className="h-72 flex justify-center flex-col items-center pageTopBg">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="font-semibold text-4xl">Order History</h1>
        <p>
          <span className="font-semibold">
            Home <RightOutlined className="icon" />
          </span>
          Order History
        </p>
      </div>
      <div className="h-16 bg-[#FFF3E3]"></div>
      <div className="min-h-[400px] p-1 xl:p-10 sm:p-10 border">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="container px-4 lg:px-10 mx-auto my-10 lg:my-20 flex flex-col items-center">
            <div className="bg-[#FFF3E3] w-full max-w-[600px] h-[200px] flex flex-col justify-center items-center gap-5 p-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl md:text-3xl">
                No order history found.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto rounded-lg">
            <div className="grid gap-y-10 py-8 sm:px-8 px-4">
              <h3 className="text-xl font-bold">Your Orders</h3>
              {filteredOrders.map((order, index) => {

                const formattedDate = dayjs.unix(order?.placedAt?.seconds).format('YYYY-MM-DD');

                return (
                  <div
                    key={index}
                    className="p-5 rounded-md overflow-auto sm:overflow-hidden shadow-lg space-y-4"
                  >
                    <div className="flex justify-between border-b pb-2">
                      <div>
                        <h4 className="font-semibold">Order #{index + 1}</h4>
                        <p>Placed on: {formattedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Total Amount:</p>
                        <p className="text-yellow-500">
                          Rs. {order.amount}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Order Items:</h4>
                      {order.order?.map((item, idx) => {
                        console.log(item);
                        
                        return (
                          <div
                            key={idx}
                            className="flex justify-between border-b pb-2"
                          >
                            <span className="flex gap-2 items-center">
                              <img
                                src={item.thumbnail}
                                className="w-12 rounded-md"
                                alt="item"
                              />
                              {item.name} ({item.quantity})
                            </span>
                            <span>Rs. {item.price}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="pt-4">
                      <h4 className="font-semibold">Customer Info:</h4>
                      <p>
                        Name: {order?.formData?.name}{" "}
                        {order?.formData?.lastName}
                      </p>
                      <p>
                        Address: {order?.formData?.address},{" "}
                        {order?.formData?.city},{" "}
                        {order?.formData?.postalCode}
                      </p>
                      <p>Phone: {order?.formData?.phone}</p>
                      <p>Payment Method: {order?.formData?.paymentMethod}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <ServiceLines />
    </section>
  );
}

export default OrderHistory;
