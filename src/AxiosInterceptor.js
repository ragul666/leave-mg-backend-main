// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AxiosInterceptor() {
//   let navigate = useNavigate();

//   axios.interceptors.response.use(
//     (response) => {
//       if (response.data.code === 200) {
//         alert("success");
//       } else if (response.data.code === 400) {
//         alert("failure");
//       } else return response;
//     },
//     (error) => {
//       return Promise.reject(error.message);
//     }
//   );
// }

// export default AxiosInterceptor;
