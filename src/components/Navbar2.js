import { NavLink } from "react-router-dom";
import { Collapse, Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoginModal from "./LoginModal";
import Loading from "./Loading";


function Navbar2() {
  const [name, setName] = useState('');
  const [,setToken] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const [status,setStatus] = useState(false);
  const navCollapse = useRef(null);
  const loginModal = useRef(null);
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
  

  const checkOut = async () => {
    try {
      const res = await axios.get('https://todolist-api.hexschool.io/users/checkout', {
        headers: {
          Authorization: token
        }
      })
      setName(res.data.nickname);
      setStatus(res.data.status)
    } catch (error) {
    }
  }

  const logout = async() => {
    try {
      setIsLoading(true);
      const res = await axios.post('https://todolist-api.hexschool.io/users/sign_out',
      {},
      {
        headers: {
          Authorization: token
        }
      });
      setStatus(false);
      setToken('');
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    navCollapse.current = new Collapse('#navbarNav');
    loginModal.current = new Modal('#loginModal');
  }, [])

  useEffect(()=>{
    checkOut()
  },[status])


  const closeCollapse = () => {
    navCollapse.current.hide();
  }

  const openLoginModal = () => {
    loginModal.current.show()
  }

  const closeLoginModal = () => {
    loginModal.current.hide()
  }

  


  return (
    <>
      <Loading isLoading={isLoading}/>
      <LoginModal closeLoginModal={closeLoginModal} />
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white">
        <div className="container-fluid">
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand" to='/' onClick={closeCollapse}>Zugether</NavLink>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item text-center">
                <NavLink className="nav-link" to='/products' onClick={closeCollapse}>合租</NavLink>
              </li>
              <li className="nav-item text-center ">
                <NavLink className="nav-link" to='/favorite' onClick={closeCollapse}>我的最愛</NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link" to="/articles" onClick={closeCollapse}>討論區</NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link" to='/articles' onClick={closeCollapse}>網站公告</NavLink>
              </li>
              
              {/* <li className="nav-item text-center">
                <NavLink className="nav-link" href="#" onClick={closeCollapse}>聊天室</NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink className="nav-link" href="#" onClick={closeCollapse}>會員專區</NavLink>
              </li> */}
              {status ? (<>
                <li className="nav-item">
                  <button className="btn" ><i className="bi bi-chat-left-dots"></i></button>
                </li>
                <li className="nav-item dropdown text-center">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle me-2"></i>{name}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item text-center" href="#">個人檔案</a></li>
                    {/* <li><a className="dropdown-item text-center" href="#">聊天室</a></li> */}
                    <li className="dropdown-item">
                      <button type="button" className="btn w-100" onClick={() => {
                        logout()
                        closeCollapse();
                      }}>登出</button>
                    </li>
                  </ul>
                </li>
                
                
              </>) : (<>
                <li className="nav-item text-center">
                  <button type="button" className="nav-link btn" onClick={() => {
                    closeCollapse();
                    openLoginModal();
                  }}>登入</button>
                </li>
              </>)}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar2