import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/TableMap";
import { List } from "antd";

class TableMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.requestTableTypes();
    this.props.requestTableAreas();
  }

  getImage(item) {
    const { tableTypes } = this.props;
    return tableTypes.find(i => i.tableType1 === item.tableType).imageNull;
  }

  render() {
    const { tableAreas, tableTypes, isLoading } = this.props;
    console.log(tableTypes);
    return (
      <div>
        <h2>Table Map</h2>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            {tableTypes && tableAreas.length > 0 ? (
              tableAreas.map(ta => (
                <div>
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
                    renderItem={(item, index) => (
                      <List.Item>
                        {item.checkNo !== "0" ? (
                          <div>
                            <img
                              style={{ width: "100%" }}
                              src={
                                "data:image/png;base64, " +
                                tableTypes.find(
                                  i => i.tableType1 === item.tableType
                                ).imagePickup
                              }
                              alt="img"
                            />

                            <div className="centered">
                              <p className="table-info">
                                <span>{item.tableCode}</span>|
                                <span>
                                  {item.tGuest}/{item.tChild}
                                </span>
                                |<span>({item.tSubtable})</span>
                              </p>
                              <p>{item.amount}</p>
                              <p>{item.openTime}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <img
                              style={{ width: "100%" }}
                              src={
                                "data:image/png;base64, " + this.getImage(item)
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
                        )}
                      </List.Item>
                    )}
                  />
                </div>
              ))
            ) : (
              <h3>Empty</h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => state.tableMap,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(TableMap);
