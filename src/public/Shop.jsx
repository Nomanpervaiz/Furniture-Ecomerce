import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import ProductCards from "../components/ProductCards";
import { CheckOutlined, ReconciliationOutlined, RightOutlined, TrophyOutlined, WechatWorkOutlined } from "@ant-design/icons";
import ServiceLines from "../components/ServiceLines";


function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="poppins-regular">
      <div className="h-72 flex justify-center flex-col items-center pageTopBg">
        <img src={logo} alt="logo" className="w-10" />
        <h1 className="font-semibold text-4xl">Shop</h1>
        <p>
          <span className="font-semibold">
            Home {<RightOutlined className="icon" />}
          </span>
          Shop
        </p>
      </div>
      <div className="h-16 bg-[#FFF3E3]"></div>
      <div className="h-fit">
        <ProductCards />
      </div>

<ServiceLines/>


    </section>
  );
}

export default Shop;
