import "./index.scss";
import "bytemd/dist/index.css";
import "bytemd/dist/index.min.css";
import "highlight.js/styles/github-dark.css";

import { Input, message } from "antd";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import { Editor } from "@bytemd/react";
import { PublishArticle } from "@/services";
import alignPlugin from "./utils/alignPlugin";
import breaks from "@bytemd/plugin-breaks";
import codeCopy from "./utils/codePlugin";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import gfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import zhHans from "bytemd/locales/zh_Hans.json";

const Write = () => {
  const [value, setValue] = useState<string>("");
  const titleRef = useRef<any>(null);
  const plugins: any[] = [
    breaks(),
    gemoji(),
    gfm({ locale: gfmZhHans }),
    highlight(),
    mediumZoom(),
    alignPlugin(),
    codeCopy(),
  ];
  const onValueChange = (val: string) => {
    setValue(val);
  };
  //发布
  const publishHandle = async () => {
    const title = titleRef.current.input.value;
    if (!title) {
      message.warning("请填写文章标题");
      return;
    }
    if (!value) {
      message.warning("文章内容不能为空");
      return;
    }
    const res = await PublishArticle({ title, content: value });
    if (res.success) {
      message.success(res.message);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className='editor'>
      <div className='editor-head'>
        <div className='left'>
          <Input placeholder='标题' ref={titleRef}></Input>
        </div>
        <div className='right'>
          <Button onClick={publishHandle}>发布</Button>
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
