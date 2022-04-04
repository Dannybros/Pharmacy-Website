import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


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
        <div style={{border:"1px solid"}}>Item 1</div>
        <div style={{border:"1px solid"}}>Item 2</div>
        <div style={{border:"1px solid"}}>Item 3</div>
        <div style={{border:"1px solid"}}>Item 4</div>
    </Carousel>
  )
}

export default CarouselBox;

