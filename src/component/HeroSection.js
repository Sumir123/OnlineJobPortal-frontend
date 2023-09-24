import {
  FaBriefcase,
  FaCertificate,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { jobsData } from "../data/jobsData";
import illustration from "../images/HeroIllustration.png";
import illustration2 from "../images/illustration2.jpg";

// import { categoryData } from "@/data/categoryData";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { useStoreState } from "../../store";
import { useState } from "react";

const HeroSection = () => {
  const { getCategories, getJobs } = useStoreState();
  const {
    isLoading: categoryLoading,
    data: categoryData,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery("categories", () => {
    return getCategories();
  });

  const [page, setPage] = useState("last");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: () => {
      return getJobs(page);
    },
  });
  const shuffledCategories = categoryData
    ? categoryData.sort(() => Math.random() - 0.5)
    : [];

  const randomCategories = shuffledCategories.slice(0, 10);
  return (
    <>
      <div className="py-20 px-12  bg-gray-100">
        <div className="py-10 md:py-10">
          <div className="md:grid md:grid-cols-2">
            <div>
              <h1 className="mb-8 text-[#4197E1] text-6xl  font-header font-semibold  md:text-8xl  ">
                Revolutionizing Talent Acquisition
              </h1>
              <p className="text-gray-600 text-xl mb-10 md:text-2xl">
                Say Goodbye to Traditional Hiring Methods and Welcome Top Talent
                with Open Arm
              </p>
              <Link
                href="/account/signup"
                className="bg-[#4197E1] text-gray-50 rounded-md px-6 py-2"
              >
                Get Started
              </Link>
            </div>
            <div className="hidden md:block  ">
              <div className="ml-30">
                <Image src={illustration} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 ">
          <div className="md:grid md:grid-cols-2 items-center  ">
            <div className=" flex items-center justify-center">
              <Image
                className="-mt-5 hidden md:block"
                src={illustration2}
                alt=""
              />
            </div>
            <div className="md:ml-8">
              <div className="">
                <h1 className="font-header font-medium text-3xl mb-4">
                  Elevate Your Business with Affordable Talent
                </h1>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Search for the Best Jobs
                  </h3>
                  <p className=" text-sm">
                    Find your dream job by browsing thousands of job listings
                    from top employers across different industries and
                    locations.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Post a job and hire top talent.
                  </h3>
                  <p className=" text-sm">
                    Finding talent doesn’t have to be a chore. Post a job or we
                    can search for you!
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Discover Your Next Job Opportunity
                  </h3>
                  <p className=" text-sm">
                    Our advanced recommendation system suggests jobs based on
                    your skills and experience, so you can find the right job
                    that matches your career goals.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 py-8">
                <button className="bg-[#4197E1] px-6 py-2 text-gray-50 rounded-3xl hover:bg-[#2586db]">
                  Signup for free
                </button>
                <button className="border-[#4197E1] border-2  px-6 py-2 text-[#4197E1] rounded-3xl hover:bg-slate-200">
                  Learn to hire
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100   md:py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold mb-6 font-header">
              Browse talent by category
            </h1>
            <Link href="/job/category" className="text-blue-500">
              see all
            </Link>
          </div>
          <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {randomCategories.map((category) => (
              <Link
                href={`/job/category/${category.name}`}
                key={category.id}
                className="md:text-xl bg-gray-200 font-semibold border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-300 flex flex-col justify-between"
              >
                <li>
                  <div className="">{category.name}</div>
                  <br />
                  <div className="text-xs text-gray-700">
                    {category.job_count} jobs
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="bg-slate-100   ">
          <div className="py-16">
            <h2 className="text-4xl font-semibold mb-6 font-header">
              Latest Job Openings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {data?.jobs
                .reverse()
                .slice(0, 6)
                .map((job) => (
                  <Link
                    key={job._id}
                    href={`/job/${job._id}`}
                    className="md:text-xl bg-gray-200 font-semibold border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-300 flex flex-col justify-between text-slate-900"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#4197E1] hover:text-blue-500 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center  mb-2">
                        <FaDollarSign className="w-4 h-4 mr-2" />
                        <p className="text-sm">{job.price}</p>
                      </div>
                      <div className="flex items-center  mb-2">
                        <FaCertificate className="w-4 h-4 mr-2" />
                        <p className="text-sm">{job.category}</p>
                      </div>
                      <p className=" text-sm truncate">{job.description}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
