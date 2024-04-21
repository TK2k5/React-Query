import { Button, Drawer, Form, Input, Skeleton } from "antd";

import { ISkill } from "../../../interfaces/skill.interface";
import { useUpdateSkill } from "../../../hooks/useSkill";

interface DrawerFormEditPros {
  open: boolean;
  onClose: () => void;
  idSkill: number;
}

const DrawerFormEdit = ({ open, onClose, idSkill }: DrawerFormEditPros) => {
  const { isError, isLoading, form, onSubmit } = useUpdateSkill(idSkill);
  const handleSubmit = (data: ISkill) => {
    onSubmit(data), onClose();
  };
  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Drawer title="Edit Skill" onClose={onClose} open={open}>
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

export default DrawerFormEdit;
