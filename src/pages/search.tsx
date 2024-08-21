"use client";
import FilterContent from "@/components/search/filterContent";
import Search from "@/components/search/Search";
import { useAuthData } from "@/service/Auth";
import { Dropdown, Modal, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
const { Option } = Select;

const Index = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<any>();
  const router = useRouter();
  const { getSearch } = useAuthData();
  useEffect(() => {
    if (window) {
      setIsMobile(window?.innerWidth < 1024);
    }
  }, []);
  useEffect(() => {
    const { query } = router?.query;
    if (query) {
      //@ts-ignore
      GetSearchProduct(query);
    }
  }, [router]);
  const GetSearchProduct = async (value: string) => {
    const res: any = await getSearch(value);
    if (res.status === 200) {
      setProduct(res.data.data);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  // const onSortChange = (value: string) => {
  //   console.log(value);
  // };

  const items = [
    {
      key: "1",
      label: <p>Price: Low to High</p>,
    },
    {
      key: "2",
      label: <p>Price: High to Low</p>,
    },
    {
      key: "3",
      label: <p>Rating: Low to High</p>,
    },
    {
      key: "4",
      label: <p>Rating: High to Low</p>,
    },
    {
      key: "5",
      label: <p>Discount: Low to High</p>,
    },
    {
      key: "6",
      label: <p>Discount: High to Low</p>,
    },
  ];

  return (
    <section className={`text-black ${isMobile ? "" : "bg-[#e7e7e7] pt-4"}`}>
      {isMobile ? (
        <div>
          <div className="flex border-b mb-3 sticky bg-white z-[2] top-[40px] border-gray-400">
            <div className="flex-1 cursor-pointer py-3 px-4 text-center text-xl border-r border-gray-400">
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={["click"]}
                arrow
              >
                <div>
                  <TbArrowsSort className="inline-flex mr-3" />
                  Sort By
                </div>
              </Dropdown>
            </div>
            <div
              onClick={showModal}
              className="flex-1 cursor-pointer py-3 px-4 text-center text-[21px]"
            >
              <div>
                <FaSearchengin className="inline-flex mr-3" />
                Filter
              </div>
            </div>
          </div>
          <Search product={product} />
        </div>
      ) : (
        <div className="mx-8 bg-white h-[90vh] flex">
          <div className="HideScroll w-[30%] overflow-scroll">
            <FilterContent />
          </div>
          <div className="HideScroll mt-12 w-[70%] overflow-scroll">
            <Search product={product} />
          </div>
        </div>
      )}
      <Modal
        title="Filter"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        maskClosable={false}
      >
        <FilterContent />
      </Modal>
    </section>
  );
};

export default Index;
