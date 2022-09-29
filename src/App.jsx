import './App.scss';
import Layout from "layout/Layout";
import {useEffect, useState} from "react";
import {useAppStore, useAuthStore} from "stores";
import {observer} from "mobx-react-lite";
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import moment from "moment";
import 'moment/locale/ru';
ConfigProvider.config({
    theme: {
        primaryColor: '#00573A',
        primaryColorHover : '#00573A',
        primary1: '#FFFFFF', //text color
        primary2: 'black', //text color
        primary3: '#FFFFFF', // bg color
        boxShadowBase : '#00573A',
        textSelectionColor : '#333333',
    },
    locale : ru_RU
});

function App() {
    const {checkAuth} = useAuthStore();
    const [loading, setLoading] = useState();
    const {
        loadStatistics
    } = useAppStore();
    useEffect( () => {
        const initApp = async () => {
            const auth = await checkAuth()
            if(auth) {
                await loadStatistics()
            }
        }
       initApp()
    }, [])
    moment.locale('ru');
    return (
        <ConfigProvider locale={ru_RU}>
            <div className="App">
                <Layout/>
            </div>
        </ConfigProvider>

    );
}

export default observer(App);
