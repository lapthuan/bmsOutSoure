import { Badge, Drawer, Image, List, Space, Typography } from "antd";

import logoHCMUTE1 from "./logo HCMUTE1.jpg";

function AppHeader() {


  return (
    <div className="AppHeader">
      <Image width={40} wrapperStyle={{ marginRight: "20px" }} src={logoHCMUTE1}></Image>
      <Typography.Title >HỆ THỐNG CHỮA CHÁY TỰ ĐỘNG </Typography.Title>
      <Space>
        {/* <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge> */}
      </Space>

    </div>
  );
}
export default AppHeader;
