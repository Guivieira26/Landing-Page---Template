<div align="center">

# 🏥 FisioSaúde — Landing Page Template

**Template profissional de landing page para fisioterapeutas**  
Desenvolvido com React + Vite · Totalmente responsivo · Pronto para personalização

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://davidtemplate-nine.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**🌐 [Ver demo ao vivo](https://davidtemplate-nine.vercel.app/)**

</div>

---

## 📋 Sobre o projeto

Este é um template de landing page criado para fisioterapeutas que desejam ter uma presença digital moderna e profissional. O design foi pensado para transmitir **confiança, saúde e tecnologia**, com foco em conversão de visitantes em pacientes.

> ⚠️ **Este projeto é um template.** Textos, imagens, dados de contato e informações do profissional são fictícios e devem ser substituídos antes de colocar em produção.

---

## ✨ Funcionalidades

- **Navbar responsiva** com menu hambúrguer no mobile e efeito glassmorphism ao rolar
- **Hero section** animada com blobs orgânicos e espaço reservado para foto do profissional
- **Contadores animados** nos números de estatísticas (pacientes, anos de experiência, etc.)
- **Carrossel de serviços** no mobile e grid no desktop
- **Seção Sobre Mim** com layout adaptável por dispositivo
- **Carrossel de depoimentos** com navegação por setas e dots
- **Formulário de contato** com validação visual
- **Botão flutuante do WhatsApp**
- **Footer responsivo** com links para redes sociais
- Animações de entrada com `IntersectionObserver` (scroll reveal)
- Totalmente responsivo — mobile, tablet e desktop

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18+ | Framework principal |
| [Vite](https://vitejs.dev/) | 6.x | Bundler e dev server |
| Google Fonts | — | Outfit + Playfair Display |
| CSS-in-JS (inline styles) | — | Estilização |
| IntersectionObserver API | — | Animações de scroll |

---

## 🚀 Como usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# 2. Entre na pasta
cd seu-repositorio

# 3. Instale as dependências
npm install --legacy-peer-deps

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

---

## 🎨 Como personalizar

### 1. Dados do profissional

Abra o arquivo `src/App.jsx` e edite as seguintes seções:

```jsx
// Nome e marca
<span>Fisio<span>Saúde</span></span>
// → Substitua pelo nome da clínica/profissional

// Estatísticas
const stats = [
  { label: "Pacientes Atendidos", value: 1200, suffix: "+" },
  { label: "Anos de Experiência", value: 10, suffix: "+" },
  // ...
];

// Serviços oferecidos
const services = [ ... ];

// Depoimentos
const testimonials = [ ... ];
```

### 2. Informações de contato

Localize e substitua no arquivo:

```jsx
// Endereço
{ icon: "📍", title: "Endereço", info: "Savassi, Belo Horizonte – MG" }

// Horários
{ icon: "🕐", title: "Horários", info: "Seg–Sex: 7h–20h | Sáb: 8h–14h" }

// WhatsApp (link e exibição)
href="https://wa.me/5531900000000"
{ icon: "📱", title: "WhatsApp", info: "(31) 9 0000-0000" }

// CREFITO
<div>CREFITO Nº 000000</div>
```

### 3. Foto do profissional

Substitua os placeholders `👨‍⚕️` por tags `<img>`:

```jsx
// Hero (círculo)
<img
  src="/foto-hero.png"
  alt="Nome do Fisioterapeuta"
  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
/>

// Seção Sobre Mim
<img
  src="/foto-sobre.jpg"
  alt="Nome do Fisioterapeuta"
  style={{ width: "100%", height: "100%", borderRadius: 28, objectFit: "cover" }}
/>
```

Coloque as imagens na pasta `public/`.

### 4. Cores

As cores principais estão definidas inline. Para alterar a paleta, busque por:

```
#0EA5E9  → azul principal
#0284C7  → azul escuro
#10B981  → verde destaque
#8B5CF6  → roxo secundário
#0F172A  → fundo escuro
```

---

## 📱 Deploy

### Vercel (recomendado)

```bash
# Instale a CLI
npm install -g vercel

# Faça o deploy
vercel --prod
```

Ou conecte o repositório diretamente em [vercel.com](https://vercel.com) para deploy automático a cada push.

### Netlify

```bash
npm run build
# Arraste a pasta `dist/` para app.netlify.com/drop
```

---

## 📁 Estrutura do projeto

```
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx          # Componente principal (toda a landing page)
│   └── main.jsx         # Ponto de entrada React
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Sinta-se livre para usar, modificar e distribuir este template.

---

<div align="center">

Desenvolvido por **[Gui_Dev](https://github.com/Guivieira26)** · Template para fisioterapeutas

</div>
