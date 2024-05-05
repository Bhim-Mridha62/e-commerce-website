import React, { Suspense, lazy } from "react";
import { Form, Input, Select } from "antd";
const LazyForm = lazy(() => import("antd/es/form/Form"));
const { Option } = Select;

const index = () => {
  const [form] = Form.useForm();

  return (
    <div className="m-4">
      <p className="text-xl text-black font-bold mb-1">Enter Delivery Address</p>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyForm
          form={form}
          layout="vertical"
          className="max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item name="alternateName" label="Alternate Name">
              <Input placeholder="Enter alternate name" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item name="alternatePhone" label="Alternate Phone Number">
              <Input placeholder="Enter alternate phone number" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="pincode"
              label="Pin Code"
              rules={[
                { required: true, message: "Please enter your pin code" },
              ]}
            >
              <Input placeholder="Enter your pin code" />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please select your state" }]}
            >
              <Select placeholder="Select your state">
                <Option value="state1">State 1</Option>
                <Option value="state2">State 2</Option>
                {/* Add more options for states */}
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="district"
              label="District"
              rules={[
                { required: true, message: "Please select your district" },
              ]}
            >
              <Select placeholder="Select your district">
                <Option value="district1">District 1</Option>
                <Option value="district2">District 2</Option>
                {/* Add more options for districts */}
              </Select>
            </Form.Item>
            <Form.Item
              name="buildingAddress"
              label="Building Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your building address",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter your building address"
                rows={3}
              />
            </Form.Item>
          </div>
        </LazyForm>
      </Suspense>
    </div>
  );
};

export default index;
