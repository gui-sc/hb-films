# Direção Criativa e Técnica — Site de Agência Videomaker B2B

> **Objetivo:** construir um site de agência videomaker focada em projetos empresariais que pareça uma experiência audiovisual/editorial, e não um template de agência.
>
> **Stack base:** React + Vite + TypeScript
>
> **Paleta:** exclusivamente preto, branco e tons neutros derivados dos dois. Sem cores de destaque, sem gradientes coloridos.

---

## 1. Conceito central

O site deve parecer uma mistura de:

- filme institucional premium;
- mesa de edição;
- contact sheet de fotografia;
- apresentação editorial;
- showreel interativo;
- portfólio de uma produtora cinematográfica.

A diferença não deve vir de “colocar animação em tudo”.

Ela deve vir da sensação de que **todo o site foi dirigido como um vídeo**.

A navegação pode usar conceitos de:

- cena;
- corte;
- take;
- frame;
- foco;
- timeline;
- timecode;
- abertura;
- créditos finais;
- making of.

### Ideia de posicionamento visual

Em vez de:

> "Somos uma agência que transforma ideias em vídeos."

Usar mensagens mais fortes e orientadas ao mercado empresarial, por exemplo:

> **FILMES QUE FAZEM EMPRESAS PARECEREM DO TAMANHO QUE ELAS SÃO.**

ou:

> **TRANSFORMAMOS OPERAÇÕES, PESSOAS E MARCAS EM FILMES QUE GERAM PERCEPÇÃO DE VALOR.**

ou ainda:

> **CORPORATE FILMS, WITHOUT THE CORPORATE LOOK.**

A última é especialmente boa se a marca aceitar linguagem internacional.

---

# 2. Stack recomendada

## Base

```bash
npm create vite@latest
```

Usar:

- React;
- TypeScript;
- Vite.

---

## Animação principal — GSAP

```bash
npm install gsap @gsap/react
```

Usaria GSAP como motor principal das experiências mais cinematográficas.

Especialmente:

- `ScrollTrigger`;
- `SplitText`;
- timelines;
- pinned sections;
- scrub;
- máscaras;
- parallax;
- transições sincronizadas.

### Ideal para

- revelar frases linha por linha;
- animar grandes títulos;
- controlar vídeos pelo scroll;
- criar seções travadas;
- criar entradas com timing cinematográfico;
- transições entre cenas.

Documentação:

- https://gsap.com/docs/v3/
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/Plugins/SplitText/

---

## Motion

```bash
npm install motion
```

Não precisa substituir o GSAP.

Pode ser usado para as microinterações de React:

- hover;
- botões;
- menu;
- modais;
- mudança de layout;
- cards;
- componentes que aparecem/desaparecem.

Documentação:

- https://motion.dev/docs/react

### Divisão recomendada

**GSAP**
para experiências grandes e dirigidas por scroll.

**Motion**
para comportamento de componentes e microinterações.

---

## Smooth Scroll — Lenis

```bash
npm install lenis
```

Usar Lenis para deixar o scroll com uma sensação mais contínua e cinematográfica.

Documentação:

- https://lenis.darkroom.engineering/

Importante: não exagerar na suavização.

O scroll ainda deve parecer responsivo.

---

## Experiência 3D opcional — React Three Fiber

```bash
npm install three @react-three/fiber @react-three/drei
```

Usar somente em **1 ou 2 momentos especiais**.

Exemplo:

uma película / frame de vídeo 3D flutuando na abertura ou na seção de projetos.

Documentação:

- https://r3f.docs.pmnd.rs/

### Não fazer

Não transformar o site inteiro em WebGL.

Para clientes empresariais, o efeito deve parecer sofisticado e não um experimento de portfólio de desenvolvedor.

---

# 3. Paleta visual

## Base

```css
:root {
  --black: #000000;
  --white: #ffffff;

  --gray-950: #0a0a0a;
  --gray-900: #111111;
  --gray-800: #1a1a1a;
  --gray-700: #2a2a2a;

  --gray-300: #c8c8c8;
  --gray-200: #dddddd;
  --gray-100: #eeeeee;
}
```

Apesar de haver tons intermediários, toda a identidade continua sendo preto e branco.

### Regra

Não adicionar:

- azul;
- vermelho;
- laranja;
- roxo;
- verde;
- gradiente colorido.

O destaque deve ser criado por:

- escala;
- contraste;
- movimento;
- composição;
- tipografia;
- fotografia;
- vídeo;
- luz.

---

# 4. Tipografia

A tipografia deve ter muito mais importância do que normalmente tem em sites de agência.

Sugestão:

## Fonte principal

Uma grotesca/neo-grotesca forte.

Exemplos:

- Inter;
- Geist;
- Manrope;
- Archivo;
- Helvetica Neue, se houver licença;
- Neue Montreal, se houver licença;
- Suisse, se houver licença.

## Fonte secundária

Opcionalmente uma serif editorial apenas para frases específicas.

Exemplos:

- Instrument Serif;
- DM Serif Display.

### Combinação interessante

**Geist / Inter**

para:

- títulos;
- números;
- UI;
- menus.

**Instrument Serif**

somente para:

- uma palavra;
- citações;
- contraste editorial.

Não usar serif em excesso.

---

# 5. Abertura do site

A primeira dobra precisa ser memorável.

## Conceito: OPENING SEQUENCE

Tela totalmente preta.

No carregamento:

```text
00:00:00:00
```

O timecode começa a correr rapidamente.

Depois aparece:

```text
A FILM BY
[NOME DA PRODUTORA]
```

Em aproximadamente 600–900 ms ocorre um corte seco.

O hero aparece.

### Alternativa

Uma barra preta atravessa a tela como se fosse:

- obturador;
- wipe cinematográfico;
- claquete fechando.

Quando ela sai, revela o vídeo.

---

# 6. Hero diferente do padrão

## Evitar

Hero convencional:

```text
Título
Subtítulo
Botão
Imagem à direita
```

## Fazer

Usar um vídeo ocupando praticamente toda a viewport.

### Estrutura

```text
[ VIDEO FULLSCREEN ]

FILMES PARA
EMPRESAS QUE
PRECISAM SER VISTAS.

                     PLAY SHOWREEL  01:24
```

Vídeo:

- autoplay;
- muted;
- loop;
- `playsInline`;
- baixa duração;
- cortes impactantes.

Não colocar áudio automático.

---

