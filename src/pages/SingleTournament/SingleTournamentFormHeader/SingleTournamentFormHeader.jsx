import {observer} from "mobx-react-lite";
import {Button} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {RouteNames} from "utils/routes";

const SingleTournamentFormHeader = () => {
    const {id} = useParams();
    const history = useHistory();
    const goBack = () => {
        history.push(RouteNames.TOURNAMENTS)
    }
    return (<div className="single-tournament-form-header">
        <div className="go-back-btn" onClick={goBack}>
            <span className="icon-ic_back"/>
        </div>
        <div className="title">
            {id === "new" ? "Новый турнир" : "Редактировать турнир"}
        </div>
        <div className="actions">
            <Button className="create-btn" htmlType="submit">
                <span className="icon-ic_match"/>
                <div>   {id === "new" ? "Создать турнир" : "Сохранить изменения"}</div>
            </Button>
        </div>

    </div>)
}
export default observer(SingleTournamentFormHeader)