import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    this.state = {
      collapsed: true
    };
  }

  checkAuth = () => {
    const posUser = localStorage.getItem("posUser");
    if (!posUser || posUser.length < 1) {
      window.location.replace("/login");
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    const posUser = localStorage.getItem("posUser");
    return (
      <div>
        {posUser && (
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span>nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }}>
                <Icon
                  className="trigger"
                  type={collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  background: "#fff",
                  minHeight: 280
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}

export default MainLayout;
