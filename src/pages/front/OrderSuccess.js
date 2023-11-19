import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Stepper } from 'react-form-stepper';
import Swal from 'sweetalert2';
import Loading from "../../components/Loading";

function OrderSuccess() {

    const {orderId} = useParams();
    const [orderData, setOrderData] = useState({});
    const [isLoading,setIsLoading] = useState(false)

    const OrderData = async (orderId) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
        setOrderData(res.data.order);
        //console.log(res.data.order)
    }

    const payOrder = async()=>{
        const data ={
            order:orderData
        }
        try {
            setIsLoading(true)
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`,data);
            Swal.fire({
                title: 'Success!',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'ok'
              })
            OrderData(orderId);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Fail!',
                text: `${error.data.message}`,
                icon: 'warning',
                confirmButtonText: 'ok'
              })
        }
    }

    useEffect(() => {
        OrderData(orderId);      
    }, [orderId])

    const date = new Date(orderData.create_at*1000);
    const regularDate = (date.getFullYear()) + '/' + (date.getMonth()+1)+ '/' + (date.getDate());

    return (
        <div className="container">
            <Loading isLoading={isLoading} />
            <Stepper
                activeStep={2}
                steps={[{ label: '確認商品' }, { label: '填寫資料' }, { label: '完成訂單' }]}
            />
            <div className="mt-5 mb-7 full-height">
                <div className="row">
                    <div className="col-md-6">
                        <h2>完成訂單 <i className="bi bi-check-circle" style={{color:'green'}}></i></h2>
                        <p>親愛的顧客，感謝您在本平台訂購商品。我們非常感激您對我們的信任和支持，讓我們有機會為您提供更優質的服務。</p>
                    </div>
                    <div className="col-md-6">
                        <div className="card rounded-0 py-4">
                            <div className="card-header border-bottom-0 bg-white px-4 py-0">
                                <h2>訂單內容</h2>
                            </div>
                            <div className="card-body px-4 py-0">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>訂單編號</td>
                                            <td>{orderData.id}</td>
                                        </tr>
                                        <tr>
                                            <td>下單時間</td>
                                            <td>{regularDate}</td>
                                        </tr>
                                        <tr>
                                            <td>付款狀態</td>
                                            <td><p className={`${orderData.is_paid ? 'text-success':'text-danger'} mb-0 fw-bold`}>{orderData.is_paid ? '已付款':'未付款'}</p></td>
                                        </tr>
                                        <tr>
                                            <td>姓名</td>
                                            <td>{orderData?.user?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{orderData?.user?.email}</td>
                                        </tr>
                                        <tr>
                                            <td>聯絡電話</td>
                                            <td>{orderData?.user?.tel}</td>
                                        </tr>
                                        <tr>
                                            <td>配送地址</td>
                                            <td>{orderData?.user?.address}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <ul className="list-group list-group-flush">
                                    {Object.values(orderData?.products || {}).map((i) => {
                                        return (
                                            <li className="list-group-item px-0" key={i.id}>
                                                <div className="d-flex mt-2">
                                                    <img src={i.product.imageUrl} alt="" className="me-2" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                    <div className="w-100 d-flex flex-column">
                                                        <div className="d-flex justify-content-between fw-bold">
                                                            <h5>{i.product.title}</h5>
                                                            <p className="mb-0">x {i.qty}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-auto">
                                                            <p className="text-muted mb-0"><small>NT$ {i.product.price}</small></p>
                                                            <p className="mb-0">NT$ {i.final_total}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    <li className='list-group-item px-0 pb-0'>
                                        <div className='d-flex justify-content-between mt-2'>
                                            <p className='mb-0 h4 fw-bold'>總計</p>
                                            <p className='mb-0 h4 fw-bold'>NT${orderData.total}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <Link to='/' className="btn btn-outline-dark me-2 rounded px-4">回首頁</Link>
                        {orderData.is_paid?
                        (<>

                        </>)
                        :(<>
                            <Link to='' className="btn btn-outline-dark me-2 rounded px-4" onClick={()=>payOrder(orderId)}>前往付款</Link>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess