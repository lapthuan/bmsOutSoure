import { Badge, Card, Drawer, Image, List, Space, Typography } from "antd";

import logoHCMUTE1 from "./logo HCMUTE1.jpg";

function AppHeader() {


  return (
    <div className="AppHeader">
      <div className="info-img">
        <Image width={40} wrapperStyle={{ marginRight: "20px" }} src={logoHCMUTE1}></Image>
      </div>

      <Typography.Title >HỆ THỐNG CHỮA CHÁY TỰ ĐỘNG </Typography.Title>
      <div className="info">
        NHÓM 9<br />
        Lê Vĩnh Nghi      20142538<br />
        Dương Công Nghĩa  20142539
      </div>

    </div>
  );
}
export default AppHeader;
