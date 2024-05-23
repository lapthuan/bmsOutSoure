import { Card, Space, Statistic } from "antd";


const CardValue = ({ title, value, icon }) => {
    return (
        <Card style={{ width: "200px", height: "100px" }}>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>

    );
}

export default CardValue;