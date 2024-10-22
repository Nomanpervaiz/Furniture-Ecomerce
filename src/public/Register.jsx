import React, { useState } from "react";
import AppForm from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { auth, createUserWithEmailAndPassword } from "../utility/Firebase";
import { message } from "antd";
import ContinueWithgoogle from "../components/ContinueWithgoogle";


function Register() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const formValues = (values) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        message.success("Registered Successfully!")
        setLoader(true);
        navigate("/")
      })
      .catch((error) => {
        setLoader(false);
        const errorMessage = mapFirebaseError(error.code);
        message.error(errorMessage);
      });
  };

  const mapFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already registered!";
      case "auth/invalid-email":
        return "Invalid email address!";
      case "auth/weak-password":
        return "Password is too weak!";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <section className="h-screen">
      <Link to={"/"} className="absolute m-6 bg-transparent border-none">
        <LeftCircleOutlined style={{ fontSize: 32, color: "white" }} />
      </Link>
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
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
            Not a member?
            <Link to="/login" className="underline">
              Login here
            </Link>
          </p>
          <ContinueWithgoogle/>
        </div>

        
        <div className="flex flex-col justify-center items-center bg-white p-6 md:p-10 w-full">
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-700 tracking-wider">
            Register
          </h1>
          <AppForm
            loader={loader}
            formValues={formValues}
            placeholderEmail="Email"
            placeholderPassword="Password"
            ButtonName="Registered"
          />
        </div>
      </div>
    </section>
  );
}

export default Register;
