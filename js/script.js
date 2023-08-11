// IMC DATA

const data = [ // Objeto data
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40",
        info: "Obesidade grave",
        obesity: "III",
    },
];

// Seleção de elemento, pega os elementos html pelo id, e joga em variáveis.
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

/* Funções */
// Caso novos dados sejam criados no futuro a tabela vai se ajustar de foram dinâmica, pois percorrer todos os itens do data
function createTable(data){
    data.forEach((item) => {
        const div = document.createElement("div"); // Cria uma div
        div.classList.add("table-data"); // Adiciona uma classe a div criada

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}
// Função limpa inputs
function cleanInputs(){
    heightInput.value = ""; // limpar os valores do input
    weightInput.value = ""; // limpar os valores do input
    imcNumber.classList = ""; // remove/limpa as classes css adicinadas nesse elemento
    imcInfo.classList = "";  // remove/limpa as classes css adicinadas nesse elemento
}
// Função Valida dígitos
function validDigits(text){
    return text.replace(/[^0-9,]/g, "");
}
// Função para calcular o imc
function calcImc(weight, height){
    const imc = weight / (height * height); 
    return imc.toFixed(1); // O comando toFidex diminui as casas decimais
}

// Remove classe hide e coloca classe hide (esconde o elemento ou faz o elemento aparecer)
function showOrHideResults(){
    calcContainer.classList.toggle("hide"); // toggle() Adiciona ou remove classe
    resultContainer.classList.toggle("hide");
}

/* Inicialização */
createTable(data);

/* Eventos */

// Indentifica cada entrada de carácter no input
[heightInput, weightInput].forEach((el) => { // Array contendo os inputs observados, e fica pecorrendo eles
    el.addEventListener("input", (e) => { // Toda vez que houver uma entrada de um carácter, pega ele e joga na função valida
        const updateValue = validDigits(e.target.value); // Pega o resultado da validação e atualiza/valida o carácter
        e.target.value = updateValue;
    });
});

// Quando clicar no botão Calcular, realizar o calculo 
calcBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Impede a página de ser recarregada quando botão for clicado, e perca os dados dos inputs.

    // O Sinal de (+) mais irá converter o valor editado para o tipo de dado correto
    const weight = +weightInput.value.replace(",","."); // Converte as vírgulas em pontos para o JS poder aceitar e calcular
    const height = +heightInput.value.replace(",","."); // Converte as vírgulas em pontos para o JS poder aceitar e calcular  
    
    // Caso não seja digitado nenhum valor nos inputs
    if(!weight || !height) return; // Não permite que passe para próxima tela até os campos serem preenchidos
    
    const imc = calcImc(weight, height);
    
    // Receber mensagem de acordo com o imc da pessoa
    let info;

    // Percorre todo o objeto, caso o imc calculado seja compativel com do item(dentro min e max valor) salva o texto na variável info.
    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max){// O imc calculado precisa estar dentro dessa faixa
            info = item.info;
        }
    });

    // Valida valor desproporcional
    if(!info) return; // Caso o valor digitaado seja desprorpocional retorna undefined.

    // Colocando resultados (IMC e Textos) nas divs html
    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    // Adiciona classe css de acordo com o grau de magreza, cada classe tem uma cor diferente.
    switch(info){
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;   
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;              
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;                                 
    }

    // Chama função que esconde os inputs e mostra o resultado.
    showOrHideResults();

});


// Quando clicar no botão limpar, os campos serão zerados
clearBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Impede a página de ser recarregada quando botão for clicado.
    cleanInputs();
});

backBtn.addEventListener("click", () =>{
    cleanInputs();
    showOrHideResults();
});