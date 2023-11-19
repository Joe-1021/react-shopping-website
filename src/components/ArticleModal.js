import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MessageContext,handleSuccessMessage,handleErrorMessage } from "../store/messageStore";


function ArticleModal({ closeArticleModal,getArticles,type,tempArticle}) {
    const [tempData, setTempData] = useState({
        "title": "",
        "description": "",
        "image": "",
        "tag": [],
        "create_at": "",
        "author": "",
        "isPublic": false,
        "content": ""
    });

    const [,dispatch] = useContext(MessageContext);
    const [tempTag,setTempTag] = useState('');

    const getArticle =async(id)=>{
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`);
        setTempData(res.data.article)
    }

    useEffect(()=>{
        if(type==='create'){
            setTempData({
                "title": "",
                "description": "",
                "image": "",
                "tag": [],
                "create_at": "",
                "author": "",
                "isPublic": false,
                "content": ""
            })
            setDate(new Date());
        }else if(type='edit'){
            getArticle(tempArticle.id);
            setDate(new Date(tempArticle.create_at))
        }
    },[type,tempArticle])


    const [date,setDate] = useState(new Date());

    const handleChange =(e)=>{
        const {name,value} = e.target;
        if(name ==='isPublic'){
            setTempData({
                ...tempData,
                [name]: e.target.checked
            })
        }else{
            setTempData({
                ...tempData,
                [name]:value
            })
        }
    }

    const addTag = ()=>{
        if(tempTag === ''){
            return
        }
        const arr = tempData.tag || [];
        arr.push(tempTag.trim());
        setTempData({
            ...tempData,
            tag:arr
        })
        setTempTag('')
    }

    const removeTag =(i)=>{
        tempData.tag?.splice(i,1);
        const arr = tempData.tag || [];
        setTempData({
            ...tempData,
            tag:arr
        })
    }


    const submit = async()=>{
        try {
            let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`;
            let method ='post';
            if(type==='edit'){
                api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${tempArticle.id}`;
                method='put'
            }
            const res = await axios[method](api,{
                data:{
                    ...tempData,
                    create_at:date.getTime(),
                }
            })
            console.log(res);
            handleSuccessMessage(dispatch, res);
            closeArticleModal();
            getArticles();
        } catch (error) {
            console.log(error);
            handleErrorMessage(dispatch, error);
        }
        
    }



    return (
        <div className="modal fade" id="articleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            {type ==='create' ? '建立新商品' :`編輯${tempData.title}`}
                        </h1>
                        <button type="button" className="btn-close" aria-label="Close"
                            onClick={closeArticleModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='form-group mb-2'>
                                    <label className='w-100 mb-2' htmlFor='image'>
                                        輸入圖片網址
                                        <input
                                            type='text'
                                            name='imageUrl'
                                            id='image'
                                            placeholder='請輸入圖片連結'
                                            className='form-control'
                                        onChange={handleChange}
                                         value={tempData.imageUrl}
                                        />
                                    </label>
                                    <img
                                        src={tempData.imageUrl} 
                                        alt="" className="object-cover" width="250" />
                                </div>
                            </div>
                            <div className='col-sm-8'>
                                {/* <pre>{JSON.stringify(tempData)}</pre> */}
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='title'>
                                        標題
                                        <input
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='請輸入標題'
                                            className='form-control'
                                        onChange={handleChange}
                                        value={tempData.title}
                                        />
                                    </label>
                                </div>
                                <div className='row'>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-100' htmlFor='author'>
                                            作者
                                            <input
                                                type='text'
                                                id='author'
                                                name='author'
                                                placeholder='請輸入作者名稱'
                                                className='form-control'
                                                onChange={handleChange}
                                                value={tempData.author}
                                            />
                                        </label>
                                    </div>
                                    <div className='form-group mb-2 col-md-6'>
                                        <label className='w-75' htmlFor='tag'>
                                            標籤
                                            <input
                                                type='text'
                                                id='tag'
                                                name='tag'
                                                placeholder='請輸入標籤'
                                                className='form-control'
                                                onChange={(e)=>setTempTag(e.target.value)}
                                                value={tempTag}
                                            />
                                        </label>
                                        <button type="button" className="btn btn-dark w-25" onClick={addTag}>新增</button>
                                    </div>
                                </div>
                                    {tempData.tag.map((tag,i)=>{
                                        return( 
                                        
                                            <div className="d-inline-block mb-3 me-4"  key={i}>
                                                <p className="mb-0">{`標籤#${i+1}`}</p>
                                                <span className="badge bg-success py-2 px-4  position-relative" style={{borderRadius:"10px"}}>
                                                {`${tag}`}
                                                <button type="button" className="btn position-absolute top-0 start-100 translate-middle">
                                                    <i className="bi bi-x text-dark" onClick={()=>removeTag(i)}></i>
                                                </button>
                                            </span> 
                                            </div>
                                            
                                        
                                        )
                                    })}

                                    
                                <hr />
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='description'>
                                        文章描述
                                        <textarea
                                            type='text'
                                            id='description'
                                            name='description'
                                            placeholder='請輸入產品描述'
                                            className='form-control'
                                        onChange={handleChange}
                                        value={tempData.description}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='w-100' htmlFor='content'>
                                        文章內容
                                        <textarea
                                            type='text'
                                            id='content'
                                            name='content'
                                            placeholder='請輸入產品說明內容'
                                            className='form-control'
                                        onChange={handleChange}
                                        value={tempData.content}
                                        />
                                    </label>
                                </div>
                                <div className='form-group mb-2'>
                                    <div className='form-check'>
                                        <label
                                            className='w-100 form-check-label'
                                            htmlFor='isPublic'
                                        >
                                            是否公開
                                            <input
                                                type='checkbox'
                                                id='isPublic'
                                                name='isPublic'
                                                className='form-check-input'
                                            onChange={handleChange}
                                            checked={tempData.isPublic}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={closeArticleModal}
                        >關閉</button>
                        <button type="button" className="btn btn-primary"
                        onClick={submit}
                        >儲存</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleModal