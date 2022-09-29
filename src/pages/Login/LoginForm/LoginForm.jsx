import {observer} from "mobx-react-lite";
import {Button, Checkbox, Form, Input} from "antd";


const LoginForm = ({onFinish, onFinishFailed}) => {


    return (<Form
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Электронная почта"
            name="email"
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

        <Form.Item
            name="remember"
            valuePropName="checked"
        >
            <Checkbox className="login-checkbox">Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button className="login-btn" htmlType="submit">
                Войти
            </Button>
        </Form.Item>
    </Form>)
}
export default observer(LoginForm)