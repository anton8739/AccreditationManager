import {observer} from "mobx-react-lite";
import {Button, Empty, Popconfirm, Table} from "antd";
import {baseAccessForManagerColumns} from "utils/baseTableColumns";
import {CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";
import {useAccreditationStore, useManagerStore} from "stores";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {RouteNames} from "utils/routes";

const AccessForManagerTable = ({dataSource, setEditItem, showModal}) => {
    const {deleteManager} = useManagerStore();
    const [state, setState] = useState({
        dataSource: dataSource,
        filtered: false,
        searchText: ""
    });
    useEffect(() => {
        setState({
            dataSource: dataSource,
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
        await deleteManager(id)
    }
    const edit = (item) => {
        setEditItem(item)
        showModal()
    }
    const columns = [
        ...baseAccessForManagerColumns,
        {
            title: '',
            dataIndex: 'actions',
            width: '150px',
            render: (_, record) => {
                return (
                    <div className="table-actions">
                        <div className="edit-btn"
                             onClick={() => edit(record)}>
                            <span className="icon-ic_edit"/>
                        </div>
                        <Popconfirm title="Уверены что хотите удалить?" onConfirm={() => deleteFunc(record.id)}>
                            <div className="delete-btn">
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
            placeholder="Найти доступ"
            enterButton={<div className="search-btn">
                <span className="icon-ic_search"/>
                <span> Найти</span>
            </div>}
            value={state.searchText}
        />
        <Table
            rowKey="id"
            dataSource={state.dataSource}
            columns={columns}
            className="table"
            scroll={{x: 500}}
            bordered
            locale={{
                emptyText: (<Empty description="Нет данных" />)
            }}
        />
    </div>)
}
export default observer(AccessForManagerTable)