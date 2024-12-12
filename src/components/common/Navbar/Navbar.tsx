import { AutoComplete, Badge, Drawer, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useAuthData } from "@/service/Auth";
import { useUser } from "@/context/authContext";
import { IoIosSearch } from "react-icons/io";
import Loading from "@/components/Loading/Loading";
import isMobile from "@/utils/client/isMobile";
import { debounce } from "lodash";
import { getRecentSearches, setRecentSearches } from "@/utils/client/localData";
import { MdOutlineAccessTime } from "react-icons/md";
import { IAutoComplete } from "@/types/types";
const SidebarContent = dynamic(
  () => import("@/components/Sidebar/SidebarContent"),
  {
    loading: () => <Loading />,
  }
);

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [cartLength, setCartLength] = useState<number>(0);
  const router = useRouter();
  const { cartCountRef, user } = useUser();
  const { AllCartData, getSearch } = useAuthData();
  const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);
  const [hide, setHide] = useState<boolean>(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    IAutoComplete[]
  >([]);

  useEffect(() => {
    setAutoCompleteOptions(getRecentSearches());
  }, []);

  const opensidebar = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    if (user) {
      UpdateCartCount();
    }
  }, [user]);

  const HandeLogin = () => {
    if (user) {
      localStorage?.clear();
      window?.location?.reload();
    } else {
      router.push("/sign-in");
    }
  };

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
      setHide(
        currentScrollPosition > lastScrollPosition && currentScrollPosition > 70
      );
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
          <div className="font-semibold">{item?.label}</div>
          <div className="text-gray-500 text-sm">{item?.category}</div>
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
        className={`bg-slate-700 p-2 sticky top-0 z-[999] transition-transform duration-300 ease-in-out ${
          hide ? "-translate-y-[59%] lsm:translate-y-0" : "translate-y-0"
        }`}
      >
        <div className="w-full sticky justify-between items-center h-auto flex text-white p-1 md:px-10">
          <div className="flex items-center gap-2 lsm:w-[70%]">
            <div onClick={() => router.push("/")} className="cursor-pointer">
              <Image src="/logo.png" alt="logo" height={40} width={100} />
            </div>
            <AutoComplete
              // open={false}
              options={autoCompleteOptions.map((item) => ({
                value: item?.value,
                label: renderOption(item),
              }))}
              onSelect={(value) => setInputValue(value)}
              className="w-full"
              // filterOption={filterOption}
            >
              ahfiafa
              <Input
                value={inputValue}
                prefix={<IoIosSearch className="inline-flex text-xl" />}
                onChange={(e) => setInputValue(e?.target?.value)}
                placeholder="Search for products, brands and more"
                className="hidden lsm:flex"
                onKeyDown={handleSearchEnter}
              />
            </AutoComplete>
          </div>
          <div className="flex gap-1 md:gap-5">
            {user ? (
              <span
                onClick={HandeLogin}
                className="cursor-pointer md:block hidden"
              >
                Logout
              </span>
            ) : (
              <span>
                Sign <Link href="/sign-in">in/</Link>
                <Link href="/sign-up">up</Link>
              </span>
            )}
            <Link href={`/cart`}>
              <Badge
                count={cartLength}
                overflowCount={9}
                style={{ background: "green" }}
              >
                <RiShoppingCart2Fill className="text-2xl msm:text-3xl text-white cursor-pointer" />
              </Badge>
            </Link>
            <TfiMenu
              onClick={opensidebar}
              className="text-2xl msm:text-3xl cursor-pointer"
            />
          </div>
        </div>
        <div className="">
          <AutoComplete
            // open={false}
            options={autoCompleteOptions.map((item) => ({
              value: item?.value,
              label: item?.category ? renderOption(item) : item?.label,
            }))}
            onSelect={(value) => setInputValue(value)}
            className="w-full lsm:hidden"
            // filterOption={filterOption}
          >
            <Input
              value={inputValue}
              prefix={<IoIosSearch className="inline-flex text-xl" />}
              onChange={(e) => setInputValue(e?.target?.value)}
              placeholder="Search for products, brands and more"
              className="lsm:hidden"
              onKeyDown={handleSearchEnter}
            />
          </AutoComplete>
        </div>
      </div>
      <Drawer
        title={`Drawer`}
        placement="right"
        width={isMobile() ? 290 : 378}
        onClose={opensidebar}
        open={visible}
        extra={<Image src="/logo.png" alt="logo" height={80} width={80} />}
      >
        <div>
          <SidebarContent opensidebar={opensidebar} />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
