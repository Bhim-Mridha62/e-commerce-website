import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function Component() {
  return (
    <section className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-white">
            <UserOutlined className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Your Profile
          </h2>
          <p className="text-gray-600">
            Access your account to view orders, manage settings, and more.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <p className="text-center text-gray-600">
            Please log in to access your personalized profile and shopping
            experience.
          </p>
          <Link href="/sign-in">
            <button className="bg-black px-4 py-2 rounded-md">
              Log In to Your Account
            </button>
          </Link>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline hover:text-blue-600"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
