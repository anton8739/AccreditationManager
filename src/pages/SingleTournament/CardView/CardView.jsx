import {observer} from "mobx-react-lite";
import './CardView.scss'
import {getImageUrl} from "utils/formaters";
import {useCardStore, useRoleStore} from "stores";
import {Button, Popconfirm} from "antd";

const CardView = ({card,setEditItem,showModal}) => {
    const {roles} = useRoleStore();
    const {deleteCard} = useCardStore();
    const currentRole = roles.find(item => item.id === card.role_id);
    const currentRoleColor = `rgb(${currentRole.color})`
    const edit = () => {
        setEditItem(card)
        showModal()
    }
    const initPosition = JSON.parse(card.positions)
    return (<div className="card-view">
        <div className="card-view-header">
            <div className="title">
                Карточка участника
            </div>
            <div className="actions">
                <div className="edit" onClick={edit}>
                    Редактировать
                </div>
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteCard(card.id)}>
                    <div className="delete" >
                        Удалить
                    </div>
                </Popconfirm>
            </div>

        </div>
        <div className="card-view-body">
            <div className="card-view-img">
                <img src={getImageUrl(card.image)} alt="image"/>
                <div className="foto-layout" style={{top : initPosition.y, left: initPosition.x}}>
                    <span className="icon-ic_contact"/>
                </div>
                <div className="role-layout" style={{background : currentRoleColor}}>
                    <div className="name">
                        Name LastName
                    </div>
                    <div className="role">
                        {currentRole.name}
                    </div>
                    <div className="zones">
                        {currentRole.zones.map(zone => <div>{zone}</div>)}
                    </div>
                </div>
            </div>
            <div className="card-view-content">
                <div className="card-view-content-section-title">
                    Роль
                </div>
                <div className="card-view-content-role">
                    <div className="color" style={{background : currentRoleColor }}/>
                    <div className="title">
                        {currentRole.name}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default observer(CardView)