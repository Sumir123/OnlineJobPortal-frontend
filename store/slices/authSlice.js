import { axiosAPI } from "../../util/axiosAPI";
import HandleCookies from "../../util/handleCookie";

export const createAuthSlice = (set, get) => ({
  currentUser: {},
  userTokenData: [],

  setCurrentUser: (currentUser) => {
    console.log(currentUser);

    set({ currentUser: currentUser });
  },

  getCurrentUser: async () => {
    console.log("getting user info....");
    try {
      const method = "GET";
      const path = `/me`;
      const res = await axiosAPI(method, path);

      set({ currentUser: res });
      console.log("finished getting user info...");
      return res;
    } catch (error) {
      throw error;
    }
  },
  getAllUser: async () => {
    try {
      const method = "GET";
      const path = `/users`;
      const res = await axiosAPI(method, path);
      return res;
    } catch (error) {
      throw error;
    }
  },
  setUserTokenData: (data) => {
    HandleCookies.setCookieJson("token", data);
    set(() => ({
      userTokenData: data,
    }));
  },

  clearAllUserData: () => {
    console.log("Clearing cookies...");

    HandleCookies.removeCookie("token");
    HandleCookies.removeCookie("userdata");

    set(() => ({
      currentUser: {},
      userTokenData: {},
      appliacations: {},
      jobs: {},
      recomended: {},
    }));
  },

  loginUser: async (data) => {
    try {
      const method = "POST";
      const path = `/login`;
      const res = await axiosAPI(
        method,
        path,
        {},
        {},
        new URLSearchParams(data)
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (data) => {
    try {
      const method = "POST";
      const path = `/register`;
      const res = await axiosAPI(method, path, {}, {}, data);

      return res;
    } catch (error) {
      throw error;
    }
  },
});
