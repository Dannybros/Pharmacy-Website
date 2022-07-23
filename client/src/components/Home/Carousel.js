import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Home.scss';

const CarouselBox=({CarouselItem, data, arrow})=>{
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
            items: 1
        }
    };
  return (
    <Carousel 
        swipeable={true}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
        {data.map((item, i)=>(
            <CarouselItem key={i} data={item}/>
        ))}
        
    </Carousel>
  )
}

export default CarouselBox;

