import { IAddress } from "@/types/types";
import { Button } from "antd";
import React from "react";

const DeliverDetails = ({
  addressDetails,
  HandelChange,
  isAccount = false,
}: {
  addressDetails?: IAddress;
  HandelChange?: any;
  isAccount?: boolean;
}) => {
  return (
    <div>
      <p className="flex justify-between">
        <span className="text-xl font-medium">{addressDetails?.name}</span>
        {isAccount ? "" : <Button onClick={HandelChange}>Change</Button>}
      </p>
      <p className="mt-2 ml-2">
        {addressDetails?.district} {addressDetails?.buildingAddress}{" "}
        {addressDetails?.pincode}
      </p>
      <p className="mt-2 ml-2 font-medium">{addressDetails?.phone}</p>
      <p className="mt-2 ml-2 font-medium">{addressDetails?.alternatePhone}</p>
    </div>
  );
};

export default DeliverDetails;
