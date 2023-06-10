import { useRouter } from "next/router";
import { jobsData } from "@/data/jobsData";
import { FaMapMarkerAlt, FaRegCalendarCheck } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { useEffect, useState } from "react";
import { categoryData } from "@/data/categoryData";
import { axiosAPI } from "../../../util/axiosAPI";
import { useQuery } from "react-query";

const JobDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const getJobs = async () => {
    const path = "/api/jobs?page=1";
    const method = "GET";
    const params = { _id: id };
    return await axiosAPI(method, path, {}, params);
  };
  const {
    isLoading,
    data: job,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      return getJobs();
    },
  });

  console.log("jobs", job);

  return (
    <>
      <div className="flex flex-col md:flex-row pt-8 px-8">
        {/* Job Details */}
        <div className="md:w-3/4 w-full px-8 py-8 bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4 mb-6">
            <h3 className="text-xl font-bold text-gray-800">{job?.title}</h3>
            <p className="text-sm text-gray-500">{job?.company}</p>
          </div>

          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">{job?.location}</p>
            </div>
            <div className="flex items-center space-x-2">
              <BsClockHistory className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">{job?.type}</p>
            </div>
          </div>

          <div className="mb-8">
            {job && job?.description && (
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: job.description
                    .replace(/\n/g, "<br>")
                    .replace(/\t/g, "&emsp;"),
                }}
              ></p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaRegCalendarCheck className="w-4 h-4 text-gray-400" />
              {/* <p className="text-sm text-gray-500">{job?.date}</p> */}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="flex flex-col justify-center border-l-2 border-gray-300  px-8 py-8 md:w-1/4 md:px-4">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
            Apply Now
          </button>
          <h2 className="text-gray-600 font-bold text-lg mt-8 mb-4">
            Job Categories
          </h2>
          <ul className="list-none">
            {categoryData.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between cursor-pointer rounded-md px-4 py-2 hover:bg-gray-50"
              >
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
