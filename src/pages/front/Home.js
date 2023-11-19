import { useEffect, useState } from "react"
import SwiperBanner from "../../components/SwiperBanner"
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Home() {
    const banner = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1609081144289-eacc3108cd03?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1634822929277-0c51ca0e8846?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    ]

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/?category=套房`);
            const getFourData = res.data.products.slice(0, 4);
            setProducts(getFourData);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <>
            <Loading isLoading={isLoading} />
            <SwiperBanner banner={banner} />
            <section className="py-5">
                <div className="row row-cols-1 row-cols-lg-2 g-0 ">
                    <div className="col pt-5 text-center">
                        <h1>合租室友及房源</h1>
                        <h3>更低租金、更大空間、生活更舒適</h3>
                        <h5>你可以搜尋合適的室友及房間</h5>
                        <button type="button" className="btn btn-primary rounded me-3 px-5 py-2">找室友</button>
                        <button type="button" className="btn btn-outline-primary rounded px-5 py-2">找房間</button>
                    </div>
                    <div className="col d-none d-lg-block">
                        <div>
                            <img src="https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover  rounded" alt="" style={{ height: '350px' }} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark py-5">
                <div className="container">
                    <h1 className="text-center text-white mb-5">合租好處</h1>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
                        <div className="col">
                            <div className="card position-relative bg-dark border-white p-4 rounded h-100">
                                <span className="position-absolute translate-middle-y top-0 px-2 bg-dark text-white" style={{ left: '20px' }}><h3>01</h3></span>
                                <h2 className="text-white mb-4"><i className="bi bi-coin me-3 "></i>減少房租壓力</h2>
                                <p className="mb-0 text-white">透過合租，你可以與室友共同分擔租金，節省租屋成本。</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card position-relative bg-dark border-white p-4 rounded h-100">
                                <span className="position-absolute translate-middle-y top-0 px-2 bg-dark text-white" style={{ left: '20px' }}><h3>02</h3></span>
                                <h2 className="text-white mb-4"><i className="bi bi-arrows-angle-expand me-3 "></i>更大更舒適的空間</h2>
                                <p className="mb-0 text-white">合租的房間是以兩人房起跳，您將擁有更大更舒適的生活空間。</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card position-relative bg-dark border-white p-4 rounded h-100">
                                <span className="position-absolute translate-middle-y top-0 px-2 bg-dark text-white" style={{ left: '20px' }}><h3>03</h3></span>
                                <h2 className="text-white mb-4"><i className="bi bi-person-plus me-3 "></i>豐富您的生活</h2>
                                <p className="mb-0 text-white">與室友一同生活，相互幫忙，分享彼此生活經歷，您的生活將會更加豐富。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <h2 className="mb-3">最新合租套房
                        <Link to="/products"><span className="ms-3 fs-6">查看更多</span></Link>
                    </h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">
                        {products.map((product) => {
                            return (
                                <div className="col" key={product.id}>
                                    <div className="card  mb-4 rounded ">
                                        <img src={product.imageUrl} className="card-img-top object-cover" style={{ height: '250px' }} alt="..." />
                                        <div className="card-body ">
                                            <h4 className="mb-0 mt-4">{product.title}</h4>
                                            <div className="d-flex justify-content-between mt-3">
                                                <p className="card-text text-muted mb-0 w-75">
                                                    ${product.price}/月
                                                </p>
                                            </div>
                                        </div>
                                        <Link to={`/product/${product.id}`} className="btn btn-outline-dark  text-nowrap">
                                            看房去
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section className="bg-dark py-5">
                <div className="container">
                    <h2 className="mb-3 text-white">最新室友
                        <Link to="#"><span className="ms-3 fs-6">查看更多</span></Link>
                    </h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
                        <div className="col">
                            <div className="card bg-dark mb-4 rounded border-white h-100">
                                <i className="bi bi-person-circle text-center text-white border-0" style={{ fontSize: '84px' }}></i>
                                <div className="card-body ">
                                    <h4 className="mb-3 text-white text-center">王 O 明</h4>
                                    <p className="mb-0 text-white ">
                                        大家好，目前就讀台灣大學醫學系，興趣是打籃球喜歡看NBA，歡迎大家一起來認識。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-dark mb-4 rounded border-white h-100">
                                <i className="bi bi-person-circle text-center text-white border-0" style={{ fontSize: '84px' }}></i>
                                <div className="card-body ">
                                    <h4 className="mb-3 text-white text-center">張 O 慈</h4>
                                    <p className="mb-0 text-white ">
                                        目前就讀文化大學美術系，生性害羞的女生......。
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card bg-dark mb-4 rounded border-white h-100">
                                <i className="bi bi-person-circle text-center text-white border-0" style={{ fontSize: '84px' }}></i>
                                <div className="card-body ">
                                    <h4 className="mb-3 text-white text-center">李 O </h4>
                                    <p className="mb-0 text-white ">
                                        目前就讀台中逢甲大學，目前預算8000/月，歡迎大家認領XD。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-dark mb-4 rounded border-white h-100">
                                <i className="bi bi-person-circle text-center text-white border-0" style={{ fontSize: '84px' }}></i>
                                <div className="card-body ">
                                    <h4 className="mb-3 text-white text-center">洪 O 寶</h4>
                                    <p className="mb-0 text-white ">
                                        目前職業是演員，想找桃園中壢附近的租屋處，個性好相處，不菸不酒.....
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home