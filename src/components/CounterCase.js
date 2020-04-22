import React from 'react';

const CounterCase = ({ bikes }) => {
    return (
        <div className="container-cases-number">
            {bikes && <h6>Cases: {bikes.length}</h6>}
        </div>

    );
}

export default CounterCase;