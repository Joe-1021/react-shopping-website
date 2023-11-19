// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


function SwiperBanner({banner}){
    return (
        <Swiper
            modules={[Autoplay,Navigation, Pagination]}
            spaceBetween={50} //Slide之間的距離 
            slidesPerView={1} //一頁顯示幾個slide
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
        >
            {banner.map((i)=>{
                return(
                    <SwiperSlide key={i.id}>
                        <img className='w-100 object-cover img-fluid' style={{height:'95vh'}} src={i.image} alt="全新開幕" />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default SwiperBanner

