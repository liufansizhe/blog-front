import easyRequest from "lf-request";
import { message } from "antd";
import qs from "qs";

const instance = new easyRequest({
  requestList: [
    { type: "post", url: "login" },
    { type: "get", url: "getUserInfo" },
    { type: "post", url: "register" },
    { type: "post", url: "logout" },
    { type: "post", url: "setUserInfo" },
    { type: "get", url: "getCode" },
    { type: "post", url: "publishArticle" },
    { type: "get", url: "getHomeArticleList" },
    { type: "get", url: "getArticleDetail" },
    { type: "post", url: "saveCv" },
  ],
});
instance.interceptorsRequest = (config: any) => {
  if (config.headers["Content-Type"] == "multipart/form-data") {
    return config;
  }
  if (config.method === "post") config.data = qs.stringify(config.data);
  if (localStorage.token) {
    config.headers["Authorization "] = "Bearer " + localStorage.token;
  }
  return config;
};
instance.interceptorsResponse = (response: any, error: any) => {
  if (response) {
    if (response.status !== 200) {
      message.error(response.data.message ?? "服务异常");
    } else if (!response.data.success) {
      message.error(response.data.message);
    }
    return response.data;
  } else {
    const { response } = error;
    if (response.status !== 401) {
      message.error(response.data.message ?? "服务异常");
    } else if (!response.data.success) {
      if (window.location.pathname !== "/") {
        window.location.pathname = "/";
      }
      localStorage.removeItem("token");
      message.error(response.data.message);
    }
  }
};
const apiList = instance.getApi();
export default apiList;
