import "./home.css"
import img from "../../Image/img1.jpg"
import chuong from "../../Image/chuong.png"
import chuonggif from "../../Image/chuong.gif"
import imgbaochay from "../../Image/baochao.png"
import mua from "../../Image/mua.gif"
import lua from "../../Image/fire.gif"
import ring from "./ring.m4a"
import { Alert, Input, Table, Typography, message } from "antd"
import LiquidFillGauge from "react-liquid-gauge"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { database } from "../../connect/firebase"
import { onValue, ref, set } from "firebase/database"
import { format } from 'date-fns';
import ReactAudioPlayer from "react-audio-player"

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
    const [dataTables, setDataTables] = useState([])
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [key, setKey] = useState(0);
    useEffect(() => {
        const savedValue1 = localStorage.getItem('inputValue1');
        const savedValue2 = localStorage.getItem('inputValue2');
        if (savedValue1) {
            setValue1(savedValue1);
        }
        if (savedValue2) {
            setValue2(savedValue2);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('inputValue1', value1);
    }, [value1]);
    useEffect(() => {
        localStorage.setItem('inputValue2', value2);
    }, [value2]);
    const handleChange1 = (e) => {
        setValue1(e.target.value);
    };
    const handleChange2 = (e) => {
        setValue2(e.target.value);
    };

    useEffect(() => {
        const dbRef = ref(database, 'MONITOR'); // Đường dẫn đến dữ liệu bạn muốn đọc
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const dataObject = snapshot.val();
            setData(dataObject)


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
                setDataTables(reversedData)
            } catch (error) {

                console.error('Error processing data:', error);
            }

        });
        // Clean up subscription on unmount
        return () => unsubscribe();

    }, []);
    useEffect(() => {
        if (data?.O_CT?.data === "0") {
            setKey(prevKey => prevKey + 1); // Trigger component remount when data changes
        }
    }, [data]);
    const handlerClick = () => {
        const dbRef = ref(database, 'MONITOR/O_Baochay/data');
        const dbRef2 = ref(database, 'CONTROL/NNKC/data');
        const value = data?.O_Baochay?.data === "1" ? "0" : "1"
        set(dbRef, value)
            .then(() => {
                if (value === "1")
                    message.error("Warning !");
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

                <div className="card-chuong top-left">   <img src={data?.O_Baochay?.data === "1" || data?.O_CT?.data === "0" ? chuonggif : chuong} alt="Sample Image" /></div>
                <div className="card top-right">{data?.O_Pa?.data} bar</div>
                <div className="card top-left2">
                    <Input value={value1}
                        onChange={handleChange1} />
                    <hr />
                    <Input value={value2}
                        onChange={handleChange2} />
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

                {data?.O_CT?.data === "0" ? (<>
                    <audio autoPlay loop src={ring}></audio>
                    <div className="card right-center">
                        <img src={mua} alt="Sample Image" />
                    </div>
                    <div className="card right-center1">
                        <img src={mua} alt="Sample Image" />
                    </div>
                    <div className="card right-center2">
                        <img src={mua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire1">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire2">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire3">
                        <img src={lua} alt="Sample Image" />
                    </div>

                    <div className="card bottom-fire4">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire5">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire6">
                        <img src={lua} alt="Sample Image" />
                    </div>
                    <div className="card bottom-fire7">
                        <img src={lua} alt="Sample Image" />
                    </div>

                    <Alert
                        message="Fire warning !!!"

                        type="error"
                        showIcon
                        closable
                    />
                </>) : ""}
                {data?.O_tank?.data === "0" && (<Alert
                    message="Tank warning !!!"
                    type="error"
                    showIcon
                    closable
                />)}

            </div>
            <Table dataSource={dataTables} columns={columns} pagination={{ pageSize: 8 }} />;
        </div>

    </>);
}

export default Home;
