import axios from "axios";

const instance = axios.create({
  // baseURL: "http://43.205.236.98:9900",
  baseURL: "http://localhost:9900",
});

export default instance;
