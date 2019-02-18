import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Menu,Icon } from 'antd';

class NavBar extends Component {
  state = {
    current: 'polls'
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Row type="flex" justify="end" align="middle" className="nav">
        <Col span={18} itemType="flex">
          <h2 className="nav__title">Quick Poll</h2>
        </Col>
        <Col span={6}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="polls">
              
              <NavLink exact to="/"><Icon type="pie-chart"></Icon> Polls</NavLink>
            </Menu.Item>
            <Menu.Item key="create">
              <NavLink exact to="/create"><Icon type="plus"></Icon> Create Poll</NavLink>
            </Menu.Item>
            <Menu.Item key="update">
              <NavLink exact to="/update">Update Poll</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    );
  }
}

export default NavBar;
