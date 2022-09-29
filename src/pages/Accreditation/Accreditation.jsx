import {Button, Spin} from "antd";
import RoleTable from "pages/Roles/RoleTable/RoleTable";
import RoleModal from "pages/Roles/RoleModal/RoleModal";
import './Accreditation.scss'
import {useEffect, useState} from "react";
import {useAccreditationStore, useAppStore} from "stores";
import AccreditationModal from "pages/Accreditation/AccreditationModal/AccreditationModal";
import AccreditationTable from "pages/Accreditation/AccreditationTable/AccreditationTable";
import {observer} from "mobx-react-lite";
import {useBreakPoint, useMediaQuery} from "hooks";
const Accreditation = () => {
    const [loading, setLoading] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setCurrentPageTitle} =useAppStore();

    const {loadAccreditationList,accreditation} = useAccreditationStore()
    useEffect(() => {
        const initPage = async () => {
            setLoading(true)
            await loadAccreditationList()
            setLoading(false)
        }
        setCurrentPageTitle("Аккредитации")
        initPage()
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (<div className="accreditation-page">
        {loading ? <>
            <Spin/>
        </> : <>
            <div className="btns">
                <Button className="create-btn" onClick={showModal}>
                    <span className="icon-ic_addcontact"/>
                    <div>Создать Аккредитацию</div>
                </Button>
            </div>
            <div className="table-section">
                <AccreditationTable dataSource={accreditation}/>
                <AccreditationModal open={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>
        </>}
    </div>)
}
export default observer(Accreditation);