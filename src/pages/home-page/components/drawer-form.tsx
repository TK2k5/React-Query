import { Button, Drawer, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ISkill } from "../../../interfaces/skill.interface";
import { createSkill } from "../../../apis/skill.api";
import { useForm } from "antd/es/form/Form";

interface DrawerFormPros {
  open: boolean;
  onClose: () => void;
}

const DrawerForm = ({ open, onClose }: DrawerFormPros) => {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const createSkillMutation = useMutation({
    mutationFn: (data: Omit<ISkill, "id">) => createSkill(data),
    onSuccess: () => {
      message.success("Tạo kỹ năng thành công");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["skill"] });
      form.resetFields();
    },
  });

  const onSubmit = (data: Omit<ISkill, "id">) => {
    createSkillMutation.mutate(data);
  };
  return (
    <Drawer title="Create Skill" onClose={onClose} open={open}>
      <Form form={form} onFinish={onSubmit} layout="vertical">
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
