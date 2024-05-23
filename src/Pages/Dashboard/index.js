import { Button, Card, Form, Input, InputNumber, Select, Space, Table, Typography, message } from "antd";

import CardNoValue from "../../components/Card/CardNoValue";
import { FaBolt, FaWaveSquare } from 'react-icons/fa';
import { MdSpeed, MdPower, MdSignalCellularAlt } from 'react-icons/md';
import { IoMdFlash } from 'react-icons/io';
import { ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../connect/firebase";
import CardValue from "../../components/Card/CardValue";
import CardValueDot from "../../components/Card/CardValueDot";

const { Option } = Select;


function Dashboard() {
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState({});
  const [pao, setPao] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const dbRef = ref(database, 'CONTROL'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      console.log(dataObject);
      setCurrentData(dataObject);
      const formData = {
        LOCK: dataObject?.LOCK?.data,
        RCM: dataObject?.RCM?.data,
        ACC: Number(dataObject?.ACC?.data),
        DEC: Number(dataObject?.DEC?.data),
        ViMinAO1: Number(dataObject?.ViMinAO1?.data),
        ViMaxAO1: Number(dataObject?.ViMaxAO1?.data),
        SetpointAO1: Number(dataObject?.SetpointAO1?.data),
        OVV: dataObject?.OVV?.data,
        OVEDO06: String(dataObject?.OVEDO06?.data),
        P: Number(dataObject?.P?.data),
        I: Number(dataObject?.I?.data),
        D: Number(dataObject?.D?.data)
      };

      form.setFieldsValue(formData);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const dbRef = ref(database, 'MONITOR'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      setData(dataObject)
      console.log(dataObject);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);





  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const formattedData = {
          "ACC": { "data": String(values.ACC) },
          "D": { "data": String(values.D) },
          "DEC": { "data": String(values.DEC) },
          "I": { "data": String(values.I) },
          "LOCK": { "data": String(values.LOCK) },
          "OVEDO06": { "data": String(values.OVEDO06) },
          "OVV": { "data": String(values.OVV) },
          "P": { "data": String(values.P) },
          "RCM": { "data": String(values.RCM) },
          "SetpointAO1": { "data": String(values.SetpointAO1) },
          "ViMaxAO1": { "data": String(values.ViMaxAO1) },
          "ViMinAO1": { "data": String(values.ViMinAO1) }
        };

        const updatedData = {
          ...currentData,
          ...formattedData,
        };

        const dbRef = ref(database, 'CONTROL');
        set(dbRef, updatedData)
          .then(() => {

            message.success("Data updated successfully!");
          })
          .catch((error) => {
            message.error(`Failed to update data: ${error.message}`);
          });


      })
      .catch(errorInfo => {
        console.log('Failed:', errorInfo);
      });
  };
  return (
    <Space size={20} direction="vertical" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }} >
      <Typography.Title style={{
        fontWeight: 'bold'
      }} level={2}>Điều khiển</Typography.Title>
      <Typography.Text>MONITOR SYSTERM</Typography.Text>
      <Space
        direction="horizontal"
        align="center"
        style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}
      >

        <CardValue
          icon={
            <FaBolt
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Điện áp"}
          value={data?.O_VOLTAGE?.data}
        />
        <CardValue
          icon={
            <FaWaveSquare
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Dòng điện"}
          value={data?.O_CURRENT?.data}
        />
        <CardValue
          icon={
            <IoMdFlash
              style={{
                color: "orange",
                backgroundColor: "rgba(255,165,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tần số"}
          value={data?.O_HZ?.data}
        />
        <CardValue
          icon={
            <MdSpeed
              style={{
                color: "purple",
                backgroundColor: "rgba(128,0,128,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Tốc độ"}
          value={data?.O_RPM?.data}
        />
        <CardValue
          icon={
            <MdPower
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Công suất"}
          value={data?.O_POWER?.data}
        />
        <CardValueDot
          icon={
            <MdSignalCellularAlt
              style={{
                color: "cyan",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Trạng thái"}
          value={currentData?.RCM?.data}
        />

      </Space>
      <Typography.Text>CONTROL SYSTERM</Typography.Text>
      <Button onClick={handleSave}> Save</Button>
      <Space
        direction="horizontal"
        align="center"
        style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}
      >

        <Card bordered={false} style={{ width: 300 }}>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Lock" name="LOCK">
              <Select>
                <Option value={"0"}>Lock</Option>
                <Option value={"1"}>Unlock</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Rcm" name="RCM">
              <Select>
                <Option value={"2"}>Fw</Option>
                <Option value={"4"}>Rw</Option>
                <Option value={"1"}>Stop</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Acc" name="ACC">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Dec" name="DEC">
              <InputNumber />
            </Form.Item>
          </Form>
        </Card>

        <Card bordered={false} style={{ width: 300 }}>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Mode" name="OVEDO06">
              <Select>
                <Option value={"0"}>Auto</Option>
                <Option value={"1"}>Manual</Option>
              </Select>
            </Form.Item>
            <Form.Item label="OVV" name="OVV">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Min Value" name="ViMinAO1">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Max Value" name="ViMaxAO1">
              <InputNumber />
            </Form.Item>


          </Form>
        </Card>

        <Card bordered={false} style={{ width: 300 }}>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Set Point Pa" name="SetpointAO1">
              <InputNumber />
            </Form.Item>
            <Form.Item label="P" name="P">
              <InputNumber />
            </Form.Item>
            <Form.Item label="I" name="I">
              <InputNumber />
            </Form.Item>
            <Form.Item label="D" name="D">
              <InputNumber />
            </Form.Item>
          </Form>
        </Card>

      </Space>


    </Space >
  );
}



export default Dashboard;
