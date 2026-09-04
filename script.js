const feedbackForm = document.querySelector('#feedback-form');
const feedbackInput = document.querySelector('#feedback');
const successMessage = document.querySelector('#success-message');
const errorMessage = document.querySelector('#error-message');
const submitButton = document.querySelector('button[form="feedback-form"]');

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  successMessage.hidden = true;
  errorMessage.hidden = true;

  fetch(feedbackForm.action, {
    method: 'POST',
    body: new FormData(feedbackForm),
    headers: { Accept: 'application/json' }
  })
    .then((response) => {
      if (!response.ok) throw new Error('Email request failed');
      feedbackInput.value = '';
    })
    .catch(() => {
      errorMessage.hidden = false;
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    });
});
