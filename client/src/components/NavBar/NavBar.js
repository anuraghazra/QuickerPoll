import React, { useState, useEffect } from 'react';
import { Row, Col, Popover } from 'antd';
import MenuItems from './MenuItems';
import styled from 'styled-components';

const Hamburger = styled.i`
  display: block;
  position: relative; 
  z-index: 1000;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  width: 50px;
  height: 50px;

  &:before {
    background: #777;
    border-radius: 2px;
    box-shadow: 0 8px 0 0 #777, 0 16px 0 0 #777;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 24px;
    top: 18px;
    right: 13px;
  }
`

const NavBar = () => {
  const [current, setCurrent] = useState('polls');
  const [screen, setScreen] = useState(768);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    saveViewportDimensions();
    window.addEventListener('resize', saveViewportDimensions);

    return () => { window.removeEventListener('resize', saveViewportDimensions) };
  })

  const saveViewportDimensions = () => {
    setScreen(window.innerWidth);
  }

  const handleClick = (e) => {
    setCurrent(e.key);
  }
  const handleMenuVisibility = (menuVisible) => {
    setMenuVisible(menuVisible)
  };
  return (
    <Row type="flex" justify="end" align="middle" className="nav">
      <Col xs={18} lg={16} itemType="flex">
        <h2 className="nav__title">Quicker Poll</h2>
      </Col>
      <Col xs={6} lg={8}>
        {
          (screen < 768) ?
            <Popover
              content={
                <MenuItems
                  mobile={true}
                  handleClick={handleClick}
                  currentSelected={current}
                  onLinkClick={() => handleMenuVisibility(false)}
                />
              }
              trigger='click'
              visible={menuVisible}
              onVisibleChange={handleMenuVisibility}
            >
              <Hamburger />
            </Popover>
            :
            <MenuItems
              mobile={false}
              handleClick={handleClick}
              currentSelected={current}
            />
        }
      </Col>
    </Row>
  );
}

export default NavBar;
