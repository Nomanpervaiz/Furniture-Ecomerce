import React, { useState } from "react";
import AppForm from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { auth } from "../utility/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ContinueWithgoogle from "../components/ContinueWithgoogle";

function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const formValues = (values) => {
    console.log(values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoader(true);
        navigate(0);
        message.success("Login Successfully!");
      })
      .catch((error) => {
        setLoader(false);
        const errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  return (
    <section className="h-screen">
      <Link to={"/"} className=" absolute m-6 bg-transparent border-none">
        <LeftCircleOutlined style={{ fontSize: 32, color: "white" }} />
      </Link>
      <div className="h-full grid  grid-cols-1 lg:grid-cols-2">
        <div
          className="bg-yellow-600 
                        rounded-ee-[100px] rounded-es-[100px] 
                        lg:rounded-ee-[500px] lg:rounded-es-[0px] p-6 md:p-10 
                        flex flex-col justify-center items-center text-white
                        space-y-5 lg:space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold animate-pulse">
            Welcome Back!
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-light text-center">
            Please log in or Registered to your account to continue
          </p>
          <p className="text-sm md:text-base font-thin text-white/90">
            Not a member?{" "}
            <Link to={"/register"} className="underline">
              Registered here
            </Link>
          </p>
          <ContinueWithgoogle/>
        </div>

        <div className="flex flex-col justify-center items-center bg-white p-6 md:p-10 w-full">
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-700 tracking-wider">
            Login
          </h1>
          <AppForm
            loader={loader}
            formValues={formValues}
            placeholderEmail="Email"
            placeholderPassword="Password"
            ButtonName="Login"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
