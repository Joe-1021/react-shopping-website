import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";


function Favorite() {
    const { favoriteData } = useOutletContext();

    return (
        <div className="container">
            <div className="mt-md-5 mt-3 mb-7 full-height">
                {favoriteData.length === 0 ? (
                    <>
                        <div className="alert alert-danger" role="alert">
                            尚未加入我的最愛商品
                        </div>
                        <Link className="btn btn-dark w-100 mt-4 rounded-0 py-3" to='/products'>去購物</Link>
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