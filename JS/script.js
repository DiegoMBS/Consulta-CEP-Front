document.getElementById('consultarBtn').addEventListener('click', async () => {
    const cep = document.getElementById('cepInput').value.trim();
    const resultDiv = document.getElementById('result');
    const errorMessage = document.getElementById('errorMessage');

    // Limpa o campo de CEP
    document.getElementById('cepInput').value = '';

    // Limpa mensagens anteriores
    resultDiv.innerHTML = '';
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden'); // Oculta o elemento de erro

    if (!cep || !/^\d{8}$/.test(cep)) {
        errorMessage.textContent = 'Por favor, insira um CEP válido com 8 números.';
        errorMessage.classList.remove('hidden'); // Mostra o elemento de erro
        return;
    }

    try {
        const response = await fetch(`https://consultar-cep-d6179178d3a0.herokuapp.com/consulta-cep/${cep}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP. Verifique se o servidor está ativo.');
        }

        const data = await response.json();

        // Renderiza os dados em um formato de tabela
        resultDiv.innerHTML = `
                    <table>
                        <tr><th>Campo</th><th>Valor</th></tr>
                        <tr><td>CEP</td><td>${data.cep || '-'}</td></tr>
                        <tr><td>Logradouro</td><td>${data.logradouro || '-'}</td></tr>
                        <tr><td>Complemento</td><td>${data.complemento || '-'}</td></tr>
                        <tr><td>Bairro</td><td>${data.bairro || '-'}</td></tr>
                        <tr><td>Localidade</td><td>${data.localidade || '-'}</td></tr>
                        <tr><td>UF</td><td>${data.uf || '-'}</td></tr>
                        <tr><td>IBGE</td><td>${data.ibge || '-'}</td></tr>
                        <tr><td>GIA</td><td>${data.gia || '-'}</td></tr>
                        <tr><td>DDD</td><td>${data.ddd || '-'}</td></tr>
                        <tr><td>SIAFI</td><td>${data.siafi || '-'}</td></tr>
                    </table>
                `;
    } catch (error) {
        console.error(error);
        errorMessage.textContent = 'Erro ao buscar os dados. Verifique se o servidor está rodando corretamente.';
        errorMessage.classList.remove('hidden'); // Mostra o elemento de erro
    }
});
document.getElementById('cepInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('consultarBtn').click();
    }
});