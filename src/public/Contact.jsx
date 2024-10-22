import React, { useEffect, useState } from 'react';
import { FieldTimeOutlined, PhoneOutlined, RightOutlined, ShopOutlined } from '@ant-design/icons';
import logo from "../assets/logo.png";
import ServiceLines from '../components/ServiceLines';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="poppins-regular">
      {/* Header Section */}
      <div className="h-72 flex justify-center flex-col items-center pageTopBg text-center">
        <img src={logo} alt="logo" className="w-10 mb-4" />
        <h1 className="font-semibold text-4xl">Contact Us</h1>
        <p>
          <span className="font-semibold">Home <RightOutlined className="icon" /></span> Contact Us
        </p>
      </div>

      <div className="h-16 bg-[#FFF3E3]"></div>

      {/* Form Section */}
      <div className="min-h-[600px] p-8 xl:p-14">
      <h3 className="text-2xl font-bold text-center">Get in Touch with Us</h3>
              <p className="text-center px-0 xl:px-64 lg:px-52 pb-20">
                For more information about our products & services, please feel free to drop us an email. 
                Our staff will be happy to assist you!
              </p>
        <div className="container mx-auto grid gap-12 lg:grid-cols-2">
          
          {/* Contact Details */}
          <div className="flex justify-center ">
            <div className="space-y-10 ">
              <div className='flex flex-col text-center items-center'>
                <h2 className=" font-bold text-xl  ">
                  <ShopOutlined className="px-2" /> Address
                </h2>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
              <div className='flex flex-col items-center'>
                <h2 className="font-bold text-xl ">
                  <PhoneOutlined className="px-2" /> Phone
                </h2>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
              <div className='flex flex-col items-center'>
                <h2 className="font-bold text-xl ">
                  <FieldTimeOutlined className="px-2" /> Working Time
                </h2>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border rounded"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="6"
                className="w-full p-3 border rounded"
                required
              ></textarea>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="hover:bg-yellow-500 bg-yellow-600 w-full md:w-1/2 text-white border border-white p-3 rounded-md mt-4"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ServiceLines/>
    </section>
  );
}

export default Contact;
