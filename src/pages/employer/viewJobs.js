import EmployerLayout from "@/Layout/EmployerLayout";
import React, { useEffect, useState } from "react";
import { useStoreState } from "../../../store";
import { useQuery } from "react-query";
import { axiosAPI } from "../../../util/axiosAPI";
import Link from "next/link";

const viewJobs = () => {
  const { currentUser } = useStoreState();

  const getEmployerJobs = (page) => {
    const path = "/api/jobs";
    const method = "GET";
    const params = { employer_id: currentUser?._id, page: page };
    console.log(currentUser, params);
    return axiosAPI(method, path, {}, params);
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever currentUser changes
  }, [currentUser]);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => {
      return getEmployerJobs(page);
    },
    enabled: !!currentUser?._id,
  });

  return (
    <>
      <div className="flex px-4 flex-col ">
        <div>
          <h1 className="font-semibold text-xl mb-4">View Jobs</h1>
        </div>
        <div className="overflow-x-auto max-w-full w-full">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : isError ? (
            <h1> {error.message}</h1>
          ) : (
            <>
              <table className="border-collapse text-sm mb-10 text-left w-full ">
                <thead className="bg-slate-600 text-base  text-gray-300">
                  <tr className="">
                    <th className="text-sm font-medium">S.N</th>
                    {/* <th>jobs ID</th>

                  <th>Employer ID</th> */}
                    <th className="text-sm font-medium">Title</th>
                    <th className="text-sm font-medium">Description</th>
                    <th className="text-sm font-medium">Skills</th>
                    <th className="text-sm font-medium">Price</th>
                    <th className="text-sm font-medium">PaymentType</th>
                    <th className="text-sm font-medium">Category</th>
                    <th className="text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data?.jobs?.map((jobs, index) => (
                    <tr
                      key={jobs._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td>{(page - 1) * 10 + index + 1}</td>
                      {/* <td>{jobs._id}</td>
                    <td>{jobs.employer_id}</td> */}

                      <td>
                        <Link
                          className="text-blue-500 hover:underline cursor-pointer"
                          href={`jobs/${jobs._id}`}
                        >
                          {jobs.title}
                        </Link>
                      </td>

                      <td>{jobs.description}</td>
                      <td>{jobs.skills}</td>
                      <td>{jobs.price}</td>
                      <td>{jobs["payment-type"]}</td>
                      <td>{jobs.category}</td>
                      <td className="flex gap-2">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button className="text-blue-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination py-10"></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

viewJobs.Layout = EmployerLayout;

export default viewJobs;
