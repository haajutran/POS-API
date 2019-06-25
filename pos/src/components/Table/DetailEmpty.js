import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DetailEmpty";
import { Icon, Badge, Row, Col, Input, Button, Table, Form } from "antd";

const { TextArea } = Input;

class DetailEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPeriod: [],
      activeTime: ""
    };
  }

  async componentWillMount() {
    const mealPeriod = await this.props.getMealPeriod();
    await this.setTimeMeal(mealPeriod);
    console.log(mealPeriod);
    this.setState({
      mealPeriod
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
    const { mealPeriod, activeTime } = this.state;
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
            <Col span={16}>
              <div className="header">
                <Icon className="icon" type="pie-chart" />
                Statistics
              </div>
              <div className="body">s</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <div className="left">
                <div className="header">
                  <Icon className="icon" type="user" />
                  Client Information
                  <Button icon="select" />
                </div>
                <div className="body">{/* s */}</div>
              </div>
            </Col>
            <Col span={16}>
              <div className="header">
                <Icon className="icon" type="vertical-align-middle" />
                Table Join()
              </div>
              <div className="body">{/* s */}</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const DE_FORM = Form.create({ name: "de" })(DetailEmpty);

export default connect(
  state => state.detailEmpty,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DE_FORM);
