import { Link } from "react-router-dom"
function Breadcrumb({ link, text ,page }){
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item "><Link to = {link} >{text}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{page.title}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumb