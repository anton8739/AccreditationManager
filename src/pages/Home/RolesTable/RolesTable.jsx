import {observer} from "mobx-react-lite";
import RolesTableItem from "pages/Home/RolesTable/RolesTableItem";
import './RoleTable.scss'

const RolesTable = ({roles}) => {
    const preparedRoles = Object.entries(roles)
    return (<div className="roles-table">
        <div className="roles-table-title">
            <div className="role">
                Роль
            </div>
            <div className="number">
                Число
            </div>
        </div>
        {preparedRoles.map(role => <RolesTableItem key={role} role={role}/>)}
    </div>)
}
export default observer(RolesTable);