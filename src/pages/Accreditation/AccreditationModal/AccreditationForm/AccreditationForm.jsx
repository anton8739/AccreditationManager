import {observer} from "mobx-react-lite";
import {Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import './AccreditationForm.scss'
import IconUploadField from "components/ui/IconUploadField/IconUploadField";
import {useEffect, useState} from "react";
import {getImageUrl} from "utils/formaters";

const AccreditationForm = ({form, onFinish, onFinishFailed}) => {
    const [imageUrl, setImageUrl] = useState(undefined);

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
            label="Загрузить фото"
            name="photo"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста выберите изображение',
                },
            ]}
        >
            <IconUploadField
                maxWidth={80}
                maxHeight={100}
                minWidth={20}
                minHeight={25}
                aspectRatio={80 / 100}
                form={form}  name="photo" imageUrl={imageUrl} setImageUrl={setImageUrl}/>
        </Form.Item>
        <Form.Item
            label="ФИО"
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
            label="Электронная почта"
            name="email"
            rules={[
                {
                    required: true,
                    type: "email",
                    message: 'Пожалуйста введите корректный email',
                },
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            label="Пол"
            name="gender"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста выберите пол',
                },
            ]}
        >
            <Select>
                <Select.Option value={1}>
                    Мужской
                </Select.Option>
                <Select.Option value={0}>
                    Женский
                </Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>

            <Button className="login-btn" htmlType="submit">
                Сохранить
            </Button>
        </Form.Item>
    </Form>)
}
export default observer(AccreditationForm)