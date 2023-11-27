import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Message2 from "../../components/Message2";
import { MessageContext,messageReducer,initState } from "../../store/messageStore";

function FrontLayout() {

    const [ cartData,setCartData] = useState({});
    const [favoriteData,setFavoriteData] = useState([]);
    const reducer = useReducer(messageReducer,initState)

    const getCart = async()=>{
        try {
            const res= await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
            setCartData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCart()
    },[])

    return (
        <>
            {/* <Navbar cartData={cartData}/> */}
            <Navbar2/>
            <MessageContext.Provider value={reducer}>
                <Message2 />
                <Outlet context={{ getCart , cartData , favoriteData,setFavoriteData}}>
                </Outlet>
            </MessageContext.Provider>
            <Footer />
        </>
    )
}

export default FrontLayout