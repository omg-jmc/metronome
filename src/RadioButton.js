import React from 'react';
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

//TODO: props
// type Props = {
//     children: ReactNode,
//     onChange: any,
//     checked: boolean,
//     id: string,
//     value: string,
//     name?: string
// }

export default RadioButton;
