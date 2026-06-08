const andar=document.querySelector ("#andar");
const background=document.querySelector ("#background");
const lanterna=document.querySelector ("#lanterna")
const console_log=document.querySelector ("#console_log")
const tela_background=document.querySelector("#tela_background");
const slime = document.querySelector("#slime_girl");
const slash_magic = document.querySelector("#slash_magic");
const atacar = document.querySelector("#atacar");
const vida = document.querySelector("#vida");
const mana = document.querySelector("#mana");
const personagem_dialogo = document.querySelector("#nome_personagem_dialogo");
const dialogo_text = document.querySelector("#dialogo_text");
const caixa_dialogo = document.querySelector("#caixa_dialogo");
const experiencia = document.querySelector("#experiencia");
const fugir = document.querySelector("#fugir");
let nome_head = document.querySelector("#nome_head");
let level=document.querySelector("#level");
const barra_de_vida=document.querySelector("#barra_de_vida")
const barra_de_mana=document.querySelector("#barra_de_mana")
const barra_de_xp=document.querySelector("#barra_de_xp")
const img_personagem=document.querySelector("#img_personagem");

let animacao_andando=false;
let comecar_sorteio=false;
let em_batalha=false;
let em_dialogo=false;
let chance_de_escapar = true;
let inimigo_atual=null;
let turno=1;
let sprite_inimigo_atual;
let dialogo_atual = 0;
pular_dialogo=false;



const lista_de_itens=["poção de vida","espada","livro"];
const lista_de_inimigos=[{nome: "slime",hp: 30,atk: 5}];
let jogador = {nome:"kimiko",level:1, xp:0 ,xp_proximo:100, hp: 100, hp_max: 100, mp: 20, mp_max: 20, atk:10};
let dialogos = [{nome:"slime", texto:"eu vou te derrotar!!"},{nome:"kimiko", texto:"só acredito vendo!"}]







andar.addEventListener("click",acoes_andar);
atacar.addEventListener("click",atacar_inimigo);
fugir.addEventListener("click",fugir_da_luta);
caixa_dialogo.addEventListener("click",proxima_fala);
atualizar_vida();
atualizar_mana();
atualizar_level();
atualizar_xp();






//____________funções para dialogo_______________//

function atual_personagem_dialogo(){
    personagem_dialogo.innerHTML=`<p>${dialogos[dialogo_atual].nome}</p>`
    dialogo_text.innerHTML=`<p>${dialogos[dialogo_atual].texto}</p>`
    mensagem_log(dialogos[dialogo_atual].nome+" diz:"+" "+dialogos[dialogo_atual].texto)
    animacao_dialogo()


}

function proxima_fala(){
dialogo_atual++
if(dialogo_atual >= dialogos.length){
    finalizar_dialogo()
    return
}
atual_personagem_dialogo()

}

function finalizar_dialogo(){
 
    dialogo_atual=0


    personagem_dialogo.classList.add("morrer");
    dialogo_text.classList.add("morrer");
    caixa_dialogo.classList.add("morrer");

    setTimeout(()=>{
        personagem_dialogo.style.display="none"
        dialogo_text.style.display="none"
        caixa_dialogo.style.display="none"

        personagem_dialogo.classList.remove("morrer");
        dialogo_text.classList.remove("morrer");
        caixa_dialogo.classList.remove("morrer");
    },1000)
    
    
    em_batalha=true
    em_dialogo=false
    pular_dialogo=false
  
}
function animacao_dialogo(){
    setTimeout(()=>{
        caixa_dialogo.classList.add("fadein");
        personagem_dialogo.classList.add("fadein")
        personagem_dialogo.style.display="block"
        dialogo_text.style.display="block"
        caixa_dialogo.style.display="block"
    },700)
}
//______________________________________________________________//



//______________função que configura o botão de fugir___________//

