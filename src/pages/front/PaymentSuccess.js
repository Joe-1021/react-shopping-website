import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PaymentSuccess() {

    const {orderId} = useParams();
    const [orderData, setOrderData] = useState({});

    const OrderData = async (orderId) => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
        setOrderData(res.data.order);
        //console.log(res.data.order)
    }

    useEffect(() => {
        OrderData(orderId);      
    }, [orderId])

    const date = new Date(orderData.create_at*1000);
    const regularDate = (date.getFullYear()) + '-' + (date.getMonth()+1)+ '-' + (date.getDate());

    return (
        <div className="container">
            <div style={{minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
      backgroundPosition: 'center center'}}>
            </div>
            <div className="mt-5 mb-7 full-height">
                <div className="row">
                    <div className="col-md-6">
                        <h2>付款成功 <i className="bi bi-check-circle" style={{color:'green'}}></i></h2>
                        <p>親愛的顧客，感謝您在本平台訂購商品。我們非常感激您對我們的信任和支持，讓我們有機會為您提供更優質的服務。</p>
                        <Link to='/' className="btn btn-outline-dark me-2 rounded-0 mb-4">回首頁</Link>
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
                                            <td>{orderData.is_paid? '已付款':'未付款' }</td>
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
                                            <td>電話</td>
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
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess