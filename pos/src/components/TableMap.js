import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/TableMap";
import { List } from "antd";

const data = [
  {
    title: "Title 1"
  },
  {
    title: "Title 2"
  },
  {
    title: "Title 3"
  },
  {
    title: "Title 4"
  },
  {
    title: "Title 5"
  },
  {
    title: "Title 6"
  }
];

class TableMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.requestTableAreas();
  }

  render() {
    const { tableAreas, isLoading } = this.props;
    console.log(tableAreas);
    return (
      <div>
        <h2>Room</h2>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            {tableAreas &&
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
                        <div className={`square`}>{item.tableCode}</div>
                      </List.Item>
                    )}
                  />
                </div>
              ))}
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
