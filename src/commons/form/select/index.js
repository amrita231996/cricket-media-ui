import { Dropdown, Select, SelectItem } from "carbon-components-react";

import './index.scss';

const CricketMediaSelect = (props) => {

    const { 
        options = [],
        name,
        titleText,
        label,
        onChange
    } = props;

    return <div className="form-element select">
        <Select
            id={name}
            className="select-container"
            text={label}
            name={name}
            labelText={titleText}
            onChange={onChange}
        >
            <SelectItem value='' text={label} /> 
            { options.map( (option, index) => {

                const { id, label } = option;

                return <SelectItem key={index} value={id} text={label} />
            } ) }
        </Select>
    </div>
}

export default CricketMediaSelect;