import {observer} from "mobx-react-lite";
import {Button, Checkbox, DatePicker, Form, Input} from "antd";

import 'pages/SingleTournament/CardModal/CardForm/CardForm.scss'
import IconUploadField from "components/ui/IconUploadField/IconUploadField";
import RoleSelectField from "components/ui/RoleSelectField/RoleSelectField";
import {useEffect, useRef, useState} from "react";
import {useRoleStore} from "stores";
import {getImageUrl} from "utils/formaters";
import Draggable from "react-draggable";

const CardForm = ({onFinish, onFinishFailed, form, editItem,setPhotoPosition,photoPosition,initPosition = {x:15, y: 140}}) => {
    const {roles} = useRoleStore();

    const [imageUrl, setImageUrl] = useState(editItem && editItem.image);
    useEffect(() => {
        setImageUrl(editItem && editItem.image)
    }, [editItem])
    const [role, setRole] = useState(editItem && editItem.role_id)
    useEffect(() => {
        setRole(editItem && editItem.role_id)
    }, [editItem])
    const currentRole = roles.find(item => item.id === role);
    const currentRoleColor = currentRole && `rgb(${currentRole.color})`
    const onDragStart = () => {
    }
    const onDragStop = () => {

    }
    const   handleDrag = (e, ui) => {
        const {x, y} = photoPosition;
        setPhotoPosition({
                x: x + ui.deltaX,
                y: y + ui.deltaY,
        });
    };

    const bounds = {top: 0 - initPosition.y, left: 0-initPosition.x, right: 120-initPosition.x, bottom: 150-initPosition.y}
    const dragHandlers = {onStart: onDragStart, onStop: onDragStop};
    return (<Form
        name="basic"
        initialValues={{
            remember: true,
        }}
        form={form}
        className="card-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Изображение карточки"
            name="image"
            className="image-field-wp"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста загрузите изображение карточки',
                },
            ]}
        >
            <IconUploadField
                form={form}
                name="image"
                maxWidth={200}
                maxHeight={300}
                minWidth={20}
                minHeight={30}
                aspectRatio={200 / 300}
                imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                <Draggable {...dragHandlers} onDrag={handleDrag} bounds={bounds} position={photoPosition}>
                    <div className="foto-layout" style={{top : initPosition.y, left: initPosition.x}}>
                        <span className="icon-ic_contact"/>
                    </div>
                </Draggable>
            <div className="role-layout" style={{background: currentRoleColor ? currentRoleColor : "gray"}}>
                <div className="name">
                    Name LastName
                </div>
                <div className="role">
                    {currentRole ? currentRole.name : "role"}
                </div>
                <div className="zones">
                    {currentRole?.zones.map(zone => <div>{zone}</div>)}
                </div>
            </div>
        </Form.Item>
        <Form.Item
            label="Роль"
            name="role_id"
            rules={[
                {
                    required: true,
                    message: 'Пожалуйста выберите роль',
                },
            ]}
        >
            <RoleSelectField form={form} name="role_id" value={role} setValue={setRole}/>
        </Form.Item>
        <Form.Item>
            <Button className="login-btn" htmlType="submit">
                Сохранить
            </Button>
        </Form.Item>
    </Form>)
}
export default observer(CardForm)