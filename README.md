# React + Vite

## Navegação

O projeto usa React Router com `BrowserRouter`. Execute `npm install` e `npm run dev`.

| Rota | Tela |
| --- | --- |
| `/login` | Login |
| `/cadastro` | Criar conta |
| `/esqueci-senha` | Recuperar senha |
| `/quadras` | Quadras do usuário |
| `/perfil` | Perfil do usuário |
| `/admin` | Quadras do administrador |
| `/admin/perfil` | Perfil com navegação administrativa |

A raiz `/` e endereços desconhecidos redirecionam para `/login`.
O formulário de login apenas navega para `/quadras`; ainda não há autenticação ou proteção de rotas.
O botão Sair retorna ao login. A área administrativa pode ser acessada diretamente em `/admin`.
O link “Crie uma conta” abre `/cadastro`, e “Entrar” retorna ao login.
O link “Esqueceu a senha?” abre `/esqueci-senha`, com matrícula e e-mail obrigatórios e retorno ao login.
A recuperação exibe uma confirmação simulada de envio após a validação dos campos. Ainda não envia e-mails; depende de integração com o backend.
O cadastro valida campos obrigatórios, e-mail, senha de pelo menos 8 caracteres e confirmação da senha.
Ainda não cria contas nem armazena dados: após validar, informa que a criação da conta não está disponível.
Reservas e atendimento ficam desabilitados até que suas telas sejam implementadas.

Na hospedagem, configure o servidor para servir `index.html` nas rotas da aplicação,
permitindo abrir URLs diretamente e atualizar a página.

Referência: [roteamento declarativo do React Router](https://reactrouter.com/start/declarative/routing).

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
