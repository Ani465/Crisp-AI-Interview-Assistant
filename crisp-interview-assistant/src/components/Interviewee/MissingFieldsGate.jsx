import { Form, Input, Button, Alert } from "antd";
import { useDispatch } from "react-redux";
import { updateCandidate } from "../../store/slices/candidatesSlice";

export default function MissingFieldsGate({ candidate, onComplete }) {
  const dispatch = useDispatch();
  const missing = ["name", "email", "phone"].filter((k) => !candidate?.[k]);

  const [form] = Form.useForm();

  function submit(values) {
    dispatch(updateCandidate({ id: candidate.id, patch: values }));
    onComplete();
  }

  if (missing.length === 0) return onComplete(), null;

  return (
    <>
      <Alert
        message="Before we start"
        description="We need a few details missing from your resume."
        type="info"
        showIcon
        style={{ marginBottom: 12 }}
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={submit}
        initialValues={{
          name: candidate?.name,
          email: candidate?.email,
          phone: candidate?.phone,
        }}
      >
        {missing.includes("name") && (
          <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
        {missing.includes("email") && (
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        )}
        {missing.includes("phone") && (
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Continue
        </Button>
      </Form>
    </>
  );
}
