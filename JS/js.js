// #################### CLASSE CANDIDATO ####################
class Candidato {
    nome;
    dataNascimento;
    peso;
    altura;

    constructor(nome, dataNascimento, peso, altura) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.peso = peso;
        this.altura = altura;
    }

    getNome() {
        return this.nome;
    }

    getDataNascimento() {
        return this.dataNascimento
    }

    getPeso() {
        return this.peso;
    }

    getAltura() {
        return this.altura;
    }

    getSexo() {

        if (document.getElementsByName("sexo")[0].checked) {
            return document.getElementsByName("sexo")[0].value; // "m"
        } else {
            return document.getElementsByName("sexo")[1].value; // "f"
        }

    }

    getIdade() {

        let data = this.dataNascimento.split("-");

        //data[0] -> ano / data[1] -> mês / data[2] -> dia

        var d = new Date, //INFORMA A DATA ATUAL
            anoAtual = d.getFullYear(),
            mesAtual = d.getMonth() + 1,
            diaAtual = d.getDate()

        if (mesAtual < Number(data[1]) || mesAtual === Number(data[1]) && diaAtual < Number(data[2])) {

            return (anoAtual - Number(data[0])) - 1;
        } else {

            return anoAtual - Number(data[0])
        }

    }

    getImc() {

        return Number(this.peso) / Math.pow((this.altura / 100), 2);
    }

}


// #################### UTILIZADA NA FUNCTION "cadastra", VERIFICA SE O CANDIDATO É UM DODADOR ####################
function condicao(objeto) {

    if (objeto.getIdade() >= 18 && objeto.getIdade() <= 60 && objeto.getPeso() >= 50 && objeto.getImc() >= 18.5 && objeto.getImc() <= 24.9) {
        return "sim";
    } else {
        return "não";
    }
}


// #################### UTILIZADO NA FUNCTION "cadastra", ARMAZENA OS DADOS DE TODOS OS CADASTRADOS ####################
let dados = [];


// #################### UTILIZADO NA FUNCTION "cadastra", CONTADOR RESPONSÁVEL POR CONTROLAR O NÚMERO DE CADASTRO ####################
let cont = 1;


// #################### EFETUA O CADASTRO DOS DADOS PREENCHIDOS NO FORMULÁRIO NO ARRAY "dados" ####################
function cadastra() {

    if (document.getElementById("nome").value == "" || document.getElementById("dataNascimento").value == "" || document.getElementById("peso").value == "" || document.getElementById("altura").value == "") {

        window.alert("Preencha todos os campos para efetuar o cadastro!");
    } else {

        let cadastro = new Candidato(document.getElementById("nome").value, document.getElementById("dataNascimento").value, document.getElementById("peso").value, document.getElementById("altura").value);

        var d = new Date,
            anoAtual = d.getFullYear()

        dados.push({
            numeroDeCadastro: "0" + cont++ + "." + anoAtual,
            nome: cadastro.getNome(),
            dataNascimento: cadastro.getDataNascimento(),
            peso: cadastro.getPeso(),
            altura: cadastro.getAltura(),
            sexo: cadastro.getSexo(),
            idade: cadastro.getIdade(),
            imc: cadastro.getImc().toFixed(2),
            condicao: condicao(cadastro)
        });

        console.log("Candidato(a) " + cadastro.getNome() + " cadastrado(a) com sucesso!");
        window.alert("Candidato(a) " + cadastro.getNome() + " cadastrado(a) com sucesso!");
        document.formCandidatos.reset();
        document.getElementById("cadastrados").innerHTML = "";

    }
}


// #################### UTILIZADA NA FUNCTION "exibir", ESCREVE NA TELA "Masculino" OU "Feminino"  ####################
function exibirSexo(array) {
    if (array === "m") {
        return "Masculino"
    } else {
        return "Feminino"
    }
}


// #################### EXIBE OS DADOS CADASTRADOS ####################
function exibir() {

    if (dados.length === 0) {
        document.getElementById("cadastrados").innerHTML = "<div class='colab' style='text-align: center;line-height: 130px;'> Não há candidatos cadastrados </div>"
    } else {

        document.getElementById("cadastrados").innerHTML = "";

        let recebe = "";

        for (let i = 0; i < dados.length; i++) {
            recebe += "<div class = 'colab'>";
            recebe += "Número de Cadastro: " + dados[i].numeroDeCadastro + "<br/>";
            recebe += "Nome: " + dados[i].nome + "<br/>";
            recebe += "Idade: " + dados[i].idade + " anos" + "<br/>";
            recebe += "Sexo: " + exibirSexo(dados[i].sexo) + "<br/>";
            recebe += "IMC: " + dados[i].imc + "<br/>";
            recebe += "Doador: " + dados[i].condicao + "<br/>";
            recebe += "</div>"
        }

        document.getElementById("cadastrados").innerHTML = recebe;

    }
}


// #################### LIMPA OS DADOS PREENCHIDOS NO FORMULÁRIO ####################
function limpar() {
    document.formCandidatos.reset();
}


// #################### EXIBE AS CONDIÇÕES PARA SER UM DOADOR DE SANGUE ####################
function exibirCondicoes() {
    window.alert("CONDIÇÕES PARA SER UM DOADOR DE SANGUE:\n\n - Possuir entre 18 e 50 anos\n - Pesar mais de 50 Kg\n - Ter um IMC entre 18.5 e 24.9")
}