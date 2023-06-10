import { FaMapMarkerAlt } from "react-icons/fa";
import { jobsData } from "../data/jobsData";

function Card() {
  return (
    <>
      <div className="flex flex-col gap-4">
        {jobsData.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full"
          >
            <div className="px-6 py-4">
              <a href={`/job/${job.id}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-blue-400">
                  {job.title}
                </h3>
              </a>
              <p className="text-gray-600 text-sm mb-4">{job.company}</p>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-500 mr-2" />
                <p className="text-gray-600 text-sm">{job.location}</p>
              </div>
              <div className=" py-4">
                <p className="text-gray-600 text-sm whitespace-pre-line truncate">
                  {job.description.length > 200
                    ? job.description.substring(0, 200) + " ....."
                    : job.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm mr-4">{job.type}</p>
                <p className="text-gray-600 text-sm">{job.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
