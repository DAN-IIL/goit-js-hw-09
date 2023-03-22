import Notiflix from 'notiflix';

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const promiseDelay = delay + i * step;
    const promise = createPromise(position, promiseDelay);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};