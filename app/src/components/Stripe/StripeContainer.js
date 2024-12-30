import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PUBLIC_KEY =
  "pk_test_51NXhtjSF14oWiNprhO18cGnAHNi0rmUkIoEc6BWlvxGn6MTJtqQKNijeRIwbDfKEiFfAIwRcgNkw2yB7pClB2Xex00p6eYW06o";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <paymentForm />
    </Elements>
  );
}
