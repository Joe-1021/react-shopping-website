import axios from "axios"
import { useEffect, useRef, useState } from "react";
import ArticleModal from "../../components/ArticleModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Loading from "../../components/Loading";

function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [type,setType] = useState('create');
    const [tempArticle,setTempArticle] = useState({});
    const [isLoading,setIsLoading] = useState(false);

    const articleModal = useRef(null);
    const deleteModal = useRef(null);

    const getArticles = async (page = 1) => {
        setIsLoading(true)
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`);
        console.log(res.data.articles);
        setArticles(res.data.articles);
        setPagination(res.data.pagination);
        setIsLoading(false)
    };



    useEffect(() => {
        articleModal.current = new Modal('#articleModal',{
            backdrop:'static'
        });
        deleteModal.current = new Modal('#deleteModal',{
            backdrop:'static'
        });
        getArticles();
    }, [])

    const openArticleModal = (type,article)=>{
        //console.log(article)
        setType(type);
        setTempArticle(article)
        articleModal.current.show()
    }

    const closeArticleModal = ()=>{
        articleModal.current.hide()
    }

    const openDeletetModal = (article)=>{
        setTempArticle(article);
        deleteModal.current.show();
    }
    const closeDeletetModal = ()=>{
        deleteModal.current.hide();
    }

    const deleteArticle = async(id)=>{
        try {
            setIsLoading(true)
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`);
            console.log(res);
            getArticles();
            closeDeletetModal();
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
        
    }


    return (
        <div className='p-3'>
            <ArticleModal closeArticleModal={closeArticleModal} getArticles={getArticles} type={type} tempArticle={tempArticle}
            />
            <DeleteModal close={closeDeletetModal} text={tempArticle.title} handleDelete={deleteArticle} id={tempArticle.id}/>
            <Loading isLoading={isLoading}/>
            <h3>文章列表</h3>
            <hr />
            <div className='text-end'>
                <button type='button' className='btn btn-primary btn-sm'
                onClick={()=>openArticleModal('create',{})}
                >
                    建立新文章
                </button>
            </div>
            {articles.length===0 ? (
                <>
                    <p>尚未建立文章</p>
                </>
            )
                :
                (<>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>標題</th>
                                <th scope='col'>日期</th>
                                <th scope='col'>作者</th>
                                <th scope='col'>狀態</th>
                                <th scope='col'>編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => {
                                return (
                                    <tr key={article.id}>
                                        <td>{article.title}</td>
                                        <td>{new Date(article.create_at).toLocaleDateString()}</td>
                                        <td>{article.author}</td>
                                        <td>{article.isPublic ? '公開' : '未公開'}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm'
                                             onClick={()=>openArticleModal('edit',article)}
                                            >
                                                編輯
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-outline-danger btn-sm ms-2'
                                                onClick={()=>openDeletetModal(article)}
                                            >
                                                刪除
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <Pagination pagination={pagination} changePage={getArticles}/>
                </>)}

        </div>
    )
}
export default AdminArticles