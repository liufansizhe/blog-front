//个人简历

import "./index.scss";

import CommonForm, { ConfigType } from "@/components/CommonForm";
import { Form, Switch, Tabs } from "antd";
import { ReactElement, useEffect, useRef, useState } from "react";

import Api from "@/services";
import ArrowIcon from "@/assets/svg/Arrow.svg?react";
import { EmailPass } from "@/utils/validate";
import { formateDate } from "@/utils/moment";

const CV = () => {
  const [form] = Form.useForm();
  const timeRef = useRef<any>(null);
  const defaultPage = useRef<HTMLDivElement>(null);
  const mainPage = useRef<HTMLDivElement>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [lineList, setLineList] = useState<ReactElement[]>([]);
  const [controlShow, setControlShow] = useState<boolean>(false);
  const [formConfig, setFormConfig] = useState<ConfigType[]>([]);
  const [tabIndex, setTabIndex] = useState<string>("1");
  const [formDisable, setFormDisable] = useState<Array<boolean>>(
    new Array(9).fill(false)
  );
  const [cvTabs, setCvTabs] = useState<any[]>([]);
  const [formInfo, setFormInfo] = useState<any>({});

  const labelDom = (val: string, key: string) => {
    return (
      <>
        <span className='label'>{val}</span>
        <Switch
          defaultChecked
          value={formDisable[Number(key) - 1]}
          size='small'
          onClick={() => labelChange(key)}
        />
      </>
    );
  };
  const formList = [
    {
      label: "基础信息",
      key: "1",
    },
    {
      label: labelDom("教育背景", "2"),
      key: "2",
    },
    {
      label: labelDom("求职意向", "3"),
      key: "3",
    },
    {
      label: labelDom("工作经验", "4"),
      key: "4",
    },
    {
      label: labelDom("项目经验", "5"),
      key: "5",
    },
    {
      label: labelDom("技能特长", "6"),
      key: "6",
    },
    {
      label: labelDom("荣誉证书", "7"),
      key: "7",
    },
    {
      label: labelDom("自我评价", "8"),
      key: "8",
    },
    {
      label: labelDom("兴趣爱好", "9"),
      key: "9",
    },
  ];
  const formObj: Record<string, any> = {
    "1": [
      {
        label: "您的名字",
        name: "name",
        type: "input",
        attrs: {
          placeholder: "输入您的姓名",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "性别",
        name: "gender",
        type: "select",
        attrs: {
          style: { width: 80 },
          placeholder: "无",
          allowClear: true,
          autoComplete: "off",
          options: [
            { value: 0, label: "女" },
            { value: 1, label: "男" },
          ],
        },
      },
      {
        label: "出生年月",
        name: "age",
        type: "date",
        attrs: {
          placeholder: "年龄",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "工作年限",
        name: "workYear",
        type: "select",
        attrs: {
          style: { width: 150 },
          placeholder: "请填写工作年限",
          allowClear: true,
          autoComplete: "off",
          options: [
            { value: 0, label: "不填" },
            { value: 1, label: "应届" },
            { value: 2, label: "半年" },
            { value: 3, label: "1-3年" },
            { value: 4, label: "3-5年" },
            { value: 5, label: "5-10年" },
            { value: 6, label: "10年以上" },
          ],
        },
      },
      {
        label: "婚姻状况",
        name: "marry",
        type: "select",
        attrs: {
          style: { width: 80 },
          placeholder: "无",
          allowClear: true,
          autoComplete: "off",
          options: [
            { value: 0, label: "未婚" },
            { value: 1, label: "已婚" },
          ],
        },
      },
      {
        label: "联系电话",
        name: "phone",
        type: "input",
        attrs: {
          placeholder: "请输入联系电话",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "邮箱",
        name: "email",
        type: "input",
        rules: [{ validator: EmailPass }],
        attrs: {
          placeholder: "请输入邮箱",
          allowClear: true,
          autoComplete: "off",
        },
      },

      {
        label: "身高/体重",
        name: "body",
        type: "input",
        attrs: {
          placeholder: "请输入身高/体重",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "民族",
        name: "nationality",
        type: "input",
        attrs: {
          placeholder: "请输入民族",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "籍贯",
        name: "nativePlace",
        type: "input",
        attrs: {
          placeholder: "请输入籍贯",
          allowClear: true,
          autoComplete: "off",
        },
      },
      {
        label: "政治面貌",
        name: "political",
        type: "input",
        attrs: {
          placeholder: "请输入政治面貌",
          allowClear: true,
          autoComplete: "off",
        },
      },
    ],
  };
  const init = () => {
    if (defaultPage?.current && mainPage?.current) {
      const mainHeight = mainPage.current.offsetHeight;
      const defaultHeight = defaultPage.current.offsetHeight;
      setPageNum(Math.ceil(mainHeight / defaultHeight));
    }
  };
  const renderLine = () => {
    if (mainPage.current && defaultPage.current) {
      mainPage.current.style.height =
        pageNum * defaultPage.current.offsetHeight + (pageNum - 1) * 14 + "px";
    }
    if (pageNum == 1) return;
    const list = [];
    for (let i = 0; i < pageNum; i++) {
      if (defaultPage?.current?.offsetHeight) {
        list.push(
          <div
            className='cv-body-line-item'
            style={{
              top: defaultPage.current.offsetHeight * (i + 1) + i * 14 + "px",
            }}
          >
            <span>分页区，请在内容里用换行避开此区域</span>
            <span>
              第{i + 1}页/共{pageNum}页
            </span>
          </div>
        );
      }
    }

    setLineList(list);
  };
  const showHandle = () => {
    setControlShow(!controlShow);
  };
  const labelChange = (val: string) => {
    const index = Number(val) - 1;
    const disableList = [...formDisable];
    disableList[index] = !disableList[index];
    setFormDisable(disableList);
  };

  const tabChangeHandle = (val: string) => {
    setTabIndex(val);
  };
  const formChange = async () => {
    form.validateFields().then(async (res) => {
      if (res?.age) {
        res.age = formateDate(res.age);
      }
      const preData = formInfo;
      setFormInfo({ ...preData, ...res });
      if (timeRef?.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
      timeRef.current = setTimeout(() => {
        Api.SaveCv(res);
      }, 3000);
    });
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    renderLine();
  }, [pageNum]);
  useEffect(() => {
    const config = formObj[tabIndex];
    if (config) {
      setFormConfig(config as ConfigType[]);
    } else {
      setFormConfig([]);
    }
  }, [tabIndex]);
  useEffect(() => {
    const list = formList.map((item, index) => ({
      ...item,
      children: (
        <CommonForm
          form={form}
          config={formConfig}
          attrs={{
            layout: "inline",
            disabled: formDisable[index],
            onValuesChange: formChange,
          }}
        />
      ),
    }));
    setCvTabs(list);
  }, [formDisable, formConfig]);
  return (
    <div className='cv'>
      <div className='cv-body'>
        <div className='cv-body-default' ref={defaultPage}></div>
        <div className='cv-body-main' ref={mainPage}>
          <div className='left'>
            <img src='' alt='' />
          </div>
        </div>
        <div className='cv-body-line'>{lineList}</div>
      </div>
      <div
        className={`cv-control ${
          controlShow ? "cv-control-show" : "cv-control-hide"
        }`}
      >
        <div className='cv-control-arrow' onClick={showHandle}>
          <ArrowIcon />
        </div>
        <div className='cv-control-form'>
          <div className='cv-control-form-body'>
            <div className='cv-control-form-body-tabs'>
              <Tabs
                defaultActiveKey={tabIndex}
                items={cvTabs}
                onChange={tabChangeHandle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CV;
