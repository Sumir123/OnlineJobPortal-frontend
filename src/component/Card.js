import Link from "next/link";
import RenderPaginationButtons from "./pagination/RenderPaginationButtons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useStoreState } from "../../store";

function Card({ data, page, setPage, handlePrevPage, handleNextPage }) {
  const { currentUser } = useStoreState();
  const jobsData = data?.jobs || data?.recommended_jobs;

  const totalPage = data?.total_pages;
  const currentPage = data?.current_page;

  const isEmployer = currentUser.role === "employer" ? true : false;

  return (
    <>
      <div className="flex flex-col gap-4 mb-10">
        {jobsData?.map((job) => {
          const skillsArray =
            Array.isArray(job?.skills) || job?.skills?.length === 0
              ? job?.skills
              : job?.skills?.split(",")?.slice(0, 5); // Convert skills string to array

          return (
            <div
              key={job?._id}
              className="bg-white border shadow rounded-lg overflow-hidden w-full "
            >
              <div className="px-6 py-4">
                <div className="flex justify-between">
                  <Link
                    href={
                      isEmployer
                        ? "/employer" + `/job/${job?._id}`
                        : `/job/${job?._id}`
                    }
                    className="hover:text-blue-400 hover:underline duration-300"
                  >
                    <h3 className="text-[20px] font-semibold mb-2 tracking-wide">
                      {job?.title}
                    </h3>
                  </Link>
                </div>
                {job?.price !== undefined && (
                  <div className="flex gap-2 items-center mb-2">
                    <p className="text-gray-700 text-sm font-semibold">
                      {job?.["payment_type"] === "Fixed-price" ? (
                        <span className=" mr-1 font-bold">Contract</span>
                      ) : job?.["payment_type"] === "Hourly" ? (
                        <span className=" mr-1 font-bold">Part-time</span>
                      ) : (
                        <span className=" mr-1 font-bold">Full-time</span>
                      )}
                    </p>
                    <p className="text-gray-700 text-sm font-semibold">
                      {typeof job?.price === "number" ? (
                        <>
                          <span className="mr-1 ">
                            {job?.["payment_type"]}:
                          </span>
                          <span className="mr-1 font-bold">
                            Rs.{job?.price.toLocaleString("en-IN")}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1 font-bold">
                            {job?.["payment_type"]}:
                          </span>
                          Rs.{job?.price.toLocaleString("en-IN")}
                        </>
                      )}
                    </p>
                  </div>
                )}

                <div className="py-4">
                  <p className="text-gray-600 font text-sm leading-snug tracking-wide">
                    {job?.description.length > 200
                      ? job?.description.substring(0, 400) + " ....."
                      : job?.description}
                  </p>
                </div>

                <div className="text-gray-600 text-sm flex items-center justify-between">
                  <div>
                    {skillsArray?.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="border font-medium text-gray-800 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillsArray?.length > 5 && (
                      <span className="text-gray-500 ml-2">
                        +{skillsArray.length - 5} more
                      </span>
                    )}
                  </div>
                  <p>{job?.timestamp && getTimeDifference(job?.timestamp)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {totalPage >= 2 && (
        <div className="pagination pb-10">
          <div className="flex justify-center items-center gap-4">
            <div
              className="prev-btn flex items-center bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md "
              onClick={handlePrevPage}
            >
              <AiOutlineLeft />
              <span>Prev</span>
            </div>
            <RenderPaginationButtons
              totalPage={totalPage}
              currentPage={currentPage}
              page={page}
              setPage={setPage}
            />
            <div
              className="prev-btn flex items-center bg-slate-600 cursor-pointer text-slate-100 px-2 py-0.5 rounded-md "
              onClick={handleNextPage}
            >
              <span>Next</span>
              <AiOutlineRight />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

function getTimeDifference(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = Math.abs(now - date);
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return days === 1 ? "1 day ago" : days + " days ago";
  } else if (hours >= 1) {
    return hours === 1 ? "1 hour ago" : hours + " hours ago";
  } else if (minutes >= 1) {
    return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
  } else {
    return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
  }
}
