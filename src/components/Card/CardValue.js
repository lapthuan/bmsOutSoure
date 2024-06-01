import { Card, Space, Statistic } from "antd";


const CardValue = ({ title, value, icon, onClick }) => {
    return (
        <Card style={{ width: "220px", height: "100px" }} onClick={onClick}>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>

    );
}

export default CardValue;