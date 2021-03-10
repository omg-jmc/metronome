import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.css';


const RadioButton = ({ children, onChange, checked, id, value, name }) => {
    return (
        <React.Fragment>
            <input
                checked={checked}
                id={id}
                type="radio"
                name={name}
                value={value}
                onChange={onChange} />
            <label htmlFor={id}>
                <span className="label-text">{children}</span>
            </label>
        </React.Fragment>
    );
}

RadioButton.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string
}

export default RadioButton;
