import {
  AppstoreOutlined,
  LaptopOutlined,
  MailOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import type { MenuProps } from "antd";
import { Outlet } from "react-router-dom";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

const LayoutDefault = () => {
  const { Content, Sider } = Layout;

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
    getItem("Quản lý sản phẩm", "1", <MailOutlined />, [
      getItem("Quản lý người dùng", "11"),
      getItem("Quản lý sản phẩm", "12"),
      getItem("Quản lý danh mục sản phẩm", "13"),
    ]),
  ];

  return (
    <Layout className="tw-min-h-screen">
      <Sider width={260}>
        <Menu
          mode="inline"
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          style={{ height: "100%" }}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutDefault;
