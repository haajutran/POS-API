import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { actionCreators } from "../store/NotiCashier";
import { Icon, Badge, Row, Col, Input, Button, Table, Form } from "antd";

class TableDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // this.props.requestNotiCashier();
  }

  render() {
    // const { isLoading, notiCashier } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    };
    return (
      <div className="detail-page">
        <Row>
          <Col span={10}>
            <div className="info-zone">
              <Row>
                <Col>
                  <div className="ifz-1">
                    <Row className="line">
                      <Col span={8} className="border-right">
                        <span>Receipt No:</span>
                      </Col>
                      <Col span={8} className="border-right">
                        <span>33000553</span>
                      </Col>
                      <Col span={6}>
                        <span>00:07</span>
                      </Col>
                      <Col span={2}>
                        <span className="info-btn">
                          <Icon type="info" />
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col>
                  <div className="ifz-2">
                    <Icon type="appstore" />
                    <Button type="primary">#1</Button>
                  </div>
                </Col>
                <Col>
                  <div className="ifz-2">
                    <Icon type="experiment" />
                    <Button type="primary">KV1</Button>
                    <Button type="primary">MC</Button>
                    <Button type="primary">TM</Button>
                  </div>
                </Col>
                <Col>
                  <div className="if-t">
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      scroll={{ y: 340 }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="ifz-3">
                    <Button type="primary" icon="clock-circle" size="large" />
                    <Button type="primary" icon="scissor" size="large" />
                    <Button type="primary" icon="alert" size="large" />
                  </div>
                </Col>
                <Col style={{ marginTop: "1em" }}>
                  <div className="nvf">
                    <Form
                      onSubmit={this.handleSubmit}
                      className="no-valid-form"
                    >
                      <Row gutter={16}>
                        <Col xl={12}>
                          <Form.Item label="Sub Amount" {...formItemLayout}>
                            {getFieldDecorator("username", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input your username!"
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Tax Amount" {...formItemLayout}>
                            {getFieldDecorator("username", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input your username!"
                                }
                              ]
                            })(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Discount" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Total Amount" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Service Charge" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Total Due" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Special Tax" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                        <Col xl={12}>
                          <Form.Item label="Due USD" {...formItemLayout}>
                            {getFieldDecorator("username")(<Input />)}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
                <Col>
                  <div className="ab">
                    <Row>
                      <Col xl={16}>
                        <Button icon="close" ghost>
                          Cancel Bill
                        </Button>
                        <Button icon="search" ghost>
                          Ord Quickly
                        </Button>
                        <Button icon="menu" ghost>
                          Top Menu
                        </Button>
                        <Button icon="deployment-unit" ghost>
                          Request
                        </Button>
                        <Button icon="stop" ghost>
                          Void
                        </Button>
                        <Button icon="appstore" ghost>
                          Add On
                        </Button>
                        <Button icon="swap" ghost>
                          Change Qty
                        </Button>
                        <Button icon="bars" ghost>
                          Other Options
                        </Button>
                      </Col>
                      <Col xl={6}>
                        <Button icon="select" ghost style={{ height: 130 }}>
                          Send Order
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={14} />>
        </Row>
      </div>
    );
  }
}

const dataSource = [];

const columns = [
  {
    title: "QTy",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Item Name",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Amount",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "By",
    dataIndex: "address",
    key: "address"
  }
];
// export default connect(
//   state => state.notiCashier,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )(NotiCashier);
const DF = Form.create({ name: "df" })(TableDetail);
export default DF;
