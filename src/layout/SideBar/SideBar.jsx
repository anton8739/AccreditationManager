import {Button, Menu} from "antd";
import {RouteNames} from "utils/routes";

import {useState} from "react";
import {

    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {observer} from "mobx-react-lite";
import { useAuthStore} from "stores";
import {useHistory} from "react-router-dom";
import {useBreakPoint, useMediaQuery} from "hooks";
import sideBarBg from 'asserts/images/side-bar-bg.png'
const SideBar = () => {
    const history = useHistory();
    const {user} = useAuthStore();
    const isMiddle = useMediaQuery(useBreakPoint().down('md'));
    const isAdmin = user.role === 0;
    const {logout} = useAuthStore();
    const [collapsed, setCollapsed] = useState(true);
    const clickHandler = (routeName) => {
        history.push(routeName)
        if(isMiddle) {
            setCollapsed(true)
        }
    }
    const managerItems = [
        {
            key: "Главная",
            icon : <span className="icon-ic_home"/>,
            onClick: () => clickHandler(RouteNames.HOME)
        },
        {
            key: "Аккредитация",
            icon : <span className="icon-ic_home-1"/>,
            onClick: () => clickHandler(RouteNames.ACCREDITATION)
        },
        {
            key: "Выйти",
            icon : <span className="icon-ic_contact"/>,
            onClick: () => logout()
        }
    ]
    const adminItems = [
        {
            key: "Главная",
            icon : <span className="icon-ic_home"/>,
            onClick: () => clickHandler(RouteNames.HOME)
        },
        {
            key: "Аккредитация",
            icon : <span className="icon-ic_home-1"/>,
            onClick: () => clickHandler(RouteNames.ACCREDITATION)
        },
        {
            key: "Доступ для менеджеров",
            icon : <span className="icon-ic_lock"/>,
            onClick: () => clickHandler(RouteNames.ACCESS_FOR_MANAGERS)
        },
        {
            key: "Роли",
            icon : <span className="icon-ic_usercard"/>,
            onClick: () => clickHandler(RouteNames.ROLES)
        },
        {
            key: "Турниры",
            icon : <span className="icon-ic_match"/>,
            onClick: () => clickHandler(RouteNames.TOURNAMENTS)
        },
        {
            key: "Выйти",
            icon : <span className="icon-ic_contact"/>,
            onClick: () => logout()
        }
    ]
    const managerNavbar = managerItems.map((item) => ({
        key: item.key,
        label: `${item.key}`,
        icon : item.icon,
        onClick: () => item.onClick()
    }));
    const adminNavbar = adminItems.map((item) => ({
        key: item.key,
        label: `${item.key}`,
        icon : item.icon,
        onClick: () => item.onClick()
    }));
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="sidebar">
            <img className="sidebar-bg" src={sideBarBg} alt=""/>
            <Button
                className="menu-btn" l
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            </Button>

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={isAdmin ? adminNavbar : managerNavbar}
            />
        </div>

)

}
export default observer(SideBar);