import {observer} from "mobx-react-lite";
import {Button, Empty, Popconfirm, Table} from "antd";
import {baseAccessForManagerColumns, baseRoleColumns} from "utils/baseTableColumns";
import {useManagerStore, useRoleStore} from "stores";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import filledStar from 'asserts/images/filledStart.png'
const RoleTable = ({dataSource, setEditItem, showModal}) => {
    const {deleteRole,toggleSaveRole} = useRoleStore();
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
        await deleteRole(id)
    }
    const edit = (item) => {
        setEditItem(item)
        showModal()
    }
    const toggleSaved = async (record) => {
        let value = 0;
        if(record.favorite === 0) {
            value = 1;
        } else  {
            value = 0;
        }
        await toggleSaveRole(value, record.id)
    }
    const columns = [
        ...baseRoleColumns,
        {
            title: '',
            dataIndex: 'actions',
            width: '150px',
            render: (_, record) => {
                return (
                    <div className="table-actions">
                        <div className="edit-btn"
                             onClick={() => toggleSaved(record)}>
                            {record.favorite === 0 ?     <span className="icon-ic_star"/> : <img src={filledStar} alt="star"/> }
                        </div>
                        <div className="edit-btn"
                             onClick={() => edit(record)}>
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
            placeholder="Найти роль"
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
        scroll={{x: 500}}
        bordered
        locale={{
            emptyText: (<Empty description="Нет данных" />)
        }}
    />
    </div>)
}
export default observer(RoleTable)