let edtNome = document.getElementById("edtNome");
let edtSenha = document.getElementById("edtSenha");
let edtEmail = document.getElementById("edtEmail");
let edtBirth = document.getElementById("edtBirth");
let lblCampo = document.getElementsByClassName("legendaCampo");
let edtPesquisar = document.getElementById("edtPesquisar")

let listaCadUsuario = document.getElementById("listaCadUsuario");

let Usuarios = []; // Array para armazenar todos os usuários

function gravar() {
    mudarCorLabel();
    
    if (typeof usuarioEditandoIndex === 'undefined' || usuarioEditandoIndex === null) {
        cadastrar();
    } else {
        alterar();
    }
}

function cadastrar() {
    // Verifica se já existe um usuário com o mesmo email
    let usuarioExistente = Usuarios.find(usuario => usuario.email === edtEmail.value);

    if ((!usuarioExistente) && (edtEmail.value) && (edtNome.value) && (edtSenha.value) && (edtBirth.value)) {
        let novoUsuario = {
            nome: edtNome.value,
            email: edtEmail.value,
            senha: edtSenha.value,
            dataAniversario: edtBirth.value
        };

        Usuarios.push(novoUsuario);

        // Atualiza a lista de usuários na interface
        atualizarListaUsuarios();

        // Limpa os campos do formulário após o cadastro
        edtNome.value = "";
        edtEmail.value = "";
        edtSenha.value = "";
        edtBirth.value = "";
    } else if (usuarioExistente) {
        alert('Já tem um usuário com esse Email. Por favor, insira outro.');
    } else {
        alert('Preencha os campos corretamente.');
    }
}

function atualizarListaUsuarios() {
    listaCadUsuario.innerHTML = ""; // Limpa a lista de usuários

    // Recria a lista com base no array de usuários
    Usuarios.forEach((usuario, index) => {
        let dataFormatada = formatarData(usuario.dataAniversario); // Formata a data
        listaCadUsuario.innerHTML += `
            <div class="ItemUser">
                <div class="DadosUser">
                    <p class="NomeUser">Nome: ${usuario.nome}</p>
                    <p class="Emailuser">Email: ${usuario.email}</p> 
                    <p class="SenhaUser">Senha: ${usuario.senha}</p>
                    <p class="BirthUser">Data de Nascimento: ${dataFormatada}</p>    
                </div>
                <div class="AreaModificacoes">
                    <input type="button" class="btnAlterar" onclick="carregarDados(${index})" value="Alterar">
                    <input type="button" class="btnDeletar" onclick="deletar(${index})" value="Deletar">
                </div>
            </div>
        `;
    });
}

function carregarDados(index) {
    // Preenche os campos com os dados do usuário selecionado
    edtNome.value = Usuarios[index].nome;
    edtEmail.value = Usuarios[index].email;
    edtSenha.value = Usuarios[index].senha;
    edtBirth.value = Usuarios[index].dataAniversario;

    // Guarda o índice do usuário sendo alterado em um atributo global
    window.usuarioEditandoIndex = index;
}

function alterar() {
    // Verifica se há um usuário sendo alterado (usuárioEditandoIndex não é undefined)
    if (typeof window.usuarioEditandoIndex !== 'undefined') {
        Usuarios[window.usuarioEditandoIndex] = {
            nome: edtNome.value,
            email: edtEmail.value,
            senha: edtSenha.value,
            dataAniversario: edtBirth.value
        };

        // Atualiza a lista de usuários após a alteração
        atualizarListaUsuarios();

        // Limpa o índice de edição e os campos de input
        window.usuarioEditandoIndex = undefined;
        edtNome.value = "";
        edtEmail.value = "";
        edtSenha.value = "";
        edtBirth.value = "";
    }
}

function deletar(index) {
    Usuarios.splice(index, 1); // Remove o usuário do array
    atualizarListaUsuarios();  // Atualiza a interface
}

///Funcoes diversas
//Mudar cor das labels conforme os dados não forem apresentados corretamente.
function mudarCorLabel() {
    // Acessa os labels e os inputs
    let lblNome = document.querySelector("label[for='edtNome']");
    let lblEmail = document.querySelector("label[for='edtEmail']");
    let lblSenha = document.querySelector("label[for='edtSenha']");
    let lblBirth = document.querySelector("label[for='edtBirth']");

    // Reseta a cor das labels antes de fazer a validação
    lblNome.style.color = 'black';
    lblEmail.style.color = 'black';
    lblSenha.style.color = 'black';
    lblBirth.style.color = 'black';

    // Valida se os campos estão preenchidos
    if (!edtNome.value) {
        lblNome.style.color = 'red';
    }
    if (!edtEmail.value) {
        lblEmail.style.color = 'red';
    }
    if (!edtSenha.value) {
        lblSenha.style.color = 'red';
    }
    if (!edtBirth.value) {
        lblBirth.style.color = 'red';
    }
}

function pesquisar() {
    let conteudoPesquisa = edtPesquisar.value.toLowerCase(); // Convertendo para minúsculas para comparação insensível ao caso

    // Se o campo de pesquisa estiver vazio, mostrar toda a lista de usuários
    if (conteudoPesquisa === "") {
        atualizarListaUsuarios();
        return; // Termina a função, pois a lista já foi atualizada
    }

    // Limpa a lista antes de aplicar os resultados da pesquisa
    listaCadUsuario.innerHTML = "";

    // Filtra os usuários que correspondem à pesquisa por nome ou email
    let usuariosFiltrados = Usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(conteudoPesquisa) || 
        usuario.email.toLowerCase().includes(conteudoPesquisa)
    );

    // Se houver usuários correspondentes, atualize a lista
    if (usuariosFiltrados.length > 0) {
        usuariosFiltrados.forEach((usuario, index) => {
            let dataFormatada = formatarData(usuario.dataAniversario); // Formata a data

            listaCadUsuario.innerHTML += `
                <div class="ItemUser">
                    <div class="DadosUser">
                        <p class="NomeUser">Nome: ${usuario.nome}</p>
                        <p class="Emailuser">Email: ${usuario.email}</p> 
                        <p class="SenhaUser">Senha: ${usuario.senha}</p>
                        <p class="BirthUser">Data de Nascimento: ${dataFormatada}</p>    
                    </div>
                    <div class="AreaModificacoes">
                        <input type="button" class="btnAlterar" onclick="carregarDados(${index})" value="Alterar">
                        <input type="button" class="btnDeletar" onclick="deletar(${index})" value="Deletar">
                    </div>
                </div>
            `;
        });
    } else {
        // Se nenhum usuário corresponder à pesquisa, exibe uma mensagem
        listaCadUsuario.innerHTML = "<p>Nenhum usuário encontrado.</p>";
    }
}


function formatarData(data) {
    let partesData = data.split('-'); // Divide a string 'yyyy-mm-dd' em ['yyyy', 'mm', 'dd']
    let ano = partesData[0];
    let mes = partesData[1];
    let dia = partesData[2];
    
    // Retorna a data no formato 'dd/mm/yyyy'
    return `${dia}/${mes}/${ano}`;
}

// function deletar(index) {
//     Usuarios.splice(index, 1); // Remove o usuário do array
//     atualizarListaUsuarios();  // Atualiza a interface
// }


function esvaziarLista(){
    for(var i =0; i < Usuarios; i++){
        Usuarios.splice(i, 1)
    };
    atualizarListaUsuarios();  // Atualiza a interface
}




