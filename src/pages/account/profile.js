import { getUserProfile } from "@/api";
import EditProfileModal from "@/component/modal/EditProfileModal";
import { useEffect, useState } from "react";
import { FaBriefcase, FaEdit, FaGraduationCap } from "react-icons/fa";
import { useQuery } from "react-query";
import { useStoreState } from "../../../store";

const Profile = () => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const userProfile = useQuery({
    queryKey: ["UserProfile"],
    queryFn: getUserProfile,
    retry: false,
    staleTime: 5000,
  });

  const { data, status, error, isError } = userProfile;

  useEffect(() => {
    if (isError) {
      setOpenEditModal(true);
    }
  }, [isError]);

  const { currentUser } = useStoreState();

  if (status === "loading") {
    return (
      <div className="">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto bg-slate-50 md:flex px-4 md:px-20 md:gap-10 justify-between py-5">
        <div className="w-[30%] bg-white rounded-md shadow-md m-4">
          <div className="relative  w-32 h-32 mx-auto mt-10 mb-2 rounded-full overflow-hidden">
            <img
              src="https://i.pinimg.com/originals/d3/7b/02/d37b020e87945ad7f245e48df752ed03.jpg"
              alt="Profile Picture"
              className="object-cover w-full -z-10 h-full scale-125"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl text-primary font-medium mb-2">
              {currentUser.name}
            </h2>
            <p className="text-gray-600 mb-4">{currentUser.category}</p>
          </div>
          <div className="flex justify-center mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md block "
              onClick={toggleEditModal}
            >
              <FaEdit className="inline-block mr-2" />
              Edit Profile
            </button>
          </div>
          <div className="p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Skills</h3>
            <ul className="flex gap-2 flex-wrap">
              {data?.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-blue-400 px-4 py-2 border rounded-xl"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 w-[70%]">
          <div className="mb-8 bg-white px-10 py-5 shadow-md">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="mb-4 font-medium">
                <p className="uppercase text-gray-600 text-sm">Job title </p>
                <p>{data?.title || "n/a"}</p>
              </div>
              <div className="mb-4 font-medium">
                <p className="uppercase text-gray-600 text-sm">Role </p>
                <p>{currentUser?.role}</p>
              </div>
              <div className="mb-4 font-medium">
                <p className="uppercase text-gray-600 text-sm ">Category </p>
                <p> {currentUser?.category}</p>
              </div>
              <div className="mb-4 font-medium">
                <p className="uppercase text-gray-600 text-sm">Phone </p>
                <p> {currentUser?.phone}</p>
              </div>
              <div className="mb-4 font-medium">
                <p className="uppercase text-gray-600 text-sm">Email </p>
                <p> {currentUser?.email}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-white px-10 py-5  shadow-md">
            <h2 className="text-xl font-medium mb-2">Bio</h2>
            <p className="text-gray-600 mb-4">{data?.bio}</p>
          </div>
          {data?.experiences &&
            data.experiences.some((exp) => exp.trim() !== "") && (
              <div className="mb-8 bg-white px-10 py-5  shadow-md">
                <h2 className="text-xl font-medium mb-4">Experience</h2>
                {data.experiences.map((experience) => (
                  <div key={experience} className="flex items-center mb-2">
                    <FaBriefcase className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="text-gray-600">{experience}</p>
                  </div>
                ))}
              </div>
            )}

          <div className="bg-white px-10 py-5  shadow-md">
            <h2 className="text-xl font-medium mb-4">Education</h2>
            {data?.education.map((education) => (
              <div key={education} className="flex items-center mb-2">
                <FaGraduationCap className="w-4 h-4 text-gray-500 mr-2" />
                <p className="text-gray-600">{education}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openEditModal && (
        <EditProfileModal
          onClose={toggleEditModal}
          initVal={userProfile.data}
        />
      )}
    </>
  );
};

export default Profile;
