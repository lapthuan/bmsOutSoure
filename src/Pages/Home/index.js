import "./home.css"
import img from "../../Image/img1.jpg"
import chuong from "../../Image/chuong.png"
import chuonggif from "../../Image/chuong.gif"
import imgbaochay from "../../Image/baochao.png"
import mua from "../../Image/mua.gif"
import { Alert, Input, message } from "antd"
import LiquidFillGauge from "react-liquid-gauge"
import { useEffect, useState } from "react"
import { database } from "../../connect/firebase"
import { onValue, ref, set } from "firebase/database"


const Home = () => {
    const [data, setData] = useState({})

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

    const handlerClick = () => {
        const dbRef = ref(database, 'MONITOR/O_Baochay/data');
        const value = data?.O_Baochay?.data === "1" ? "0" : "1"
        set(dbRef, value)
            .then(() => {
                if (value === "1")
                    message.warning("Warning !");
            })
            .catch((error) => {
                message.error(`Failed to update data: ${error.message}`);
            });

    }
    return (<>
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
            </div>

        </div>
    </>);
}

export default Home;