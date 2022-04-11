const imagens = ["bobrossparrot.gif", "explodyparrot.gif","fiestaparrot.gif","metalparrot.gif","revertitparrot.gif","tripletsparrot.gif","unicornparrot.gif"];
let mainHTML = document.querySelector('main');
let cartas = [];
let carta1;
let carta2;
var quantidadeDeCartas;
let pares = []
let numeroDeCliques = 0
let moves = 0

comecarJogo()

function comecarJogo(){
    imagens.sort(comparator);
    while(true){
        quantidadeDeCartas = parseInt(prompt('Com quantos pares de cartas você quer jogar?'));
        if(quantidadeDeCartas >= 2 && quantidadeDeCartas <= 7){
            distribuirCartas();
            return false;
        } 
        else {
            alert('Entre 4 e 14 cartas.');
        }
    }
}

function distribuirCartas(){
    for(let i = 0; i < quantidadeDeCartas; i++){
        let novaCarta = `<div class="espaco">
                            <div class = "card" onclick="virarCarta(this)" data-identifier="card">
                                <div class="front" data-identifier="front-face">
                                    <img src="front.png" alt="">
                                </div>
                                <div class="back" data-identifier="back-face">
                                    <img src="${imagens[i]}" alt="">
                                </div>
                            </div>
                        </div> `;
        cartas.push(novaCarta);
        cartas.push(novaCarta);
        cartas.sort(comparator);
    }
    for (let i = 0; i < cartas.length; i++){
        mainHTML.innerHTML = mainHTML.innerHTML + cartas[i];
    }
}
function virarCarta(selectedDiv){
    moves++
    numeroDeCliques++
    if(numeroDeCliques <= 2){
        selectedDiv.classList.add('change');
        if(!document.querySelector('.carta1')){
            selectedDiv.classList.add('carta1');
            carta1 = selectedDiv;
            carta1.setAttribute('onclick','')
            return false;
        }
        selectedDiv.classList.add('carta2');
        carta2 = selectedDiv;
        setTimeout(compararCarta, 500);
    } else if (numeroDeCliques > 2){
        selectedDiv.classList.remove('change')
        numeroDeCliques = 0
        }
    }

function compararCarta(){
    if(carta1.innerHTML !== carta2.innerHTML){
        carta1.classList.remove('carta1');
        carta1.classList.remove('change');
        carta2.classList.remove('carta2');
        carta2.classList.remove('change');
        carta1.setAttribute('onclick','virarCarta(this)');
    }
    else{
        pares.push('pairMade')
        carta1.classList.remove('carta1');
        carta1.classList.add('pickPair');
        carta1.setAttribute('onclick','');
        carta2.classList.remove('carta2');
        carta2.setAttribute('onclick','');
        carta2.classList.add('pickPair');
        finalizarJogo()
        jogarNovamente()
    }
}

function jogarNovamente(){
    if(pares.length == quantidadeDeCartas){
        let resultado = prompt('Deseja jogar novamente? (Sim) ou (Nao)')
        if(resultado == "Sim" || resultado == "S"){
            document.location.reload(true)
        } else if (resultado == 'Nao' || resultado == "N"){
            alert('Até a próxima')
        } else{
            jogarNovamente()
        }
    }
}

function finalizarJogo(){
    if(pares.length == quantidadeDeCartas){
        alert(`Você ganhou em ${moves} jogadas`)
    }
}

function comparator(){
    return Math.random() - 0.5;
}

