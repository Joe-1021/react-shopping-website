import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function LoginModal({ closeLoginModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginText,setLoginText] = useState('');
    const navigate = useNavigate();

    const handleLogin = async() => {
        const data = {
            'email': email,
            'password': password
        }
        console.log(data);
        try {
            const res = await axios.post('https://todolist-api.hexschool.io/users/sign_in',data);
            //console.log(res);
            const {token} = res.data;
            document.cookie = `token=${token}`;
            closeLoginModal();
            window.location.reload();
        } catch (error) {
            Swal.fire({
                title: '登入失敗!',
                text:'帳號密碼尚未註冊',
                //showConfirmButton: false,
                icon: 'warning',
            })
            setEmail('');
            setPassword('')
        }
        
    }

    const renterSignUp = () => {
        closeLoginModal();
        navigate('/signup');
    }

    const landlordSignUp = ()=>{
        closeLoginModal();
        navigate('/host-signup')
    }

    const newLoginText = loginText.slice(-2)

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-bottom-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                        <h4 className="text-center fw-bold mb-3">{newLoginText}登入</h4>
                        <div className="row row-cols-2 mb-3" id="pills-tab" role="tablist">
                            <div className="col" role="presentation">
                                <button type='button' className="btn w-100 btn-dark" onClick={(e)=>setLoginText(e.target.innerText)} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">我是房客</button>
                            </div>
                            <div className="col" role="presentation">
                                <button type='button' className="btn w-100 btn-dark" onClick={(e)=>setLoginText(e.target.innerText)} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">我是房東</button>
                            </div>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            {/* renter */}
                            <div className="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Emial</label>
                                    <input type="text" id='email' name='email' className="form-control" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">密碼</label>
                                    <input type="password" id='password' name='password' className="form-control" placeholder="6-18位數密碼" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                                <button type="button" className="btn btn-primary w-100 rounded mb-3" onClick={handleLogin}>登入</button>
                                <button type="button" className="btn btn-secondary w-100 rounded mb-3" onClick={renterSignUp} >註冊</button>
                            </div>
                            {/* landlord */}
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Emial</label>
                                    <input type="text" id='email' name='email' className="form-control" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">密碼</label>
                                    <input type="password" id='password' name='password' className="form-control" placeholder="6-18位數密碼" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                                <button type="button" className="btn btn-primary w-100 rounded mb-3" onClick={handleLogin}>登入</button>
                                <button type="button" className="btn btn-secondary w-100 rounded mb-3" onClick={landlordSignUp} >註冊</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginModal