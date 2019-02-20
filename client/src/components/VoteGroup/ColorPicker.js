import React, { useEffect, useRef } from 'react'
import { ChromePicker } from 'react-color';
import { Popover } from 'antd';
import PropTypes from 'prop-types';

const ColorPicker = ({ update, color, id }) => {
  const pickerDOM = useRef();

  const preventScroll = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    pickerDOM.current.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      pickerDOM.current.removeEventListener('touchmove', preventScroll, { passive: false });
    }
  }, [pickerDOM])

  return (
    <div className="colorPicker-wrapper" ref={pickerDOM}>
      <ChromePicker
        disableAlpha={true}
        className="colorPicker"
        color={color}
        style={{ width: '80px' }}
        onChange={e => update(e.hex, id, 'color')}
      />
    </div>
  )
}


const ColorPopOver = ({ update, color, id, style }) => {
  return (
    <Popover style={{ padding: 0 }} placement="topLeft" content={
      <ColorPicker update={update} color={color} id={id} />
    } trigger="click">
      <div style={{
        width: '80px',
        height: '20px',
        borderRadius: '3px',
        backgroundColor: color,
        ...style
      }}></div>
    </Popover>
  )
}


ColorPicker.propTypes = {
  update: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

ColorPopOver.propTypes = {
  update: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object
}

export { ColorPicker, ColorPopOver };