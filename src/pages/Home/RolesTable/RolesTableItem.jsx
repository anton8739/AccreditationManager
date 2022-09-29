import {observer} from "mobx-react-lite";

const RolesTableItem = ({role}) => {
    return (<div className="role-table-item">
        <div className="role">
            {role[0]}
        </div>
        <div className="number">
            {role[1]}
        </div>
    </div>)
}
export default observer(RolesTableItem)