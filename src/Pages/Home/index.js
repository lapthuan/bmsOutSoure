import "./home.css"
import img from "../../Image/img1.jpg"
import chuong from "../../Image/chuong.png"
import chuonggif from "../../Image/chuong.gif"
import imgbaochay from "../../Image/baochao.png"
import { Input } from "antd"
import LiquidFillGauge from "react-liquid-gauge"
import { useEffect, useState } from "react"
import { database } from "../../connect/firebase"
import { onValue, ref } from "firebase/database"


const Home = () => {
    const [data, setData] = useState({})
    const [baochay, setBaoChay] = useState(false)
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
    return (<>
        <div className="body-home">
            <div className="container-img">
                <img src={img} alt="Sample Image" />

                <div className="card-chuong top-left">   <img src={baochay === true ? chuonggif : chuong} alt="Sample Image" /></div>
                <div className="card top-right">{data?.O_Pa?.data}</div>
                <div className="card top-left2">
                    <Input />
                    <hr />
                    <Input />
                </div>
                <div className="card-baochay top-left3" onClick={() => setBaoChay(!baochay)}>
                    <img src={imgbaochay} alt="Sample Image" />
                </div>
                <div className="card bottom-right">
                    <LiquidFillGauge
                        width={100}
                        height={100}
                        value={data?.O_tank?.data}
                        percent={""} />
                </div>
            </div>
        </div>
    </>);
}

export default Home;