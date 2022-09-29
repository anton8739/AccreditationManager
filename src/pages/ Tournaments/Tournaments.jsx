import {useEffect, useState} from "react";
import {useAppStore, useTournamentsStore} from "stores";
import './Tournaments.scss'
import {observer} from "mobx-react-lite";
import {Button, Spin} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "utils/routes";
import TournamentsTable from "pages/ Tournaments/TournamentsTable/TournamentsTable";
import RoleModal from "pages/Roles/RoleModal/RoleModal";
import CardModal from "pages/SingleTournament/CardModal/CardModal";
const Tournaments = () => {
    const {setCurrentPageTitle} =useAppStore();
    const history = useHistory();
    const {tournaments,loadTournamentsList} = useTournamentsStore()
    const [loading, setLoading] = useState();

    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadTournamentsList()
            setLoading(false)
        }
        setCurrentPageTitle("Турниры")
        initPage()
    }, [])

    return (<div className="tournaments-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <div className="btns">
                <Button className="create-btn" onClick={() => history.push(`${RouteNames.SINGLE_TOURNAMENT}/new`)}>
                    <span className="icon-ic_match"/>
                    <div>Создать Турнир</div>
                </Button>
            </div>
            <div className="table-section">
                <TournamentsTable dataSource={tournaments}/>

            </div>

        </>}
    </div>)
}
export default observer(Tournaments);