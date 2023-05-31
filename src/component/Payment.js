import React, { useState} from "react";
import { getAmount } from "../services/PaymentService";

function Payment(){

    const [amt,setAmt]=useState({
        amount: ''
    })


    function handleAmount(e){
        const value=e.target.value
        setAmt({
            amount: value
        })
    }

    function checkoutPayment(e){
        e.preventDefault()

        getAmount(amt).then((res)=>{
            // console.log(res.data)
            if(res.data.status == "created"){
                // open payment form
                let options={
                    key: "your_key_id",
                    amount: res.data.amount,
                    currency: "INR",
                    name: "Gaming Web Money",
                    description: "Test Transaction",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCv0Qo8FjFV7nONQ3hUhkE55DJNxClV0ixDILqyldYUg&s",
                    order_id: res.data.id,
                    handler: function (res){
                        console.log(res.razorpay_payment_id);
                        console.log(res.razorpay_order_id);
                        console.log(res.razorpay_signature);
                        alert("Payment Successfull...!");
                    },
                    prefill: {
                        name: "",
                        email: "",
                        contact: ""
                    },
                    notes: {
                        address: "Gaming Website"
                    },
                    theme: {
                        color: "#3399cc"
                    }
                }
                let rzp = new window.Razorpay(options);
                
                rzp.on('payment.failed', function (res){
                        console.log(res.error.code);
                        console.log(res.error.description);
                        console.log(res.error.source);
                        console.log(res.error.step);
                        console.log(res.error.reason);
                        console.log(res.error.metadata.order_id);
                        console.log(res.error.metadata.payment_id);
                        alert("Opps! Payment failed..!")
                });

                rzp.open();

            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <div className="container text-center mt-5">
                {/* <h3>{amt.amount}</h3> */}
                <form onSubmit={checkoutPayment}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter Amount</label>
                        <input type="number" name="amount" className="form-control mt-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Amount" onChange={(e)=>handleAmount(e)} value={amt.value}/>
                    </div>
                
                    <button type="submit" className="btn btn-success mt-4">Checkout</button>
     
                </form>
            </div>
        </>
    )
}

export default Payment