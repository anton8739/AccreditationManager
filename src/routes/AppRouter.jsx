import {adminRoutes, managerRoutes, privateRoutes, publicRoutes, RouteNames} from "utils/routes";
import {observer} from "mobx-react-lite";
import {useAuthStore} from "stores";
import {Redirect, Route, Switch} from 'react-router-dom';

const AppRouter = () => {
    const {isAuth,isChecking} = useAuthStore();
    const {user} = useAuthStore();
    const isAdmin = user.role === 0;
    const isManager = user.role === 1;
    return (<>
        {isAuth && isAdmin &&
            <Switch>
                {adminRoutes.map(route =>
                    <Route exact path={route.path}
                           component={route.element}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.HOME}/>
            </Switch>}
        {isAuth && isManager &&
            <Switch>
                {managerRoutes.map(route =>
                    <Route  exact path={route.path}
                           component={route.element}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.HOME} replace/>
            </Switch>
        }
        {!isAuth && !isChecking &&
        <Switch>
            {publicRoutes.map(route =>
                <Route  exact path={route.path}
                        component={route.element}
                        key={route.path}
                />
            )}
            <Redirect to={RouteNames.LOGIN} replace/>
        </Switch>
        }
    </>)
}

export default observer(AppRouter);