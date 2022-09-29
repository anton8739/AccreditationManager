import {observer} from "mobx-react-lite";
import {Form, Modal} from "antd";
import {notifier} from "utils/notifier";
import RoleForm from "pages/Roles/RoleModal/RoleForm/RoleForm";
import {useCardStore, useRoleStore} from "stores";
import moment from "moment";
import CardForm from "pages/SingleTournament/CardModal/CardForm/CardForm";
import {useEffect, useRef, useState} from "react";


const CardModal = ({open, onOk, onCancel, editItem}) => {
    const [form] = Form.useForm();
    const {createCard,updateCard} = useCardStore();
    let initPosition = (editItem && JSON.parse(editItem.positions)) || {x : 15, y : 140};
    const [photoPosition, setPhotoPosition] = useState({x : 0, y : 0})
    const closeFunction = () => {

        setPhotoPosition({x : 0, y : 0})
        onCancel()
    }
    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            let formData = new FormData();

            formData.append('role_id', values.role_id);

            const resultPosition = {
                x : initPosition.x + photoPosition.x,
                y : initPosition.y + photoPosition.y
            }
            formData.append('positions', JSON.stringify(resultPosition))
            if(editItem) {
                if( !values.image.toString().includes('/storage') ) {
                    console.log(values.image)
                    formData.append('image', values.image);
                }
                await updateCard(formData,editItem.id)
            } else {
                formData.append('image', values.image);
                await createCard(formData)
            }
            form.resetFields();
            closeFunction()
        } catch (err) {
            console.log(err)
            notifier({description: 'Что-то не так', type: 'error'});
        }
    }

    useEffect(() => {
        if (editItem) {
            initPosition = JSON.parse(editItem.positions)
            form.setFieldsValue({
                "image": editItem.image,
                "role_id": editItem.role_id,
            })
        } else {
            form.setFieldsValue({
                "image": undefined,
                "role_id": undefined,
            })
        }
    }, [editItem])
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        notifier({description: "Что-то не так", type: 'error'});
    };


    return (<Modal title={"Создать Карточку"}
                   open={open}
                   onOk={onOk}
                   onCancel={closeFunction}
                   footer={null}
    >
        <CardForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            editItem={editItem}
            photoPosition={photoPosition}
            setPhotoPosition ={setPhotoPosition}
            initPosition={initPosition}
        />
    </Modal>)
}
export default observer(CardModal)