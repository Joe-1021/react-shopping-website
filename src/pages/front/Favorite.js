import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";


function Favorite() {
    const { favoriteData } = useOutletContext();

    return (
        <div className="container">
            <div className="mt-md-5 mt-3 mb-7 full-height">
                {favoriteData.length === 0 ? (
                    <>
                        <div className="text-center">
                            <i className="bi bi-heartbreak-fill " style={{ fontSize: '100px',color:'red' }}></i>
                            <h2>尚未加入我的最愛商品!</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link className="btn btn-outline-dark mt-4 rounded p-3" to='/products'>前往購物</Link>
                        </div>
                    </>

                ) : (
                    <>
                        <div className="row">
                            {favoriteData.map((product) => {
                                return (
                                    <div className="col-md-3" key={product.id}>
                                        <div className="card border-0 mb-4 position-relative position-relative">
                                            <img src={product.imageUrl} className="card-img-top rounded-0 object-cover" height={250} alt="..." />
                                            <div className="card-body p-0">
                                                <h4 className="mb-0 mt-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                                                <p className="text-muted mt-1">NT$ {product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </>

                )}
            </div>
        </div>
    )
}

export default Favorite