import { Button, Col, Row, Skeleton, Space, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import DrawerForm from "./components/drawer-form";
import { ISkill } from "../../interfaces/skill.interface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns: TableProps<ISkill[]>["columns"] = [
    {
      title: "Tiêu đề kỹ năng",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => {
        return (
          <Space size={"small"}>
            <Button type="text" icon={<EditOutlined />}></Button>
            <Button type="text" danger icon={<DeleteOutlined />}></Button>
          </Space>
        );
      },
    },
  ];

  const { data, isError, isLoading } = useQuery<ISkill[]>({
    queryKey: ["skill"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/skills");
      return response.data;
    },
  });

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>error</div>;
  }

  const newData = data?.map((item: ISkill) => {
    return {
      ...item,
      key: item.id,
    };
  });

  return (
    <div className="tw-p-10 tw-h-screen tw-overflow-y-scroll">
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <Button type="primary" onClick={showDrawer}>
            Add product
          </Button>
        </Col>

        <Col span={24}>
          <Table
            columns={columns as ISkill[]}
            dataSource={newData}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 3,
              showTotal: (total, range) => {
                return `${range[0]}-${range[1]} of  ${total} items`;
              },
            }}
          />
        </Col>
      </Row>

      <DrawerForm onClose={onClose} open={open} />
    </div>
  );
};

export default HomePage;
