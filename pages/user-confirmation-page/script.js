const content = document.querySelector('.content');
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const timeout = 8000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const validateConfirmationToken = await fetch(
    `http://localhost:3000/api/v1/auth/confirm?token=${token}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      method: 'GET',
    },
  );
  clearTimeout(id);
  if (validateConfirmationToken.ok || validateConfirmationToken.status == 403) {
    return (document.body.style = 'visibility: visible');
  }
  content.innerHTML = '';
  document.body.style = 'visibility: visible';
  return content.insertAdjacentHTML(
    'beforeend',
    `
    <p>Ops! O token fornecido não é válido ou está expirado. Solicite um novo email de confirmação.</p>`,
  );
});
