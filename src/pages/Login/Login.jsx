import './Login.scss'
import loginImage from 'asserts/images/login-image.png'
import LoginForm from "pages/Login/LoginForm/LoginForm";
import {notifier} from "utils/notifier";
import {observer} from "mobx-react-lite";
import {useAuthStore} from "stores";

const Login = () => {
    const {login, rememberMe} = useAuthStore();
    const onFinish = (values) => {
        login(values)
    }


    const onFinishFailed = (errorInfo) => {
        console.log("sad")
        notifier({description: "Неверный логин или пароль", type: 'error'});
    };

    return (<div className="login-page">
        <div className="login-window">
            <div className="login-form">
                <div className="login-form-title">
                    Вход
                </div>
                <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
            </div>
            <img className="login-img" src={loginImage} alt="image"/>

        </div>
    </div>)
}
export default observer(Login);