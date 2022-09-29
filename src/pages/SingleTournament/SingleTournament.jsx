import {observer} from "mobx-react-lite";
import './SingleTournament.scss'
import {Button, Form, Spin} from "antd";

import {useEffect, useState} from "react";

import {notifier} from "utils/notifier";
import SingleTournamentFormHeader from "pages/SingleTournament/SingleTournamentFormHeader/SingleTournamentFormHeader";
import SingleTournamentFormMain from "pages/SingleTournament/SingleTournamentFormMain/SingleTournamentFormMain";
import {useRoleStore, useTournamentsStore} from "stores";
import {RouteNames} from "utils/routes";
import {useHistory, useParams} from "react-router-dom";
import CardModal from "pages/SingleTournament/CardModal/CardModal";
import CardView from "pages/SingleTournament/CardView/CardView";
import moment from "moment";

const SingleTournament = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState();
    const {roles,loadRolesList} = useRoleStore();
    const history = useHistory();
    const [editItem, setEditItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {id} = useParams();
    const {createTournament, loadSingleTournament, activeTournament, setActiveTournament,updateTournament} = useTournamentsStore()
    const onFinish = async (values) => {
        if(activeTournament) {
            await updateTournament(values, activeTournament.id)
        } else {
            await createTournament(values)
        }

        history.push(RouteNames.TOURNAMENTS)
    }


    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        notifier({description: "Что-то не так", type: 'error'});
    };
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadSingleTournament(id)
            await loadRolesList()
            setLoading(false)
        }

        if (id !== "new") {
            initPage()
        }
        return () => {
            setActiveTournament(null)
        }
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setEditItem(null)
        setIsModalOpen(false);
    };

    if(activeTournament) {
        const initStart = moment(activeTournament.start_date);
        const initEnd = moment(activeTournament.end_date);
        form.setFieldsValue({
            "name": activeTournament.name,
            date: [initStart,initEnd ],

        })
    } else  {
        form.setFieldsValue({
            "name": undefined,
            date: undefined,
        })
    }
    return (<div className="single-tournament-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <Form
                name="basic"
                form={form}
                className="single-tournament-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <SingleTournamentFormHeader/>
                <SingleTournamentFormMain form={form} />
                <CardModal open={isModalOpen}
                           onOk={handleOk}
                           onCancel={handleCancel}
                           editItem={editItem}
                />
                {activeTournament && <Button className="create-btn" onClick={showModal}>
                    <span className="icon-ic_add"/>
                    <div>Создать Карточку</div>
                </Button>}
                <div className="card-list">
                    {activeTournament?.cards && activeTournament.cards.map(card =>
                        <CardView
                            showModal={showModal}
                            setEditItem={setEditItem}
                            key={card.id}
                            card={card}/>).reverse()}
                </div>
            </Form>
        </>}
    </div>)
}
export default observer(SingleTournament)