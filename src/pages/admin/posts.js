import AdminLayout from "@/Layout/AdminLayout";
import { deleteJob } from "@/api";
import RenderPaginationButtons from "@/component/pagination/RenderPaginationButtons";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStoreState } from "../../../store";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Posts = () => {
  const { getJobs } = useStoreState();
  const [page, setPage] = useState(1);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => {
      return getJobs(page);
    },
  });
  const totalPage = data?.total_pages;
  const currentPage = data?.current_page;

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation((job_id) => deleteJob(job_id), {
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["jobs", page]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const handleDelete = (job_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (confirmed) {
      mutation.mutate(job_id);
    }
  };

  return (
    <div className="px-4">
      <h1 className="font-semibold text-2xl">Posts</h1>
      <div className="text-right">
        <button className="px-4 py-1 rounded-md text-white bg-blue-400 hover:underline mb-4">
          Add Post
        </button>
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
                  <th className="text-sm font-medium p-2">S.N</th>
                  {/* <th>jobs ID</th> */}

                  <th>Employer ID</th>
                  <th className="text-sm font-medium p-2">Title</th>
                  <th className="text-sm font-medium p-2">Description</th>
                  <th className="text-sm font-medium p-2">Skills</th>
                  <th className="text-sm font-medium p-2">Price</th>
                  <th className="text-sm font-medium p-2">PaymentType</th>
                  <th className="text-sm font-medium p-2">Category</th>
                  <th className="text-sm font-medium p-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data?.jobs?.map((jobs, index) => (
                  <tr
                    key={jobs._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-2">{(page - 1) * 10 + index + 1}</td>
                    {/* <td  className="p-2">{jobs._id}</td> */}
                    <td className="p-2">
                      <Link
                        className="text-blue-600 hover:underline"
                        href={"/admin/user/" + jobs.employer_id}
                      >
                        {jobs.employer_id}
                      </Link>
                    </td>
                    <td className="p-2">{jobs.title}</td>
                    <td className="p-2">{jobs.description}</td>
                    <td className="p-2">{jobs.skills}</td>
                    <td className="p-2">{jobs.price}</td>
                    <td className="p-2">{jobs["payment_type"]}</td>
                    <td className="p-2">{jobs.category}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleDelete(jobs._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination py-10  ">
              <div className="flex justify-center gap-4">
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
          </>
        )}
      </div>
    </div>
  );
};

Posts.Layout = AdminLayout;
export default Posts;
