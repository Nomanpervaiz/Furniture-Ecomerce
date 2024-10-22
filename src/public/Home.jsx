import { Button } from "antd";
import React, { useEffect } from "react";
import HomeSec2 from "../components/BrowseRange";
import SliderSec from "../components/SliderSec";
import SecondLastSec from "../components/SecondLastSec";
import { useNavigate } from "react-router-dom";
import ProductCards from "../components/ProductCards";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  
  return (
    <>
      <section className="text-gray-600 body-font customBg h-fit poppins-regular">
        <div className="container mx-auto flex px-10 pb-24  xl:py-24 lg:py-24 sm:py-24 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className="flex justify-center"></div>
          </div>
          <div className="lg:max-w-lg lg:w-full flex flex-col justify-center px-5 md:px-10 md:w-1/2 sm:w-5/6 w-3/1 h-96 bg-[#FFF3E3]">
            <p className="font-serif font-semibold">New Arrival</p>
            <h1 className="text-yellow-600 xl:text-5xl sm:text-4xl lg:text-5xl text-3xl font-bold">
              Discover Our <br /> New Collection
            </h1>
            <p className="font-semibold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
              incidunt olestias luptatem. Dignissimos
            </p>
            <button className="bg-yellow-600 hover:bg-yellow-500 rounded mt-6 p-3 font-semibold text-white w-40">
              Buy Now
            </button>
          </div>
        </div>
      </section>
      <HomeSec2 />
      <h1 className="font-bold text-3xl text-center">Our Products</h1>
      <ProductCards cardLimit={8} />
      <Button
        onClick={() => navigate("shop")}
        className="block mx-auto w-56 rounded-sm border-yellow-600 text-yellow-600"
      >
        Show All
      </Button>

      <SliderSec />
      <SecondLastSec />
    </>
  );
}

export default Home;