## Efeito interessante no hero

O vídeo inicia em:

```css
filter: grayscale(1) contrast(1.05);
```

Como o site é preto e branco, os próprios vídeos podem ser tratados em monochrome no hero.

No projeto completo, ao abrir o case, o vídeo pode ser exibido em sua versão original, caso a identidade permita.

Se a exigência for literalmente 100% preto e branco em todo momento, mantenha o tratamento monocromático também nos cases.

---

# 7. Máscara cinematográfica no vídeo

Em vez de simplesmente mostrar um vídeo quadrado ou 16:9:

o vídeo começa como uma pequena faixa horizontal.

Exemplo:

```text
━━━━━━━━━━━━ VIDEO ━━━━━━━━━━━━
```

Durante o scroll, a máscara cresce:

```text
10% altura
↓
30%
↓
60%
↓
100vh
```

Use:

```css
clip-path: inset(...)
```

ou uma timeline GSAP.

### Resultado

O usuário literalmente “abre” o filme ao começar a navegar.

---

# 8. Navegação cinematográfica

Menu minimalista:

```text
STUDIO
WORK
CAPABILITIES
CONTACT
```

No canto:

```text
SP / BR
20:42
```

Opcional:

```text
AVAILABLE FOR PROJECTS
```

### Menu fullscreen

Ao clicar no menu:

o conteúdo atual pode sair como um frame deslocado.

Novo menu entra ocupando toda a tela:

```text
01 — WORK
02 — STUDIO
03 — SERVICES
04 — CONTACT
```

No hover de cada item:

um pequeno vídeo correspondente aparece no fundo.

---

# 9. Cursor personalizado — mas com propósito

Evitar círculo gigante seguindo o mouse sem função.

Fazer o cursor assumir contextos.

## Estado normal

```text
+
```

como um ponto de foco de câmera.

## Sobre projeto

```text
VIEW
```

## Sobre vídeo

```text
PLAY
```

## Durante arraste

```text
DRAG
```

## Sobre CTA

círculo fino que “encaixa” no botão.

Isso cria uma linguagem visual relacionada a câmera e direção.

---

# 10. Cursor de foco / autofocus

Uma ideia muito característica para uma produtora:

quando o cursor entra em determinadas imagens, quatro cantos aparecem:

```text
┌               ┐


└               ┘
```

como um sistema de autofocus.

No hover:

```text
LOCKED
```

ou:

```text
FOCUS 01
```

Isso pode substituir bordas tradicionais nos cards.

---

# 11. Showreel controlado pelo scroll

Uma das seções mais fortes do site.

## Estrutura

A seção fica `pinned`.

O usuário continua rolando.

Mas em vez de a página descer imediatamente:

o scroll controla uma montagem de vídeos.

Exemplo:

```text
00:00
MANIFESTO

00:08
CORPORATE

00:16
BRAND

00:24
PEOPLE

00:32
INDUSTRY
```

Uma timeline na lateral mostra onde ele está.

---

## Timecode

Adicionar um timecode real ou simulado:

```text
00:00:14:18
```

que aumenta conforme o scroll.

Detalhe pequeno, mas extremamente coerente com a marca.

---

# 12. Transições baseadas em cortes

A experiência não precisa ter tudo deslizando suavemente.

Vídeo utiliza cortes.

O site também pode.

Misturar:

### CUT

Troca instantânea de conteúdo.

### FADE

Entrada lenta para momentos institucionais.

### WIPE

Máscara atravessando a tela.

### FLASH FRAME

Uma tela branca por 30–60 ms antes de trocar um projeto.

Usar com moderação.

---

# 13. Seção de projetos — Contact Sheet

Em vez do grid tradicional de cards:

imitar uma folha de contato fotográfica.

Exemplo:

```text
01               02
[ FRAME ]        [ FRAME ]

03               04
[ FRAME ]        [ FRAME ]

05
[ FRAME ]
```

Adicionar pequenas informações abaixo:

```text
PROJECT 014
CLIENT — EMPRESA XYZ
TYPE — CORPORATE FILM
YEAR — 2026
```

---

# 14. Hover de projetos

Ao posicionar o mouse:

imagem estática vira vídeo.

### Antes do hover

Frame parado.

### Hover

Vídeo começa imediatamente, sem áudio.

Texto:

```text
PLAYING 00:03
```

Ao sair:

retorna para o poster.

---

# 15. Cards sem borda tradicionais

Não usar:

```css
border-radius: 20px;
box-shadow: ...
```

Esse visual deixa o site parecido com SaaS.

Preferir:

- bordas retas;
- imagens grandes;
- ausência de sombras;
- contraste preto/branco;
- pequenos códigos editoriais;
- grid rígido;
- muito espaço em branco.

---

# 16. Projeto destacado em formato de filme

Uma seção pode usar frames consecutivos:

```text
FRAME 001
FRAME 002
FRAME 003
FRAME 004
FRAME 005
```

O scroll horizontal revela cenas do mesmo projeto.

As cenas podem contar uma narrativa:

1. briefing;
2. set;
3. filmagem;
4. pós-produção;
5. resultado final.

---

# 17. Horizontal scroll — usar somente uma vez

Uma seção horizontal pode funcionar muito bem para os projetos.

Ao rolar verticalmente:

os trabalhos deslizam horizontalmente.

Exemplo:

```text
01 / COMPANY FILM → 02 / INDUSTRIAL → 03 / PEOPLE → 04 / CAMPAIGN
```

Use GSAP ScrollTrigger.

Não fazer o site inteiro horizontal.

---

# 18. Case empresarial diferente

Ao abrir um projeto, não mostrar apenas:

> Cliente  
> Vídeo  
> Descrição

Criar a estrutura:

```text
THE CLIENT
THE CHALLENGE
THE IDEA
THE FILM
THE IMPACT
BEHIND THE SCENES
```

---

# 19. Resultado empresarial

Como o foco é B2B, o case deve falar de negócio.

Exemplos:

```text
FILM
02:15

DELIVERABLES
06

LOCATIONS
03

SHOOTING DAYS
02
```

E, quando houver dados reais:

```text
+42%
WATCH TIME

1.8M
IMPRESSIONS

4
COUNTRIES

12
CAMPAIGN ASSETS
```

Isso diferencia a produtora de uma agência que só mostra estética.

---

# 20. Antes do vídeo: “The Brief”

Antes de exibir o vídeo principal do case:

