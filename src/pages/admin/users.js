import AdminLayout from "@/Layout/AdminLayout";
import { useQuery } from "react-query";
import { useStoreState } from "../../../store";

const Users = () => {
  const { getAllUser } = useStoreState();

  const { isLoading, data, isError, error } = useQuery("users", () => {
    return getAllUser();
  });

  return (
    <>
      <div className="px-4">
        <h1 className="font-semibold text-2xl">Users</h1>
        <div>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : isError ? (
            <h1> {error.message}</h1>
          ) : (
            <table className="border-collapse text-sm my-10 text-left w-full ">
              <thead className="bg-slate-600 text-base text-gray-300 ">
                <tr>
                  <th className="p-2">S.N</th>
                  {/* <th className="p-2">id</th> */}
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  {/* <th className="p-2">Action</th> */}
                </tr>
              </thead>
              <tbody className="">
                {data.map((users, index) => (
                  <tr
                    key={users._id}
                    className="border-b border-gray-100 hover:bg-gray-100"
                  >
                    <td className="p-2">{index + 1}</td>
                    {/* <td className="p-2">{users._id}</td> */}
                    <td className="p-2">{users.name}</td>
                    <td className="p-2">{users.category}</td>
                    <td className="p-2">{users.phone}</td>
                    <td className="p-2">{users.email}</td>
                    <td className="p-2">{users.role}</td>
                    {/* <td className="p-2" className="flex gap-2">
                      <button className="text-blue-500 hover:underline">
                        edit
                      </button>
                      <button className="text-blue-500 hover:underline">
                        delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

Users.Layout = AdminLayout;
export default Users;
