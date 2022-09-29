import {observer} from "mobx-react-lite";
import {Button, Empty, Popconfirm, Table} from "antd";
import {baseAccessForManagerColumns, baseAccreditationColumns, baseRoleColumns} from "utils/baseTableColumns";
import {CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import {useAccreditationStore} from "stores";
import {useHistory} from "react-router-dom";
import {RouteNames} from "utils/routes";
import {useBreakPoint, useMediaQuery} from "hooks";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";

const AccreditationTable = ({dataSource}) => {
    const {deleteAccreditation} = useAccreditationStore();
    const history = useHistory();
    const [state, setState] = useState({
        dataSource : dataSource,
        filtered: false,
        searchText: ""
    });
    useEffect(() => {
        setState({
            dataSource : dataSource,
            filtered: false,
            searchText: ""
        })
    }, [dataSource])
    const onSearch = (e) => {
        const filteredData = dataSource.filter(record => {
            return record.name.includes(e.target.value)
        })
        setState({
            searchText: e.target.value,
            filtered: !!e.target.value,
            dataSource: e.target.value ? filteredData : dataSource
        });
    }
    const deleteFunc = async (id) => {
        await deleteAccreditation(id)
    }
    const columns = [
        ...baseAccreditationColumns,
        {
            title: '',
            dataIndex: 'actions',
            width: '150px',
            render: (_, record) => {
                return (
                    <div className="table-actions">
                        <div className="edit-btn"
                             onClick={() => history.push(`${RouteNames.EDIT_ACCREDITATION}/${record.id}`)}>
                            <span className="icon-ic_edit"/>
                        </div>
                        <Popconfirm title="Уверены что хотите удалить?" onConfirm={() => deleteFunc(record.id)}>
                            <div  className="delete-btn">
                                <span className="icon-ic_delete"/>
                            </div>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    return (<div className="table-wrapper">
        <Search
            onChange={onSearch}
            placeholder="Найти аккредитацию"
            value={state.searchText}
            enterButton={<div className="search-btn">
                <span className="icon-ic_search"/>
                <span> Найти</span>
            </div>}
        /><Table
        rowKey="id"
        dataSource={state.dataSource}
        columns={columns}
        className="table"
        bordered
        scroll={{x: 500}}
        locale={{
            emptyText: (<Empty description="Нет данных" />)
        }}
    />
    </div>)
}
export default observer(AccreditationTable)