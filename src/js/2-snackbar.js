'use strict';


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");

  form.addEventListener("submit", handleSubmit);
});

async function handleSubmit(event) {
  event.preventDefault();

  const delayInput = event.target.querySelector("[name='delay']");
  const stateInput = event.target.querySelector("[name='state']:checked");

  const delay = parseInt(delayInput.value, 10);
  const state = stateInput ? stateInput.value : null;

  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: "Error",
      message: "Please enter a valid positive delay value.",
    });
    return;
  }

  try {
    const result = await createPromise(delay, state);
    handleFulfilledResult(delay);
  } catch (error) {
    handleRejectedResult(delay);
  }
  event.target.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (state === "rejected") {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function handleFulfilledResult(delay) {
  iziToast.success({
    title: "Success",
    message: `✅ Fulfilled promise in ${delay}ms`,
  });
}

function handleRejectedResult(delay) {
  iziToast.error({
    title: "Error",
    message: `❌ Rejected promise in ${delay}ms`,
  });
}