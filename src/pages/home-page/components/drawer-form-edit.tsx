import { Button, Drawer, Form, Input, Skeleton, message } from "antd";
import { getSkillByID, updateSkill } from "../../../apis/skill.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ISkill } from "../../../interfaces/skill.interface";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

interface DrawerFormEditPros {
  open: boolean;
  onClose: () => void;
  idSkill: number;
}

const DrawerFormEdit = ({ open, onClose, idSkill }: DrawerFormEditPros) => {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const editMutation = useMutation({
    mutationFn: (data: ISkill) => updateSkill(data),
    onSuccess: () => {
      message.success("Cập nhật kỹ năng thành công!");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["skill"] });
    },
    onError: () => {
      message.error("Cập nhật kỹ năng thất bại");
    },
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["skill", idSkill],
    queryFn: () => getSkillByID(idSkill),
    enabled: !!idSkill, //idSkill != null || idSkill != undefined
  });

  const onSubmit = (data: Omit<ISkill, "id">) => {
    editMutation.mutate({
      ...data,
      id: idSkill,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(data);
    }
  }, [data, isSuccess, form]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Drawer title="Edit Skill" onClose={onClose} open={open}>
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

export default DrawerFormEdit;
