import ReactLoading from 'react-loading';

function Loading ({ isLoading }){
    return(
        <>
            {isLoading && (
                <div className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center" style={{backgroundColor:'rgba(0,0,0,0.5)',zIndex:1000,backdropFilter:'blur(3px)'}}>
                <ReactLoading type='bars' color='white' height={60} width={100} />
                </div>
            )}
        </>
        
    )
}

export default Loading