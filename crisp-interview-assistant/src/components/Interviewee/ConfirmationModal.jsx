import React from "react";
import { Modal, Form, Input, Button } from "antd";

export default function ConfirmationModal({
  visible,
  onConfirm,
  onCancel,
  extracted,
}) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(extracted);
    }
  }, [visible, extracted, form]);

  return (
    <Modal
      title="Confirm Your Information"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={extracted}
        onFinish={onConfirm}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Confirm & Start Interview
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
