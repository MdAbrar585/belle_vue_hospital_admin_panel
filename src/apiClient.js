import axios from "axios";

/**
 * @name Api Client
 * @role Connect with the main api endpoint
 * @param withCredentials need for sanctum
 * @return connect api client
 *
 */
const apiClient = axios.create({
  //url changed updated
  baseURL: "https://production-lm.coderslab.com.bd/api/v1/",
  // baseURL: process.env.REACT_APP_BASE_URL,

  withCredentials: false,
  accesscontrolalloworigin: "*",
  accesscontrolallowMethods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
});

export default apiClient;
