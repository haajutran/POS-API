import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar, Badge } from "antd";
import NotiCashier from "./NotiCashier";
import moment from "moment";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    this.state = {
      collapsed: true,
      time: new Date().toLocaleString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  async tick() {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getDate() +
      "/" +
      (current_datetime.getMonth() + 1) +
      "/" +
      current_datetime.getFullYear() +
      " - " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();
    await this.setState({
      time: formatted_date
    });
  }

  checkAuth = () => {
    const posUser = sessionStorage.getItem("posUser");
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
    const { collapsed, time } = this.state;
    const posUser = sessionStorage.getItem("posUser");
    return (
      <div>
        {posUser && (
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <Link to="/">
                    <Icon type="appstore" />
                    <span>Table Map</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/test">
                    <Icon type="code" />
                    <span>Test</span>
                  </Link>
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
                <span className="posDate">
                  <span className="s-t">POS DATE:</span>
                  {moment(new Date(sessionStorage.getItem("posDate"))).format(
                    "DD/MM/YYYY"
                  )}
                </span>
                <span className="today">
                  <span className="s-t">NOW:</span>
                  {time}
                </span>
                <NotiCashier />
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
