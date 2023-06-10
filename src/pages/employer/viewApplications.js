import EmployerLayout from "@/Layout/EmployerLayout";
import React from "react";
import { useStoreState } from "../../../store";
import { axiosAPI } from "../../../util/axiosAPI";
import { useQuery } from "react-query";
import { FaUser } from "react-icons/fa";

const ViewApplications = () => {
  const { currentUser } = useStoreState();

  const getEmployerJobsApplicants = () => {
    const path = "/api/employer/" + currentUser?._id + "/applicants";
    const method = "GET";

    return axiosAPI(method, path);
  };

  const applicants = useQuery("applicants", getEmployerJobsApplicants);

  const getApplicantsApplication = () => {
    const path = "/api/application";
    const method = "GET";
    const params = { user_id: applicants?.data?.users?.[0]?._id };

    return axiosAPI(method, path, {}, params);
  };

  const usersApplications = useQuery(
    "usersApplications",
    getApplicantsApplication
  );

  console.log(usersApplications?.data?.applications);
  return (
    <>
      <div className="flex px-4 flex-col">
        <div>
          <h1 className="font-semibold text-xl mb-4">View Applications</h1>
        </div>
        <ul className="flex items-center gap-4">
          <div>
            {applicants?.data?.users?.map((applicant) => (
              <li key={applicant?._id} className="py-4 flex items-center">
                <div className="flex-shrink-0">
                  <FaUser size={32} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">
                    {applicant?.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Category:</span>{" "}
                    {applicant?.category}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Email:</span>{" "}
                    {applicant?.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Phone:</span>{" "}
                    {applicant?.phone}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Role:</span> {applicant?.role}
                  </p>
                </div>
              </li>
            ))}
          </div>
          {/* <div className="flex-1">
            {usersApplications?.data?.applications.map((application) => (
              <div className="flex">
                <h1>job id: {application?.job_id}</h1>
                <p>resume_filename: {application?.resume_filename}</p>
                <p>
                  cover_letter_filename: {application?.cover_letter_filename}
                </p>
              </div>
            ))}
          </div> */}
        </ul>
      </div>
    </>
  );
};

ViewApplications.Layout = EmployerLayout;

export default ViewApplications;
