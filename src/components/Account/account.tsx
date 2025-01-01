import {
  CreditCardOutlined,
  HomeOutlined,
  SettingOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Card, Tabs, Badge, Input, notification, Modal } from "antd";
import ImageContent from "./imageUpload";
import { useAuthData } from "@/service/Auth";
import React, { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import DeliverDetails from "../common/DeliverDetails";
import {
  IAddress,
  IOrder,
  Iprofile,
  IProfileCartWishlist,
  NamePicId,
} from "@/types/types";
import { useUser } from "@/context/authContext";
import { letterOnlyRegex } from "@/utils/client/regEx";
import { useFormik } from "formik";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import AddressFrom from "../checkout/addressFrom";
import Image from "next/image";
const Account = React.memo(() => {
  const { getProfile, putProfile } = useAuthData();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<IAddress>({});
  const [name_pic_id, setName_pic_id] = useState({
    name: "",
    profile_pic: "",
    _id: "",
  });
  const [profile, setProfile] = useState<Iprofile>({});
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);
  useEffect(() => {
    if (address?.name) {
      formik.setValues(address);
    }
  }, [address]);
  const formik = useFormik<IAddress>({
    initialValues: {
      name: "",
      phone: "",
      alternatePhone: "",
      pincode: "",
      state: "Odisha",
      district: "",
      village: "",
      buildingAddress: "",
    },
    validationSchema: DeliveryAddressSchema,
    onSubmit: (values) => {
      //@ts-ignore
      updateProfile(values, false, {});
    },
  });
  const getProfileData = async () => {
    try {
      const res = await getProfile();
      if (res?.status === 200) {
        console.log(res, "profile");
        setAddress(res?.data?.data?.address);
        setName_pic_id({
          name: res.data?.data?.name,
          profile_pic: res.data?.data.profile_pic,
          _id: res.data?.data?._id,
        });
        setProfile(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async (
    values?: IAddress,
    isUser?: boolean,
    user?: NamePicId
  ) => {
    try {
      console.log({ address: values, isUser: isUser, user: user }, "bhim");
      const res = await putProfile({
        address: values,
        isUser: isUser,
        user: user,
      });
      if (res?.data?.success) {
        if (!isUser) {
          setAddress(values as IAddress);
          notification.success({
            message: isUser
              ? "Update Profile successfully"
              : "Update Address successfully",
          });
        }
        setIsFormOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logout function
  const HandeLogout = () => {
    localStorage?.clear();
    window?.location?.reload();
  };

  // Address form open state
  const handleFormClose = () => {
    setIsFormOpen(!isFormOpen);
  };

  // name update
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (letterOnlyRegex.test(inputValue)) {
      setName_pic_id((prev) => ({
        ...prev,
        name: inputValue,
      }));
    }
  };
  return (
    <div className="container mx-auto px-2 md:px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 text-center">
          <div className="">
            <ImageContent
              name_pic_id={name_pic_id}
              setName_pic_id={setName_pic_id}
              updateProfile={updateProfile}
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            {name_pic_id?.name || ""}
          </h3>
          <div className="mt-4">
            <Badge
              count="Member since March 2020"
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
          <div className="space-y-2 mt-4">
            <Button block icon={<ShoppingOutlined />} className="justify-start">
              Orders
            </Button>
            <Button block icon={<HeartOutlined />} className="justify-start">
              Wishlist
            </Button>
            <Button
              block
              icon={<CreditCardOutlined />}
              className="justify-start"
            >
              Cart
            </Button>
            <Button block icon={<HomeOutlined />} className="justify-start">
              Addresses
            </Button>
            <Button block icon={<SettingOutlined />} className="justify-start">
              Settings
            </Button>
          </div>
          <Button
            block
            danger
            onClick={HandeLogout}
            icon={<LogoutOutlined />}
            className="mt-4"
          >
            Log out
          </Button>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card title="Account Settings" type="inner">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  onChange={handleNameChange}
                  value={name_pic_id?.name}
                  placeholder="Enter Name"
                />
                {name_pic_id?.name === "" ? (
                  <p className="text-red-500">Name is required.</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={profile?.emailOrPhone}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <button
              onClick={() => updateProfile({}, true, name_pic_id)}
              className="mt-4 button_black w-full"
            >
              Save Changes
            </button>
          </Card>
          <Tabs defaultActiveKey="orders">
            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.order_length || 0}
                  offset={[0, -6]}
                >
                  <p>Orders</p>
                </Badge>
              }
              key="orders"
            >
              <Card title="Orders" type="inner">
                <div className="space-y-4">
                  {profile?.orders?.map((order: IOrder) => (
                    <div
                      key={order?._id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <Image
                            src={order?.image || ""}
                            alt="Order"
                            width={1000}
                            height={1000}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{order?.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(order?.OrderDate)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        color={GetOrderStatusColour(order?.OrderStatus).colour}
                        text={order?.OrderStatus}
                      />
                    </div>
                  ))}
                </div>
                <button className="button_black mt-4 w-full">
                  View All Orders
                </button>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.wishlist_length || 0}
                  offset={[0, -6]}
                >
                  <p>Wishlist</p>
                </Badge>
              }
              key="wishlist"
            >
              <Card title="Wishlists" type="inner">
                <div className="space-y-4">
                  {profile?.wishlists?.map((item: IProfileCartWishlist) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <Image
                            src={item?.thumbnail}
                            alt="Wishlist"
                            width={1000}
                            height={1000}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item?.title}</p>
                          <p className="text-sm text-gray-500">
                            <BsCurrencyRupee className="inline text-black" />
                            {item?.price}
                          </p>
                        </div>
                      </div>
                      <button className="py-2 px-3 button_black_border text-sm">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
                <button className="button_black mt-4 w-full">
                  View All Wishlists
                </button>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.cart_length || 0}
                  offset={[0, -6]}
                >
                  <p>Cart</p>
                </Badge>
              }
              key="Cart"
            >
              <Card title="Carts" type="inner">
                <div className="space-y-4">
                  {profile?.carts?.map((item: IProfileCartWishlist) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <Image
                            src={item?.thumbnail}
                            alt="Cart"
                            width={1000}
                            height={1000}
                          />
                        </div>
                        <div>
                          <p className="font-medium">Product {item?.title}</p>
                          <p className="text-sm text-gray-500">
                            <BsCurrencyRupee className="inline text-black" />
                            {item?.price}
                          </p>
                        </div>
                      </div>
                      <button className="py-2 px-3 button_black_border text-sm">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
                <button className="button_black mt-4 w-full">
                  View All Carts
                </button>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Addresses" key="addresses">
              <Card title="Shipping Addresses">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <DeliverDetails addressDetails={address} isAccount={true} />
                    <button
                      onClick={handleFormClose}
                      className="py-2 px-3 button_black_border text-sm"
                    >
                      {address?.name === "" ? "Add Address" : "Update Address"}
                    </button>
                  </div>
                </div>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        maskClosable={false}
        title="Update Delivery Address"
        open={isFormOpen}
        onCancel={handleFormClose}
        onOk={(e: any) => {
          formik.handleSubmit(e); // Pass the event to Formik's handleSubmit
        }}
        okButtonProps={{ style: { background: "black" } }}
        okText="Update"
      >
        <AddressFrom formik={formik} isAccountPage={true} />
      </Modal>
    </div>
  );
});
export default Account;
