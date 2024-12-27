// 创建计数器切片slice
// 导入创建切片的函数

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { GetUserInfo } from "@/services";

// 定义初始化状态
const initialState = { pubKey: "" };
// 创建切片
const userInfoSlice = createSlice({
  // 切片名称
  name: "userInfo",
  // 初始化状态
  initialState,
  // 定义处理器
  reducers: {
    // 处理加法
    update: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    clear: (state) => {
      state = { pubKey: state?.pubKey };
      return state;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(storeGetUserInfo.fulfilled, (state: any, data: any) => {
      state = { ...state, ...data.payload };
      return state;
    });
  },
});

// 导出动作
export const { update, clear } = userInfoSlice.actions;

export const storeGetUserInfo = createAsyncThunk("fetch", async () => {
  const { data } = await GetUserInfo();
  return data;
});
// 导出处理器
export default userInfoSlice.reducer;
