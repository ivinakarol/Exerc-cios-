
class JogoMatematico{

n1 = null;
n2 = null;
nPosicao = 0;
nOperacao = 0;
max = 10;
min = 0;
resultadoDigitado = null;
resultadoCorreto = null;
resultado = null;
vidas = 3;
pontos = 0;
usuario= null
texto = "";
ranking = [];
   

constructor(){
    this.nomeJogador();
}
    nomeJogador() {
     this.usuario = prompt("Digite o seu nome:");
    while(this.usuario == ""){
      this.usuario = prompt("OPS!! Você esqueceu de informar qual o seu nome. \n" + "Insira o seu nome para iniciar o jogo: ");
    }
    this.jogo();
    }

    jogo(){
    this.gerarNumeros();
    switch(this.nOperacao){
        case 0: 
            this.adicao();
            break;

        case 1:
            this.subtracao();
            break;

        case 2:
            this.multiplicacao();
            break;
        
        case 3:
            this.divisao();
            break;    
    }
    this.checarResultado();
}
    adicao (){
    this.resultadoEquacao = this.n1 + this.n2;
    let posicao = this.posicao("+");
    this.resultadoDigitado = prompt(`Qual o valor de ${posicao}`);
}
    subtracao() {
    this.alterarPosicaoNumeros();
    this.resultadoEquacao = this.n1 - this.n2;
    let posicao = this.posicao("-");
    this.resultadoDigitado = prompt(`Qual o valor de ${posicao}`);
}
    multiplicacao() {
    this.resultadoEquacao = this.n1 * this.n2;
    let posicao = this.posicao("*");
    this.resultadoDigitado = prompt(`Qual o valor de ${posicao}`);
}
    divisao(){
    this.checarNumerosDivisiveis();
    this.resultadoEquacao = this.n1 / this.n2;
    let posicao = this.posicao("/");
    this.resultadoDigitado = prompt(`Qual o valor de ${posicao}`);
}
    posicao(sinal){
        let equacao = "";
        switch(this.nPosicao){
            case 0:
                equacao = `X ${sinal} ${this.n2} = ${this.resultadoEquacao}`;
                this.resultado = this.n1;
                break;
            case 1:
                equacao = `${this.n1} ${sinal} X = ${this.resultadoEquacao}`;
                this.resultado = this.n2;
                break;    
            case 2:
                equacao = `${this.n1} ${sinal}  ${this.n2} = X`;
                this.resultado = this.resultadoEquacao;
                break;
        }
        return equacao;
    }
    checarNumerosDivisiveis(){
       while (this.n1 % this.n2 != 0 || this.n1 == 0 || this.n2 == 0){
           this.n1 = Math.floor(Math.random() * 10);
           this.n2 = Math.floor(Math.random() * 10);
       }
}
    alterarPosicaoNumeros(){
    let n2temporario = this.n2;
        if(this.n1< this.n2){
        this.n2 = this.n1;
        this.n1 = n2temporario;
    }
}
    checarResultado(){
        if(this.resultadoDigitado == this.resultado){
       this.adicionarPontos();
        this.jogo();
    } else if (this.resultadoDigitado == ""){
        this.diminuirVidas();
    }
    else {
        this.diminuirVidas();
    }
}
adicionarPontos() {
    this.pontos += 5;
    if (this.pontos % 20 == 0){
        this.max += 10;
        alert (`Você passou de nível, ${this.usuario}! \n As perguntas ficarão mais difíceis, Boa sorte.`);
    }
    if(this.pontos % 50 == 0 && this.vidas < 3){
        this.vidas += 1;
        alert (`Parabéns, ${this.usuario}! Você está fez ${this.pontos} pontos e ganhou 1 vida.`)
    }
  }
    diminuirVidas() {
        this.vidas -= 1;
        if (this.vidas > 1 ){
            alert (`Resposta errada. Você perdeu 1 vida, ainda restam ${this.vidas} vidas`);
            this.jogo();
        } else if(this.vidas == 1){
            alert (`Resposta errada. Você perdeu 1 vida, ainda restam ${this.vidas} vida`);
            this.jogo();
        } else if (this.vidas == 0){
            this.ranking.push([this.usuario, this.pontos]);
           let re = prompt (`FIM DE JOGO, ${this.usuario}  ! \n Você fez: ${this.pontos} Pontos \n Digite um 1 para jogar novamente`);
             if (re == 1){
             this.resetarJogo();
             this.nomeJogador();
            }
            else{
                this.adicionarRanking(this.ranking);
            }
            }
        } 
        resetarJogo() {
            this.pontos = 0;
            this.vidas = 3;
            this.max = 10;
          }
    gerarNumeros(){
    this.n1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
    this.n2 = Math.floor(Math.random() * (this.max - this.min) + this.min); 
    this.nOperacao = Math.floor(Math.random() * 4);
    this.nPosicao = Math.floor(Math.random() * 3);
}
    adicionarRanking(ranking) {
    for (let i=0; i<ranking.length; i++) {
      this.texto += `Usuario: ${this.ranking[i][0]}, fez: ${this.ranking[i][1]} pontos! \n`;
    }
    alert (`${this.texto}`);
  }
 }
