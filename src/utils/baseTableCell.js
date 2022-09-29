import './baseTableCell.scss'
import {Avatar, Image} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {dateFormat2, getImageUrl} from "utils/formaters";

export const ColorCell = (record, row) => {
    return <div className="colorCell" style={{
        background: `rgb(${record})`
    }}/>;
}
export const AccreditationNameField = (record, row) => {
    return <div className="AccreditationNameField">
        <Avatar shape="square" src={getImageUrl(row.photo)}
                size={35} icon={<UserOutlined/>
        }
        />
        <div>
            {record}
        </div>

    </div>;
}
export const RangeTournamens = (record, row) => {
    return <div>
        {`${dateFormat2(row.start_date)} - ${dateFormat2(row.end_date)}`}
    </div>
}