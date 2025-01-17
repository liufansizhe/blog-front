//密码校验
export const PasswordPass = (_: any, val: string) => {
  if (!val) {
    return Promise.reject(new Error("密码必填"));
  } else if (!/^.{8,16}$/.test(val)) {
    return Promise.reject(new Error("密码为8-16个字"));
  } else {
    return Promise.resolve();
  }
};
//昵称校验
export const NickNamePass = (_: any, val: string) => {
  if (!val) {
    return Promise.reject(new Error("昵称必填"));
  } else if (!/^.{4,16}$/.test(val)) {
    return Promise.reject(new Error("昵称为4-16个字"));
  } else {
    return Promise.resolve();
  }
};
//邮箱校验
export const EmailPass = (_: any, val: string) => {
  if (!val) {
    return Promise.reject(new Error("邮箱必填"));
  } else if (
    !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
      val.trim()
    )
  ) {
    return Promise.reject(new Error("邮箱格式不正确"));
  } else {
    return Promise.resolve();
  }
};
//账号校验
export const AccountPass = (_: any, val: string) => {
  if (!val) {
    return Promise.reject(new Error("账号必填"));
  } else if (!/^.{4,16}$/.test(val)) {
    return Promise.reject(new Error("账号为4-16个字"));
  } else {
    return Promise.resolve();
  }
};
