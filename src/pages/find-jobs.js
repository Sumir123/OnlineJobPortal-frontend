import JobCard from "@/component/JobCard";
import { jobsData } from "@/data/jobsData";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useStoreState } from "../../store";
import Card from "@/component/Card";

const FindJobsSection = () => {
  const [page, setPage] = useState(1);
  const { getJobs } = useStoreState();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => {
      return getJobs(page);
    },
  });

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold  text-gray-900">Find Jobs</h2>
        <div className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {error.message}</p>
          ) : data && data.jobs?.length > 0 ? (
            <Card
              isLoading={isLoading}
              data={data}
              page={page}
              setPage={setPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobsSection;
