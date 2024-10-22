import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserAddOutlined } from "@ant-design/icons";
import Spinner from "./Spinner";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const AppForm = ({
  loader,
  formValues,
  placeholderEmail,
  placeholderPassword,
  ButtonName,
}) =>
  loader ? (
    <Spinner />
  ) : (
    <Form
      className="w-dvw  text-center"
      name="basic"
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 400,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={formValues}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<UserAddOutlined className="pr-2" />}
          className="rounded-full px-6 py-2"
          placeholder={placeholderEmail}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="pr-2" />}
          className="rounded-full px-6 py-2"
          placeholder={placeholderPassword}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="text-yellow-600 border-yellow-600 rounded-full px-12 py-5"
          htmlType="submit"
        >
          {ButtonName}
        </Button>
      </Form.Item>
    </Form>
  );
export default AppForm;
