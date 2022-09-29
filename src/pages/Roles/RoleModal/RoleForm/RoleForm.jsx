import {observer} from "mobx-react-lite";
import {Button, Checkbox, DatePicker, Form, Input} from "antd";

import './RoleForm.scss'
import ColorPickerField from "components/ui/ColorPickerField/ColorPickerField";
import ZoneSelectField from "components/ui/ZoneSelectField/ZoneSelectField";
const RoleForm = ({onFinish, onFinishFailed,form,editItem}) => {


    return (<Form
        name="basic"
        initialValues={{
            remember: true,
        }}
        form={form}
        className="role-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Имя"
            name="name"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста введите имя пользователя',
                },
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            label="Цвет"
            name="color"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста выберите цвет',
                },
            ]}
        >
            <ColorPickerField form={form} name="color" defaultColor={editItem && `rgb(${editItem.color})`}/>
        </Form.Item>

        <Form.Item
            label="Зоны"
            name="zones"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста выберети зоны',
                },
            ]}
        >
            <ZoneSelectField form={form} name="zones" initValue={editItem ? [...editItem.zones] : []}/>
        </Form.Item>
        <Form.Item>
            <Button className="login-btn" htmlType="submit">
                Сохранить
            </Button>
        </Form.Item>
    </Form>)
}
export default observer(RoleForm)