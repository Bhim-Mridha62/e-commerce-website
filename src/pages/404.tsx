import Link from "next/link";
import errorimg from "../images/error/error404.gif";

const Page404 = () => {
  return (
    <div className="px-5">
      <div
        className="bg-cover bg-center bg-no-repeat h-[90vh]"
        style={{ backgroundImage: `url(${errorimg.src})` }}
      >
        <h1 className=" text-center text-7xl font-bold text-black">404</h1>
        <div className="container mx-auto flex justify-center items-end h-[70vh]">
          <div className="text-center">
            <h2 className="text-5xl font-semibold text-black">
              Oops! Page not found
            </h2>
            <p className="text-4xl text-black">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
