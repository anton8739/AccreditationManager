import {observer} from "mobx-react-lite";
import {Form, Modal} from "antd";
import {notifier} from "utils/notifier";
import RoleForm from "pages/Roles/RoleModal/RoleForm/RoleForm";
import {useRoleStore} from "stores";
import moment from "moment";


const RoleModal = ({open, onOk, onCancel, editItem}) => {
    const [form] = Form.useForm();
    const {createRole,updateRole} = useRoleStore()
    const onFinish = (values) => {
        if (editItem) {
            updateRole(values, editItem.id)
        } else {
            createRole(values)
        }
        onCancel()
    }
    if(editItem) {
        form.setFieldsValue({
            "name": editItem.name,
            "color": editItem.color,
            "zones": [...editItem.zones]
        })
    } else  {
        form.setFieldsValue({
            "name": undefined,
            "color": undefined,
            "zones": []
        })
    }
    const onFinishFailed = (errorInfo) => {
        notifier({description: "Что-то не так", type: 'error'});
    };


    return (<Modal title={"Создать Роль"}
                   open={open}
                   onOk={onOk}
                   onCancel={onCancel}
                   footer={null}
    >
        <RoleForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            editItem={editItem}
        />
    </Modal>)
}
export default observer(RoleModal)