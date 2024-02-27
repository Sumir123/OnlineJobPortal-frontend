import EmployerLayout from "@/Layout/EmployerLayout";
import { getMyApplication } from "@/api";
import { useEffect, useState } from "react";
import { FaBriefcase, FaUser, FaUserFriends } from "react-icons/fa";
import { useQueries, useQuery } from "react-query";
import { useStoreState } from "../../../store";
import { axiosAPI } from "../../../util/axiosAPI";

const Metric = ({ icon, label, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-lg font-bold text-gray-700">{value}</p>
        </div>
      </div>
    </div>
  );
};

const RecentApplicants = () => {
  const applicants = useQuery("myApplications", getMyApplication);

  return (
    <div>
      {applicants?.data?.users?.length > 0 && (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Applicants
          </h3>
          <ul className="divide-y divide-gray-200">
            {applicants?.data?.users?.map((applicant) => (
              <li key={applicant?._id} className="py-4 flex items-center">
                <div className="flex-shrink-0">
                  <FaUser size={24} className="text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {applicant?.name}
                  </p>
                  <p className="text-sm text-gray-500">{applicant?.phone}</p>
                  <p className="text-sm text-gray-500">{applicant?.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const EmployerDashboard = () => {
  const { currentUser } = useStoreState();

  const getEmployerJobs = (page) => {
    const path = "/api/jobs";
    const method = "GET";
    const params = { employer_id: currentUser?._id, page: page };

    return axiosAPI(method, path, {}, params);
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [currentUser]);

  const queries = useQueries([
    {
      queryKey: ["jobs", page],
      queryFn: () => getEmployerJobs(page),
      enabled: !!currentUser?._id,
    },
    {
      queryKey: ["applications", page],
      queryFn: () => getMyApplication(page),
      enabled: !!currentUser?._id,
    },
  ]);

  const jobsQuery = queries[0];
  const applicationsQuery = queries[1];

  return (
    <div className="flex px-4 flex-col ">
      <div>
        <h1 className="font-semibold text-xl mb-4">Dashboard</h1>
      </div>
      <div className="flex-1   md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Metric
            icon={<FaBriefcase className="text-gray-500" size={24} />}
            label="Total Jobs"
            value={jobsQuery?.data?.total_jobs || 0}
          />
          <Metric
            icon={<FaUserFriends className="text-gray-500" size={24} />}
            label="Total Applicants"
            value={applicationsQuery?.data?.total_applicants || 0}
          />
        </div>
        <div className="mt-8">
          <RecentApplicants />
        </div>
      </div>
    </div>
  );
};

EmployerDashboard.Layout = EmployerLayout;

export default EmployerDashboard;
