import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveFormState = throttle(() => {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  const { email, message } = JSON.parse(savedData);
  form.elements.email.value = email || '';
  form.elements.message.value = message || '';
}

form.addEventListener('input', saveFormState);

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
