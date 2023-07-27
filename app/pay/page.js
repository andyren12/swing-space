"use client";

import React from "react";
import { Stripe } from "stripe";

var stripe = Stripe(
  "pk_test_51NPxlTDQn4uWUTWnck5F2nlYOQT2dTP5kIVzzGZbxLHMR8gcLAzZ3mipRFaqhof3wakQ3oRb6DMjJZ67JFLlshSa00PpkKVXKL"
); // Use your Stripe public key
var elements = stripe.elements();

var style = {
  base: {
    color: "#32325d",
  },
};

var card = elements.create("card", { style: style });
card.mount("#card-element");

card.on("change", function (event) {
  var displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});

var form = document.getElementById("payment-form");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  stripe
    .confirmCardPayment(
      "sk_test_51NPxlTDQn4uWUTWn2koMNKlWOGBe6lfqBXajAx7adLgwp7txt5gqxrWrSMB2V8b3hJGuMcq7cXWmxNBx65iXr01m00d1QHtC4q",
      {
        payment_method: {
          card: card,
        },
      }
    )
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // The payment process has been successful
        }
      }
    });
});

function Pay() {
  return (
    <div>
      <form id="payment-form">
        <div id="card-element"></div>

        <div id="card-errors" role="alert"></div>

        <button id="submit">Pay</button>
      </form>
    </div>
  );
}

export default Pay;
