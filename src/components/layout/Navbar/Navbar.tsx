import { AutoComplete, Badge, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useAuthData } from "@/service/Auth";
import { useUser } from "@/context/authContext";
import { IoIosSearch } from "react-icons/io";
import { debounce } from "lodash";
import { getRecentSearches, setRecentSearches } from "@/utils/client/localData";
import { MdOutlineAccessTime } from "react-icons/md";
import { IAutoComplete } from "@/types/types";
import WelcomeSection from "./welcomeSection";
import { IoCartOutline } from "react-icons/io5";
import useIsMobile from "@/utils/client/isMobile";
const AccountSection = dynamic(() => import("./accountSection"), {
  ssr: false,
});

const Navbar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [cartLength, setCartLength] = useState<number>(0);
  const router = useRouter();
  const { cartCountRef, user } = useUser();
  const { AllCartData, getSearch } = useAuthData();
  const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);
  const isMobile = useIsMobile();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    IAutoComplete[]
  >([]);

  useEffect(() => {
    setAutoCompleteOptions(getRecentSearches());
  }, []);
  useEffect(() => {
    if (user) {
      UpdateCartCount();
    }
  }, [user]);

  const UpdateCartCount = async () => {
    try {
      const res = await AllCartData(1);
      if (res?.status === 200) {
        setCartLength(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      cartCountRef.current = UpdateCartCount;
    }
  }, [cartCountRef]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement?.scrollTop;
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  const handleSearchEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const trimmedValue = inputValue?.trim();
      if (trimmedValue) {
        setRecentSearches(trimmedValue);
        let searchValue = encodeURIComponent(trimmedValue);
        router.push(`/search?query=${searchValue}`);
      }
    }
  };

  const fetchSuggestions = debounce(async (value: string) => {
    if (value?.length > 2) {
      try {
        const res = await getSearch(value);
        if (res?.status === 200) {
          const relatedSearches = res?.data?.data
            .slice(0, 7)
            .map((item: any) => ({
              label: item?.title,
              value: item?.title,
              image: item?.thumbnail,
              category: item?.category,
            }));
          setAutoCompleteOptions(relatedSearches);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  }, 500);

  const renderOption = (item: any) =>
    item?.category ? (
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{item?.label}</p>
          <p className="text-gray-500 text-sm">{item?.category}</p>
        </div>
        <img
          src={item?.image}
          alt={item?.label}
          className="w-8 h-8 object-cover ml-2"
        />
      </div>
    ) : (
      <div className="flex items-center">
        <MdOutlineAccessTime className="inline-flex text-gray-600 mr-2" />
        <span>{item?.label}</span>
      </div>
    );

  useEffect(() => {
    if (inputValue.trim() === "") {
      setAutoCompleteOptions(getRecentSearches());
      return;
    }
    fetchSuggestions(inputValue);
    return () => {
      fetchSuggestions.cancel();
    };
  }, [inputValue]);
  return (
    <>
      <div
        className={`sticky top-0 z-[999] transition-transform duration-300 ease-in-out border-b border-theme-border `}
      >
        <WelcomeSection />
        <div className="w-full flex items-center gap-2 justify-between h-auto p-1 md:px-10 bg-theme-white">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer flex flex-col md:flex-row items-center md:gap-2"
          >
            <Image
              src="/logo.png"
              alt="logo"
              height={40}
              width={100}
              className="w-9 md:w-12 lg:w-16 h-auto flex"
            />
            <p className="flex items-center gap-[2px] md:gap-2">
              <span className="h-[2px] md:h-1 w-2 lg:w-6 bg-gradient-to-b from-red-500 to-yellow-500 rounded"></span>
              <span className="text-[8px] md:text-xs lg:text-base font-bold bg-gradient-to-b from-red-500 to-yellow-500 bg-clip-text text-transparent text-nowrap">
                FASHION SHOP
              </span>
              <span className="h-[2px] md:h-1 w-2 lg:w-6 bg-gradient-to-b from-red-500 to-yellow-500 rounded"></span>
            </p>
          </div>
          <div className="flex gap-3 lg:gap-10 text-sm lg:text-base">
            <Link href="/" className=" hidden md:flex">
              Home
            </Link>
            {!user && (
              <Link href="/sign-in" className="hidden md:flex">
                Sign In
              </Link>
            )}
          </div>
          <AutoComplete
            // open={false}
            options={autoCompleteOptions.map((item) => ({
              value: item?.value,
              label: renderOption(item),
            }))}
            onSelect={(value) => setInputValue(value)}
            className="w-[70%] md:w-[30%] bg-theme-grey navbar-autoComplete-input"
            // filterOption={filterOption}
          >
            <Input
              value={inputValue}
              prefix={<IoIosSearch className="inline-flex text-xl" />}
              onChange={(e) => setInputValue(e?.target?.value)}
              placeholder="Search for products, brands and more"
              className="flex"
              onKeyDown={handleSearchEnter}
            />
          </AutoComplete>
          <div className="flex items-center gap-6">
            {!isMobile && (
              <Badge
                className="text-theme-red"
                count={cartLength}
                overflowCount={9}
              >
                <Link href={`/cart`}>
                  <IoCartOutline className="text-2xl msm:text-3xl text-theme-red cursor-pointer" />
                </Link>
              </Badge>
            )}
            <AccountSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
