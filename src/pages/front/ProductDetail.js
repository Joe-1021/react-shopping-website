import { useEffect, useState } from "react";
import axios from 'axios';
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcrumb";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartQty, setCartQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    setIsLoading(true)
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    setProduct(res.data.product);
    setIsLoading(false)
  };

  const AddToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQty,
      }
    }
    setIsLoading(true)
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data)
      //console.log(res);
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    };

  }

  useEffect(() => {
    getProduct(id)
  }, [id])

  return (
    <div className="container py-3">
      <Loading isLoading={isLoading}></Loading>
      <Breadcrumb link={'/products'} text={'產品列表'} page ={product}/>
      <div style={{ minHeight: '400px', backgroundImage: `url(${product.imageUrl})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
      </div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">NT$ {product.price}</p>
          <p>{product.content} </p>
          <div className="my-4">
            <img src={product.imageUrl} alt="" className="img-fluid mt-4" />
          </div>
          <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">
              <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-minus"></i>
                </div>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    Lorem ipsum
                  </h4>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1" onClick={() => setCartQty((pre) => pre === 1 ? pre : pre - 1)}>
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
            <input type="number" className="form-control border-0 text-center my-auto shadow-none" placeholder="" value={cartQty} aria-label="Example text with button addon" aria-describedby="button-addon1" readOnly />
            <div className="input-group-append">
              <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2" onClick={() => setCartQty((pre) => pre + 1)}>
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
          <button type="button" className="btn btn-dark w-100 rounded-0 py-3" onClick={() => AddToCart()} disabled={isLoading}>加入購物車</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail