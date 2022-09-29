import {observer} from "mobx-react-lite";
import {Select, Tag} from "antd";
import {useEffect, useState} from "react";

const ZoneSelectField = ({form,name, initValue}) => {
    const [value, setValue] = useState(initValue)
    useEffect(() => {
        setValue(initValue)
    }, [initValue])
    const options = [
        {
            value: '1',
        },
        {
            value: '2',
        },
        {
            value: '3',
        },
        {
            value: '4',
        },
        {
            value: '5',
        },
        {
            value: '6',
        },
        {
            value: '7',
        },
        {
            value: '8',
        },
        {
            value: '9',
        },
        {
            value: '10',
        },
        {
            value: '11',
        },
        {
            value: '12',
        },
    ];
    const onChange = (value) => {
        setValue(value)
        form.setFieldsValue({ [name]: value });
    }
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={"#00573A"}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };


    return (  <Select
        mode="multiple"
        showArrow
        onChange={onChange}
        tagRender={tagRender}
        style={{
            width: '100%',
        }}
        value={value}
        options={options}
    />)
}
export default observer(ZoneSelectField)