import "./index.scss";
import "bytemd/dist/index.css";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/github-dark.css";

import { Form, Input, Popover, message } from "antd";
import { useRef, useState } from "react";

import Api from "@/services";
import Button from "@/components/Button";
import CloseIcon from "@/assets/svg/Close.svg?react";
import { Editor } from "@bytemd/react";
import alignPlugin from "./utils/alignPlugin";
import breaks from "@bytemd/plugin-breaks";
import codeCopy from "./utils/codePlugin";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import gfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import zhHans from "bytemd/locales/zh_Hans.json";

export const plugins: any[] = [
  breaks(),
  gemoji(),
  gfm({ locale: gfmZhHans }),
  highlight(),
  mediumZoom(),
  alignPlugin(),
  codeCopy(),
];
const Write = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>("");
  const [showPop, setShowPop] = useState<boolean>(false);
  const titleRef = useRef<any>(null);

  const onValueChange = (val: string) => {
    setValue(val);
  };
  //发布
  const publishHandle = async () => {
    form.validateFields().then(async (valid) => {
      const { describe } = valid;
      const title = titleRef.current.input.value;
      if (!title) {
        message.warning("请填写文章标题");
        return;
      }
      if (!value) {
        message.warning("文章内容不能为空");
        return;
      }
      const res = await Api.PublishArticle({ title, content: value, describe });
      if (res.success) {
        message.success(res.message);
        closePop();
      }
    });
  };
  const publish = () => {
    setShowPop(true);
  };
  const closePop = () => {
    if (showPop) {
      setShowPop(false);
      form.resetFields();
    }
  };
  const renderPublishContent = () => {
    return (
      <>
        <div className='publish-title'>
          <span>发布文章</span>
          <CloseIcon onClick={closePop} />
        </div>
        <Form form={form} name='publish'>
          <Form.Item
            name='describe'
            validateTrigger='onBlur'
            rules={[{ required: true, message: "摘要必填" }]}
          >
            <Input.TextArea
              placeholder='摘要'
              allowClear
              autoComplete='off'
              maxLength={100}
              showCount
            />
          </Form.Item>
        </Form>
        <div className='publish-footer'>
          <Button className='default-button' onClick={publishHandle}>
            确认并发布
          </Button>
        </div>
      </>
    );
  };
  return (
    <div className='editor'>
      <div className='editor-head'>
        <div className='left'>
          <Input placeholder='标题' ref={titleRef}></Input>
        </div>
        <div className='right'>
          <Popover
            open={showPop}
            placement='leftTop'
            content={renderPublishContent}
            trigger='hover'
            zIndex={1}
          >
            <Button className='default-button' onClick={publish}>
              发布
            </Button>
          </Popover>
        </div>
      </div>
      <Editor
        editorConfig={{
          // 不显示行数
          lineNumbers: false,
          autofocus: false,
        }}
        mode='split'
        locale={zhHans}
        plugins={plugins}
        value={value}
        onChange={onValueChange}
      ></Editor>
    </div>
  );
};
export default Write;
