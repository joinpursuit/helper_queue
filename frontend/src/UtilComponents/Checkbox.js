import React from 'react'

export default ({classStyle, labelText, checked, handleChange, value}) => {
    return (
      <label className={classStyle}>
        {labelText}
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          value={value}
        />
      </label>
    );
}
