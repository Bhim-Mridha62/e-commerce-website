import React, { useState } from "react";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";
import { FaCalculator } from "react-icons/fa6";
import { Modal } from "antd";
import Calculator from "./calculator/Calculator";
function Layout({ children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Navbar />
      <div className="hidden z-[999] fixed top-36 right-0 bg-gray-800 p-2 rounded-l-md text-white">
        <FaCalculator onClick={showModal} className="text-2xl msm:text-3xl cursor-pointer" />
      </div>
      <main>{children}</main>
      <Footer />
      <Modal
        title="Calculator"
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: 'darkblue', color: 'white' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
       >
        <div><Calculator/></div> 
      </Modal>
    </div>
  );
}

export default Layout;
