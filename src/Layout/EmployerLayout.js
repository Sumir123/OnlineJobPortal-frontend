import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBriefcase,
  FaDashcube,
  FaNetworkWired,
  FaUserFriends,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { QueryClient, useQuery } from "react-query";
import { useStoreState } from "../../store";
import Logo from "../images/favicon2.png";

const EmployerLayout = ({ children }) => {
  const { currentUser, clearAllUserData, getCurrentUser } = useStoreState();
  const router = useRouter();

  const handleLogout = () => {
    clearAllUserData();
    router.push("/account/login");
  };



  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  return (
    <div className="flex h-screen">
      <aside className="bg-gray-800 text-white flex-shrink-0 w-1/6">
        <nav className="py-4 px-4 flex flex-col overflow-y-auto h-full">
          <div className="flex-1">
            <Link href="/">
              <Image
                className="block px-2 mb-3 h-8 w-auto"
                src={Logo}
                alt="Rojgar Logo"
              />
            </Link>
            <ul className="space-y-4">
              <li className="flex items-center py-2 px-4 space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700">
                <FaDashcube size={20} />
                <Link href="/employer/dashboard" className="">
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center py-2 px-4 space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700">
                <FaBriefcase size={20} />
                <Link href="/employer/postJobs" className="">
                  Post Jobs
                </Link>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 py-2 px-4">
                <FaNetworkWired size={20} />
                <Link href="/employer/viewJobs" className="">
                  View Jobs
                </Link>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 py-2 px-4">
                <FaUserFriends size={20} />
                <Link href="/employer/viewApplications" className="">
                  View Applicants
                </Link>
              </li>
              {/* <li className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 py-2 px-4">
                <FaRegClock className="" size={20} />
                <span className="">Analytics</span>
              </li>
              <li className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:bg-gray-700 py-2 px-4">
                <FaUser className="" size={20} />
                <span className="">Account Settings</span>
              </li> */}
            </ul>
          </div>
          <div className="">
            <div className="flex gap-2 items-center py-2 px-4 ">
              <p>{data?.name}</p>
            </div>
            <div
              className="flex cursor-pointer gap-2 items-center py-2 px-4 hover:bg-gray-700"
              onClick={handleLogout}
            >
              <FiLogOut /> Log out
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 pt-4 overflow-y-auto">{children}</main>
    </div>
  );
};

export default EmployerLayout;
