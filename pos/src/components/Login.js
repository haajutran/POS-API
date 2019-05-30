import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Login";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  componentDidMount() {
    this.props.requestDefRVCList();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <Row type="flex" justify="center">
          <Col lg={6} md={12} sm={16} xs={22} className="login-card">
            <div className="login-form">
              <h2>LOGIN</h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginForm);
