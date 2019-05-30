import React, { Component } from "react";
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

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Room</h2>
        <div>
          <h3>Terrace</h3>
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
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <div className={`square ${item.title === "Title 4" && "pick"}`}>
                  {index + 1}
                  {/* {item.title} */}
                </div>
              </List.Item>
            )}
          />
          <h3 style={{ marginTop: 20 }}>Family</h3>
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
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <div className={`square ${item.title === "Title 2" && "pick"}`}>
                  {index + 1}
                  {/* {item.title} */}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Home;