mostrar uma frase curta.

Exemplo:

```text
THE BRIEF

Transformar uma operação industrial
complexa em uma história que qualquer
pessoa pudesse entender em 90 segundos.
```

No scroll:

`THE BRIEF` desaparece.

O vídeo cresce até fullscreen.

---

# 21. Vídeo entrando em fullscreen durante o scroll

Começa:

```text
width: 45vw;
height: 25vw;
```

E cresce até:

```text
width: 100vw;
height: 100vh;
```

Enquanto isso:

o texto do projeto desaparece.

Pode ser uma das animações mais marcantes do site.

---

# 22. Scroll Scrubbing de vídeo

Para uma cena curta, é possível sincronizar o progresso do vídeo com o scroll.

Conceito:

```js
video.currentTime = progress * video.duration
```

Mas isso exige bastante cuidado com:

- encoding;
- keyframes;
- preload;
- dispositivos móveis;
- desempenho.

### Onde usar

Somente em uma experiência curta.

Exemplo:

um equipamento se movimentando;
uma câmera girando;
uma pessoa entrando no set;
uma luz sendo acesa.

---

# 23. Alternativa mais performática: sequência de frames

Em vez de scrub de MP4:

exportar uma sequência otimizada de frames.

Exemplo:

```text
frame-001.webp
frame-002.webp
...
frame-080.webp
```

Canvas renderiza o frame correspondente ao scroll.

### Ótimo para

- produto girando;
- equipamento desmontando;
- câmera se aproximando;
- montagem de cenário.

### Atenção

Pré-carregar apenas quando a seção estiver perto da viewport.

---

# 24. “Film Strip” interativo

Criar uma faixa contínua:

```text
[IMG][IMG][IMG][IMG][IMG][IMG][IMG]
```

como película cinematográfica.

Movimento extremamente lento.

Ao passar o mouse:

a faixa reduz a velocidade.

Ao clicar:

abre o projeto correspondente.

---

# 25. Movimento baseado na velocidade do scroll

Não usar velocidade fixa em tudo.

Detectar o `scroll velocity`.

Quanto mais rápido o usuário rolar:

- imagens inclinam levemente;
- film strip acelera;
- blur de movimento aumenta discretamente.

Ao parar:

tudo volta para o lugar.

Esse tipo de detalhe dá sensação de física.

---

# 26. Motion Blur artificial

Durante uma transição:

```css
filter: blur(8px);
transform: scale(1.03);
```

e rapidamente:

```css
filter: blur(0);
transform: scale(1);
```

Simula uma movimentação de câmera.

Muito sutil.

---

# 27. Tipografia gigante entrando como créditos

Frases podem ultrapassar a viewport.

Exemplo:

```text
WE
MAKE
BUSINESS
VISIBLE.
```

Cada palavra pode ocupar aproximadamente:

```css
font-size: clamp(5rem, 14vw, 14rem);
```

No scroll:

as palavras entram por baixo de uma máscara.

---

# 28. SplitText

Animar letras individualmente **somente em títulos principais**.

Exemplo:

```text
C O R P O R A T E
```

As letras podem entrar com pequenos delays.

Mais sofisticado:

animar **linhas inteiras** em vez de caracteres.

Isso tende a parecer mais editorial.

---

# 29. Texto revelado por máscara

Estrutura:

```html
<div class="line-mask">
  <span>Films made to be remembered.</span>
</div>
```

A linha sobe de dentro da máscara.

Esse deve ser um dos movimentos padrão da interface.

---

# 30. “Director's Notes”

Uma seção diferente para explicar o método da agência.

Visual:

```text
DIRECTOR'S NOTES / 01

We don't start with cameras.
We start with what the audience
needs to understand.
```

Depois:

```text
02 / PRE-PRODUCTION
03 / PRODUCTION
04 / POST
05 / DELIVERY
```

Isso reforça pensamento estratégico.

---

# 31. Processo em formato de timeline de edição

Em vez de quatro cards:

```text
00:00 — BRIEF
00:12 — SCRIPT
00:26 — PRE-PRODUCTION
00:42 — SHOOT
01:18 — EDIT
01:40 — DELIVERY
```

O scroll movimenta um playhead:

```text
──────────────●────────────────────
```

---

# 32. Making Of

Clientes empresariais gostam de entender estrutura e profissionalismo.

Adicionar uma seção:

```text
BEHIND
THE
FRAME
```

Mostrar:

- câmeras;
- iluminação;
- equipe;
- set;
- drone;
- captação de áudio;
- direção;
- montagem.

Não transforme isso em uma lista de equipamentos.

O objetivo é demonstrar capacidade operacional.

---

# 33. Logos de clientes

Evitar carrossel genérico com logos.

Fazer como créditos de abertura:

```text
TRUSTED BY

COMPANY A
COMPANY B
COMPANY C
COMPANY D
```

Todos monocromáticos.

No scroll:

cada logo aparece de maneira seca, como créditos.

---

# 34. Número grande de projetos

Se existirem dados relevantes:

```text
12
YEARS

170+
FILMS

43
BRANDS

08
COUNTRIES
```

Números enormes.

Textos pequenos.

Visual editorial.

---

# 35. Seção “Capabilities”

Não usar cards com ícones.

Fazer uma lista editorial.

```text
01  CORPORATE FILMS
02  BRAND FILMS
03  PRODUCT FILMS
04  INDUSTRIAL
05  EMPLOYER BRANDING
06  EVENT FILMS
07  SOCIAL CAMPAIGNS
08  INTERVIEWS
```

No hover:

aparece uma pequena prévia de vídeo.

---

# 36. Preview flutuante no hover

Mouse em:

```text
CORPORATE FILMS
```

faz aparecer perto do cursor:

```text
┌─────────────────┐
│      VIDEO      │
└─────────────────┘
```

Ao mover o cursor:

o vídeo acompanha com leve atraso.

GSAP pode criar essa inércia.

---

# 37. Imagem seguindo o mouse

Outra opção:

o hover de cada projeto revela uma imagem grande no centro.

Ela segue o cursor com atraso:

```text
cursor → x 100
image  → x 92
```

Isso cria sensação de peso.

---

# 38. Menu com preview de projetos

Ao abrir:

```text
WORK
```

mostrar os cases em lista:

```text
01 / INDUSTRY
02 / PEOPLE
03 / BRAND
04 / PRODUCT
```

No hover:

