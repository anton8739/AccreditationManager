import {observer} from "mobx-react-lite";
import {Button, Form, Input, Select, Spin, DatePicker} from "antd";

import {useEffect, useState} from "react";
import {Preview, print} from 'react-html2pdf';
import {useHistory, useParams} from "react-router-dom";
import {RouteNames} from "utils/routes";
import {notifier} from "utils/notifier";
import './SingleAccreditation.scss'
import SingleAccreditationFormHeader
    from "pages/SingleAccreditation/SingleAccreditationFormHeader/SingleAccreditationFormHeader";
import {useAccreditationStore, useAppStore, useCardStore, useRoleStore, useTournamentsStore} from "stores";
import IconUploadField from "components/ui/IconUploadField/IconUploadField";
import RoleSelectField from "components/ui/RoleSelectField/RoleSelectField";
import {downloadPdf, getImageUrl, printPdf} from "utils/formaters";
import emptyImage from 'asserts/images/emptyImage.png'
import moment from "moment";

const {RangePicker} = DatePicker;
const SingleAccreditation = () => {
    const [form] = Form.useForm();
    const {roles} = useRoleStore();
    const [downloading, setDownLoading] = useState(false)
    const [printing, setPrinting] = useState(false)
    const [loading, setLoading] = useState();
    const history = useHistory();
    const {id} = useParams();
    const {loadSingleAccreditation, activeAccreditation, updateAccreditation} = useAccreditationStore()
    const {loadRolesList} = useRoleStore()
    const {activeTournament, loadSingleTournament} = useTournamentsStore();
    const {currentTournament, loadStatistics} = useAppStore()
    const [currnetName, setCurrentName] = useState();
    const [currnetRole, setCurrentRole] = useState(activeAccreditation && activeAccreditation.role_id);
    const [imageUrl, setImageUrl] = useState(activeAccreditation && activeAccreditation.photo && getImageUrl(activeAccreditation.photo));
    useEffect(() => {
        setCurrentName(activeAccreditation && activeAccreditation.name)
        setCurrentRole(activeAccreditation && activeAccreditation.role_id)
        setImageUrl(activeAccreditation && activeAccreditation.photo && getImageUrl(activeAccreditation.photo))
    }, [activeAccreditation])
    const activeCard = activeTournament?.cards && activeTournament.cards.find(card => card.role_id === currnetRole)
    const selectedRole = roles.find(item => item.id === currnetRole);
    const currentRoleColor = selectedRole && `rgb(${selectedRole.color})`
    const initPosition = (activeCard?.positions && JSON.parse(activeCard?.positions)) || {x: 15, y: 140}
    const onFinish = async (values) => {
        try {
            const values = await form.validateFields();
            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('gender', values.gender);
            formData.append('role_id', values.role_id);
            formData.append('status', values.status);
            formData.append('days[0]', new Date(values.date[0]).toISOString());
            formData.append('days[1]', new Date(values.date[1]).toISOString());
            if (!values.photo.toString().includes('/storage')) {
                formData.append('photo', values.photo);
            }
            await updateAccreditation(formData, activeAccreditation.id)
            form.resetFields();
        } catch (err) {
            notifier({description: 'Что-то не так', type: 'error'});
        }
        history.push(RouteNames.ACCREDITATION)
    }
    const onFinishFailed = (errorInfo) => {
        notifier({description: "Что-то не так", type: 'error'});
    };
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadSingleAccreditation(id)
            await loadRolesList()
            await loadSingleTournament(currentTournament.id)
            setLoading(false)
        }
        if (currentTournament) {
            initPage()
        }
    }, [currentTournament])

    useEffect(() => {

        if (activeAccreditation && activeAccreditation.days) {
            const initStart = moment(activeAccreditation.days[0]);
            const initEnd = moment(activeAccreditation.days[1]);
            form.setFieldsValue({
                name: activeAccreditation.name,
                email: activeAccreditation.email,
                gender: activeAccreditation.gender,
                role_id: activeAccreditation.role_id,
                photo: activeAccreditation.photo,
                date: [initStart, initEnd],
                status: activeAccreditation.status
            })
        }
    }, [activeAccreditation])
    const downloadPdfFile = async () => {
        setDownLoading(true)
        await downloadPdf('pdfDownload')
        setDownLoading(false)
    }
    const printingFile = async () => {
        setPrinting(true)
        await printPdf('pdfDownload')
        setPrinting(false)
    }
    const status = [{
        value: 0,
        label: "Аккредитован"
    },
        {
            value: 1,
            label: "Не аккредитован"
        },
        {
            value: 2,
            label: "Верификация"
        }]
    return (<div className="single-accreditation-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <Form
                name="basic"
                form={form}
                className="single-accreditation-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <SingleAccreditationFormHeader/>
                <div className="single-accreditation-form-body">
                    <div className="form-body-content">
                        <div className="section">
                            <div className="section-title">
                                Контакт
                            </div>
                            <div className="section-body">
                                <div className="single-accreditation-form-main">
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
                                        <IconUploadField form={form}
                                                         maxWidth={80}
                                                         maxHeight={100}
                                                         minWidth={20}
                                                         minHeight={25}
                                                         aspectRatio={80 / 100}
                                                         name="photo"
                                                         imageUrl={imageUrl}
                                                         setImageUrl={setImageUrl}
                                        />
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
                                        <Input onChange={(e) => {
                                            setCurrentName(e.target.value)
                                        }}/>
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
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-title">
                                Статус аккредитации
                            </div>
                            <div className="section-body">
                                <Form.Item
                                    label="Статус"
                                    name="status"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста Выберете статус',
                                        },
                                    ]}
                                >
                                    <Select
                                        showArrow
                                        style={{
                                            width: '100%',
                                        }}
                                        options={status}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-title">
                                Дни аккредитации
                            </div>
                            <div className="section-body">
                                <Form.Item
                                    label="Дни аккредитации"
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста даты проведения',
                                        },
                                    ]}
                                >
                                    <RangePicker/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-title">
                                Роль
                            </div>
                            <div className="section-body">
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
                                    <RoleSelectField form={form} name="role_id" setValue={setCurrentRole}
                                                     value={currnetRole}/>
                                </Form.Item>
                            </div>
                        </div>

                    </div>
                    <div className="form-card-preview">
                        <div className="form-card-preview-title">
                            Превью бэйджика
                        </div>

                        <div className="card-preview" id="pdfDownload">
                            <img src={activeCard?.image ? getImageUrl(activeCard?.image) : emptyImage} alt="empty"/>
                            <div className="foto-layout" style={{top: initPosition.y, left: initPosition.x}}>
                                <img src={imageUrl} alt="img"/>
                            </div>
                            <div className="role-layout" style={{background: currentRoleColor}}>
                                <div className="name">
                                    {currnetName}
                                </div>
                                <div className="role">
                                    {selectedRole?.name}
                                </div>
                                <div className="zones">
                                    {selectedRole?.zones.map(zone => <div>{zone}</div>)}
                                </div>
                            </div>
                        </div>
                        <Button loading={printing} className="print-btn" onClick={printingFile}>
                            <span className="icon-ic_print"/>
                            <div>Печать</div>
                        </Button>
                        <Button loading={downloading} className="create-btn" onClick={downloadPdfFile}>
                            <span className="icon-ic_save"/>
                            <div>Сохранить</div>
                        </Button>
                    </div>
                </div>
            </Form>
        </>}
    </div>)
}
export default observer(SingleAccreditation)