import { Button, Drawer, Form, Input } from "antd";

import { ISkill } from "../../../interfaces/skill.interface";
import { useCreateSkill } from "../../../hooks/useSkill";
import { useForm } from "antd/es/form/Form";

interface DrawerFormPros {
  open: boolean;
  onClose: () => void;
}

const DrawerForm = ({ open, onClose }: DrawerFormPros) => {
  const [form] = useForm();
  const { onSubmit } = useCreateSkill();
  const handleSubmit = (data: Omit<ISkill, "id">) => {
    onClose();
    form.resetFields();
    onSubmit(data);
  };
  return (
    <Drawer title="Create Skill" onClose={onClose} open={open}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Tên kỹ năng"
          name="title"
          required
          rules={[{ required: true, message: "Vui lòng nhập tên kỹ năng!" }]}
        >
          <Input placeholder="Tên kỹ năng" size="middle" />
        </Form.Item>
        <Form.Item
          label="Mô tả kỹ năng"
          name="desc"
          required
          rules={[{ required: true, message: "Vui lòng nhập mô tả kỹ năng!" }]}
        >
          <Input.TextArea placeholder="Mô tả kỹ năng" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            size="large"
            className="tw-w-full"
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
