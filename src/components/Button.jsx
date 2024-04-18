import "./Button.css";

import React from 'react'

const Button = ({text, type, onClick}) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>{text}</button>
)};

export default Button;
