# Projeto-RPG-Random-Enconter-System
Um RPG de exploração desenvolvido com HTML, CSS e JavaScript puro, inspirado em jogos de aventura, encontros aleatórios e progressão de personagem.


<img width="1443" height="909" alt="Captura de tela 2026-06-09 131145" src="https://github.com/user-attachments/assets/8efb345a-5be6-4304-afaa-2dd91e0e985a" />

Todo o sistema do projeto foi criado por mim, alem dos sprites presentes (exceto o background), a disposição do código foi baseada na estrutura de módulos com finalidade de implementação e crescimento contínuo do projeto.

A seguir a lista dos módulos criados até o momento:

-Sistema de diálogos:
sistema de dialogo simples utilizando array, a qual criei objetos contendo o nome da criatura ou player que está comunicando o diálogo naquele momento, além do texto, ambos armazenados dentro do array "dialogo"
a qual é usado atrávez de um indice armazenado dentro de uma variável, contando constantemente qual fala será dita e até quando será dita.

-Botões de ações dinâmicos:
Tambem me dispus a criar botões que gerenciam ações dentro do jogo, a qual permite, o jogador decidir o que fazer e quando, cada botão possui suas funções com estados a serem verificados, considerando sempre
se o estádo atual permite a ação daquele comando ou não, ocorrendo assim o fluxo correto da gameplay sem atropelar ações uma nas outras nem as animações.

-Barra de vida, mana e experiência:
os sistemas que gerenciam a barra de vida, mana e experiência, possuem núcleo semelhantes, ambos alteram a cor do background que estão armazenadas em suas respectivas divs, através de um comando que divide a quantidade atual
pela quantidade máxima, e multiplicando seu valor por 100, transformando assim seu valor em uma porcentagem de 0 a 100, podendo então ser usada idependente do valor máximo atual, permitindo inclusive a adição desses valores
futuramente.

-Animações:
essa parte foi particulamente complicada de manipular utilizando o DOM, devido a limitação técnica do CSS, de utilizar mais de um elemento na mesma div, por exemplo, não é possivel utilizar, duas funções de transform no mesmo sprite, tornando-se assim um desafio de organização em todas as esferas do projeto. Contudo, apesar das dificuldades enfrentadas, busquei pesquisar as mais diversas formas de chegar ao meu objetivo, de deixar as animações fluidas e correspondentes com o estado a qual cada sprite precisa se encontrar, acredito que tenho que melhorar ainda muito dessa parte, e estarei adicionando nas atualizações futuras.

-Valores personalizáveis:
Me esforçei para deixar o código flexível o suficiente para modificações e adições futuras, organizando valores em objetos, e ações em funções claras, permitindo por exemplo se eu quiser adicionar outros inimigos, seria assim então fácilmente integrá-lo no código sem quebrar os demais elementos já formados.

-Sistema de sorteio manipulável:
O sistema de encontros acontece por meio de sorteios de valores aleatórios simples, e de facil modificação, adição e manipulação.

O projeto está em fase inicial e pretendo melhorar adicionar e organizar cada vez mais até atingir em algum momento o objetivo que dispus a criar, ser um RPG, com gênero próprio, consiso e acima de tudo divertido.
