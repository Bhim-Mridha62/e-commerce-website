import React, { useEffect } from "react";
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

const index = () => {
  const router = useRouter();
  const { data } = router.query;
  const { getProfile } = useAuthData();
  const priceDetails = decodeData(data as string);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);

  const getProfileData = async () => {
    try {
      const res = await getProfile(1);
      console.log(res, "res");

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
    <div className="grid grid-cols-2">
      <div className="border-theme-border border-r px-8">
        <AddressFrom formik={formik} isSave />
        <ShippingMethod formik={formik} priceDetails={priceDetails} />
      </div>
      <div className="bg-[#f5f5f5]">
        {priceDetails && <PriceDetails productData={priceDetails} />}
      </div>
    </div>
  );
};

export default index;
