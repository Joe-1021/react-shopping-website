import axios from "axios";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Stepper } from 'react-form-stepper';

function Cart() {

    const { cartData, getCart } = useOutletContext();
    const [loadingItems, setLoadingItems] = useState([]);

    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
            getCart();
        } catch (error) {
            console.log(error)
        }
    }

    const updateCartItem = async (item, qty) => {
        const data = {
            data: {
                product_id: item.product_id,
                qty: qty
            }
        }
        setLoadingItems([...loadingItems, item.id])
        try {
            const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data);
            setLoadingItems(loadingItems.filter((loadingObj) => loadingObj !== item.id))
            getCart();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="bg-white py-5 full-height">
                {cartData?.carts?.length === 0 ? (
                    <>
                        <div className="text-center">
                            <i className="bi bi-cart-x-fill " style={{ fontSize: '100px' }}></i>
                            <h2>您的購物車沒有商品!</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link className="btn btn-outline-dark mt-4 rounded p-3" to='/products'>前往購物</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Stepper
                            activeStep={0}
                            steps={[{ label: '確認商品' }]}
                        />
                        <div className="d-flex justify-content-between">
                            <h2 className="mt-2">您的商品</h2>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3 border-0 bg-light">名稱</th>
                                    <th scope="col" className="py-3 border-0 bg-light">數量</th>
                                    <th scope="col" className="py-3 border-0 bg-light">金額</th>
                                    <th scope="col" className="py-3 border-0 bg-light text-end pe-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.carts?.map((i) => {
                                    return (
                                        <tr key={i.id}>
                                            <td className="py-2">
                                                <img src={i.product.imageUrl} alt="商品圖片" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                <div className="d-inline-block  align-middle ms-md-3">
                                                    <h5 className="fw-bold" >{i.product.title}</h5>
                                                    <p className="fs-8 text-muted">{i.product.category}</p>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="item-quantity mt-3 ">
                                                    <div className="input-group align-items-center" style={{ width: '80px' }}>
                                                        <select className="form-select" id=""
                                                            value={i.qty}
                                                            disabled={loadingItems.includes(i.id)}
                                                            onChange={
                                                                (e) => {
                                                                    updateCartItem(i, e.target.value * 1)
                                                                }
                                                            }
                                                        >
                                                            {
                                                                [...(new Array(20))].map((i, num) => {
                                                                    return (
                                                                        <option value={num + 1} key={num}>{num + 1}</option>

                                                                    )

                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <strong>NT$ {i.total}</strong>
                                            </td>
                                            <td className="align-middle text-end p-0">
                                                <button type="button" className="btn "
                                                    onClick={() => removeCartItem(i.id)}
                                                ><i className="bi bi-trash fs-4"></i></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>


                        {/* <table className="table mt-4 text-muted">
                        <tbody>
                            <tr>
                            <th scope="row" className="border-0 px-0 font-weight-normal">Lorem ipsum</th>
                            <td className="text-end border-0 px-0">NT$24,000</td>
                            </tr>
                            <tr>
                            <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">Lorem ipsum</th>
                            <td className="text-end border-0 px-0 pt-0">NT$500</td>
                            </tr>
                        </tbody>
                        </table> */}
                        <div className="d-flex justify-content-between mt-4">
                            <p className="mb-0 h4 fw-bold">總金額</p>
                            <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                        </div>
                        <Link to='/form' className="btn btn-dark w-100 mt-4 rounded-0 py-3">確認</Link>
                    </>
                )}

            </div>

        </div>
    )
}

export default Cart