o background inteiro muda para o vídeo daquele projeto.

---

# 39. Background preto ↔ branco

Sem adicionar cor, é possível criar bastante contraste alternando blocos.

Exemplo:

```text
BLACK
hero

WHITE
manifesto

BLACK
projects

WHITE
process

BLACK
contact
```

A própria troca de contraste funciona como um “corte de cena”.

---

# 40. Transição preto → branco

Em vez de simplesmente mudar background:

uma forma branca pode crescer de baixo para cima.

Ou:

uma máscara circular nasce a partir do cursor.

### Melhor opção B2B

wipe vertical ou horizontal.

Mais elegante.

---

# 41. Film Grain

Aplicar um grain muito discreto sobre algumas áreas.

Pode ser:

- uma textura;
- noise em CSS/SVG;
- vídeo de grain em overlay.

Exemplo:

```css
opacity: 0.025;
mix-blend-mode: soft-light;
```

Nunca exagerar.

O efeito deve ser quase imperceptível.

---

# 42. Scanlines?

Pode ser usado em **uma única área**, talvez durante a intro.

Mas não como estilo geral.

Caso contrário, o site fica com estética VHS / retro.

Para projetos empresariais, prefira estética cinematográfica contemporânea.

---

# 43. Frame counter

Ao navegar pelos projetos:

```text
FRAME
04 / 12
```

Pode ficar fixo no canto.

Quando um novo projeto entra:

```text
04 → 05
```

---

# 44. Coordenadas

Um detalhe editorial opcional:

```text
27.5949° S
48.5482° W
```

Se a produtora quiser reforçar localização/origem.

Não é necessário para o conceito principal.

---

# 45. Ícone de REC

Evitaria uma bolinha vermelha, porque a identidade é exclusivamente P&B.

Se quiser usar:

```text
● REC
```

em branco.

Ou:

```text
REC 01
```

sem cor.

---

# 46. Loader inteligente

Não criar loader longo só para parecer sofisticado.

Ideal:

```text
LOADING FILM
42%
```

Mostrar apenas se realmente necessário.

Se a página carregar rapidamente:

pular o loader.

---

# 47. Pré-carregamento

Dar prioridade para:

1. poster do hero;
2. primeira fonte;
3. vídeo do hero;
4. primeira imagem do portfolio.

Lazy load no restante.

---

# 48. Poster dos vídeos

Sempre definir:

```html
poster="/images/project-poster.webp"
```

Evitar a tela preta enquanto o vídeo ainda não carregou.

---

# 49. Vídeo responsivo

Gerar versões diferentes:

```text
hero-desktop.webm
hero-desktop.mp4

hero-mobile.webm
hero-mobile.mp4
```

Não servir um arquivo 4K de desktop no celular.

---

# 50. Vídeos curtos de preview

Preview de card não precisa ter um filme inteiro.

Criar clips:

```text
2–5 segundos
```

sem áudio.

Poucos MB.

---

# 51. Codec

Para compatibilidade, normalmente disponibilizar versões adequadas para os navegadores alvo, por exemplo:

- WebM;
- MP4.

Testar principalmente:

- Chrome;
- Safari;
- iOS Safari.

---

# 52. Som

O site pode ter som, mas nunca iniciar automaticamente.

### Botão

```text
SOUND OFF
```

Ao clicar:

```text
SOUND ON
```

Somente o showreel principal deve utilizar áudio.

---

# 53. Player próprio

Evitar mostrar o player HTML padrão no showreel principal.

Criar:

```text
PLAY / PAUSE
00:32 / 01:42
SOUND
FULLSCREEN
```

Tudo minimalista.

---

# 54. Player fullscreen como experiência

Quando clicar em `PLAY SHOWREEL`:

o site inteiro vira um cinema.

Background preto.

Vídeo central.

Interface quase desaparece.

Após 2 segundos sem movimento:

controles somem.

---

# 55. “Skip Film”

Adicionar:

```text
CLOSE
```

ou:

```text
BACK TO SITE
```

Sempre fácil de localizar.

Não prender o usuário em uma animação.

---

# 56. Seção de manifesto

Uma única frase pode valer mais que cinco parágrafos.

Exemplo:

```text
MOST COMPANIES
HAVE A STORY.

FEW KNOW
HOW TO FRAME IT.
```

O scroll revela uma linha por vez.

---

# 57. Texto em velocidades diferentes

Título:

movimento lento.

Legenda:

movimento rápido.

Imagem:

quase parada.

Esse contraste cria profundidade sem precisar de 3D.

---

# 58. Parallax editorial

Usar em fotos de making-of.

Duas imagens lado a lado.

Uma sobe.

Outra desce.

Muito devagar.

---

# 59. Depth usando escala

Imagem de fundo:

```text
scale 1.08 → 1
```

Texto:

```text
y 100px → 0
```

Pequenos movimentos bem sincronizados parecem mais caros do que grandes efeitos aleatórios.

---

# 60. 3D: frame de filme flutuante

Se quiser uma experiência realmente diferenciada:

no início do portfolio:

um frame 16:9 flutua em 3D.

O frame pode conter um vídeo.

Ao mover o mouse:

rotaciona levemente.

Ao scroll:

ele vem em direção à câmera até ocupar toda a tela.

### Tecnologia

React Three Fiber.

### Importante

Criar fallback normal em dispositivos fracos.

---

# 61. 3D: pilha de frames

Outra ideia:

uma pilha de frames representa os projetos.

```text
[ FRAME 05 ]
 [ FRAME 04 ]
  [ FRAME 03 ]
```

Scroll retira um frame da pilha.

Cada um revela outro trabalho.

Mais original que um carousel.

---

# 62. Shader P&B opcional

Se houver domínio de WebGL, aplicar um shader simples ao vídeo/imagem:

- grain;
- displacement;
- monochrome;
- ripple mínimo.

Não usar glitch colorido.

---

# 63. Distorção de transição

Entre projetos:

a imagem atual pode se deformar por 200–400 ms e revelar a próxima.

Muito pequena.

A intenção é lembrar uma mudança de lente/foco e não um “efeito líquido”.

---

# 64. Blur de foco

Ao passar de uma cena para outra:

```text
focus
→ blur
→ new scene
→ focus
```

Isso é perfeitamente alinhado ao universo videomaker.

---

# 65. Efeito rack focus

Duas camadas:

foreground e background.

Durante o scroll:

```text
background blur 0 → 8
foreground blur 8 → 0
```

