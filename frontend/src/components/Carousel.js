// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { rankingAsync } from "../store/accountSaga";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Carousel() {
//   useEffect(() => {
//     dispatch(rankingAsync());
//   }, []);
//   const dispatch = useDispatch();
//   const rankinglist = useSelector((state) => state.account.rankinglist);
//   // console.log(rankinglist[0].user.userId);
//   // console.log(rankinglist[0].user.userId);
//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: false,
//   };
//   return (
//     <div className="carousel">
//       <Slider {...settings}>
//         {/* <div>
//           {rankinglist[0].user.userId}
//           {rankinglist[0].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[1].user.userId}
//           {rankinglist[1].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[2].user.userId}
//           {rankinglist[2].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[3].user.userId}
//           {rankinglist[3].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[4].user.userId}
//           {rankinglist[4].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[5].user.userId}
//           {rankinglist[5].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[6].user.userId}
//           {rankinglist[6].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[7].user.userId}
//           {rankinglist[7].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[8].user.userId}
//           {rankinglist[8].user.imagePath}
//         </div>
//         <div>
//           {rankinglist[9].user.userId}
//           {rankinglist[9].user.imagePath}
//         </div> */}
//         <div>Slide 1</div>
//         <div>Slide 2</div>
//         <div>Slide 3</div>
//         <div>Slide 4</div>
//         <div>Slide 5</div>
//         <div>Slide 6</div>
//         <div>Slide 7</div>
//         <div>Slide 8</div>
//         <div>Slide 9</div>
//       </Slider>
//     </div>
//   );
// }
// export default Carousel;
