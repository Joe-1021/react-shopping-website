import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

function Articles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({})
    const getArticles = async (page = 1) => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles?page=${page}`);
            setArticles(res.data.articles);
            setPagination(res.data.pagination)
            console.log(res.data.articles);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getArticles(1);
    }, []);

    // function regularDate(date) {
    //     return (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
    // };

    const sortArticles = articles.sort((a, b) => b.create_at - a.create_at);



    return (
        <div className="container mt-md-5 mt-3 mb-7 full-height">
            <Loading isLoading={isLoading} />
            {sortArticles.map((article) => {
                return (
                    <div key={article.id}>
                        <Link to={`/article/${article.id}`} className="card article-card mb-3" >
                            <div className="row g-0">
                                <div className="col-lg-4">
                                    {article.imageUrl ?
                                        ( <>
                                            <img src={article.imageUrl} className="img-fluid object-cover rounded-start h-100" alt="article-image"  style={{height:'250px'}}/>
                                          </>)
                                         :
                                        (
                                            <>
                                                <img src="https://images.pexels.com/photos/4106710/pexels-photo-4106710.jpeg?auto=compress&cs=tinysrgb&w=1600" className="img-fluid object-cover rounded-start w-100" alt="article-image" style={{height:'250px'}}/>
                                            </>
                                        )}
                                </div>
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{article.title}</h2>
                                        <p className="card-text mb-0"><small className="text-muted"> {article.author} | {new Date(article.create_at).toLocaleDateString()}</small></p>
                                        {article.tag?.map((tag, i) => {
                                            return (
                                                <span className="bg-success badge p-2 mx-1 mt-1 mb-3 " key={i}><i className="bi bi-tag me-2"></i>{tag}</span>
                                            )
                                        })}
                                        <h4 className="card-text multiline-ellipsis" style={{ maxHeight: '120px' }}>{article.description}</h4>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
            <nav className="d-flex justify-content-center">
                <Pagination pagination={pagination} changePage={getArticles} />
            </nav>
        </div>
    )
}

export default Articles