Simula troca de foco.

Pode ser usado no manifesto ou making-of.

---

# 66. “Viewfinder”

Em uma seção especial:

adicionar discretamente os quatro cantos de um viewfinder.

```text
┌─────────────────────────────┐
│                             │
│              +              │
│                             │
└─────────────────────────────┘
```

Dentro:

vídeo institucional.

---

# 67. Indicador de aspecto

Pequenos detalhes:

```text
16:9
4K
25 FPS
```

Ao lado de um vídeo.

Use como decoração editorial, não como informação técnica obrigatória.

---

# 68. Timeline do projeto

No case:

```text
PRE-PRODUCTION ━━━━━●━━━━━━━━━━━━━━━━━━

PRODUCTION      ━━━━━━━━━━━●━━━━━━━━━━━━

POST            ━━━━━━━━━━━━━━━━━●━━━━━━
```

O scroll movimenta o indicador.

---

# 69. Frases de clientes como intertítulos

Em vez de testimonial card:

tela preta.

Texto branco central.

```text
“THE FILM MADE PEOPLE
UNDERSTAND IN TWO MINUTES
WHAT TOOK US YEARS TO BUILD.”
```

Abaixo:

```text
CLIENT NAME
POSITION / COMPANY
```

Como um intertítulo de filme.

---

# 70. Não usar estrelas

Para posicionamento empresarial premium:

evitar:

```text
★★★★★
```

Depoimentos escritos e logos de empresas funcionam melhor.

---

# 71. CTA diferente

No final:

```text
YOUR
NEXT FILM
STARTS HERE.
```

Mouse no CTA:

```text
START A PROJECT →
```

O background pode ir de preto para branco.

---

# 72. Formulário premium

Evitar caixas tradicionais demais.

Usar campos como linhas:

```text
NAME
__________________________________

COMPANY
__________________________________

WHAT ARE WE FILMING?
__________________________________
```

---

# 73. Perguntas úteis no formulário

Como foco é corporativo:

```text
COMPANY
PROJECT TYPE
GOAL
ESTIMATED DATE
LOCATION
MESSAGE
```

Opcional:

```text
BUDGET RANGE
```

depende da estratégia comercial.

---

# 74. Contact transition

Ao clicar `START A PROJECT`:

uma máscara cobre o site inteiro.

No centro:

```text
NEW PROJECT
```

e então abre o formulário.

---

# 75. Footer como créditos

Em vez de footer padrão:

```text
────────────────────────────────

A FILM PRODUCTION STUDIO

DIRECTION
[NOME]

PRODUCTION
[NOME]

LOCATION
CIDADE / BRAZIL

INSTAGRAM
VIMEO
LINKEDIN

© 2026

────────────────────────────────
```

Parece crédito de filme.

---

# 76. Créditos rolando

Opcionalmente os itens do footer podem entrar lentamente de baixo para cima.

Mas não fazer uma rolagem infinita que atrapalhe a navegação.

---

# 77. Easter egg

Ao pressionar:

```text
SPACE
```

em uma área específica:

um mini showreel pode iniciar.

Ou:

digitar:

```text
PLAY
```

abre um vídeo secreto de making-of.

É um detalhe divertido sem interferir no público corporativo.

---

# 78. Mobile

Não tente reproduzir todos os efeitos do desktop no celular.

No mobile:

- remover cursor customizado;
- reduzir parallax;
- reduzir WebGL;
- evitar pinned sections muito longas;
- usar vídeos menores;
- reduzir scrub;
- preservar as máscaras e tipografia.

O site mobile deve continuar sofisticado, não ser apenas uma versão quebrada do desktop.

---

# 79. Reduced Motion

Respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

Remover ou reduzir:

- parallax;
- movimento contínuo;
- scroll scrub;
- grandes transições.

O conteúdo precisa continuar funcionando sem animações.

---

# 80. Performance

Esse site será naturalmente pesado por causa dos vídeos.

Portanto:

## Não carregar todos os vídeos de uma vez.

Use:

```html
preload="metadata"
```

ou:

```html
preload="none"
```

nos previews distantes.

---

## Lazy mount

Nem todo `<video>` precisa existir no DOM desde o carregamento inicial.

Montar o player quando estiver próximo.

---

## Intersection Observer

Quando o card entrar na viewport:

```text
load video
```

Quando sair bastante:

```text
pause
```

---

# 81. Organização de mídia

Exemplo:

```text
/public
  /video
    /hero
    /showreel
    /projects
      /project-a
        preview.webm
        preview.mp4
        film.webm
        film.mp4
        poster.webp
```

---

# 82. Estrutura React sugerida

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   │
│   ├── motion/
│   │   ├── SplitReveal.tsx
│   │   ├── MaskReveal.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── HoverVideo.tsx
│   │   ├── Cursor.tsx
│   │   ├── ParallaxMedia.tsx
│   │   └── ScrollVideo.tsx
│   │
│   ├── film/
│   │   ├── Timecode.tsx
│   │   ├── Viewfinder.tsx
│   │   ├── FilmStrip.tsx
│   │   ├── FilmPlayer.tsx
│   │   └── ProjectFrame.tsx
│   │
│   └── sections/
│       ├── Hero.tsx
│       ├── Manifesto.tsx
│       ├── FeaturedWork.tsx
│       ├── Capabilities.tsx
│       ├── Process.tsx
│       ├── Clients.tsx
│       ├── BehindTheScenes.tsx
│       └── Contact.tsx
│
├── hooks/
│   ├── useLenis.ts
│   ├── usePointerVelocity.ts
│   ├── useReducedMotion.ts
│   └── useVideoInView.ts
│
├── data/
│   └── projects.ts
│
└── pages/
    ├── Home.tsx
    └── Project.tsx
```

---

# 83. Componentes reutilizáveis importantes

## `<SplitReveal />`

Entrada de texto linha a linha.

```tsx
<SplitReveal>
  Films made for business.
</SplitReveal>
```

---

## `<MaskReveal />`

Imagem ou vídeo revelado por clip-path.

```tsx
<MaskReveal>
  <video />
