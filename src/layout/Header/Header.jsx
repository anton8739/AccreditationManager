
import './Header.scss'
import {useAppStore} from "stores";
import {observer} from "mobx-react-lite";
const Header = () => {
    const {currentTournament,currentPageTitle} =useAppStore();
    return <div className="header">
        <div className="header-title">
            {currentPageTitle}
        </div>
        <div className="header-right-menu">
            <div className="header-right-menu-event">
                <div className="label">
                    Текущее событие:
                </div>
                <div className="title">
                    {currentTournament ? currentTournament.name : "Нет текущего турнира"}
                </div>
            </div>
            {/*
            <div className="header-right-menu-icon">
                <span className="icon-ic_settings"/>
            </div>
            */}
        </div>
    </div>


}
export default observer(Header);