import React from "react";
import AdminLayout from "@/Layout/AdminLayout";
import {
  FaAddressBook,
  FaBriefcase,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { useStoreState } from "../../../store";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatsCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border-t-2">
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-lg font-bold text-gray-700">{value}</p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { getAllUser, getCategories, getApplications, getJobs } =
    useStoreState();

  const userQuery = useQuery("users", getAllUser);
  const categoriesQuery = useQuery("categories", getCategories);
  const applicationsQuery = useQuery("applications", getApplications);
  const jobsQuery = useQuery("jobs", () => getJobs(1));

  console.log("applicationsQuery", applicationsQuery);
  // Sorting categories from highest to lowest and showing only top 20
  const sortedCategories = categoriesQuery?.data?.sort(
    (a, b) => b.job_count - a.job_count
  );
  const slicedCategories = sortedCategories?.slice(0, 20);

  const chartData = {
    options: {
      chart: {
        type: "bar",
        height: 600,
        animations: { speed: 200 },
      },
      title: { text: `Categories Distribution` },
      xaxis: {
        categories: slicedCategories?.map((category) => category?.name),

        axisTicks: { show: false },
      },
    },

    series: [
      {
        name: "Job Count",
        data: slicedCategories?.map((category) => category?.job_count),
      },
    ],
  };

  const employerCount =
    userQuery?.data?.filter((user) => user.role === "employer")?.length || 0;
  const jobSeekerCount =
    userQuery?.data?.filter((user) => user.role === "jobseeker")?.length || 0;

  const doughnutChartData = {
    options: {
      chart: { animations: { speed: 200 } },
      title: { text: `Users Role Distribution` },
      labels: ["Employers", "Job Seekers"],
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    },

    series: [employerCount, jobSeekerCount],
  };

  return (
    <div className="px-4">
      <h1 className="font-semibold text-2xl">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<FaUser className="text-gray-500" size={24} />}
          label="Total Users"
          value={userQuery?.data?.length || 0}
        />
        <StatsCard
          icon={<FaBriefcase className="text-gray-500" size={24} />}
          label="Total Jobs"
          value={jobsQuery?.data?.total_jobs || 0}
        />
        <StatsCard
          icon={<FaUserFriends className="text-gray-500" size={24} />}
          label="Total Applicants"
          value={applicationsQuery?.data?.total_applications || 0}
        />
        <StatsCard
          icon={<FaAddressBook className="text-gray-500" size={24} />}
          label="Total Categories"
          value={categoriesQuery?.data?.length || 0}
        />
      </div>
      <div className="mt-8">
        {categoriesQuery.isLoading ? (
          <p>Loading...</p>
        ) : categoriesQuery.isError ? (
          <p>Error fetching categories</p>
        ) : (
          <>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={500}
            />
          </>
        )}
      </div>
      <div className="mt-8">
        {userQuery.isLoading ? (
          <p>Loading...</p>
        ) : userQuery.isError ? (
          <p>Error fetching users data</p>
        ) : (
          <Chart
            options={doughnutChartData.options}
            series={doughnutChartData.series}
            type="donut"
            height={500}
          />
        )}
      </div>
    </div>
  );
};

Dashboard.Layout = AdminLayout;
export default Dashboard;
