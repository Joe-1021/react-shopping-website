import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Pagination from "../../components/Pagination";
import OrderModal from "../../components/OrderModal";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";



function AdminOrders(){
    const [orders,setOrders] = useState([]);
    const [pagination,setPagination] = useState({});
    const [isLoading,setIsLoading]= useState(false);
    const [tempOrder,setTempOrder] = useState({})
    const orderModal = useRef(null);
    const deleteModal = useRef(null)

    const getOrders = async(page=1)=>{
        setIsLoading(true)
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`);
        //console.log(res);
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
        setIsLoading(false)
    }

    useEffect(()=>{
        orderModal.current = new Modal('#orderModal',{
            backdrop:'static'
        });
        deleteModal.current = new Modal('#deleteModal',{
            backdrop:'static'
        });
        getOrders();
    },[]);

    const openOrderModal = (order)=>{
        setTempOrder(order)
        orderModal.current.show()
    }

    const closeModal = ()=>{
        orderModal.current.hide()
    }

    const openDeletetModal = (order)=>{
        setTempOrder(order);
        deleteModal.current.show();
    }
    const closeDeletetModal = ()=>{
        deleteModal.current.hide();
    }

    const deleteOrder = async(id)=>{
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`);
            console.log(res);
            if(res.data.success){
                getOrders();
                closeDeletetModal();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
            <div className='p-3'>
                <Loading isLoading={isLoading}></Loading>
                <OrderModal closeModal={closeModal} getOrders={getOrders} tempOrder={tempOrder}/>
                <DeleteModal close={closeDeletetModal} text={tempOrder.id} handleDelete={deleteOrder} id={tempOrder.id}/>
            <h3>訂單列表</h3>
            <hr />
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>訂單id</th>
                        <th scope='col'>下單日期</th>
                        <th scope='col'>購買用戶</th>
                        <th scope='col'>訂單金額</th>
                        <th scope='col'>付款狀態</th>
                        <th scope='col'>付款日期</th>
                        <th scope='col'>留言訊息</th>
                        <th scope='col'>查看</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{new Date(order.create_at*1000).toLocaleString()}</td>     
                                <td>{order.user.name}</td>
                                <td>$ {order.total}</td>
                                <td>{order.is_paid?(<span className='text-success fw-bold'>已付款</span>):(<span className='text-danger fw-bold'>未付款</span>)}</td>
                                <td>{order.paid_date?new Date(order.paid_date * 1000).toLocaleString(): '未付款'}</td>
                                <td>{order.message? `${order.message}`:'無' }</td>
                                <td>
                                    <button type='button' className='btn btn-primary btn-sm' onClick={()=>openOrderModal(order)}>
                                        編輯
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-outline-danger btn-sm ms-2'
                                        onClick={()=>openDeletetModal(order)}  
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <Pagination pagination={pagination} changePage={getOrders}/>
        </div>
    )
}

export default AdminOrders