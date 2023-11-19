import axios from "axios";
import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcrumb";
function ArticleDetail(){
    const [article,setArticle]= useState({});
    const { id } = useParams();
    const [isLoading,setIsLoading] = useState(false);

    const getArticle = async (id)=>{
        try {
            setIsLoading(true);
            const res= await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/article/${id}`);
            setArticle(res.data.article);
            //console.log(res.data.article)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        getArticle(id);
    },[])
    return(
        <div className="container full-height">
            <Loading isLoading={isLoading} />
            <div className="py-3">
                <Breadcrumb link={'/articles'} text={'文章'} page ={article}/>
                {article.imageUrl?(
                    <>
                        <img src={article.imageUrl} alt="article-image" className="object-cover w-100 " style={{maxHeight:'500px'}}/>
                    </>
                ):(
                    <>
                        <img src="https://images.pexels.com/photos/4106710/pexels-photo-4106710.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="article-image" className="object-cover w-100 " style={{maxHeight:'500px'}}/>
                    </>
                )}  
                <div className="py-6 px-md-6">
                    <h1 className="text-center py-3 ">{article.title}</h1>
                    <h2 className="mb-3">{article.description}</h2>
                    <p className="mb-3">{article.content}</p>     
                </div>
            </div>  
            
           
        </div>
    )
}

export default ArticleDetail