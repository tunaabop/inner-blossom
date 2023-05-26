// import React, { useEffect, useState } from "react";

// const YogaContent = () => {
//   const [yoga, setYoga] = useState([]);

//   //fetch the api
//   const fetchData = async () => {
//     const response = await fetch("");
//     const data = await response.json();
//     setYoga(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   //returns the yoga pose image
//   return (
//     <div>
//       <h1>Yoga Poses</h1>
//       <ul>
//         {poses.map((item) => (
//           <li key={item.id}>
//             <img src={item.image} alt={item.name} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default YogaContent;

// var myPix = new Array("images/lion.jpg","images/tiger.jpg","images/bear.jpg");

// function choosePic() {
//      var randomNum = Math.floor(Math.random() * myPix.length);
//      document.getElementById("myPicture").src = myPix[randomNum];