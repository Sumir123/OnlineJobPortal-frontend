  import MainLayout from "@/Layout/MainLayout";
  import Card from "@/component/Card";
  import Sidebar from "@/component/SideBar";
  import { useRouter } from "next/router";
  import { useEffect } from "react";
  import { useStoreState } from "../../../store";

  const Dashboard = () => {
    const {
      getJobs,
      getApplications,
      getrecomendation,
      currentUser,
      getCurrentUser,
    } = useStoreState();

    const router = useRouter();
    useEffect(() => {
      // getJobs(1);
      // getApplications();
      // getrecomendation("python,fastpai", 1, 10);
    }, []);
    return (
      <>
        {/* <ProtectRoute /> */}
        <div className="flex flex-col md:flex-row my-4">
          <div className="md:w-1/4 px-4">
            <Sidebar />
          </div>
          <div className="flex-1 px-4 mt-8 md:mt-0">
            <Card />
          </div>
        </div>
      </>
    );
  };

  Dashboard.setLayout = MainLayout;
  export default Dashboard;
