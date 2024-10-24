import Account from "@/components/Account/account";
import NotLoggedIn from "@/components/Account/noLoggedIn";
import { useUser } from "@/context/authContext";
import React, { useEffect, useState } from "react";

function index() {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Ensures client-side rendering to avoid mismatch
  }

  return <div>{user ? <Account /> : <NotLoggedIn />}</div>;
}

export default index;
