import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import furnitureData from "../utility/productsArray";
import { MinusOutlined,  PlusOutlined, RightOutlined } from "@ant-design/icons";
import ProductCards from "../components/ProductCards";
import { ContextOfCart } from "../context/CartContext";
import { Button } from "antd";

function ProductDetail() {
  const [size, setSize] = useState("sm");
  const navigate = useNavigate();
  const { id } = useParams();
  const product = furnitureData?.find((productObj) => productObj.id == id);
  const {
    addItemToCart,
    isItemAdded,
    cartItem,
    updateQuantity
    
  } = useContext(ContextOfCart);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function increaseQuantity (){
   const productDetail = cartItem?.find((item)=> item.id === product?.id )
   if (productDetail) {
       updateQuantity(product?.id, productDetail.quantity + 1)
   }
}
function decreaseQuantity (){
   const productDetail = cartItem?.find((item)=> item.id === product?.id )
   if (productDetail && productDetail.quantity > 1) {
       updateQuantity(product?.id,productDetail.quantity-1)
   }
}




  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity: 1, FurnitureSize: size });
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="bg-[#FFF3E3]">
        <p className="h-16 flex items-center px-4 lg:px-20 text-sm lg:text-base whitespace-nowrap">
          <span className="font-semibold flex items-center gap-1">
            Home <RightOutlined className="icon" />
          </span>
          <span className="mx-2 hidden sm:inline border-l-2 border-gray-500 h-5"></span>
          <span className="ml-2">Shop</span>
          <span className="mx-2 border-l-2 border-gray-500 h-5 hidden lg:inline"></span>
          <span className="font-semibold ml-2">{product?.category}</span>
        </p>
      </div>

      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product?.thumbnail}
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            <span className="title-font font-medium text-[20px] text-gray-400">
              Rs. {product?.price}
            </span>

            <p className="leading-relaxed">{product?.description}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <span className="mr-3">Color</span>
              <button
                style={{ backgroundColor: `${product?.color}` }}
                className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
              />

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <select
                  onChange={(e) => setSize(e.target.value)}
                  className="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value={"sm"}>SM</option>
                  <option value={"m"}>M</option>
                  <option value={"l"}>L</option>
                  <option value={"xl"}>XL</option>
                </select>
              </div>
            </div>

            <div className="xl:flex md:flex-row flex flex-col gap-y-4 items-center">
              {
                isItemAdded(id)?.quantity > 0 ?
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 border rounded-md text-xs"
                    >
                      <MinusOutlined/>
                    </button>
                    <span className="px-6 font-semibold">
                      {isItemAdded(id)?.quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 border rounded-md text-xs"
                    >
                      <PlusOutlined/>
                    </button>
                  </div> : null
              }

              <button
                onClick={handleAddToCart}
                className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded bg-yellow-600"
              >
                {
                  isItemAdded(id) ? `Item Added (${isItemAdded(id)?.quantity})`
                    :
                    "Add to Cart"
                }

              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <h2 className="font-bold text-center text-3xl">Related Products</h2>
        <ProductCards cardLimit={12} />
        <Button
          onClick={() => navigate("/shop")}
          className="block mx-auto w-56 mb-10 rounded-sm border-yellow-600 text-yellow-600"
        >
          Show more
        </Button>
      </div>
    </section>
  );
}

export default ProductDetail;
