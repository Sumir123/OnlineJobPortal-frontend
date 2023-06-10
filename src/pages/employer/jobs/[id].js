import EmployerLayout from "@/Layout/EmployerLayout";
import { useRouter } from "next/router";
import React from "react";
import { axiosAPI } from "../../../../util/axiosAPI";
import { useQuery } from "react-query";
const origin = process.env.NEXT_PUBLIC_API_URL;

const JobsApplication = () => {
  const router = useRouter();
  const { id } = router.query;

  const getApplicantsApplication = () => {
    const path = "/api/application";
    const method = "GET";
    const params = { job_id: id };

    return axiosAPI(method, path, {}, params);
  };

  const { data, error, isError, isLoading } = useQuery(
    "usersApplications",
    getApplicantsApplication
  );
  const goBack = () => {
    router.back();
  };
  return (
    <>
      <div className="px-4">
        <div>Application List</div>
        <div onClick={goBack} className="cursor-pointer">
          {"<<"}
        </div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : isError ? (
          <h1> {error.message}</h1>
        ) : (
          <table className="border-collapse text-left w-full">
            <thead className="bg-slate-600 text-gray-300">
              <tr>
                <th>S.N</th>
                <th>User Name</th>
                <th>Job Title</th>
                <th>Resume Filename</th>
                <th>Cover Letter Filename</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.applications.map((application, index) => (
                <tr
                  key={application._id}
                  className="border-b border-gray-100 hover:bg-gray-100"
                >
                  <td>{index + 1}</td>
                  <td>{application.user_name}</td>
                  <td>{application.job_title}</td>
                  <td>
                    <a
                      className="text-blue-600 hover:underline"
                      href={
                        origin + "/api/application/resume/" + application._id
                      }
                      target="_blank"
                    >
                      {application.resume_filename.replace("uploads\\", "")}
                    </a>
                  </td>
                  <td>
                    <a
                      className="text-blue-600 hover:underline"
                      href={
                        origin +
                        "/api/application/cover_letter/" +
                        application._id
                      }
                      target="_blank"
                    >
                      {application.cover_letter_filename}
                    </a>
                  </td>
                  <td className="flex gap-2">
                    <button className="text-blue-500 hover:underline">
                      edit
                    </button>
                    <button className="text-blue-500 hover:underline">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

JobsApplication.Layout = EmployerLayout;

export default JobsApplication;
