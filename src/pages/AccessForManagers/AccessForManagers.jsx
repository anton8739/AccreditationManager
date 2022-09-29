import './AccessForMenagers.scss'
import {Button, Modal, Spin} from "antd";
import AccessForManagerTable from "pages/AccessForManagers/AccessForMaanagerTable/AccessForManagerTable";
import {observer} from "mobx-react-lite";
import {useAppStore, useManagerStore} from "stores";
import {useEffect, useState} from "react";
import AccessForManagerModal from "pages/AccessForManagers/AccessForManagerModal/AccessForManagerModal";

const AccessForManagers = () => {
    const {loadManagerAccessList, managerAccessList} = useManagerStore()
    const {setCurrentPageTitle} =useAppStore();
    const [loading, setLoading] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadManagerAccessList()
            setLoading(false)
        }
        setCurrentPageTitle("Доступ для Менеджеров")
        initPage()
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
    return (<div className="access-managers-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <div className="btns">
                <Button className="create-btn" onClick={showModal}>
                    <span className="icon-ic_addcontact"/>
                    <div>Создать доступ</div>
                </Button>
            </div>
            <div className="table-section">
                <AccessForManagerTable dataSource={managerAccessList} setEditItem={setEditItem} showModal={showModal}/>
            </div>
            <AccessForManagerModal open={isModalOpen}
                                   onOk={handleOk}
                                   onCancel={handleCancel}
                                   editItem={editItem}
            />
        </>}

    </div>)
}
export default observer(AccessForManagers);