</MaskReveal>
```

---

## `<HoverVideo />`

Poster em estado normal.

Vídeo no hover.

---

## `<Timecode />`

```tsx
<Timecode progress={progress} />
```

Exibe algo como:

```text
00:01:42:14
```

---

## `<Viewfinder />`

Overlay reutilizável.

---

## `<MagneticButton />`

CTA acompanha o mouse de forma sutil.

Não deslocar demais.

---

# 84. Página inicial sugerida

## 01 — Opening

Timecode / logo.

---

## 02 — Hero Film

Vídeo fullscreen.

Headline.

Showreel.

---

## 03 — Manifesto

Frase forte.

Tipografia gigante.

---

## 04 — Selected Work

3–5 projetos excepcionais.

Não mostrar 30 trabalhos na home.

---

## 05 — Business Value

Mostrar que vídeo não é só imagem bonita.

```text
STRATEGY
PRODUCTION
DIRECTION
POST
DELIVERY
```

---

## 06 — Capabilities

Lista editorial.

---

## 07 — Behind The Frame

Making of.

---

## 08 — Clients

Empresas atendidas.

---

## 09 — Process

Timeline.

---

## 10 — Contact

Grande CTA.

---

# 85. Ordem narrativa

A home deve responder nesta sequência:

```text
1. Vocês fazem filmes excelentes?

2. Vocês entendem empresas?

3. Que tipos de projeto conseguem produzir?

4. Já trabalharam com empresas relevantes?

5. Como trabalham?

6. Como eu contrato?
```

Isso é mais importante que qualquer animação.

---

# 86. Projeto empresarial em destaque

Uma possibilidade de bloco:

```text
CASE 01 / 2026

CLIENT
ACME INDUSTRIES

OBJECTIVE
MAKE A COMPLEX OPERATION EASY TO UNDERSTAND.

DELIVERABLES
01 HERO FILM
06 SOCIAL CUTS
12 VERTICAL ASSETS

[ LARGE VIDEO ]
```

---

# 87. Motion Design como conteúdo

Além das filmagens, usar pequenos motion graphics no site:

- typographic overlays;
- grids;
- timestamps;
- subtitles;
- tracking marks;
- waveform;
- playheads.

Tudo preto e branco.

---

# 88. Waveform

Próximo ao showreel:

```text
▁▂▃▆▄▅▇▂▃▆▇▄▂▁
```

Pode reagir ao áudio quando o usuário ativá-lo.

---

# 89. Legendas

Usar legendas como elemento de design.

Exemplo:

```text
[01:12]
THIS IS WHERE THE STORY CHANGES.
```

Referência clara a edição.

---

# 90. Subtitles no hero

O hero pode exibir frases em intervalos:

```text
00:04
BRANDS.

00:08
PEOPLE.

00:12
INDUSTRY.

00:16
STORIES.
```

Enquanto os cortes do showreel acontecem.

---

# 91. Marquee

Marquee pode ser usado.

Mas não:

```text
CREATIVE • DESIGN • DIGITAL • CREATIVE • DESIGN
```

Isso virou padrão de agência.

Usar algo contextual:

```text
FILM / DIRECTION / PRODUCTION / EDIT / SOUND / MOTION /
```

Ou não usar.

---

# 92. Evitar tendências saturadas

Evitar usar tudo ao mesmo tempo:

- blob;
- liquid gradient;
- neon;
- glassmorphism;
- excesso de cards arredondados;
- Bento Grid como estrutura principal;
- cursor circular gigante;
- texto infinito correndo;
- noise muito forte;
- 3D sem relação com vídeo;
- dezenas de microanimações competindo.

---

# 93. O diferencial deve ser o conteúdo real

Para esse conceito funcionar, produzir especificamente para o site:

## Vídeo de hero

Montagem de:

- 10 a 20 cortes;
- 8–15 segundos;
- closeups;
- pessoas;
- indústria;
- produto;
- câmera;
- direção;
- luz;
- detalhes.

---

## Clips dos projetos

Para cada case:

```text
preview 01
preview 02
preview 03
```

de poucos segundos.

---

## Making of

Ter material de backstage aumenta muito o potencial visual.

---

# 94. Fotografias específicas

Separar fotos em:

```text
people
equipment
sets
lighting
directing
client
industry
details
```

Não depender exclusivamente de screenshots de vídeos.

---

# 95. GIF?

Eu evitaria GIF tradicional.

Para vídeo curto em loop, prefira:

- WebM;
- MP4.

GIF tende a pesar mais e entregar qualidade inferior para esse tipo de uso.

Se quiser o “comportamento de GIF”, use um `<video>`:

```html
<video
  autoplay
  muted
  loop
  playsinline
/>
```

---

# 96. Fontes de inspiração técnica

Não copie sites.

Procure referências de comportamento:

- produtoras cinematográficas;
- estúdios de motion;
- editoriais de moda;
- portfolios de diretores;
- title sequences;
- créditos cinematográficos;
- interfaces de softwares de edição.

Pesquisar especificamente:

```text
cinematic web design
film production studio website
director portfolio website
interactive film website
editorial portfolio gsap
cinematic scroll animation
webgl video portfolio
scroll controlled video
```

---

# 97. Prioridade das animações

Não tente implementar tudo.

## Nível 1 — indispensável

- Smooth scroll;
- Split text;
- Mask reveal;
- Hover de vídeo;
- Hero cinematográfico;
- grandes transições preto/branco;
- portfolio editorial;
- player próprio;
- page transitions.

---

## Nível 2 — diferencial

- Timecode;
- cursor contextual;
- film strip;
- pinned showreel;
- horizontal projects;
- scroll velocity;
- rack focus;
- preview flutuante.

---

## Nível 3 — experimental

- React Three Fiber;
- shader;
- scrub de vídeo;
- frame sequence;
- WebGL transitions.

Implementaria Nível 3 em apenas **um momento “wow”**.

---

# 98. Minha combinação recomendada

Se fosse construir esse projeto, usaria:

```text
React
Vite
TypeScript

GSAP
ScrollTrigger
SplitText

Lenis

Motion

