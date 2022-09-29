import {dateFormat1} from "utils/formaters";
import {AccreditationNameField, ColorCell, RangeTournamens} from "utils/baseTableCell";
import moment from "moment";

export const baseAccessForManagerColumns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Дата регистрации',
        dataIndex: 'created_at',
        key: 'created_at',
        render : (record) => dateFormat1(record),
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
]

export const baseRoleColumns = [
    {
        title: 'Цвет',
        dataIndex: 'color',
        width : "50px",
        key: 'color',
        render : ColorCell
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
]
export const baseAccreditationColumns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render : AccreditationNameField,
    },
    {
        title: 'Дата регистрации',
        dataIndex: 'created_at',
        key: 'created_at',
        render : (record) => dateFormat1(record),
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
]
export const baseTournamentsColumns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Даты проведения',
        dataIndex: 'dates',
        key: 'ates',
        render : RangeTournamens,
        sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    },
]