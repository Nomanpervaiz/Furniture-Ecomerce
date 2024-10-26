"use client";
import mainLogo from "../assets/mainLogo.png";
import profile from "../assets/profilelogo.png";
import { useContext, useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HistoryOutlined, LogoutOutlined, ShoppingCartOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ContextOfUser } from "../context/UserContext";
import { Button, message, Popover } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../utility/Firebase";
import AppBadge from "./Badge";
import { ContextOfCart } from "../context/CartContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userDetail = useContext(ContextOfUser);
  const { islogin } = userDetail;
  const { cartItem } = useContext(ContextOfCart);

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        message.success("Sign-out successful!");
        navigate('/')
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const content = (
    <div className="text-center">
      <Button onClick={HandleSignOut}> <LogoutOutlined /> Log out</Button>
    </div>
  );

  return (
    <header className="bg-white ">
      <nav
        aria-label="Global"
        className=" mx-auto flex container items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src={mainLogo}
              className="h-7  w-auto lg:h-8 md:h-8 sm:h8"
            />
          </Link>
        </div>
        <div className="flex lg:hidden ">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-14 poppins-regular">
          <Link
            to={""}
            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
          >
            Home
          </Link>
          <Link
            to={"shop"}
            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
          >
            Shop
          </Link>
          <Link
            to={"about"}
            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
          >
            About
          </Link>
          <Link
            to={"contact"}
            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
          >
            Contact
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex-1 lg:justify-end xl:flex xl:items-center lg:flex lg:items-center">
          <Link
            to={"order-history"}
            className="relative text-sm font-semibold leading-6 px-2 text-gray-900"
          >
            {userDetail?.islogin ? (
              <HistoryOutlined style={{ fontSize: "22px" }} />
            ) : null}
          </Link>
          <Link
            to={"cart"}
            className="relative text-sm font-semibold leading-6 px-3 text-gray-900"
          >
            {userDetail?.islogin ? (
              <AppBadge
                count={cartItem?.length > 0 ? cartItem?.length : null}
                className={"absolute bottom-5 left-6"}
              />
            ) : null}
            <ShoppingCartOutlined style={{ fontSize: "25px" }} />
          </Link>
          {islogin ? (
            <Popover
              content={content}
              title=" "
              placement="bottomRight"
            >
              <Link
                to={"login"}
                className="text-sm font-semibold leading-6 px-3 text-gray-900"
              >
                {islogin ? (
                  <img
                    className="w-8 rounded-full"
                    src={userDetail?.photoURL}
                    alt="user profile"
                  />
                ) : (
                  <UserAddOutlined style={{ fontSize: "20px" }} />
                )}
              </Link>
            </Popover>
          ) : (
            <Link
              to={"login"}
              className="text-sm font-semibold leading-6 px-3 text-gray-900"
            >
              {islogin ? (
                <img
                  className="w-8 rounded-full"
                  src={userDetail?.photoURL || profile}
                  alt="user profile"
                />
              ) : (
                <UserAddOutlined style={{ fontSize: "20px" }} />
              )}
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Logo" src={mainLogo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="py-6 border-b">
                  <div className=" lg:flex-1 flex justify-between lg:justify-end xl:flex xl:items-center lg:flex lg:items-center">
                    <div>

                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        to={"cart"}
                        className="text-sm relative font-semibold leading-6 px-3 text-gray-900"
                      >
                        {userDetail.islogin ? (
                          <AppBadge
                            count={cartItem?.length > 0 ? cartItem?.length : null}
                            className={"absolute bottom-5 left-6"}
                          />
                        ) : null}

                        <ShoppingCartOutlined style={{ fontSize: "25px" }} />
                      </Link>
                      <Link
                      onClick={() => setMobileMenuOpen(false)}
                        to={"order-history"}
                        className="relative text-sm font-semibold leading-6 px-2 text-gray-900"
                      >
                        {userDetail?.islogin ? (
                          <HistoryOutlined style={{ fontSize: "22px" }} />
                        ) : null}
                      </Link>
                    </div>

                    {islogin ? (
                      <Popover
                        content={content}
                        title=" "
                        placement="bottomRight"
                      >
                        <Link
                          to={"login"}
                          className="text-sm font-semibold leading-6 px-3 text-gray-900"
                        >
                          {islogin ? (
                            <img
                              className="w-8 rounded-full"
                              src={userDetail?.photoURL || profile}
                              alt="user profile"
                            />
                          ) : (
                            <UserAddOutlined style={{ fontSize: "20px" }} />
                          )}
                        </Link>
                      </Popover>
                    ) : (
                      <Link
                        to={"login"}
                        className="text-sm font-semibold leading-6 px-3 text-gray-900"
                      >
                        {islogin ? (
                          <img
                            className="w-8 rounded-full"
                            src={userDetail?.photoURL || profile}
                            alt="user profile"
                          />
                        ) : (
                          <UserAddOutlined style={{ fontSize: "20px" }} />
                        )}
                      </Link>
                    )}
                  </div>
                </div>
                <Link
                  to={""}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
                >
                  Home
                </Link>
                <Link
                  to={"shop"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
                >
                  Shop
                </Link>
                <Link
                  to={"about"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
                >
                  About
                </Link>
                <Link
                  to={"contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-yellow-500 hover:text-gray-50"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
