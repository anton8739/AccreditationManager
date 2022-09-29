import {observer} from "mobx-react-lite";
import {Select, Tag} from "antd";
import {useEffect, useState} from "react";
import {useRoleStore} from "stores";
import './RoleSelectField.scss'
const RoleSelectField = ({form, name, setValue, value}) => {
    const {roles} = useRoleStore();
    const options = roles.filter(role => role.favorite ===1).map(item => {
            return {
                value: item.id,
                label: <div className="role-select-field-label">
                    <div className="color" style={{background : `rgb(${item.color})`}}/>
                    <div className="name"> {item.name}</div>
                </div>,
            }
        });

    const onChange = (value) => {
        setValue(value)
        form.setFieldsValue({[name]: value});
    }

    return (<Select
        showArrow
        onChange={onChange}
        style={{
            width: '100%',
        }}
        value={value}
        options={options}
    />)
}
export default observer(RoleSelectField)