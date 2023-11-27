
import { NavLink } from "react-router-dom";


function Navbar ({ cartData }){
    return (
            <div className="bg-white sticky-top">
                    <nav className="navbar px-5 navbar-expand-lg navbar-light bg-white">
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <NavLink className="navbar-brand position-absolute" to='/' style={{left: '50%', transform: 'translate(-50%, -50%)', top: '50%'}}>
                            Zugether
                        </NavLink>
                        <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink className="nav-link ps-0" to='/products'>
                                        產品列表
                                    </NavLink>
                                </li>
                                <li className="nav-item active">
                                    <NavLink className="nav-link ps-0" to='/favorite'>
                                        我的最愛
                                    </NavLink>
                                </li>
                                <li className="nav-item active">
                                    <NavLink className="nav-link ps-0" to='/articles'>
                                        文章
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex">
                            <NavLink to='/cart' className="nav-link position-relative" >
                                <i className="bi bi-cart4"></i>
                                {
                                cartData?.carts?.length !== 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartData?.carts?.length}
                                    </span>
                                )}
                            </NavLink>
                        </div>
                    </nav>
            </div>
            
    )
}

export default Navbar