import "./style/index.scss";
import "amfe-flexible";
import "dayjs/locale/zh-cn";

import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import store from "./store/index.ts";
import zhCN from "antd/locale/zh_CN";

// for date-picker i18n

// import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Input: { colorTextQuaternary: "white" },
          DatePicker: {
            colorBgContainer: "transparent",
            colorBgElevated: "rgb(21,27,35)",
            colorTextDisabled: "white",
            colorText: "white",
            colorIcon: "white",
            colorTextHeading: "white",
            boxShadowSecondary:
              "      0 6px 16px 0 rgba(255, 255, 255, 0.08),      0 3px 6px -4px rgba(255, 255, 255, 0.12),      0 9px 28px 8px rgba(255, 255, 255, 0.05)    ",
          },
          Select: {
            colorBgContainer: "rgb(21,27,35)",
            colorText: "white",
            colorTextPlaceholder: "rgba(255,255,255,0.25)",
            colorTextQuaternary: "rgba(255,255,255,0.25)",
            colorBgElevated: "rgb(21,27,35)",
            optionSelectedColor: "rgb(21,27,35)",
            boxShadowSecondary:
              "      0 6px 16px 0 rgba(255, 255, 255, 0.08),      0 3px 6px -4px rgba(255, 255, 255, 0.12),      0 9px 28px 8px rgba(255, 255, 255, 0.05)    ",
          },
          Tabs: {
            colorBgContainer: "rgb(21,27,35)",
            colorText: "white",
            boxShadowSecondary:
              "      0 6px 16px 0 rgba(255, 255, 255, 0.08),      0 3px 6px -4px rgba(255, 255, 255, 0.12),      0 9px 28px 8px rgba(255, 255, 255, 0.05)    ",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
