import EmployerLayout from "@/Layout/EmployerLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import { useStoreState } from "../../../store";
import { axiosAPI } from "../../../util/axiosAPI";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  skills: Yup.string().required("Skill is required"),
  price: Yup.number().required("Price is required"),
  payment_type: Yup.string().required("Payment type is required"),
  category: Yup.string().required("Category is required"),
});

const postJobs = () => {
  const { currentUser, getCategories } = useStoreState();
  const router = useRouter();

  const { isLoading, data, isError, error } = useQuery("categories", () => {
    return getCategories();
  });

  const initialValues = {
    employer_id: "",
    title: "",
    description: "",
    skills: [],
    price: "",
    payment_type: "",
    category: "",
  };

  const mutation = useMutation(
    (data) => {
      console.log(data);
      const path = "/api/jobs";
      const method = "POST";
      return axiosAPI(method, path, {}, {}, data);
    },
    {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(error.message);

        console.log(error.message);
      },
    }
  );

  const handleSubmit = (values, { resetForm }) => {
    const skillsArray = values.skills.split(",").map((skill) => skill.trim());

    const updatedValues = {
      ...values,
      skills: skillsArray,
      employer_id: currentUser._id,
    };
    mutation.mutate(updatedValues);
    resetForm();
    router.push("/employer/viewJobs");
  };

  return (
    <>
      <div className="flex px-4 flex-col">
        <div>
          <h1 className="font-semibold text-lg mb-4">Post Jobs</h1>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="skills" className="">
                  Skills
                </label>
                <Field
                  type="text"
                  id="skills"
                  name="skills"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <ErrorMessage
                  name="skills"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="payment_type" className="">
                  Payment Type
                </label>
                <Field
                  as="select"
                  id="payment_type"
                  name="payment_type"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="">Select Payment Type</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Fixed">Monthly</option>
                </Field>
                <ErrorMessage
                  name="payment_type"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="">
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="">Select Category</option>
                  {data?.map((category, index) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Post
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

postJobs.Layout = EmployerLayout;
export default postJobs;
