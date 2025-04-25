import { DatePicker, Form, FormInstance, Input, Select } from "antd";

export interface ConfigType {
  label: string;
  name: string;
  type: "input" | "date" | "select";
  attrs?: any;
  rules?: Record<string, any>[];
}
export interface CommonFormProps {
  form: FormInstance;
  config: ConfigType[];
  attrs?: any;
}
const CommonForm = (props: CommonFormProps) => {
  const { form, config, attrs = {} } = props;
  const formItemRender = (item: ConfigType) => {
    switch (item?.type) {
      case "input": {
        return <Input {...(item?.attrs ?? {})} />;
      }
      case "date": {
        return <DatePicker {...(item?.attrs ?? {})} />;
      }
      case "select": {
        return <Select {...(item?.attrs ?? {})} />;
      }
    }
  };
  return (
    <Form form={form} {...attrs}>
      {config.map((item) => {
        return (
          <Form.Item
            label={item?.label}
            name={item.name}
            validateTrigger='onBlur'
            rules={item?.rules}
            key={item.name}
          >
            {formItemRender(item)}
          </Form.Item>
        );
      })}
    </Form>
  );
};
export default CommonForm;
