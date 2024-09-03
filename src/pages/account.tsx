import Account from "@/components/Account/account";
import NotLoggedIn from "@/components/Account/noLoggedIn";
import { useUser } from "@/context/authContext";
import React from "react";

function index() {
  const { user } = useUser();

  return <div>{true ? <Account /> : <NotLoggedIn />}</div>;
}

export default index;
