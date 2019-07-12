import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TableDetail";
import {
  Icon,
  Badge,
  Row,
  Col,
  Input,
  Button,
  Table,
  Form,
  Breadcrumb
} from "antd";
import moment from "moment";

class TableDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bsMenus: [],
      previousMenuNo: ""
    };
  }

  async componentWillMount() {
    // this.props.requestNotiCashier();
    await this.props.requestMenus(0);
    await this.props.requestCourse();
    const params = this.props.match.params;

    if (params) {
      const { checkNo } = params;

      const tableDetail = await this.props.getTableDetail(checkNo);
      const adult = tableDetail.adult;
      const child = tableDetail.child;
      const total = parseInt(adult) + parseInt(child);
      var totalGuests = [];
      for (var i = 1; i <= total; i++) {
        totalGuests.push(i);
      }
      this.setState({
        tableDetail,
        checkNo,
        totalGuests
      });
    }
  }

  getHoursPassed = openTime => {
    const date1 = moment(new Date(openTime));
    const date2 = moment(new Date());
    var diffInHours = date2.diff(date1, "hours");
    var minutes = new Date(openTime).getMinutes() - new Date().getMinutes();
    // var diffInMinutes = date2.diff(date1, "minutes");
    // const res = diffInHours + " : " + minutes;
    const res = diffInHours;
    return res;
  };

  handleClickMenu = async menuNo => {
    const { bsMenus } = this.state;
    await this.props.requestMenus(menuNo);
    // var bsMenus = [];
    if (menuNo === 0) {
      this.setState({
        bsMenus: []
      });
    } else if (!bsMenus.includes(menuNo)) {
      bsMenus.push(menuNo);
      console.log(bsMenus);
      this.setState({
        bsMenus
      });
    } else {
      var bsMenusTemp = [];
      for (var bsm in bsMenus) {
        console.log(bsMenus[bsm]);
        bsMenusTemp.push(bsMenus[bsm]);
        if (bsMenus[bsm] === menuNo) {
          break;
        }
      }
      console.log(bsMenusTemp);
      this.setState({
        bsMenus: bsMenusTemp
      });
    }
  };

  handleClickMainMenu = async iCode => {
    console.log(iCode);
  };

  render() {
    // const { isLoading, notiCashier } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    };
    const formItemLayout2 = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    const { tableDetail, checkNo, totalGuests, bsMenus } = this.state;
    const { menus, mainMenus, course } = this.props;

    console.log(menus);
    return (
      <div className="detail-page">
        {tableDetail && (
          <Row gutter={20}>
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
                          <span>{checkNo}</span>
                        </Col>
                        <Col span={6}>
                          <span>
                            {this.getHoursPassed(tableDetail.openTime)}
                          </span>
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
                      {totalGuests.map(g => (
                        <Button type="primary">#{g}</Button>
                      ))}
                    </div>
                  </Col>
                  <Col>
                    <div className="ifz-2">
                      <Icon type="experiment" />
                      {course.map(c => (
                        <Button type="primary">{c.courseName}</Button>
                      ))}
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
                            <Row>
                              <Col span={12}>
                                <b>Sub Amount</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Tax Amount</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Discount</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Total Amount</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Service Charge</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Total Due</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Special Tax</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12}>
                            <Row>
                              <Col span={12}>
                                <b>Due USD</b>
                              </Col>
                              <Col span={12}>
                                <span>sdsd</span>
                              </Col>
                            </Row>
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
            <Col span={14}>
              <div className="order-zone">
                <Row>
                  <Col>
                    <div className="oib">
                      <Row gutter={16}>
                        <Col xl={20}>
                          <Row gutter={16}>
                            <Col xl={14} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Open Bill</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {moment(
                                      new Date(tableDetail.openTime)
                                    ).format("DD/MM/YYYY HH:MM")}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={10} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Table</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {tableDetail.tableNo}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={14} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Open By</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {tableDetail.openBy}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={10} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Adult</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {tableDetail.adult}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={14} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Client</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {tableDetail.clientName}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                            <Col xl={10} className="seperate">
                              <Row>
                                <Col span={10}>
                                  <b className="title">Child</b>
                                </Col>
                                <Col span={14}>
                                  <span className="value">
                                    {tableDetail.child}
                                  </span>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col xl={4} className="hd-btn">
                          <Button
                            className="hb-btn"
                            title="Hide Bill"
                            icon="check"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div className="breadscrumb-menu">
                      <Breadcrumb>
                        <Breadcrumb.Item
                          onClick={() => this.handleClickMenu(0)}
                        >
                          <Icon type="home" />
                        </Breadcrumb.Item>
                        {bsMenus.map(bsm => (
                          <Breadcrumb.Item
                            onClick={() => this.handleClickMenu(bsm)}
                          >
                            {bsm}
                          </Breadcrumb.Item>
                        ))}
                      </Breadcrumb>
                    </div>

                    <div className="oz">
                      {menus.map(menu => (
                        <div
                          className="order-item"
                          onClick={() => this.handleClickMenu(menu.menuNo)}
                        >
                          <div className="oi-text">
                            <span>{menu.menuName}</span>
                          </div>
                        </div>
                      ))}
                      {mainMenus.map(mainMenu => (
                        <div
                          className="order-item main-item"
                          onClick={() =>
                            this.handleClickMainMenu(mainMenu.iCode)
                          }
                        >
                          <div className="oi-text">
                            <span>{mainMenu.iName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        )}
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

const DF = Form.create({ name: "df" })(TableDetail);

export default connect(
  state => state.tableDetail,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DF);