Three.js / React Three Fiber
somente em um destaque
```

---

# 99. Direção de animação

Definir uma regra global.

### Entrance

```text
duration: 0.8–1.2s
ease: power3.out
```

### Microinteraction

```text
duration: 0.2–0.4s
```

### Cinematic transition

```text
duration: 0.6–1.0s
```

### Hover

Rápido.

### Manifesto

Lento.

O contraste de timing é importante.

---

# 100. Easings

Evitar:

```text
linear
ease-in-out
```

para tudo.

Preferir curvas com personalidade.

Exemplo GSAP:

```js
ease: "power3.out"
```

ou:

```js
ease: "expo.out"
```

Para transições pesadas:

```js
ease: "power4.inOut"
```

---

# 101. Uma possível assinatura visual

O site inteiro pode adotar uma assinatura:

```text
[FRAME NUMBER]
[PROJECT CODE]
[TIMECODE]
```

Exemplo:

```text
A01 / 014
00:32:12
```

Esses códigos aparecem discretamente em diversos pontos.

Isso cria consistência.

---

# 102. Sistema visual

Criar elementos reutilizáveis:

```text
01 / section number
→ navigation arrow
+ camera focus
● recording
00:00 timecode
16:9 aspect
A01 frame ID
```

Não inventar um estilo novo em cada seção.

---

# 103. Homepage — storyboard completo

## Cena 01

Tela preta.

```text
A FILM PRODUCTION STUDIO
```

Corte.

---

## Cena 02

Showreel em fullscreen.

```text
WE FILM
BUSINESS
DIFFERENTLY.
```

---

## Cena 03

Vídeo fecha em uma faixa.

Texto entra:

```text
CORPORATE FILMS
WITHOUT THE
CORPORATE LOOK.
```

---

## Cena 04

Primeiro projeto entra ocupando toda a tela.

---

## Cena 05

Scroll abre contact sheet.

3–5 projetos.

---

## Cena 06

Tela branca.

Manifesto preto.

---

## Cena 07

Timeline do processo.

---

## Cena 08

Making-of com imagens em parallax.

---

## Cena 09

Logos de clientes.

---

## Cena 10

Tela preta.

```text
READY
WHEN
YOU ARE.

START A PROJECT →
```

---

# 104. Uma interação “assinatura”

Se for escolher **uma única interação realmente especial**, faria esta:

## FILM INTO FRAME

Na abertura:

o vídeo ocupa toda a tela.

Ao scroll:

o vídeo reduz e se transforma em um frame cinematográfico.

Ele passa a fazer parte de uma film strip.

O scroll continua.

A film strip passa horizontalmente.

Cada novo frame vira um projeto.

Ao selecionar um:

o frame escolhido expande novamente até ocupar toda a viewport.

Ou seja:

```text
FILME
↓
FRAME
↓
FILM STRIP
↓
PROJETOS
↓
FRAME
↓
FILME
```

Essa interação pode se tornar a assinatura digital da agência.

---

# 105. Segunda interação “assinatura”

## FOCUS TRANSITION

Ao clicar em um projeto:

```text
imagem atual
↓
blur
↓
viewfinder aparece
↓
focus lock
↓
imagem expande
↓
case
```

Tudo em aproximadamente 800 ms.

---

# 106. Terceira interação “assinatura”

## EDITING TIMELINE

Criar uma pequena timeline fixa no rodapé:

```text
00:00 ━━━━━━━●━━━━━━━━━━━━━━━━━━━━ 02:10
```

Ao navegar pela home:

ela avança.

Cada seção representa um “capítulo”.

```text
00:00 INTRO
00:18 WORK
00:58 STUDIO
01:24 PROCESS
01:52 CONTACT
```

O site passa a parecer literalmente um filme de dois minutos.

---

# 107. Qual das três eu escolheria?

Para esse projeto:

## 1º lugar

**FILM INTO FRAME**

É visual, diferente e diretamente relacionado ao negócio.

## 2º

**EDITING TIMELINE**

Excelente como elemento recorrente.

## 3º

**FOCUS TRANSITION**

Ótima transição de página.

As três podem coexistir se forem bem executadas.

---

# 108. Bibliotecas auxiliares

Além do stack principal:

## `@studio-freight/lenis`?

Prefira hoje o pacote oficial:

```bash
npm install lenis
```

---

## Icons

Se precisar:

```bash
npm install lucide-react
```

Mas use pouquíssimos ícones.

---

## Class utilities

```bash
npm install clsx
```

ou:

```bash
npm install class-variance-authority
```

se houver um design system maior.

---

# 109. Não usar biblioteca de componentes pronta como identidade

Pode usar Radix primitives para comportamentos complexos:

- Dialog;
- Dropdown;
- Accessible modal.

Mas evitar deixar o visual parecido com:

- shadcn padrão;
- dashboard;
- SaaS;
- template Tailwind.

O design precisa ser customizado.

---

# 110. CSS

Tailwind é opcional.

Para um site tão dirigido visualmente, CSS Modules, SCSS ou Tailwind funcionam.

Mais importante é ter tokens consistentes:

```text
spacing
type scale
motion
grid
breakpoints
```

---

# 111. Grid

Sugestão:

```text
Desktop:
12 columns

Tablet:
8 columns

Mobile:
4 columns
```

Usar grid editorial.

Alguns elementos deliberadamente atravessam colunas.

---

# 112. Espaçamento

Não ter medo de áreas vazias.

Site premium precisa de respiro.

Exemplo:

```css
section {
  padding-block: clamp(120px, 16vw, 260px);
}
```

Exceto nas seções fullscreen.

---

# 113. Imagens grandes

Um trabalho excelente vale mais que 10 cards pequenos.

Preferir:

```text
1 imagem enorme
+
1 título
+
1 frase
```

em vez de grids super densos em todas as seções.

---

# 114. SEO e acessibilidade

Mesmo sendo um site experimental:

- headings semânticos;
- alt;
- captions;
- transcripts quando importante;
- keyboard navigation;
- foco visível;
- botão para pausar movimento;
- vídeos não essenciais ignoráveis;
- `prefers-reduced-motion`.

---

# 115. Fallback

Se GSAP/WebGL falhar:

conteúdo continua disponível.

A ordem deve ser:

```text
conteúdo
→ layout
→ interação
→ efeitos
```

Nunca o contrário.

---

# 116. Performance Budget

Definir antes de começar.

Exemplo de meta:

- hero poster leve;
- fontes limitadas;
- máximo de duas famílias;
- preview videos pequenos;
- lazy-load de media;
- Three.js carregado somente na rota/seção necessária.

---

# 117. Code splitting

O componente 3D pode ser carregado sob demanda:

```tsx
const FilmScene3D = lazy(() => import("./FilmScene3D"));
```

Não adicionar Three.js ao carregamento inicial se a seção estiver muito abaixo.

---

# 118. Lazy video component

Criar um componente que:

```text
1. renderiza poster
2. observa viewport
3. carrega source
4. toca quando visível
5. pausa quando sai
```

Será extremamente útil.

---

# 119. Mobile video

No celular:

em muitos casos, não iniciar preview por hover porque hover não existe.

Opções:

- poster;
- autoplay apenas quando visível;
- tap para play.

---

# 120. Conteúdo que precisa ser solicitado ao cliente

Antes do desenvolvimento final, solicitar:

- logo em SVG;
- showreel;
- 5–10 melhores projetos;
- versões curtas dos projetos;
- posters;
- nomes dos clientes;
- autorizações de uso;
- descrição do desafio;
- objetivo do vídeo;
- entregáveis;
- making-of;
- depoimentos;
- números/resultados;
- equipe;
- localizações;
- serviços.

---

# 121. Como selecionar projetos

Não ordenar apenas por data.

Escolher projetos que mostrem diversidade:

```text
01 / INDUSTRY
02 / PEOPLE
03 / BRAND
04 / PRODUCT
05 / EVENT
```

O visitante empresarial deve identificar rapidamente:

> “eles conseguem fazer o meu tipo de projeto”.

---

# 122. Copy empresarial

Evitar frases excessivamente abstratas como:

> “Criamos experiências que conectam sonhos.”

Preferir:

> “Transformamos operações complexas em filmes fáceis de entender.”

> “Produção audiovisual para empresas que precisam comunicar com clareza e impacto.”

> “Do conceito à entrega final, com direção, produção e pós em um único time.”

---

# 123. Páginas recomendadas

```text
/
Home

