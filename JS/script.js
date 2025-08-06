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

    // Validação mais rigorosa do CEP
    if (!cep || !/^\d{8}$/.test(cep)) {
        showError(errorMessage, 'Por favor, insira um CEP válido com 8 números.');
        return;
    }

    // Evita ataques de injeção - remove caracteres especiais
    const sanitizedCep = cep.replace(/\D/g, '');
    if (sanitizedCep.length !== 8) {
        showError(errorMessage, 'CEP deve conter exatamente 8 dígitos.');
        return;
    }

    try {
        const response = await fetchWithTimeout(
            `https://consulta-cep-com-spring-boot.vercel.app//${sanitizedCep}`,
            10000 // Timeout de 10 segundos
        );

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Verifica se o CEP não foi encontrado (campos principais são null)
        if (data.erro === true || data.cep === null || !data.logradouro) {
            showError(errorMessage, 'CEP não encontrado.');
            return;
        }

        // Consulta bem-sucedida: oculta o erro
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        // Renderiza os dados de forma segura
        renderCepData(resultDiv, data);

    } catch (error) {
        console.error('Erro na consulta:', error);
        if (error.name === 'AbortError') {
            showError(errorMessage, 'Tempo limite excedido. Tente novamente.');
        } else {
            showError(errorMessage, 'Erro ao buscar os dados. Verifique sua conexão.');
        }
    }
});

// Função para fetch com timeout
async function fetchWithTimeout(url, timeout = 8000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Função para sanitizar texto
function sanitizeText(text) {
    if (!text || text === null || text === undefined) return '-';
    return String(text).replace(/[<>]/g, '').trim() || '-';
}

// Função para mostrar erro de forma segura
function showError(errorElement, message) {
    errorElement.textContent = sanitizeText(message);
    errorElement.classList.remove('hidden');
}

// Função para renderizar dados de forma segura
function renderCepData(resultDiv, data) {
    // Cria elementos DOM de forma segura em vez de innerHTML
    const table = document.createElement('table');

    // Cabeçalho
    const headerRow = document.createElement('tr');
    const headerField = document.createElement('th');
    const headerValue = document.createElement('th');
    headerField.textContent = 'Campo';
    headerValue.textContent = 'Valor';
    headerRow.appendChild(headerField);
    headerRow.appendChild(headerValue);
    table.appendChild(headerRow);

    // Dados
    const fields = [
        { label: 'CEP', value: data.cep },
        { label: 'Logradouro', value: data.logradouro },
        { label: 'Complemento', value: data.complemento },
        { label: 'Bairro', value: data.bairro },
        { label: 'Localidade', value: data.localidade },
        { label: 'UF', value: data.uf },
        { label: 'IBGE', value: data.ibge },
        { label: 'GIA', value: data.gia },
        { label: 'DDD', value: data.ddd },
        { label: 'SIAFI', value: data.siafi }
    ];

    fields.forEach(field => {
        const row = document.createElement('tr');
        const labelCell = document.createElement('td');
        const valueCell = document.createElement('td');

        labelCell.textContent = field.label;
        valueCell.textContent = sanitizeText(field.value);

        row.appendChild(labelCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    });

    resultDiv.appendChild(table);
}

document.getElementById('cepInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('consultarBtn').click();
    }
});
