import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Login";
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
  Radio
} from "antd";
import logo from "../assets/images/logo.png";

const { Option } = Select;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values).then(res => {
          if (res.resuilt === 1) {
            message.success("Login Success!");
            sessionStorage.setItem("posUser", res.posUser);
            window.location.replace("/");
          } else {
            message.error("RVC No or Password is not correct!");
          }
        });
        // console.log("Received values of form: ", values);
      }
    });
  };

  componentDidMount() {
    this.props.requestDefRVCList();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { defRVCList, isLoading } = this.props;
    // console.log(defRVCList);
    return (
      <div className="login-page">
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <Row type="flex" justify="center">
            <Col lg={10} md={12} sm={16} xs={22} className="login-card">
              <div className="login-form">
                <div>
                  <img style={{ height: "100px" }} alt="logo" src={logo} />
                </div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator("rvcNo", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose RVC!"
                        }
                      ]
                    })(
                      <Radio.Group size="large">
                        {defRVCList &&
                          defRVCList.map(item => (
                            <Radio.Button value={item.rvcno}>
                              {item.rvcname}
                            </Radio.Button>
                          ))}
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                        <Radio.Button value={1}>TEST</Radio.Button>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!"
                        }
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
        )}
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(LoginForm);
