import { Button, Card, Form, Input, InputNumber, Select, Space, Table, Typography, message } from "antd";

import CardNoValue from "../../components/Card/CardNoValue";
import { FaBolt, FaWaveSquare } from 'react-icons/fa';
import { MdSpeed, MdPower, MdSignalCellularAlt } from 'react-icons/md';
import { IoMdFlash } from 'react-icons/io';
import { ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../connect/firebase";

const { Option } = Select;


function Dashboard() {

  const [form] = Form.useForm();
  useEffect(() => {
    const dbRef = ref(database, 'CONTROL'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      console.log(dataObject);
      const formData = {
        lock: dataObject.lock,
        rcm: dataObject.rcm,
        acc: Number(dataObject.acc),
        dec: Number(dataObject.dec),
        minValue: Number(dataObject.minValue),
        maxValue: Number(dataObject.maxValue),
        setPointCo: Number(dataObject.setPointCo),
        mode: dataObject.mode,
        setFrequency: Number(dataObject.setFrequency),
        setPointTemp: Number(dataObject.setPointTemp),
        p: Number(dataObject.p),
        i: Number(dataObject.i),
        d: Number(dataObject.d)
      };

      form.setFieldsValue(formData);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const dbRef = ref(database, 'CONTROL');
        set(dbRef, values)
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
    <Space size={20} direction="vertical" >
      <Typography.Title style={{
        fontWeight: 'bold'
      }} level={2}>Điều khiển</Typography.Title>
      <Typography.Text>MONITOR SYSTERM</Typography.Text>
      <Space direction="horizontal" align="baseline">

        <CardNoValue
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
        />
        <CardNoValue
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
        />
        <CardNoValue
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
        />
        <CardNoValue
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
        />
        <CardNoValue
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
        />
        <CardNoValue
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
        />

      </Space>
      <Typography.Text>CONTROL SYSTERM</Typography.Text>
      <Button onClick={handleSave}> Save</Button>
      <Space>

        <Card bordered={false} style={{ width: 300 }}>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Lock" name="lock">
              <Select>
                <Option value={0}>Lock</Option>
                <Option value={1}>Unlock</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Rcm" name="rcm">
              <Select>
                <Option value={2}>Fw</Option>
                <Option value={4}>Rw</Option>
                <Option value={1}>Stop</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Acc" name="acc">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Dec" name="dec">
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
            <Form.Item label="Min Value" name="minValue">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Max Value" name="maxValue">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Set Point Co" name="setPointCo">
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
            <Form.Item label="Mode" name="mode">
              <Select>
                <Option value={0}>Auto</Option>
                <Option value={1}>Manual</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Set Frequency" name="setFrequency">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Set Point T°" name="setPointTemp">
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
            <Form.Item label="P" name="p">
              <InputNumber />
            </Form.Item>
            <Form.Item label="I" name="i">
              <InputNumber />
            </Form.Item>
            <Form.Item label="D" name="d">
              <InputNumber />
            </Form.Item>
          </Form>
        </Card>

      </Space>


    </Space >
  );
}



export default Dashboard;
