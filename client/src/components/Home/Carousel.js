import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Home.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CarouselBox=()=>{
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
  return (
    <Carousel 
        responsive={responsive}
        ssr={true}
        infinite={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
        <div className="carousel__item">
            <div className="item_img_box" style={{background:"url('https://picsum.photos/200/300')"}}>
                <button className="btn_view_item"><VisibilityIcon className="eye_icon"/> View Item</button>
            </div>
            <div className="item_info_box">
                <span>Title Title TitleTitle Title Title TitleTitle</span>
                <span>(20$)</span>
            </div>
        </div>
        
        <div className="carousel__item">
            <div className="item_img_box" style={{background:"url('https://picsum.photos/200/300')"}}>
                <button className="btn_view_item"><VisibilityIcon className="eye_icon"/> View Item</button>
            </div>
            <div className="item_info_box">
                <span>Title Title TitleTitle Title Title TitleTitle</span>
                <span>(20$)</span>
            </div>
        </div>

        <div className="carousel__item">
            <div className="item_img_box" style={{background:"url('https://picsum.photos/200/300')"}}>
                <button className="btn_view_item"><VisibilityIcon className="eye_icon"/> View Item</button>
            </div>
            <div className="item_info_box">
                <span>Title Title TitleTitle Title Title TitleTitle</span>
                <span>(20$)</span>
            </div>
        </div>

        <div className="carousel__item">
            <div className="item_img_box" style={{background:"url('https://picsum.photos/200/300')"}}>
                <button className="btn_view_item"><VisibilityIcon className="eye_icon"/> View Item</button>
            </div>
            <div className="item_info_box">
                <span>Title Title TitleTitle Title Title TitleTitle</span>
                <span>(20$)</span>
            </div>
        </div>
    </Carousel>
  )
}

export default CarouselBox;

