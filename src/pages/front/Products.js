import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { MessageContext,favoriteSuccessMessage,favoriteCancelMessage } from "../../store/messageStore";




function Products() {

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const { favoriteData,setFavoriteData} = useOutletContext();
    const [,dispatch] = useContext(MessageContext);
    
    //const [favoriteData,setFavoriteData] = useState([])

    const getProducts = async (page = 1) => {
        setIsLoading(true)
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
        //console.log(res)
        setProducts(res.data.products);
        setPagination(res.data.pagination);
        setIsLoading(false)
    }

    useEffect(() => {
        getProducts(1);
        setFavoriteData([]);
    }, []);


    const favorite = (e,product)=>{
        if(e.target.checked){
            setFavoriteData([...favoriteData,product]);
        }else{
            setFavoriteData([...favoriteData.filter((i)=> i!==product)])
        }
    }

    return (
            <div className="container mt-md-5 mt-3 mb-7 full-height">
                <Loading isLoading={isLoading}></Loading>
                {/* <Message /> */}
                <div className="row">
                    {products.map((product) => {
                        return (
                            <div className="col-md-3" key={product.id}>
                                <div className="card border-0 mb-4 position-relative position-relative">
                                    <img src={product.imageUrl} className="card-img-top rounded-0 object-cover" height={250} alt="..." />
                                    {/* <input id="heart" type="checkbox" className="heart position-absolute end-0" onChange={(e)=>favorite(e,product)}/> */}
                                    <button type="button" className="btn  position-absolute end-0" onClick={(e)=>{
                                        e.preventDefault();
                                        if(e.target.value === undefined){
                                            if(e.target.dataset.checked === 'false'){
                                                e.target.dataset.checked = 'true'
                                                e.target.style.color='red';
                                                favoriteSuccessMessage(dispatch,product)
                                                setFavoriteData([...favoriteData,product]);
                                            }else{
                                                e.target.dataset.checked = 'false'
                                                e.target.style.color='gray';
                                                favoriteCancelMessage(dispatch,product)
                                                setFavoriteData([...favoriteData.filter((i)=> i!==product)])
                                            }
                                        }
                                        
                                    }}><i className="bi bi-heart-fill heart" data-checked='false' style={{color:'gray'}}></i></button>
                                    <div className="card-body p-0">
                                        <h4 className="mb-0 mt-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                                        <p className="text-muted mt-1">NT$ {product.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <nav className="d-flex justify-content-center">
                    <Pagination pagination={pagination} changePage={getProducts} />
                </nav>
            </div>
    )
}

export default Products