/work
Projects

/work/:slug
Project

/studio
Studio

/contact
Contact
```

`Capabilities` pode ficar na home ou virar rota apenas se houver conteúdo suficiente.

---

# 124. Home curta vs longa

Para esse conceito, faria uma home longa, mas com ritmo.

Alternar:

```text
impacto
↓
respiro
↓
vídeo
↓
texto
↓
vídeo
↓
informação
↓
CTA
```

Evitar 10 seções com o mesmo tamanho.

---

# 125. Ritmo visual

Pensar como edição.

## FAST

Hero.

## SLOW

Manifesto.

## FAST

Projetos.

## SLOW

Processo.

## FAST

Making-of.

## SILENCE

CTA.

Esse ritmo é o que vai fazer o site parecer “dirigido”.

---

# 126. Melhor combinação para o foco empresarial

Se eu precisasse reduzir tudo a um sistema coerente, faria:

### Visual

- preto;
- branco;
- fotografia;
- vídeo;
- tipografia grotesca;
- grid editorial.

### Motion

- máscaras;
- cortes;
- focus/blur;
- SplitText;
- scroll-driven timelines.

### Elementos de cinema

- timecode;
- film strip;
- frame count;
- timeline;
- viewfinder.

### Conteúdo

- projetos empresariais;
- resultados;
- processo;
- making-of;
- clientes;
- direção.

---

# 127. O que eu NÃO faria

Não faria:

- site cheio de partículas;
- background de estrela;
- neon;
- gradientes;
- WebGL em cada tela;
- loader de 5 segundos;
- animações que bloqueiam scroll;
- música automática;
- textos muito pequenos;
- 30 trabalhos na home;
- excesso de cantos arredondados;
- cards de SaaS;
- Bento Grid só porque está na moda;
- parallax em cada imagem;
- carrosséis tradicionais;
- ícones genéricos de “criatividade”.

---

# 128. Resultado visual desejado

Ao entrar no site, o visitante deveria pensar:

> “isso parece a abertura de um filme.”

Ao navegar:

> “eles entendem imagem, ritmo e direção.”

Ao ver os cases:

> “eles também entendem empresas.”

E ao chegar no final:

> “quero que minha empresa pareça assim.”

Esse é o objetivo.

---

# 129. Stack final

```json
{
  "framework": "React + Vite + TypeScript",
  "animation": [
    "GSAP",
    "ScrollTrigger",
    "SplitText",
    "Motion"
  ],
  "scroll": "Lenis",
  "3d_optional": [
    "Three.js",
    "@react-three/fiber",
    "@react-three/drei"
  ],
  "media": [
    "WebM",
    "MP4",
    "WebP/AVIF posters"
  ]
}
```

---

# 130. Ordem de implementação sugerida

## Fase 1 — Design system

Criar:

- tipografia;
- grids;
- espaçamentos;
- preto/branco;
- buttons;
- links;
- motion tokens.

## Fase 2 — Conteúdo

Implementar home sem efeitos avançados.

## Fase 3 — Motion system

Criar:

- SplitReveal;
- MaskReveal;
- PageTransition;
- MagneticButton;
- Cursor.

## Fase 4 — Vídeo

Criar:

- HoverVideo;
- FilmPlayer;
- lazy load;
- posters;
- responsive sources.

## Fase 5 — Scroll storytelling

Adicionar:

- pinned scenes;
- horizontal section;
- timeline;
- timecode.

## Fase 6 — Wow moment

Implementar **FILM INTO FRAME**.

## Fase 7 — 3D/WebGL

Somente se o restante já estiver funcionando perfeitamente.

## Fase 8 — Performance

Testar:

- mobile;
- throttled network;
- Safari;
- iPhone;
- reduced motion.

---

# 131. Prompt de direção para usar durante o desenvolvimento

Você pode colocar algo semelhante no README do projeto:

> Este site deve ser tratado como uma experiência cinematográfica empresarial.
>
> Nenhuma animação deve existir apenas para chamar atenção. Movimento deve representar princípios de filmagem ou edição: corte, frame, máscara, foco, timeline, playhead, transição, ritmo e profundidade.
>
> A interface utiliza exclusivamente preto, branco e tons neutros derivados.
>
> Não introduzir cores de destaque, gradientes coloridos, glassmorphism, cards SaaS ou estética genérica de agência digital.
>
> Priorizar tipografia, vídeo, fotografia, composição e movimento.
>
> O conteúdo deve posicionar a produtora como parceira de empresas, não apenas como uma equipe criativa.
>
> Cada case deve, quando possível, comunicar desafio, conceito, execução, entregáveis e impacto.
>
> As animações devem ter fallback, respeitar `prefers-reduced-motion` e jamais impedir o acesso ao conteúdo.

---

# 132. Conceito resumido em uma frase

## **UM SITE QUE NÃO MOSTRA APENAS OS FILMES DA PRODUTORA — ELE PRÓPRIO SE COMPORTA COMO UM FILME.**
