import "./home.css"
import img from "../../Image/img1.jpg"
import chuong from "../../Image/chuong.png"
import chuonggif from "../../Image/chuong.gif"
import imgbaochay from "../../Image/baochao.png"
import mua from "../../Image/mua.gif"
import { Alert, Input, Table, Typography, message } from "antd"
import LiquidFillGauge from "react-liquid-gauge"
import { useEffect, useState } from "react"
import { database } from "../../connect/firebase"
import { onValue, ref, set } from "firebase/database"
import { format } from 'date-fns';

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text) => format(new Date(text), 'dd/MM/yyyy HH:mm:ss'),
    },
    {
        title: 'Fire Status',
        dataIndex: 'fire',
        key: 'fire',
    },
];
const Home = () => {
    const [data, setData] = useState({})
    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        const dbRef = ref(database, 'MONITOR'); // Đường dẫn đến dữ liệu bạn muốn đọc
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const dataObject = snapshot.val();
            setData(dataObject)
            console.log(dataObject);
        });

        const dbRef1 = ref(database, 'LOG')
        onValue(dbRef1, (snapshot) => {
            const dataObject = snapshot.val();
            let dataNew = [];
            try {
                dataNew = Object.keys(dataObject).map((key, i) => ({
                    key,
                    no: i + 1,
                    timestamp: dataObject[key].timestamp,
                    fire: dataObject[key].fire,
                }));
                const reversedData = dataNew.slice().reverse();
                setDataTable(reversedData)
            } catch (error) {
                message.error('Error processing data');
                console.error('Error processing data:', error);
            }

        });
        // Clean up subscription on unmount
        return () => unsubscribe();

    }, []);
    useEffect(() => {

        const interval = setInterval(() => {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const timestamp2 = new Date().toISOString();


            set(ref(database, 'LOG/' + timestamp), {
                timestamp: timestamp2,
                fire: data?.O_Baochay?.data === "1" ? "Cảnh báo" : "Bình thường"
            })

        }, 60 * 1000); // 15 phút

        return () => clearInterval(interval);  // Cleanup interval khi component unmount
    }, [data]);
    const handlerClick = () => {
        const dbRef = ref(database, 'MONITOR/O_Baochay/data');
        const dbRef2 = ref(database, 'CONTROL/NNKC/data');
        const value = data?.O_Baochay?.data === "1" ? "0" : "1"
        set(dbRef, value)
            .then(() => {
                if (value === "1")
                    message.warning("Warning !");
            })
            .catch((error) => {
                message.error(`Failed to update data: ${error.message}`);
            });
        set(dbRef2, value)
    }
    return (<>
        <Typography.Title style={{
            fontWeight: 'bold'
        }} level={2}>Trang chủ</Typography.Title>
        <div className="body-home">

            <div className="container-img">

                <img src={img} alt="Sample Image" />

                <div className="card-chuong top-left">   <img src={data?.O_Baochay?.data === "1" || data?.O_CT?.data === "1" ? chuonggif : chuong} alt="Sample Image" /></div>
                <div className="card top-right">{data?.O_Pa?.data}</div>
                <div className="card top-left2">
                    <Input />
                    <hr />
                    <Input />
                </div>
                <div className="card-baochay top-left3" onClick={handlerClick}>
                    <img src={imgbaochay} alt="Sample Image" />
                </div>
                <div className="card bottom-right">
                    <LiquidFillGauge
                        width={100}
                        height={100}
                        riseAnimation
                        waveAnimation
                        waveFrequency={2}
                        waveAmplitude={1}
                        gradient
                        value={data?.O_tank?.data === "1" ? 80 : 0}
                        textRenderer={() => null} // không hiển thị số
                        percent={""} />
                </div>
                {data?.O_CT?.data === "1" ? (<>
                    <div className="card right-center">
                        <img src={mua} alt="Sample Image" />
                    </div>
                    <div className="card right-center1">
                        <img src={mua} alt="Sample Image" />
                    </div>
                    <div className="card right-center2">
                        <img src={mua} alt="Sample Image" />
                    </div>

                    <Alert
                        message="Fire warning !!!"

                        type="warning"
                        showIcon
                        closable
                    />
                </>) : ""}
                {data?.O_tank?.data === "0" && (<Alert
                    message="Tank warning !!!"
                    type="warning"
                    showIcon
                    closable
                />)}

            </div>
            <Table dataSource={dataTable} columns={columns} pagination={{ pageSize: 8 }} />;
        </div>

    </>);
}

export default Home;