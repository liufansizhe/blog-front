import "./index.scss";

import { Avatar, Form, Input } from "antd";
import { EmailPass, NickNamePass } from "@/utils/validate";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button";
import { SetUserInfo } from "@/services";
import { storeGetUserInfo } from "@/store/action/userInfo";
import { useEffect } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const [formBottom] = Form.useForm();
  const dispatch: any = useDispatch();
  const userInfo = useSelector((state: any) => state.userInfo);
  const updateHandle = async () => {
    const form1 = await form.validateFields();
    const { bio } = await formBottom.getFieldsValue();
    await SetUserInfo({ ...form1, bio });
    dispatch(storeGetUserInfo());
  };
  useEffect(() => {
    form.setFieldsValue({
      nickName: userInfo?.nickName,
      email: userInfo?.email,
    });
    formBottom.setFieldsValue({
      bio: userInfo?.bio,
    });
  }, [userInfo]);
  return (
    <div className='profile-page'>
      <div className='profile-page-top-form'>
        <Form layout='vertical' form={form}>
          <Form.Item
            label='昵称'
            name='nickName'
            rules={[{ validator: NickNamePass }]}
          >
            <Input allowClear autoComplete='off'></Input>
          </Form.Item>
          <Form.Item
            label='邮箱'
            name='email'
            rules={[{ validator: EmailPass }]}
          >
            <Input allowClear autoComplete='off'></Input>
          </Form.Item>
        </Form>
        <Avatar size={200} src={userInfo.avatar} />
      </div>
      <div className='profile-page-bottom-form'>
        <Form layout='vertical' form={formBottom}>
          <Form.Item label='个人经历' name='bio'>
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 4 }}
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </div>
      <div className='profile-page-footer'>
        <Button className='green-button' onClick={updateHandle}>
          更新简介
        </Button>
      </div>
    </div>
  );
};
export default Profile;
