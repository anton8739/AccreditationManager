import {observer} from "mobx-react-lite";
import {Form, Modal, Spin} from "antd";
import {notifier} from "utils/notifier";
import AccessForManagerForm
    from "pages/AccessForManagers/AccessForManagerModal/AccessForManagerForm/AccessForManagerForm";
import {useManagerStore} from "stores";
import {useEffect, useState} from "react";
import moment from "moment";

const AccessForManagerModal = ({open, onOk, onCancel, editItem}) => {
    const {createManagerAccess, updateManagerAccess} = useManagerStore();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        if (editItem) {
            updateManagerAccess(values,editItem.id)
        } else {
            createManagerAccess(values)
        }
        onCancel()
    }
    const onFinishFailed = (errorInfo) => {
        notifier({description: "Неверный логин или пароль", type: 'error'});
    };
    if(editItem) {
        form.setFieldsValue({
            username: editItem.name,
            date: moment(editItem.access_end),
            email: editItem.email
        })
    } else  {
        form.setFieldsValue({
            username: undefined,
            date:  undefined,
            email:  undefined,
            password : undefined
        })
    }
    return (<Modal title={"Создать доступ"}
                   open={open}
                   onOk={onOk}
                   onCancel={onCancel}
                   footer={null}
    >
        <AccessForManagerForm onFinish={onFinish} onFinishFailed={onFinishFailed} editItem={editItem} form={form}/>
    </Modal>)
}
export default observer(AccessForManagerModal)