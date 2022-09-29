import {observer} from "mobx-react-lite";

import {useEffect, useState} from "react";
import Input from "antd/es/input/Input";
import {Swatches} from "react-color/lib/components/swatches/Swatches";
import './ColorPickerField.scss'
const ColorPickerField = ({ form, name,defaultColor }) => {
    const [state, setState] = useState({
        color: defaultColor || '#FFFFFF',
    });
    useEffect(() => {
        setState({color:defaultColor})
    }, [defaultColor])
    const handleChange = (color) => {
        form.setFieldsValue({ [name]: color.hex });
        setState({ ...state, color: color.hex });
    };

    return (
        <div className="color-picker-field">
            <div className="color-preview" style={{width : "50px", height : "50px", background: state.color}}>
            </div>
            <Swatches color={state.color} onChange={handleChange} source="rgb"/>
            <Input hidden value={state.color}/>
        </div>
    );
};
export default observer(ColorPickerField);