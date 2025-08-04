# Consulta-CEP-Front

Interface web responsiva para consulta de endereços a partir do CEP. Este front-end se comunica com uma API em Java (Spring Boot), que por sua vez consome os dados da API pública do [ViaCEP](https://viacep.com.br/).

[Preview da Aplicação] <br>
<img width="600" height="454" alt="Captura de tela 2025-08-04 123618" src="https://github.com/user-attachments/assets/87c41fd2-a902-4520-91d3-8bef47545987" />


## 🚀 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Heroku (deploy do backend)**

## 🔁 Como funciona

1. O usuário digita um **CEP** no campo de busca.
2. O front-end envia uma requisição para o backend Java hospedado no Heroku.
3. O backend consulta os dados na [API do ViaCEP](https://viacep.com.br/) e retorna as informações para o front.
4. As informações são exibidas de forma amigável na tela.

## 🧩 Repositórios relacionados

- 🔙 [Consulta-CEP-com-Spring-Boot (Backend)](https://github.com/DiegoMBS/Consulta-CEP-com-Spring-Boot)

## 📁 Estrutura do projeto

├── index.html # Página principal <br>
├── CSS/ # Estilos da aplicação <br>
└── JS/ # Lógica JavaScript para chamada da API <br>

## 🛠 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/Consulta-CEP-Front.git
Abra o index.html no navegador.

Certifique-se de que o backend esteja rodando ou disponível online. <br>

✍️ Autor <br>

Desenvolvido por Diego Silva 👨‍💻<br>
Conectando front-end + Spring Boot + APIs externas com simplicidade!

