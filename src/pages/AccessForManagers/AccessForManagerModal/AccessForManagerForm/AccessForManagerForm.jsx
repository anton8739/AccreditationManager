import {observer} from "mobx-react-lite";
import {Button, Checkbox, DatePicker, Form, Input} from "antd";

import './AccessForManagerForm.scss'

const AccessForManagerForm = ({onFinish, onFinishFailed,form, editItem}) => {


    return (<Form
        name="basic"
        initialValues={{
            remember: true,
        }}
        form={form}
        className="access-for-manager-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="ФИО"
            name="username"
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
            label="Срок действия до"
            name="date"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста введите срок действия',
                },
            ]}
        >
            <DatePicker/>
        </Form.Item>

        <Form.Item
            label="Электронная почта"
            name="email"
            rules={[
                {
                    required: true,
                    type: "email",
                    message: 'Пожалуйста введите почту',
                },
            ]}
        >
            <Input/>
        </Form.Item>
        {!editItem && <Form.Item
            label="Пароль"
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста введите пароль',
                },
            ]}
        >
            <Input.Password/>
        </Form.Item>
        }

        <Form.Item>
            <Button className="login-btn" htmlType="submit">
                Сохранить
            </Button>
        </Form.Item>
    </Form>)
}
export default observer(AccessForManagerForm)