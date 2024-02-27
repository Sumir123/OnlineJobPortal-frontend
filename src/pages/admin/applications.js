import AdminLayout from "@/Layout/AdminLayout";
import { deleteApplication, getapplicationAggregration } from "@/api";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

const origin = process.env.NEXT_PUBLIC_API_URL;

const Applications = () => {
  const { isLoading, data, isError, error } = useQuery("applications", () => {
    return getapplicationAggregration();
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (application_id) => deleteApplication(application_id),
    {
      onSuccess: (response) => {
        console.log("response", response);
        toast.success(response.message);
        queryClient.invalidateQueries("applications");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error.message);
      },
    }
  );

  const handleDelete = (application_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (confirmed) {
      mutation.mutate(application_id);
    }
  };
  return (
    <>
      <div className="px-4">
        <h1 className="font-semibold text-2xl">Applications</h1>
        <div className="text-right">
          <button className="px-4 py-1 rounded-md text-white bg-blue-400 hover:underline mb-4">
            Add Application
          </button>
        </div>
        <div>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : isError ? (
            <h1> {error.message}</h1>
          ) : (
            <table className="border-collapse text-left w-full">
              <thead className="bg-slate-600 text-gray-300">
                <tr>
                  <th className="p-2">S.N</th>
                  <th className="p-2">User Name</th>
                  <th className="p-2">Job Title</th>
                  <th className="p-2">Resume Filename</th>
                  <th className="p-2">Cover Letter Filename</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((application, index) => (
                    <tr
                      key={application?._id}
                      className="border-b border-gray-100 hover:bg-gray-100"
                    >
                      <td className="font-medium p-2">{index + 1}</td>
                      <td className="font-medium p-2">
                        <Link
                          className="text-blue-600 hover:underline"
                          href={"/admin/user/" + application.user_id}
                        >
                          {application.user_name}
                        </Link>
                      </td>
                      <td className="font-medium p-2">
                        <Link
                          className="text-blue-600 hover:underline"
                          href={"/admin/job/" + application.job_id}
                        >
                          {application.job_title}
                        </Link>
                      </td>
                      <td className="font-medium p-2">
                        <a
                          className="text-blue-600 hover:underline"
                          href={
                            origin +
                            "/api/application/resume/" +
                            application._id
                          }
                          target="_blank"
                        >
                          {application.resume_filename.replace("uploads\\", "")}
                        </a>
                      </td>
                      <td className="font-medium p-2">
                        <a
                          className="text-blue-600 hover:underline"
                          href={
                            origin +
                            "/api/application/cover_letter/" +
                            application._id
                          }
                          target="_blank"
                        >
                          {application.cover_letter_filename.replace(
                            "uploads\\",
                            ""
                          )}
                        </a>
                      </td>
                      <td className="p-2 font-medium">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleDelete(application._id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-xl">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

Applications.Layout = AdminLayout;
export default Applications;
