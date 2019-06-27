import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DetailEmpty";
import {
  Icon,
  Badge,
  Row,
  Col,
  Input,
  Button,
  Table,
  Form,
  Select,
  Modal
} from "antd";

const { TextArea, Search } = Input;

class DetailEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPeriod: [],
      activeTime: "",
      userDefineDef: [],
      statistic: [],
      statisticSelected: [],
      clientModalVisible: false,
      currentClient: "",
      joinModalVisible: false
    };
  }

  async componentWillMount() {
    console.log(this.props.match.params.tableCode);
    const mealPeriod = await this.props.getMealPeriod();
    const userDefineDef = await this.props.getUserDefineDef();
    const statistic = await this.props.getStatistic(userDefineDef.length);
    // console.log(statistic);
    await this.setTimeMeal(mealPeriod);
    await this.setStatistic(statistic);

    this.setState({
      mealPeriod,
      userDefineDef,
      statistic
    });
  }

  setTimeMeal = async mealPeriod => {
    const today = new Date();
    var hours = today.getHours().toString();
    var minutes = today.getMinutes().toString();
    if ((minutes + "").length === 1) {
      minutes = "0" + minutes;
    }
    const time = parseInt(hours + minutes);
    console.log(time);
    var activeTime = "";
    mealPeriod.forEach(item => {
      if (time >= item.fromTime && time <= item.toTime) {
        activeTime = item.mealNo;
      }
    });
    await this.setState({
      activeTime
    });
    // console.log(res);
  };

  setStatistic = async statistic => {
    var statisticSelected = [];
    for (var i = 0; i < statistic.length; i++) {
      const a = statistic[i][0];
      statisticSelected.push(a);
    }
    await this.setState({
      statisticSelected
    });
  };

  setClientInfo = client => {
    const currentClient = client.clientFolioNum + " - " + client.sClientName;
    this.setState({
      currentClient,
      clientModalVisible: false
    });
  };

  showClientModal = () => {
    this.setState({
      clientModalVisible: true
    });
  };

  handleOkClient = e => {
    console.log(e);
    this.setState({
      clientModalVisible: false
    });
  };

  handleCancelClient = e => {
    console.log(e);
    this.setState({
      clientModalVisible: false
    });
  };

  showJoinModal = () => {
    this.props.requestTables();
    this.setState({
      joinModalVisible: true
    });
  };

  handleOkJoin = e => {
    console.log(e);
    this.setState({
      joinModalVisible: false
    });
  };

  handleCancelJoin = e => {
    console.log(e);
    this.setState({
      joinModalVisible: false
    });
  };

  render() {
    // const { isLoading, notiCashier } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const {
      mealPeriod,
      activeTime,
      userDefineDef,
      statistic,
      statisticSelected,
      currentClient
    } = this.state;
    const { clientList } = this.props;

    const columns = [
      {
        title: "Code",
        dataIndex: "clientFolioNum",
        key: "clientFolioNum",
        render: (text, row, index) => {
          return (
            <Button onClick={() => this.setClientInfo(row)} type="link">
              {text}
            </Button>
          );
        }
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Client Name",
        dataIndex: "sClientName",
        key: "sClientName"
      },
      {
        title: "Type",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Phone Number",
        dataIndex: "tel1",
        key: "tel1"
      },
      {
        title: "Address",
        dataIndex: "districtCommunices",
        key: "districtCommunices"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "districtCommunices"
      }
    ];

    // console.log(statisticSelected);
    return (
      <div className="detail-page">
        <div className="actions-header">
          <Button className="cancel-btn" size="large" icon="stop" />
          <Button
            size="large"
            style={{ float: "right" }}
            className="check-btn"
            icon="check"
          />
        </div>
        <div className="de-menus">
          {mealPeriod &&
            mealPeriod.map(item => (
              <Button
                size="large"
                type="primary"
                className={activeTime === item.mealNo && "active"}
                onClick={() => this.setState({ activeTime: item.mealNo })}
              >
                {item.mealName}
              </Button>
            ))}
        </div>
        <div className="de-info">
          <Row gutter={16}>
            <Col span={8}>
              <div className="left">
                <div className="header">
                  <Icon className="icon" type="info-circle" />
                  Table Information
                </div>
                <div className="body">
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Table">
                      {getFieldDecorator("email", {
                        initialValue: "T1"
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Room">
                      {getFieldDecorator("email", {
                        initialValue: ""
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Adult">
                      {getFieldDecorator("email", {
                        initialValue: "1"
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Child">
                      {getFieldDecorator("email", {
                        initialValue: "0"
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Notes">
                      {getFieldDecorator("email", {
                        initialValue: ""
                      })(<TextArea />)}
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
            <Col span={16} className="sts">
              <div className="header">
                <Icon className="icon" type="pie-chart" />
                Statistics
              </div>
              <div className="body">
                {userDefineDef &&
                  userDefineDef.map((item, i) => (
                    <div className="sts-s">
                      <Row>
                        <Col span={4}>
                          <span className="sts-t">{item.content}</span>
                        </Col>
                        <Col span={20}>
                          <Select
                            defaultValue={statisticSelected[i].stsName}
                            style={{ width: 120 }}
                            className="sts-v"
                            // onChange={handleChange}
                          >
                            {statistic[i].map(stsItem => (
                              <Select.Option value={stsItem.stsName}>
                                {stsItem.stsName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <div className="left">
                <div className="header">
                  <Icon className="icon" type="user" />
                  Client Information
                </div>
                <div className="body" style={{ textAlign: "center" }}>
                  {currentClient && <p>{currentClient}</p>}
                  <Button
                    onClick={this.showClientModal}
                    type="primary"
                    icon="search"
                    ghost
                  >
                    Select Client
                  </Button>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <div className="header">
                <Icon className="icon" type="vertical-align-middle" />
                Table Join
              </div>
              <div className="body">
                <div style={{ textAlign: "center" }}>
                  <Button onClick={this.showJoinModal} type="primary" ghost>
                    Join Tables
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          className="client-modal"
          title="Search Client Information"
          visible={this.state.clientModalVisible}
          onOk={this.handleOkClient}
          onCancel={this.handleCancelClient}
        >
          <Search
            placeholder="input search text"
            onSearch={value => this.props.requestClientList(value)}
            enterButton
            style={{ marginBottom: "1em" }}
          />
          <Table dataSource={clientList} columns={columns} />
        </Modal>
        <Modal
          className="join-modal"
          title="Join Tables"
          visible={this.state.joinModalVisible}
          onOk={this.handleOkJoin}
          onCancel={this.handleCancelJoin}
        >
          asd
        </Modal>
      </div>
    );
  }
}

const DE_FORM = Form.create({ name: "de" })(DetailEmpty);

export default connect(
  state => state.detailEmpty,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DE_FORM);
