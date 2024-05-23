import { Card, Space, Statistic } from "antd";


const CardValueDot = ({ title, value, icon }) => {
    return (
        <Card style={{ width: "200px", height: "100px" }}>

            <Space direction="horizontal">
                {icon}
                {title}

                <div className="Card-dot" style={{ backgroundColor: value === "1" ? "red" : "green" }}></div>
            </Space>
        </Card>

    );
}

export default CardValueDot;