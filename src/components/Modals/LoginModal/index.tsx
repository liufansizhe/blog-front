import "./index.scss";

import { EmailPass, PasswordPass } from "@/utils/validate";
import { Form, Input, Modal, message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Api from "@/services";
import Button from "@/components/Button";
import { PUB_KEY } from "@/utils/config";
import _ from "lodash";
import { encrypt } from "@/utils/encrypt";
import { setVisible } from "@/store/action/modal";
import { update } from "@/store/action/userInfo";

export interface TimeTypes {
  timeStamp: number;
  timeInterval: any;
}
const LoginModal = () => {
  const { current } = useRef<TimeTypes>({ timeStamp: 0, timeInterval: null });
  const [codeTime, setCodeTime] = useState<number>(0);
  const [isCodeDisable, setIsCodeDisable] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { loginModal } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  //重置弹窗
  const clearModal = () => {
    setIsLogin(true);
    form.resetFields();
    if (current.timeInterval) clearInterval(current.timeInterval);
    current.timeInterval = null;
    localStorage.removeItem("codeTime");
  };
  //关闭弹窗
  const closeHandle = () => {
    clearModal();
    dispatch(setVisible({ type: "loginModal", value: false }));
  };
  //登录点击事件
  const clickHandle = () => {
    if (!isLogin) {
      setIsLogin(true);
      form.resetFields();
      return;
    }
    form.validateFields().then(async (res) => {
      const { email, password } = res;
      const data = await encrypt(password, PUB_KEY);
      const result = await Api.Login({ email, password: data });
      if (result?.data?.token) {
        localStorage.token = result?.data?.token;
        const userInfo = await Api.GetUserInfo();
        dispatch(update({ ...userInfo?.data }));
        closeHandle();
      }
    });
  };
  //密码二次校验
  const checkPassword = (_: any, val: number) => {
    const { password } = form.getFieldsValue();
    if (password == val) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("两个密码不一致"));
  };
  //注册
  const registerHandle = () => {
    if (isLogin) {
      setIsLogin(false);
      form.resetFields();

      return;
    }
    form.validateFields().then(async (res) => {
      const { email, password, code } = res;
      const data = await encrypt(password, PUB_KEY);
      const result = await Api.Register({ email, password: data, code });
      if (result.success) {
        messageApi.open({
          type: "success",
          content: "注册成功",
        });
        clearModal();
      }
    });
  };
  //获取验证码
  const getCodeHandle = _.debounce(
    async () => {
      const { email } = form.getFieldsValue();
      const res = await Api.GetCode({ email });
      if (res.success) {
        localStorage.setItem("codeTime", new Date().getTime() + "");
        setIn();
      }
    },
    1000,
    { leading: true }
  );
  //邮件修改界面
  const emailChange = async () => {
    const { email } = form.getFieldsValue();
    setIsCodeDisable(true);
    await EmailPass("", email);
    setIsCodeDisable(false);
  };
  //设置倒计时
  const setIn = () => {
    const time = Math.floor(
      (new Date().getTime() -
        new Date(Number(localStorage.codeTime)).getTime()) /
        1000
    );
    setIsCodeDisable(true);
    setCodeTime(time);
    if (current.timeInterval) {
      clearInterval(current.timeInterval);
    }

    current.timeInterval = setInterval(() => {
      current.timeStamp++;

      if (current.timeStamp > 60) {
        localStorage.removeItem("codeTime");
        setIsCodeDisable(false);

        clearInterval(current.timeInterval);
        current.timeInterval = null;
        current.timeStamp = 0;
      } else {
        setCodeTime(current.timeStamp);
      }
    }, 1000);
  };
  //键盘事件
  const handleKeyDown = useCallback((e: { keyCode: number }) => {
    if (e.keyCode == 13) {
      if (isLogin) {
        clickHandle();
      } else {
        registerHandle();
      }
    }
  }, []);
  useEffect(() => {
    if (loginModal.isShow) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [loginModal.isShow]);
  return (
    <Modal
      className='login-modal'
      title={isLogin ? "登录" : "注册"}
      open={loginModal.isShow}
      onCancel={closeHandle}
      footer={null}
      width={288}
    >
      {contextHolder}
      <Form form={form} name={isLogin ? "login" : "register"}>
        <Form.Item
          name='email'
          validateTrigger='onBlur'
          rules={[{ validator: EmailPass }]}
        >
          <Input
            placeholder='邮箱'
            allowClear
            autoComplete='off'
            onChange={emailChange}
          />
        </Form.Item>
        <Form.Item
          name='password'
          validateTrigger='onBlur'
          rules={[{ validator: PasswordPass }]}
        >
          <Input.Password placeholder='密码' allowClear />
        </Form.Item>
        {!isLogin && (
          <>
            <Form.Item
              name='checkPassword'
              validateTrigger='onBlur'
              rules={[{ validator: checkPassword }]}
            >
              <Input.Password placeholder='再次输入密码' allowClear />
            </Form.Item>
            <span className='codeRow'>
              <Form.Item
                name='code'
                validateTrigger='onBlur'
                rules={[{ required: true, message: "验证码必填" }]}
              >
                <Input placeholder='验证码' />
              </Form.Item>
              <Button onClick={getCodeHandle} disable={isCodeDisable}>
                {isCodeDisable && localStorage.codeTime
                  ? codeTime + "s"
                  : "获取验证码"}
              </Button>
            </span>
          </>
        )}
      </Form>
      <div className='btn-list'>
        {isLogin ? (
          <>
            <Button className='login-button' onClick={clickHandle}>
              登录
            </Button>
            <Button className='register-button' onClick={registerHandle}>
              注册账号
            </Button>
          </>
        ) : (
          <>
            <Button className='register-button' onClick={registerHandle}>
              注册
            </Button>
            <Button className='login-button' onClick={clickHandle}>
              返回登录
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
export default LoginModal;
