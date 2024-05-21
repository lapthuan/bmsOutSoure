import { Card, Space, Statistic } from "antd";


const CardValue = ({ title, value, icon }) => {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>

    );
}

export default CardValue;