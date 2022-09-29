import {observer} from "mobx-react-lite";
import {Form, Modal} from "antd";
import {notifier} from "utils/notifier";
import AccreditationForm from "pages/Accreditation/AccreditationModal/AccreditationForm/AccreditationForm";
import {useAccreditationStore} from "stores";


const AccreditationModal = ({open, setIsModalOpen}) => {
    const {createAccreditation} =useAccreditationStore();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const values = await form.validateFields();
            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('gender', values.gender);
            formData.append('photo', values.photo);
            await createAccreditation(formData)
            form.resetFields();
            handleCancel()
        } catch (err) {
            notifier({ description: 'Что-то не так', type: 'error' });
        }
    }


    const onFinishFailed = (errorInfo) => {
        notifier({description: "Что-то не так", type: 'error'});
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<Modal title={"Новая аккредитация"}
                   open={open}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}
    >
        <AccreditationForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        />
    </Modal>)
}
export default observer(AccreditationModal)