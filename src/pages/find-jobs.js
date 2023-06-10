import JobCard from "@/component/JobCard";
import { jobsData } from "@/data/jobsData";
import React from "react";

const FindJobsSection = () => {
  return (
    <div className="pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Find Jobs
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {jobsData.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              date={job.date}
              description={job.description}
              category={job.category}
              skills={job.skills}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindJobsSection;
