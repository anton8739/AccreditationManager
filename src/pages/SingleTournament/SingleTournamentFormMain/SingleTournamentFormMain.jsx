import {observer} from "mobx-react-lite";
import {Button, Form, Input, DatePicker} from "antd";
import ColorPickerField from "components/ui/ColorPickerField/ColorPickerField";
import ZoneSelectField from "components/ui/ZoneSelectField/ZoneSelectField";

const {RangePicker} = DatePicker;
const SingleTournamentFormMain = ({form, onFinish, onFinishFailed}) => {

    return (
        <div className="form-main">
            <div className="form-main-header">
                <span className="icon-ic_match"/>
                <div className="title">Основные данные</div>
            </div>
            <div className="form-main-content">
                <Form.Item
                    label="Название турнира"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите имя пользователя',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Период проведения"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста даты проведения',
                        },
                    ]}
                >
                    <RangePicker/>
                </Form.Item>
            </div>

        </div>)
}
export default observer(SingleTournamentFormMain);