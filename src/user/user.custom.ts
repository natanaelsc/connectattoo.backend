/* eslint-disable prettier/prettier */
const getValue = async () => {
  const urlEndpointCurrentKey = 'http://localhost:3000/url';
  const urlSite = window.location.href;
  const data = { urlSite };


  try {
     await fetch(urlEndpointCurrentKey, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    throw new Error(`Erro ao enviar a requisição POST: ${error.message}`);

}

};

getValue();
