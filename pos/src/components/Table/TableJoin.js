import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TableMap";
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
  Modal,
  List
} from "antd";

const { TextArea, Search } = Input;

class TableJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableAreas: []
    };
  }

  async componentWillMount() {
    await this.props.requestTableTypes();
    await this.props.requestTableAreas();
    this.setState({
      tableAreas: this.props.tableAreas
    });
  }

  getImageNull(item) {
    const { tableTypes } = this.props;
    return tableTypes.find(i => i.tableType1 === item.tableType).imageNull;
  }
  getImagePickup(tableType) {
    const { tableTypes } = this.props;
    return tableTypes.find(i => i.tableType1 === tableType).imagePickup;
  }
  async checkTableHold(checkNo) {
    const res = await this.props.checkTableHold(checkNo);
    return res;
  }

  renderTablePickup(item) {
    // const aaa = this.checkTableHold(item.checkNo)

    return (
      <div>
        <img
          style={{ width: "100%" }}
          src={"data:image/png;base64, " + this.getImagePickup(item.tableType)}
          alt="img"
        />

        <div className="centered">
          <p>
            {item.tableCode}
            {item.tableJoin}
          </p>
          <p className="table-info">
            <span>
              {item.tGuest}/{item.tChild}
            </span>
            |<span>({item.tSubtable})</span>
          </p>
          <p>{item.amount}</p>
          <p>{item.openTime}</p>
          <p
            className={`status ${
              item.lastChgTime <= 45
                ? "success"
                : item.lastChgTime <= 80
                ? "warning"
                : "danger"
            }`}
          />

          {item.tableHold > 0 && (
            <Icon type="pause-circle" className={`holding`} />
          )}
        </div>
      </div>
    );
  }

  join = (tIndex, taIndex) => {
    const { tableAreas } = this.state;
    var table = tableAreas[tIndex].tableMaps[taIndex];

    table["join"] = !table["join"];
    this.setState({
      tableAreas
    });
  };

  render() {
    // console.log(statisticSelected);
    const { tableTypes, isLoading } = this.props;
    const { tableAreas } = this.props;
    var displayed = [];
    return (
      <div>
        {tableTypes && tableAreas.length > 0 ? (
          tableAreas.map((ta, taIndex) => (
            <div className="table-map-grid">
              <h3>{ta.tableAreaName}</h3>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3
                }}
                dataSource={ta.tableMaps}
                renderItem={(item, tIndex) =>
                  item.bkTbl === "0" && (
                    <List.Item onClick={() => this.join(taIndex, tIndex)}>
                      <div className={item.join === true && "table-join"}>
                        <img
                          style={{ width: "100%" }}
                          src={
                            "data:image/png;base64, " + this.getImageNull(item)
                            // tableTypes.find(
                            //   i => i.tableType1 === item.tableType
                            // ).imageNull
                          }
                          alt="img"
                        />

                        <div className="centered">
                          <p className="table-info">
                            <span>{item.tableCode}</span>
                          </p>
                        </div>
                      </div>
                    </List.Item>
                  )
                }
              />
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
      </div>
    );
  }
}

const TJ = Form.create({ name: "tj" })(TableJoin);

export default connect(
  state => state.tableMap,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(TJ);
