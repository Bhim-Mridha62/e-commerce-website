import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi2";
import { FaCartArrowDown ,FaRegCircleUser} from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
function SidebarContent({opensidebar}) {
  return (
    <div>
      <ul className="list-none">
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/category`}><span><BiCategory className="inline mr-3 text-3xl" /></span> All Categories</Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer"><span><HiShoppingBag className="inline mr-3 text-3xl" /></span> My Order</li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer"> <span><FaCartArrowDown className="inline mr-3 text-3xl" /></span>My Cart</li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer"><span><IoMdHeartEmpty className="inline mr-3 text-3xl" /></span> My Wishlist</li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer"><span><FaRegCircleUser className="inline mr-3 text-3xl" /></span> My Account</li>
      </ul>
    </div>
  );
}

export default SidebarContent;
