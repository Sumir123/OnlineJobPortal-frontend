import { axiosAPI } from "../../util/axiosAPI";

export const getUserProfile = async () => {
  const path = "/api/profile";
  const method = "GET";
  return await axiosAPI(method, path);
};

export const postUserProfile = async (data) => {
  const path = "/api/profile";
  const method = "POST";
  return await axiosAPI(method, path, {}, {}, data);
};

export const ApplyForJobs = async (data, usersData) => {
  const path = "/api/apply";
  const method = "POST";
  return await axiosAPI(method, path, {}, usersData, data);
};

export const getApplication = async () => {
  const path = "/api/applications/me";
  const method = "GET";
  return await axiosAPI(method, path);
};

export const deleteApplication = async (application_id) => {
  const path = "/api/delete_application";
  const method = "DELETE";
  return await axiosAPI(method, path, {}, { application_id });
};

export const getMyApplication = async () => {
  const path = "/api/my_applicants";
  const method = "GET";
  return await axiosAPI(method, path);
};
export const getapplicationAggregration = async () => {
  const path = "/api/applications/aggregation_data";
  const method = "GET";

  return await axiosAPI(method, path);
};

export const getJobs = async (parms) => {
  const path = "/api/jobs";
  const method = "GET";
  return await axiosAPI(method, path, {}, parms);
};

export const deleteJob = async (job_id) => {
  const path = "/api/jobs/" + job_id;
  const method = "DELETE";
  return await axiosAPI(method, path);
};

export const getRecommendedJobs = async (parms) => {
  const path = "/api/recommendation";
  const method = "GET";

  return await axiosAPI(method, path, {}, parms);
};

export const getUserDetails = async (user_id) => {
  const path = "/users/" + user_id;
  const method = "GET";

  return await axiosAPI(method, path);
};
