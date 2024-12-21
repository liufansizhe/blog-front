import { Button, Form, Input, Modal } from "antd";
import { Login, getUserInfo, register } from "../../services";
import { useDispatch, useSelector } from "react-redux";

import { encrypt } from "../../utils/encrypt";
import { setVisible } from "../../store/action/modal";

const LoginModal = () => {
  const [form] = Form.useForm();
  const { loginModal } = useSelector((state: any) => state.modal);
  const { pubKey } = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  const closeHandle = () => {
    form.resetFields();
    dispatch(setVisible({ type: "loginModal", value: false }));
  };
  const clickHandle = () => {
    form.validateFields().then(async (res) => {
      const { email, password } = res;
      const data = await encrypt(password, pubKey);
      const result = await Login({ email, password: data });
      if (result?.data?.token) {
        localStorage.token = result?.data?.token;
      }
    });
  };
  const getInfo = async () => {
    getUserInfo();
  };
  return (
    <Modal
      title='login'
      open={loginModal.isShow}
      onCancel={closeHandle}
      footer={null}
    >
      <Form form={form} name='login'>
        <Form.Item name='email' label='email' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='password'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <Button onClick={clickHandle}>登录</Button>
      <Button onClick={getInfo}>获取</Button>
    </Modal>
  );
};
export default LoginModal;
