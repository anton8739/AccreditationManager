import './Home.scss'
import {Button, Spin} from "antd";
import RolesTable from "pages/Home/RolesTable/RolesTable";
import {useAppStore} from "stores";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import AccreditationModal from "pages/Accreditation/AccreditationModal/AccreditationModal";
import {useHistory} from "react-router-dom";
import {RouteNames} from "utils/routes";

const Home = () => {
    const {
        loadStatistics,
        accounts,
        contacts,
        players,
        withoutAccreditation,
        roles,
        setCurrentPageTitle
    } = useAppStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadStatistics()
            setLoading(false)
        }
        setCurrentPageTitle("Главная")
        initPage()
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (<div className="home-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <div className="btns">
                <Button className="show-btn" onClick={() => history.push(RouteNames.ACCREDITATION)}>
                    <span className="icon-ic_users"/>
                    <div>Показать список контактов</div>
                </Button>
                <Button className="create-btn" onClick={showModal}>
                    <span className="icon-ic_addcontact"/>
                    <div>Создать аккредитацию</div>
                </Button>
            </div>
            <div className="info">
                <div className="info-item blue">
                    <div className="title">
                        <span className="icon-ic_users"/>
                        <div>Контактов</div>
                    </div>
                    <div className="number">
                        {contacts}
                    </div>
                </div>
                <div className="info-item blue-light">
                    <div className="title">
                        <span className="icon-ic_player"/>
                        <div>Игроков</div>
                    </div>
                    <div className="number">
                        {players}
                    </div>
                </div>
                <div className="info-item green">
                    <div className="title">
                        <span className="icon-ic_account"/>
                        <div>Аккаунтов</div>
                    </div>
                    <div className="number">
                        {accounts}
                    </div>
                </div>
                <div className="info-item orange">
                    <div className="title">
                        <span className="icon-ic_home"/>
                        <div>Без аккредитации</div>
                    </div>
                    <div className="number">
                        {withoutAccreditation}
                    </div>
                </div>
            </div>
            <div className="role-table-section">
                <div className="roles-table-section-title">
                    Всего изготовлено
                </div>
                <RolesTable roles={roles}/>
                <AccreditationModal open={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>

        </>}
    </div>)
}
export default observer(Home);