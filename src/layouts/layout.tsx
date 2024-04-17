import { Layout } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Outlet } from "react-router-dom";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutDefault = () => {
  const { Sider, Content } = Layout;

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Quản lí sản phẩm", "1", <MailOutlined />, [
      getItem("Quản lí người dùng", "11"),
      getItem("Quản lí sản phẩm", "12"),
      getItem("Quản lý danh mục sản phẩm", "13"),
    ]),
  ];

  return (
    <Layout className="min-h-screen">
      <Sider width={260}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
          items={items}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutDefault;