function fugir_da_luta(){
    if(!em_batalha || chance_de_escapar==false){
        return
    }

    let sorteio=Math.floor(
        Math.random()*10
    )

    if (em_batalha && turno==1 && sorteio>=7 && chance_de_escapar){
        em_batalha=false
        mensagem_log(`o resutado do sorteio foi ${sorteio}, você escapou`)
        turno=1
        nome_head.value=""
        sprite_inimigo_atual.classList.add("morrer")
        setTimeout(()=>{
            sprite_inimigo_atual.style.display="none";
        },500)
    }

    else{
        mensagem_log(`o resultado do sorteio foi ${sorteio}, você não conseguiu fugir da luta`)
        chance_de_escapar=false
    }
}

//_________________________________________________________________//

//____________função para atualizar a barra de vida____________//

function atualizar_barra_vida(){
    let porcentagem_vida=(jogador.hp/jogador.hp_max) * 100;
    barra_de_vida.style.width =`${porcentagem_vida}%`;
}

function atualizar_barra_mana(){
    let porcentagem_mana=(jogador.mp/jogador.mp_max) * 100;
    barra_de_vida.style.width =`${porcentagem_mana}%`;
}

function atualizar_barra_xp(){
    let porcentagem_xp=(jogador.xp/jogador.xp_proximo) * 100;
    barra_de_xp.style.width =`${porcentagem_xp}%`;
}
//____________________________________________________________///

//função que configura a atualização da vida atual e vida máxima, mp, xp do player//

function atualizar_vida(){
    vida.innerHTML=`<p>${jogador.hp}/${jogador.hp_max}</p>`
    atualizar_barra_vida();
}

function atualizar_mana(){
    mana.innerHTML=`<p>${jogador.mp}/${jogador.mp_max}</p>`
    atualizar_barra_mana();
}

function atualizar_xp(){
    experiencia.innerHTML=`<p>${jogador.xp}/${jogador.xp_proximo}</p>`
    atualizar_barra_xp();

}

function atualizar_level (){

        if(jogador.xp >= jogador.xp_proximo){
            jogador.level++
            jogador.xp -= jogador.xp_proximo;
            jogador.xp_proximo += 100
            mensagem_log(`kimiko upou para o nível ${jogador.level}`);
        }

    level.innerHTML=`LV.${[jogador.level]}`;
}
//__________________________________________________________________________//



//___________________função que configura a animação de dano que o inimigo recebe___________________//

function animacao_dano(monstro){
    monstro.classList.add("tremer");

    setTimeout(() => {
        monstro.classList.remove("tremer");
    }, 200);
}

function animacao_dano_personagem(){
    img_personagem.classList.add("tremer");

    setTimeout(() => {
        img_personagem.classList.remove("tremer");
    }, 200);

    
}

//____________________________________________________________________________________//

//___________________função que configura o nosso ataque no inimigo___________________//

function atacar_inimigo(){
    if (turno==2 || !em_batalha){
        return
    }

    if (em_batalha){
        inimigo_atual.hp -= jogador.atk
        turno=2
        slash_magic.style.display="block"
        if(inimigo_atual.hp>0){
            sprite_inimigo_atual.style.filter = "sepia(100%) saturate(100%) hue-rotate(-50deg) brightness(40%)";
            setTimeout(()=>{
                sprite_inimigo_atual.style.filter = "";
            },100)
        }
        
    }

    setTimeout (() =>{
        ataque_inimigo();
    },800)
    setTimeout (() =>{
        slash_magic.style.display="none"
    },400)

    //________essa parte é para definir o que acontece quando o nimigo morrer_________//

    if (inimigo_atual.hp<=0 && em_batalha){
        em_batalha=false
        chance_de_escapar=true;
        mensagem_log(`O ${inimigo_atual.nome} morreu!`)
        turno=1
        nome_head.value=""
        sprite_inimigo_atual.classList.add("morrer")
        sprite_inimigo_atual.style.filter = "grayscale(100%) brightness(40%)";
        if(inimigo_atual.nome==="slime"){
            jogador.xp+=20;
            mensagem_log(`você recebe 20 XP`)
        }
        atualizar_level()
        atualizar_xp()
        setTimeout(()=>{
            sprite_inimigo_atual.style.display="none";
        },500)

        
        return;
    }
    mensagem_log(`você causou ${jogador.atk} de dano!`)
    animacao_dano(sprite_inimigo_atual);

}

