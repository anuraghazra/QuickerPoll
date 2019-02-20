import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'antd';
import PropTypes from 'prop-types';

const MenuItems = ({ mobile, handleClick, currentSelected, onLinkClick }) => {
  return (
    <Menu
      mode={mobile ? 'vertical' : 'horizontal'}
      onClick={handleClick}
      selectedKeys={[currentSelected]}
    >
      <Menu.Item key="polls">
        <NavLink onClick={onLinkClick} exact to="/"><Icon type="pie-chart"></Icon> Polls</NavLink>
      </Menu.Item>
      <Menu.Item key="create">
        <NavLink onClick={onLinkClick} exact to="/create"><Icon type="plus"></Icon> Create Poll</NavLink>
      </Menu.Item>
      <Menu.Item key="about">
        <NavLink onClick={onLinkClick} exact to="/about"><Icon type="info"></Icon> About</NavLink>
      </Menu.Item>
    </Menu>
  )
}

MenuItems.propTypes = {
  mobile: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentSelected: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func
}

export default MenuItems;