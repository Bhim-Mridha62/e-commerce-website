import {
  UserOutlined,
  CreditCardOutlined,
  HomeOutlined,
  SettingOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Tabs, Badge, Input } from "antd";

export default function Account() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 text-center">
          <Avatar size={96} src="" icon={<UserOutlined />} />
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
          <Button block danger icon={<LogoutOutlined />} className="mt-4">
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
                <Input id="name" placeholder="Jane Doe" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="jane@example.com" />
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
            <Tabs.TabPane tab="Orders" key="orders">
              <Card title="Recent Orders">
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <ShoppingOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{order}23456</p>
                          <p className="text-sm text-gray-500">
                            Placed on May 15, 2023
                          </p>
                        </div>
                      </div>
                      <Badge status="success" text="Delivered" />
                    </div>
                  ))}
                </div>
                <Button block className="mt-4">
                  View All Orders
                </Button>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Wishlist" key="wishlist">
              <Card title="Wishlist">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <HeartOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">Product {item}</p>
                          <p className="text-sm text-gray-500">$99.99</p>
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

            <Tabs.TabPane tab="Cart" key="Cart">
              <Card title="Cart">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                          <HeartOutlined className="text-gray-500 text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">Product {item}</p>
                          <p className="text-sm text-gray-500">$99.99</p>
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
                  {[1, 2].map((address) => (
                    <div
                      key={address}
                      className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">Address {address}</p>
                        <p className="text-sm text-gray-500">
                          123 Main St, Apt {address}01
                        </p>
                        <p className="text-sm text-gray-500">
                          Anytown, ST 12345
                        </p>
                      </div>
                      <Button size="small">Edit</Button>
                    </div>
                  ))}
                </div>
                <Button block className="mt-4">
                  Add New Address
                </Button>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