//____________________________________________________________________________//

//___________________função que configura o ataque do inimigo___________________//
function ataque_inimigo(){
    if (turno!==2){
        return
    }
    
    if (em_batalha){
        let dano =Math.floor(
            Math.random()*5
        ) + (inimigo_atual.atk - 2)
       sprite_inimigo_atual.classList.add("atacar");
       setTimeout(()=>{
        sprite_inimigo_atual.classList.remove("atacar");
       },100)
        
        jogador.hp-=dano;
    if (jogador.hp < 0){
        jogador.hp=0
    }

        turno=1
        atualizar_vida()
        animacao_dano_personagem()
        mensagem_log(`${inimigo_atual.nome} atacou você, e causou ${dano} de dano!`)
    }
    
}

//____________________________________________________________________________//

//___________________função que configura o drop de itens___________________//

function encontrar_item (){
    const indice_item = 
        Math.floor(
            Math.random()*lista_de_itens.length);
    const item = lista_de_itens[indice_item];
    mensagem_log(`você encontrou ${item}`);
}

//____________________________________________________________________________//

//___________________função que configura o encontro de inimigos___________________//
function encontrar_inimigo (){

    

    const indice_monstro = 
        Math.floor(
            Math.random()*lista_de_inimigos.length);

    
    const monstro = lista_de_inimigos[indice_monstro];

    inimigo_atual={...lista_de_inimigos[indice_monstro]};

    mensagem_log(`você encontrou ${monstro.nome}`); 

    // aqui é o espaço destinado aos eventos que acontecem através do encontro com os inimigos salvos na biblioteca de monstros//

    //-----------------------------------------------------------------------------//

    if(monstro.nome==="slime"){
        slime.style.display="block";
        sprite_inimigo_atual=slime;
        sprite_inimigo_atual.classList.add("fadein");
        setTimeout(() => {
            sprite_inimigo_atual.classList.remove("fadein");
        }, 500);
        atual_personagem_dialogo()
        nome_head.value=`${monstro.nome}`
        em_dialogo=true
        em_batalha=false
    }

    //-------------------------------------------------------------------------------//

    sprite_inimigo_atual.classList.remove("morrer")
    sprite_inimigo_atual.style.filter = "";
}

//_______________________________________________________________________________________________//


//___________________função de mensagem log, para aparecer no input log___________________//

function mensagem_log(texto){
    if(animacao_andando){  
        return
    }
    console_log.innerHTML+=`<p>${texto}</p>`;
    console_log.scrollTop =
        console_log.scrollHeight; 
}
//____________________________________________________________________________//


//___________________comandos da função de andar___________________//

function acoes_andar(){
    
    if (animacao_andando){
       return
    }

    if(em_batalha){
        return
    }

    if(em_dialogo){
        return
    }

    mensagem_log("Kimiko anda alguns passos pela floresta");
    
    animacao_andando = true

    lanterna.style.display= "block";

    background.classList.add("andar");
    
    tela_background.style.transform="scale(2.3)"
    
    

    setTimeout(() => {
        background.classList.remove("andar");
    }, 1000);
    

    setTimeout(()=>{
        tela_background.style.transform=
            "scale(1)";
        void background.offsetWidth;
    },400);

    setTimeout(()=>{
        lanterna.style.display=
            "none"
        animacao_andando = false
        comecar_sorteio = true
    },1000);


// comandos de sorteio dos drops //

    setTimeout(() => {

        const sorteio = Math.random();

        if (!comecar_sorteio){
            return
        }

        if (sorteio < 0.20){

            encontrar_item();

        }
        else if (sorteio < 0.80){

            encontrar_inimigo();

        }
        else{

            mensagem_log(
                "Não encontrou nada"
            );
            comecar_sorteio == true

        }

        animacao_andando = false;

    }, 1000);

}

//____________________________________________________________________________//



