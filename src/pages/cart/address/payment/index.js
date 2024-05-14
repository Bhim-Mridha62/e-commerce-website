import React from 'react';
import { Radio, Space, Divider, Button } from 'antd';

const PaymentOptions = () => {
  return (
    <>
   
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Payment Options</h2>
      <Radio.Group className="w-full">
        <Space direction="vertical" className="w-full">
          <Radio value="upi" disabled className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Pay by any UPI app</span>
              </div>
            </div>
          </Radio>
          <Divider />
          <Radio disabled value="card" className="w-full">
            Credit / Debit / ATM Card
            <span className="text-gray-500 block">Add and secure cards as per RBI guidelines</span>
          </Radio>
          <Divider />
          <Radio disabled value="netbanking" className="w-full">
            Net Banking
            <span className="text-gray-500 block">This instrument has low success, use UPI or cards for better experience</span>
          </Radio>
          <Divider />
          <Radio disabled value="emi" className="w-full">
            EMI (Easy Installments)
          </Radio>
          <Divider />
          <Radio value="cod" className="w-full">
            Cash on Delivery
          </Radio>
        </Space>
      </Radio.Group>
    </div>
      <div className='text-center mt-5'>
        {/* <Button className='px-6 bg-[#3daf3d] text-xl'>CONFIRM ORDER</Button> */}
        <button className='text-white border border-solid border-gray-400 px-8 py-4 text-lg rounded-md bg-gray-800'>CONFIRM ORDER</button>
      </div>
    </>
  );
};

export default PaymentOptions;