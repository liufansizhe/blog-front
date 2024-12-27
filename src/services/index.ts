import easyRequest from "lf-request";
import { message } from "antd";
import qs from "qs";

const easyRequestInstance = new easyRequest({
  request: [
    (config: any) => {
      if (config.headers["Content-Type"] == "multipart/form-data") {
        return config;
      }
      if (config.method === "post") config.data = qs.stringify(config.data);
      if (localStorage.token) {
        config.headers["Authorization "] = "Bearer " + localStorage.token;
      }
      return config;
    },
  ],
  response: [
    (response: any) => {
      if (response.status !== 200) {
        message.error("服务异常");
      } else if (!response.data.success) {
        message.error(response.data.message);
      }
      return response.data;
    },
    (err) => {
      const { response } = err;
      if (response.status !== 401) {
        message.error("服务异常");
      } else if (!response.data.success) {
        if (window.location.pathname !== "/") {
          window.location.pathname = "/";
        }
        localStorage.removeItem("token");
        message.error(response.data.message);
      }
    },
  ],
  requestList: [
    { type: "post", url: "login", name: "Login" },
    { type: "get", url: "getPublicKey", name: "getPublicKey" },
    { type: "get", url: "getUserInfo", name: "getUserInfo" },
    { type: "post", url: "register", name: "register" },
    { type: "post", url: "logout", name: "logout" },
    { type: "post", url: "setUserInfo", name: "setUserInfo" },
  ],
});
const apiList = easyRequestInstance.getApi();

export const Login = apiList.Login;
export const GetPublicKey = apiList.getPublicKey;
export const Register = apiList.register;
export const GetUserInfo = apiList.getUserInfo;
export const Logout = apiList.logout;
export const SetUserInfo = apiList.setUserInfo;
