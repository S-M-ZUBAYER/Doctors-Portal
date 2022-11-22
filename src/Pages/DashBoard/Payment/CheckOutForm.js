import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';


const CheckOutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { price, patient, email, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://y-mocha-delta.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`

            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe && !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
            setProcessing(true);
        }

        setSuccess('');
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            console.log('card Info', card)
            //now term to store payment info in database
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id

            }
            fetch('https://y-mocha-delta.vercel.app/payments', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        setSuccess('congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })

        }
        setProcessing(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm mt-4 btn-primary"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <>
                    <p className="text-green-500">{success}</p>
                    <p>Your transactionId <span className="font-bold">{transactionId}</span></p>
                </>
            }
        </>
    );
};

export default CheckOutForm;