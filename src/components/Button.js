import React from 'react';

const Button = ({info, handleClickButtons}) => {
    return (
        <button onClick={() =>handleClickButtons(info)}>{info}</button>
    )
}
export default Button;