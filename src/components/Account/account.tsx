import {
  CreditCardOutlined,
  HomeOutlined,
  SettingOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Card, Tabs, Badge, Input } from "antd";
import ImageContent from "./imageUpload";
import { useAuthData } from "@/service/Auth";
import { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import DeliverDetails from "../common/DeliverDetails";
import { IAddress, IOrder, IProfileCartWishlist } from "@/types/types";
import { useUser } from "@/context/authContext";
import AddressForm from "../common/addressFrom";
export default function Account() {
  const { getProfile } = useAuthData();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>({});
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);
  const getProfileData = async () => {
    try {
      const res = await getProfile();
      if (res?.status === 200) {
        console.log(res);
        setProfile(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handerAddress = (data: IAddress) => {
    handleFormClose;
    if (data?.name == "") {
      //add login here
    } else {
      //update login here
    }
  };
  console.log(profile?.user?.address?.name);
  const HandeLogout = () => {
    localStorage?.clear();
    window?.location?.reload();
  };
  const handleFormClose = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 text-center">
          <div className="">
            <ImageContent imageUrl={profile?.user?.profile_pic || ""} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Jane Doe</h3>
          <p className="text-gray-500">Premium Member</p>
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
          <Card title="Account Settings">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input placeholder={profile?.user?.name} />
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
                  placeholder={profile?.user?.emailOrPhone}
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
            <Button block className="mt-4">
              Save Changes
            </Button>
          </Card>
          <Tabs defaultActiveKey="orders">
            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.orderLength || 0}
                  offset={[0, -6]}
                >
                  <p>Orders</p>
                </Badge>
              }
              key="orders"
            >
              <Card title="Recent Orders">
                <div className="space-y-4">
                  {profile?.order?.map((order: IOrder) => (
                    <div
                      key={order?._id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <ShoppingOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">{order?.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(order?.OrderDate)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        color={GetOrderStatusColour(order?.OrderStatus)}
                        text={order?.OrderStatus}
                      />
                    </div>
                  ))}
                </div>
                <Button block className="mt-4">
                  View All Orders
                </Button>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.user?.wishlistLength || 0}
                  offset={[0, -6]}
                >
                  <p>Wishlist</p>
                </Badge>
              }
              key="wishlist"
            >
              <Card title="Wishlist">
                <div className="space-y-4">
                  {profile?.user?.wishlist.map((item: IProfileCartWishlist) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <HeartOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">{item?.title}</p>
                          <p className="text-sm text-gray-500">
                            <BsCurrencyRupee className="inline text-black" />
                            {item?.price}
                          </p>
                        </div>
                      </div>
                      <Button size="small">Add to Cart</Button>
                    </div>
                  ))}
                </div>
                <Button block className="mt-4">
                  View All Wishlist Items
                </Button>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Badge
                  color="#334155"
                  count={profile?.user?.cartLength || 0}
                  offset={[0, -6]}
                >
                  <p>Cart</p>
                </Badge>
              }
              key="Cart"
            >
              <Card title="Cart">
                <div className="space-y-4">
                  {profile?.user?.cart.map((item: IProfileCartWishlist) => (
                    <div
                      key={item?._id}
                      className="flex items-center justify-start border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <HeartOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">Product {item?.title}</p>
                          <p className="text-sm text-gray-500">
                            <BsCurrencyRupee className="inline text-black" />
                            {item?.price}
                          </p>
                        </div>
                      </div>
                      <Button size="small">Add to Cart</Button>
                    </div>
                  ))}
                </div>
                <Button block className="mt-4">
                  View All Cart Items
                </Button>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Addresses" key="addresses">
              <Card title="Shipping Addresses">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <DeliverDetails
                      addressDetails={profile?.user?.address}
                      isAccount={true}
                    />
                    <Button
                      // onClick={() => handerAddress(profile?.user?.address)}
                      onClick={handleFormClose}
                      size="small"
                    >
                      {profile?.user?.address.name === ""
                        ? "Add Address"
                        : "Update Address"}
                    </Button>
                  </div>
                </div>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <AddressForm
        isFormOpen={isFormOpen}
        handleFormClose={handleFormClose}
        address={profile?.user?.address}
      />
    </div>
  );
}
