import Link from "next/link";
import { Collapse, Button, Typography } from "antd";
import {
  ContainerOutlined,
  BankOutlined,
  TagOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-black">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Unlock the Benefits of an Account
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Create an account and enjoy features like order tracking,
                  saved payment details, and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Typography>
                  <Link href="#">
                    <Button
                      type="primary"
                      size="large"
                      className="w-full sm:w-auto"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button
                      type="default"
                      size="large"
                      className="w-full sm:w-auto"
                    >
                      Register
                    </Button>
                  </Link>
                </Typography>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Hero"
              className="mx-auto aspect-video rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Enjoy These Account Benefits
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl lg:text-base xl:text-xl">
                Create an account and unlock a range of features to enhance your
                shopping experience.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video rounded-xl object-cover sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold flex items-center">
                      <ContainerOutlined className="mr-2" /> Order Tracking
                    </h3>
                    <p className="text-gray-500">
                      Track the status of your orders in real-time.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold flex items-center">
                      <BankOutlined className="mr-2" /> Saved Payment
                    </h3>
                    <p className="text-gray-500">
                      Store your payment details for faster checkout.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold flex items-center">
                      <TagOutlined className="mr-2" /> Exclusive Offers
                    </h3>
                    <p className="text-gray-500">
                      Access special discounts and promotions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <Collapse accordion>
              <Panel
                header="What are the benefits of creating an account?"
                key="1"
              >
                Creating an account unlocks features like order tracking, saved
                payment details, and exclusive offers. It's a great way to
                enhance your shopping experience.
              </Panel>
              <Panel header="Is it free to create an account?" key="2">
                Yes, creating an account is completely free. There are no hidden
                fees or charges.
              </Panel>
              <Panel header="How do I access my account information?" key="3">
                You can access your account information by logging in to your
                account on our website. From there, you can view your order
                history, update your payment details, and more.
              </Panel>
              <Panel header="Can I cancel my account at any time?" key="4">
                Yes, you can cancel your account at any time. Simply log in to
                your account and follow the instructions to deactivate your
                account.
              </Panel>
            </Collapse>
          </div>
        </div>
      </section>
    </div>
  );
}
