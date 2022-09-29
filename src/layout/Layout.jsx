import './Layout.scss'
import Header from "./Header/Header";
import Content from "./Content/Content";

import AppRouter from "routes/AppRouter";
import SideBar from "layout/SideBar/SideBar";
import {observer} from "mobx-react-lite";
import {useAuthStore} from "stores";

const Layout = () => {
    const {isAuth} = useAuthStore();
    return (<div className="layout">
        {isAuth ? <>
            <SideBar/>
            <Content>
                <Header/>
                <AppRouter/>
            </Content>

        </> : <>
            <AppRouter/>
        </>}

    </div>)

}
export default observer(Layout);