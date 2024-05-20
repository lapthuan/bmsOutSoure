import { Card, Space, Statistic } from "antd";
import { NavLink } from "react-router-dom";

const CardNoValue = ({ title, link, icon }) => {
    return (
        <NavLink to={link}>
            <Card>
                <Space direction="horizontal">
                    {icon}
                    {title}
                </Space>
            </Card>
        </NavLink>

    );
}

export default CardNoValue;