import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",

  /*
   * VERY IMPORTANT
   *
   * This allows the browser to send the
   * HttpOnly JWT cookie to Spring Boot.
   */
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;