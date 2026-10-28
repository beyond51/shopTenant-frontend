// import React from "react";
// import axios from "axios";

// const App = () => {
//   let order = {
//     customer: {
//       customerEmail: "keshav3@gmail.com",
//       customerPhone: 8085273302,
//     },
//     items: [
//       {
//         productId: "92084680-fc0e-4479-a8bc-836e9e03de9e",
//         quantity: 1,
//       },
//     ],
//     shippingAddress: {
//       address: "sdadkuhwcgn,uwe",
//       city: "bhopal",
//       state: "mp",
//       pincode: 357233,
//     },
//     shopDomain: "airjordon4.shopify.com",
//     paymentMethod: "online",
//   };

//   const payfunction = async () => {
//     let { data } = await axios.post(
//       "http://localhost:3000/api/payments/create-order",
//       order,
//     );
//     const payment = data.data;

//     const options = {
//       key: payment.key,
//       amount: payment.amount,
//       currency: payment.currency,
//       order_id: payment.razorpayOrderId,
//       name: "bolton",
//       description: payment.orderNumber,

//       handler: async function (response) {
//         await axios.post(
//           "http://localhost:3000/api/payments/verify",
//           response,
//         );
//       },
//     };
//     if (!window.Razorpay) {
//       alert("Razorpay SDK failed to load. Please refresh the page.");
//       return;
//     }

//     const razorpay = new window.Razorpay(options);

//     razorpay.on("payment.failed", function (response) {
//       console.log("FAILED", response);
//       alert("Payment Failed");
//     });
//     razorpay.open();
//   };
//   return (
//     <div>
//       <button onClick={payfunction}>pay now</button>
//     </div>
//   );
// };

// export default App;
