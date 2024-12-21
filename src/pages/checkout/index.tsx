import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import PriceDetails from "@/components/common/PriceDetails";
import { useRouter } from "next/router";
import { decodeData } from "@/utils/client/encoding";
import { IAddress } from "@/types/types";
import { useUser } from "@/context/authContext";
import { useAuthData } from "@/service/Auth";
import AddressFrom from "@/components/checkout/addressFrom";
import ShippingMethod from "@/components/checkout/shippingMethod";
import { Collapse } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";
import SEO from "@/components/common/seo";

const index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { data } = router.query;
  const { getProfile } = useAuthData();
  const DecodedPriceDetails = decodeData(data as string);

  //if single product convert it in to array
  const priceDetails = Array.isArray(DecodedPriceDetails)
    ? DecodedPriceDetails
    : [DecodedPriceDetails];

  //totoal price all product
  const totalAmount = priceDetails.reduce(
    (acc: number, item: any) => (acc + item?.price) * item?.quantity,
    0
  );
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      // Get here user Address if have i
      getProfileData();
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get here user Address if have i
  const getProfileData = async () => {
    try {
      const res = await getProfile(1);
      if (res?.status === 200 && res?.data?.address.name) {
        formik.setValues(res?.data?.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(values);
    },
  });
  return (
    <>
      <SEO
        title="Checkout"
        description="Complete your purchase securely at SD FASHION SHOP."
        url="checkout"
      />
      <div className="grid mdb:grid-cols-2">
        {isMobile && priceDetails[0] && (
          <Collapse
            items={[
              {
                label: (
                  <div className="flex justify-between my-2 px-4 lsm:px-24">
                    <span className="text-[#105989]">
                      {isExpanded ? "Hide" : "Show"} order summary{" "}
                      <MdKeyboardArrowDown
                        className={`inline-flex text-xl ml-1 transform transition-transform duration-[0.5s] ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                    <span className="font-semibold text-xl">
                      ₹{totalAmount}
                    </span>
                  </div>
                ),
                showArrow: false,
                children: (
                  <PriceDetails
                    priceDetails={priceDetails}
                    isSticky={true}
                    totalAmount={totalAmount}
                  />
                ),
              },
            ]}
            bordered={false}
            rootClassName="bhim"
            className="checkout-page-collapse"
            onChange={(key) => setIsExpanded(!!key.length)}
          />
        )}
        <div className="border-theme-border mdb:border-r px-4 lsm:px-24 mdb:pl-24 mdb:pr-8 pt-5 mdb:pt-10 pb-10">
          <AddressFrom formik={formik} isSave />
          <ShippingMethod
            formik={formik}
            priceDetails={priceDetails}
            isMobile={isMobile}
            totalAmount={totalAmount}
          />
        </div>
        {!isMobile && priceDetails[0] && (
          <div className="bg-[#f5f5f5] pr-24 pl-8 py-10">
            <PriceDetails
              priceDetails={priceDetails}
              isSticky={true}
              totalAmount={totalAmount}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default index;
