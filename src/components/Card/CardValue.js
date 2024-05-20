import { Card, Space, Statistic } from "antd";


const CardNoValue = ({ title, value, icon }) => {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>

    );
}

export default CardNoValue;