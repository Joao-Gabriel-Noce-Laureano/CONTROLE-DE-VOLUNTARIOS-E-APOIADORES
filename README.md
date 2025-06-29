# CONTROLE-DE-VOLUNTARIOS-E-APOIADORES

Este repositório contém os arquivos do projeto de desenvolvimento do sistema de Controle de Voluntários(as)/Apoiadores(as), a ser realizado na disciplina Certificadora de Competência 3 da Universidade Tecnológica Federal do Paraná. O sistema visa apoiar a gestão de voluntários(as) e apoiadores(as) do projeto Meninas Digitais, promovendo organização, transparência e eficiência nas atividades do grupo.

Backlog do produto: [clique aqui](https://docs.google.com/spreadsheets/d/1XeYxOw4cV-FjsqfTIkLJWOauqBYPIjKcrsCtOO7gT5I/edit?gid=0#gid=0).

## Descrição:
O sistema será uma aplicação web desenvolvida com Node.js no back-end e React (ou similar) no front-end. Seu objetivo é permitir o cadastro, visualização, edição e remoção de voluntários(as) e apoiadores(as), além de apresentar indicadores quantitativos sobre a participação no projeto.  

## Roteiro de Instalação e Execução

### 1. Baixe ou Clone o Projeto

Você pode baixar o projeto diretamente do GitHub (clonando ou baixando o ZIP).  
Após baixar, descompacte a pasta, se necessário.
Ou clone o projeto com Git:
`
git clone https://github.com/Joao-Gabriel-Noce-Laureano/CONTROLE-DE-VOLUNTARIOS-E-APOIADORES/.git
cd CONTROLE-DE-VOLUNTARIOS-E-APOIADORES
`

### 2. Estrutura de Pastas

O projeto possui as seguintes pastas principais:

- `Backend/` — código do servidor (API, banco de dados, etc.)
- `Frontend/` — código do cliente (interface web)
- `docs/`, `prototypes/`, `README.md` — documentação e protótipos (opcional para execução)

**Atenção:** Você só precisa executar os passos abaixo nas pastas `Backend` e `Frontend`.

---

### 3. Instalando Dependências

#### Back-end

1. Abra o terminal na pasta `Backend`:
    ```
    cd Backend
    ```
2. Instale as dependências:
    ```
    npm install
    ```
3. Inicie o servidor back-end:
    ```
    npm start
    ```

#### Front-end

1. Em outro terminal, abra a pasta `Frontend`:
    ```
    cd Frontend
    ```
2. Instale as dependências:
    ```
    npm install
    ```
3. Inicie o servidor front-end:
    ```
    npm start
    ```

---

### 4. Acessando o Projeto

- Após iniciar o front-end, seu navegador deve abrir automaticamente.  
- Caso não abra, acesse manualmente: [http://localhost:3000](http://localhost:3000) (ou a porta informada no terminal).

**Tecnologias e ferramentas utilizadas:**  
- **Back-end:** Node.js, Express.js, Mongoose, Nodemon e Cors
- **Front-end:** React (ou similar)
- **Banco de Dados:** NoSQL
- **Controle de Versão:** GitHub
- **Comunicação:** WhatsApp, E-mail institucional e Google Meet
- **Documentação e Compartilhamento:** Google Drive e Google Documentos
- **Gerenciamento de Tarefas:** Google Tarefas e Google Documentos

**Funcionalidades principais:**  
- Cadastro de voluntários(as) e apoiadores(as);  
- Visualização em lista com filtros e indicadores;  
- Edição e remoção de registros;  
- Tela inicial com indicadores de quantidade total de voluntários(as), apoiadores(as) e distribuição por área de atuação.

  **Usuários esperados:**  
- **Administradores:** Acesso total ao sistema, podendo cadastrar, editar, remover e visualizar registros, além de acessar indicadores.
- **Membros do Projeto:** Permissão para visualizar registros e indicadores.

## Integrantes e respectivos papéis adotados:
### Antonio Marcos Fontes Darienco
Quality Assurance e Desenvolvedor

### João Gabriel Noce Laureano
Desenvolvedor Fullstack

### Leonardo Canuto Junior
Product Owner e Product Designer 

### Thomas Hurtado dos Reis
Desenvolvedor Fullstack

## Cronograma do Projeto: Roadmap e Gráfico de Gantt

[Link para visualização completa](https://docs.google.com/spreadsheets/d/1iHHlraDs6fw7tFqjMHEjOx_QusmKBVUY/edit?gid=308923840#gid=308923840)

![image](https://github.com/user-attachments/assets/3dbcd7e1-8dc7-4397-82f2-e0e5d7b8edb0)


## Atribuições e organização da squad:

| Tarefa                            | Subtarefa                          | Responsável    |
|----------------------------------|-----------------------------------|---------------|
| Prototipação UX/UI                | Design das telas e fluxos          | Leonardo      |
| Gestão do Projeto                 | Prazos, cronogramas, tasks         | Leonardo      |
| Cadastro de Voluntário(a)        | Implementação front-end            | João Gabriel  |
|                                  | Implementação back-end             | Thomas        |
| Cadastro de Apoiador(a)           | Implementação front-end            | João Gabriel  |
|                                  | Implementação back-end             | Thomas        |
| Visualização de Voluntários(as)/Apoiadores(as) | Listagem, filtros e indicadores | João Gabriel  |
| Edição/Remoção de Registros       | Implementação das funcionalidades | Thomas        |
| Banco de Dados                   | Modelagem e integração             | Thomas        |
| Testes e QA                     | Elaboração de testes e validação   | Antônio       |
| Documentação                    | Elaboração e atualização           | Leonardo      |

## Visão Macro de User Stories

| User Stories |
|--------------|
| Como **Administrador**, quero cadastrar um novo voluntário preenchendo nome completo, RA, e-mail institucional, área de atuação e data de nascimento para registrar sua participação no projeto. |
| Como **Administrador**, quero que o campo RA aceite apenas valores numéricos com formato validado para garantir a consistência do identificador acadêmico. |
| Como **Administrador**, quero que o campo e-mail valide apenas endereços institucionais UTFPR para garantir comunicação oficial. |
| Como **Administrador**, quero selecionar a área de atuação em um dropdown populado com as áreas ativas do projeto para atribuir corretamente o voluntário. |
| Como **Administrador**, quero editar os dados de um voluntário existente (nome, RA, e-mail, área ou data de nascimento) para manter o cadastro sempre atualizado. |
| Como **Administrador**, quero remover um voluntário exibindo antes um modal de confirmação para evitar deleções acidentais. |
| Como **Membro do Projeto**, quero visualizar todos os voluntários em uma tabela com colunas: nome completo, RA, e-mail, área e aniversário para consultar facilmente seus dados. |
| Como **Membro do Projeto**, quero buscar voluntários por nome ou RA usando a barra de pesquisa para localizar um registro específico rapidamente. |
| Como **Membro do Projeto**, quero filtrar a lista por área de atuação para analisar a distribuição de voluntários por segmento. |
| Como **Membro do Projeto**, quero navegar entre páginas via paginação para acessar grandes volumes de registros de forma organizada. |
| Como **Administrador**, quero cadastrar um novo apoiador selecionando “Aluno” ou “Não Aluno”, informando nome completo, e-mail (e RA se for aluno) e descrição do apoio para registrar suas contribuições. |
| Como **Administrador**, quero que o formulário exiba dinamicamente o campo RA somente quando “Aluno” estiver selecionado para simplificar a interface. |
| Como **Administrador**, quero incluir um campo de observações para registrar comentários adicionais sobre o apoiador. |
| Como **Administrador**, quero editar dados de apoiadores (tipo, nome, e-mail, RA, descrição ou observações) para manter os registros precisos. |
| Como **Administrador**, quero excluir um apoiador exibindo um modal de confirmação para prevenir remoções não intencionais. |
| Como **Membro do Projeto**, quero visualizar todos os apoiadores em tabela com colunas: tipo (Aluno/Não Aluno), nome, e-mail, descrição e observações para gerenciar o apoio recebido. |
| Como **Membro do Projeto**, quero buscar apoiadores por nome ou e-mail para localizar rapidamente um colaborador específico. |
| Como **Membro do Projeto**, quero navegar por meio de paginação para consultar grandes listas de apoiadores de forma ordenada. |
| Como **Administrador**, quero ver no dashboard a quantidade total de voluntários para ter um panorama geral da participação. |
| Como **Administrador**, quero ver no dashboard a quantidade total de apoiadores para monitorar o engajamento de suporte. |
| Como **Administrador**, quero ver um gráfico de distribuição de voluntários por área para identificar os segmentos com maior ou menor adesão. |
| Como **Administrador**, quero visualizar as últimas atividades (ex.: “Nova Voluntária: Maria Silva” ou “Novo Apoiador: João Santos”) para acompanhar atualizações em tempo real. |
| Como **Membro do Projeto**, quero que o dashboard reflita imediatamente alterações após cadastros, edições ou remoções para manter os indicadores sempre atualizados. |
| Como **Usuário**, quero ver indicadores de carregamento ao buscar ou enviar dados para saber que a aplicação está processando minha ação. |
| Como **Administrador**, quero receber mensagens de erro claras (e.g., “RA inválido” ou “E-mail obrigatório”) ao inserir dados incorretos para corrigir falhas de validação. |
| Como **Product Owner**, quero que o front-end seja implementado em React e o back-end em Node.js/Express com banco NoSQL para alinhar-me à arquitetura definida. |
| Como **Product Owner**, quero versionar todo o código no GitHub para garantir rastreabilidade e colaboração eficiente. |
