import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { collapsed } = this.state;
    return <div>123456 {this.props.children}</div>;
  }
}

export default MainLayout;
