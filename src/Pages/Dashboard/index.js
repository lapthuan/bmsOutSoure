import { Button, Card, Form, Input, InputNumber, Switch, Select, Space, Table, Typography, message } from "antd";

import { FaBolt, FaWaveSquare } from 'react-icons/fa';
import { MdSpeed, MdPower, MdSignalCellularAlt } from 'react-icons/md';
import { IoMdFlash } from 'react-icons/io';
import { ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../connect/firebase";
import CardValue from "../../components/Card/CardValue";
import CardValueDot from "../../components/Card/CardValueDot";
import ModalDienAp from "../../components/Modal/ModalDienAp";
import ModalDongDien from "../../components/Modal/ModalDongDien";
import ModalTanSo from "../../components/Modal/ModalTanSo";
import ModalTocDo from "../../components/Modal/ModalTocDo";
import ModalCongSuat from "../../components/Modal/ModalCongSuat";

const { Option } = Select;


function Dashboard() {
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState({});
  const [pao, setPao] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  useEffect(() => {
    const dbRef = ref(database, 'CONTROL'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      setCurrentData(dataObject);
      setIsChecked(dataObject?.thresholdPa?.status)

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
  const handleChange = (checked) => {
    setIsChecked(checked);
    const switchRef = ref(database, "CONTROL/thresholdPa/status");
    set(switchRef, checked);
  };
  useEffect(() => {
    const dbRef = ref(database, 'MONITOR'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      setData(dataObject)

    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const dbRef = ref(database, 'SET'); // Đường dẫn đến dữ liệu bạn muốn đọc
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const dataObject = snapshot.val();
      setPao(dataObject)
      form2.setFieldsValue({ Pa0: dataObject?.Pa0?.data });
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSaveSet = () => {
    form2.validateFields()
      .then(values => {
        const formattedData = {
          "Pa0": { "data": String(values.Pa0) },

        };

        const dbRef = ref(database, 'SET');
        set(dbRef, formattedData)
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
  const handleCardClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleCardClick1 = () => {
    setModalVisible1(true);
  };

  const handleCloseModal1 = () => {
    setModalVisible1(false);
  };
  const handleCardClick2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };
  const handleCardClick3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
  };
  const handleCardClick4 = () => {
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
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
        {modalVisible && <ModalDienAp
          open={modalVisible}
          onClose={handleCloseModal}
        />}

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
          onClick={handleCardClick}
          title={"Điện áp"}
          value={data?.O_VOLTAGE?.data + " V"}
        />
        {modalVisible1 && <ModalDongDien
          open={modalVisible1}
          onClose={handleCloseModal1}
        />}
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
          onClick={handleCardClick1}
          value={data?.O_CURRENT?.data + " A"}
        />
        {modalVisible2 && <ModalTanSo
          open={modalVisible2}
          onClose={handleCloseModal2}
        />}
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
          onClick={handleCardClick2}
          title={"Tần số"}
          value={data?.O_HZ?.data + " Hz"}
        />
        {modalVisible3 && <ModalTocDo
          open={modalVisible3}
          onClose={handleCloseModal3}
        />}
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
          onClick={handleCardClick3}
          title={"Tốc độ"}
          value={data?.O_RPM?.data + " Rpm"}
        />
        {modalVisible4 && <ModalCongSuat
          open={modalVisible4}
          onClose={handleCloseModal4}
        />}
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
          onClick={handleCardClick4}
          title={"Công suất"}
          value={data?.O_POWER?.data + " W"}
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
        <Card bordered={false} title={"SET ngưỡng"} style={{ width: 300 }}>
          <Form
            form={form2}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <p>Áp suất tối đa</p>
            <Switch
              checkedChildren="Đã mở"
              unCheckedChildren="Đã tắt"
              checked={isChecked}
              onChange={handleChange}
            />
            <Form.Item label="Áp suất tối đa" name="Pa0" >
              <InputNumber />
            </Form.Item>
            <Button onClick={handleSaveSet}> Save</Button>
          </Form>
        </Card>
      </Space>



    </Space >
  );
}



export default Dashboard;
