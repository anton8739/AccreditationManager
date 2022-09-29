import './Roles.scss'
import {Button, Spin} from "antd";
import AccessForManagerTable from "pages/AccessForManagers/AccessForMaanagerTable/AccessForManagerTable";
import AccessForManagerModal from "pages/AccessForManagers/AccessForManagerModal/AccessForManagerModal";
import {useEffect, useState} from "react";
import {useAppStore, useRoleStore} from "stores";
import RoleModal from "pages/Roles/RoleModal/RoleModal";
import {observer} from "mobx-react-lite";
import RoleTable from "pages/Roles/RoleTable/RoleTable";
const Role = () => {
    const [loading, setLoading] = useState();
    const {roles, loadRolesList} = useRoleStore();
    const {setCurrentPageTitle} =useAppStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadRolesList()
            setLoading(false)
        }
        initPage()
        setCurrentPageTitle("Роли")
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setEditItem(null)
        setIsModalOpen(false);
    };
    return (<div className="roles-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <div className="btns" onClick={showModal}>
                <Button className="create-btn">
                    <span className="icon-ic_add"/>
                    <div>Создать роль</div>
                </Button>
            </div>
            <div className="table-section">
                <RoleTable dataSource={roles} setEditItem={setEditItem} showModal={showModal}/>
                <RoleModal open={isModalOpen}
                           onOk={handleOk}
                           onCancel={handleCancel}
                           editItem={editItem}
                />
            </div>
        </>}
    </div>
    )
}
export default observer(Role);