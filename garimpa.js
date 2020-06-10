let livro, script, txt, listaGarimpada, versiculosTexto, textoFinal, botaoPressionado, resultado, passagem, ultimoVs, capSemVs, palavraBuscada, ocorrencias, textoPopup, selecao, strongGR, strongHB, selecaoGR, selecaoHB
let bibliaSelecionada = []
let listaStrong = []
let listaMorph = []

// cria se não exista uma lista no web Storage caso o usuário queira salvar a lista de versículos garimpados:
if (localStorage.getItem("listaVersiculos") == null || !localStorage.listaVersiculos) {
    localStorage.setItem("listaVersiculos", "[]")
} 

let listaVersiculos = JSON.parse(localStorage.getItem("listaVersiculos"))

function mudaNomes() {
	// obtem o id do botão que foi pressionado (nome da Bíblia escolhida):
	botaoPressionado = event.target.id
	// define que a array bibliaSelecionada seja a de mesmo nome do botaoSelecionado:
	bibliaSelecionada = eval(botaoPressionado)
	console.log(botaoPressionado)
    txt = document.getElementById("areaTexto").value
    livro = document.getElementById('livro').value
    // se o livro foi selecionado na lista de abrir, então executa função abrir():
    if (livro != ''){ 
        abrirVersiculo() 
    }else{
    // https://medium.com/better-programming/working-with-regular-expressions-regex-in-javascript-6c7dd951574a
    // https://stackoverflow.com/questions/34510746/difference-between-1-and-in-regular-expressions

    // let listaNomesLivros = ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", "Samuel", "Reis", "Crônicas", "Esdras", "Neemias", "Ester", "Jó", "Salmos", "Provérbios", "Eclesiastes", "Cantares", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oséias", "Joel", "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias", "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "Tessalonicenses", "Timóteo", "Tito", "Filemon" "Hebreus", "Tiago", "Pedro", "João", "Judas", "Apocalipse"]
    // let listaAbreviacoes = ["Gn", "Ex", "Lv", "Nm", "Dt", "Js", "Jz", "Rt", "Sm", "Rs", "Cr", "Ed", "Ne", "Et", "Jó", "Sl", "Pv", "Ec", "Ct", "Is", "Jr", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ob", "Jn", "Mq", "Na", "Hc", "Sf", "Ag", "Zc", "Ml", "Mt", "Mc", "Lc", "Jo", "At", "Rm", "Co", "Gl", "Ef", "Fp", "Cl", "Ts", "Tm", "Tt", "Fm", "Hb", "Tg", "Pe", "Jo", "Jd", "Ap"]   

    // Se não escapa com \b o JS vai substituir toda palavra tb que tenha as tais letras dentro.
    // p.ex: "leva" por Lva - se não colocar \blev\b ...
    // n? - onde n é opcional. Seria o mesmo que [n], porém salmo[s] não funciona. ??
    // [óo] - ou o ou ó.

    // Texto antes de ser manipulado:
    console.log("Garimpando texto: ", txt)

    // teste - iico2:1 ico 1:10 1 ts 2:1 1 cor3:2  > erro: 1o. Sm 4:4 1°. Sm 2:2

    txt = txt.replace(/\b(1|2|3)[o°aª]\.?/gi, "$1")
        .replace(/(\d)([a-z])/gi, "$1 $2")
        .replace(/([a-z])(\d)/gi, "$1 $2")
        .replace(/\bii\ ?/gi, "2\ ")
        .replace(/\bi\ /gi, "1\ ")
        .replace(/  */g, "\ ")
        .replace(/\ ?:\ ?/gi, ":")
        .replace(/g[eê]nesis|\bg[eê]n\b|\bgn\b/gi, "Gn")
        .replace(/[eê]xodo|[eê]xo\b|[eê]x\b/gi, "Ex")
        .replace(/levítico|levitico|\bLev\b|\blv\b/gi, "Lv")
        .replace(/n[úu]meros|\bn[úu]m\b|\bnm\b/gi, "Nm")
        .replace(/deuteron[ôo]nomio|\bdeut\b|\bdt\b/gi, "Dt")
        .replace(/josu[ée]|\bJos\b|\bjs\b/gi, "Js")
        .replace(/ju[íi]zes|\bjz\b/gi, "Jz")
        .replace(/rute|\brut\b|\brt\b/gi, "Rt")
        .replace(/samuel|\bsam\b|\bsm\b/gi, "Sm")
        .replace(/\breis|\brs\b/gi, "Rs")
        .replace(/cr[ôo]nicas|cr[ôo]n\b|\bcr\b/gi, "Cr")
        .replace(/esdras|esd\b|\bed\b/gi, "Ed")
        .replace(/neemias|neem\b|\bne\b/gi, "Ne")
        .replace(/ester|est\b|\bet\b/gi, "Et")
        .replace(/\bjó\b/gi, "Jó")
        .replace(/salmos?|\bsl\b/gi, "Sl")
        .replace(/prov[ée]rbio[s]|prov\b|\bpv\b/gi, "Pv")
        .replace(/ecl[ei]siastes|ecl\b|\bec\b/gi, "Ec")
        .replace(/cantares|cant\b|c[âa]ntico[s]|\bct\b/gi, "Ct")
        .replace(/isa[íi]as|isa|\bis\b/gi, "Is")
        .replace(/jerem[íi]as|jer|\bjr\b/gi, "Jr")
        .replace(/lamenta[cç][õo]es|lamen\b|lam\b|\blm\b/gi, "Lm")
        .replace(/ezequiel|ezeq\b|eze\b|\bez\b/gi, "Ez")
        .replace(/daniel|dan\b|\bdn\b/gi, "Dn")
        .replace(/os[ée]ias|ose\b|\bos\b/gi, "Os")
        .replace(/joel|\bjl\b/gi, "Jl")
        .replace(/am[óo]s|\bam\b/gi, "Am")
        .replace(/obad[ií]as|obd[ií]as|obad?\b|\bob\b/gi, "Ob")
        .replace(/jonas|jon\b|\bjn\b/gi, "Jn")
        .replace(/miqu[ée]ias|miq\b|\bmq\b/gi, "Mq")
        .replace(/naum|\bna\b/gi, "Na")
        .replace(/habacuque|habacuc|hab\b|\bhc\b/gi, "Hc")
        .replace(/sofon[íi]as|sof\b|\bsf\b/gi, "Sf")
        .replace(/ageo|\bag\b/gi, "Ag")
        .replace(/zacar[ií]as|zaca?\b|\bzc\b/gi, "Zc")
        .replace(/malaqu[íi]as|mal\b|malaq\b|\bml\b/gi, "Ml")
        .replace(/mateus|mat\b|\bmt\b/gi, "Mt")
        .replace(/marcos|\bmc\b/gi, "Mc")
        .replace(/lucas|\blc\b/gi, "Lc")
        .replace(/jo[aã]o|\bjo\b/gi, "Jo")
        .replace(/atos|\bat\b/gi, "At")
        .replace(/romanos|rom\b|\brm\b/gi, "Rm")
        .replace(/cor[ií]ntios|cor\b|\bco\b/gi, "Co")
        .replace(/g[áa]latas|g[áa]l\b|\bgl\b/gi, "Gl")
        .replace(/ef[ée]sios|efe\b|\bef\b/gi, "Ef")
        .replace(/filipen[sc]es|fil\b|filip\b|\bfl\b|\bfp\b/gi, "Fp")
        .replace(/colossenses|colo[cs]en[cs]es|col\b|colos\b|col\b|\bcl\b/gi, "Cl")
        .replace(/tessalonicenses|tes?saloni[cs]s?en[cs]s?es|tess?a?\b|\bts\b/gi, "Ts")
        .replace(/tim[óo]t[ei]o|tim\b|tim[óo]t\b\btm\b/gi, "Tm")
        .replace(/tito|tit\b|\btt\b/gi, "Tt")
        .replace(/filemon|\bfm\b|\bflm\b/gi, "Fm")
        .replace(/[h]ebre[uo]s|\bheb[r]\b|\bhb\b/gi, "Hb")
        .replace(/tiago|\btg\b/gi, "Tg")
        .replace(/pedro|ped?r?\b|\bpe\b/gi, "Pe")
        .replace(/judas|jud\b|\bjd\b/gi, "Jd")
        .replace(/apocalipse|apo[c]\b|apocali?p?\b|\bap\b/gi, "Ap")
        .replace(/(1|2|3) (sm|rs|cr|co|ts|tm|pe|jo)/gi, "$1$2")
        .replace(/([\d]Gn|Ex|Lv|Nm|Dt|Js|Jz|Rt|Sm|Rs|Cr|Ed|Ne|Et|Jó|Sl|Pv|Ec|Ct|Is|Jr|Lm|Ez|Dn|Os|Jl|Am|Ob|Jn|Mq|Na|Hc|Sf|Ag|Zc|Ml|Mt|Mc|Lc|Jo|At|Rm|Co|Gl|Ef|Fp|Cl|Ts|Tm|Tt|Fm|Hb|Tg|Pe|Jd|Ap)\./gi, "$1\ ")
        .replace(/(\d)\.(\d)/gi, "$1:$2")
        .replace(/\ ?-\ ?|\ ?_\ ?/g, "-")

                        //        .replace(/  */g, "\ ")
        garimpa()
    }
    // teste - iico2:1 i co1:10 1 ts 2:1 1 cor3:2  > erro: 1o. Sm 4:4 1°. Sm 2:2

    //.replace(/(\bii ?|\b2[o°0a]\.? ?)(sm|rs|cr|co|ts|tm|pe|jo)/gi, "2$2")
    //.replace(/(\bi ?|\b1[o°0a]\.? ?)(sm|rs|cr|co|ts|tm|pe|jo)/gi, "1$2")
    //.replace(/(\bi ?|\b1o\.? ?|\b1°\.? ?\b1a\.? ?|\b1æ\.? ?)(sm|rs|cr|co|ts|tm|pe|jo)/gi, "1$2")
}

function garimpa() {
    let padrao = new RegExp("[1-3]?(Gn|Ex|Lv|Nm|Dt|Js|Jz|Rt|Sm|Rs|Cr|Ed|Ne|Et|Jó|Sl|Pv|Ec|Ct|Is|Jr|Lm|Ez|Dn|Os|Jl|Am|Ob|Jn|Mq|Na|Hc|Sf|Ag|Zc|Ml|Mt|Mc|Lc|Jo|At|Rm|Co|Gl|Ef|Fp|Cl|Ts|Tm|Tt|Fm|Hb|Tg|Pe|Jd|Ap) [0-9]+:?[0-9]*-?[0-9]*", "gi")

    //let padrao = new RegExp("[1-3]?(Gn|Ex|Lv|Nm|Dt|Js|Jz|Rt|Sm|Rs|Cr|Ed|Ne|Et|Jó|Sl|Pv|Ec|Ct|Is|Jr|Lm|Ez|Dn|Os|Jl|Am|Ob|Jn|Mq|Na|Hc|Sf|Ag|Zc|Ml|Mt|Mc|Lc|Jo|At|Rm|Co|Gl|Ef|Fp|Cl|Ts|Tm|Tt|Fm|Hb|Tg|Pe|Jd|Ap) [0-9]+:?[0-9]*", "gi")
    listaGarimpada = txt.match(padrao)

    versiculosTexto = listaGarimpada.toString().replace(/,/g, "\n")
    document.getElementById("areaTexto").value = versiculosTexto

    // para salvar em localStorage:
    versiculosTexto = versiculosTexto.split("\n")

    // listaGarimpadaUniq = new Set(listaGarimpada) // erro pq não retorna em array.
    // para tirar os repetidos (uniq):
    listaGarimpada = Array.from(new Set(listaGarimpada))
    console.log(listaGarimpada)
    mostraVs()
}


function mostraVs() {
    // if( document.getElementById('areaTexto').value == '' ){
    //     document.getElementById('areaTexto').value = listaGarimpada
    // }    // descartado pq na 1a. vez funciona mas as outras a areaTexto já não estará vazia ptto. não funciona a partir da 2a vez.
    // textoFinal = "" // sem esta linha sairia 1a/e. "undefined" no resultado final.
	// Para colocar o nome da Tradução no cabeçalho da coluna
	botaoPressionado = botaoPressionado.replace('biblia', '')
	textoFinal = `<center><h2>${botaoPressionado}</h2></center>`

    if( ocorrencias != '' ){
        textoFinal += `<center><u>A palavra: <strong>"${palavraBuscada}"</strong> aparece em ${ocorrencias} versículos nesta Tradução:</u></center><br>`
    }

    // a variável abaixo servirá quando se faça map na listaGarimpada.
	let nroVersiculosExtras

    // se no item há um hífen cap: vers a-b (devem ser mostrados os (b-a) versiculos seguintes de b)
    listaGarimpada.map(cadaVs => {
        if(!cadaVs.match(":")){
                // Caso só tenha cap. mas não versículo...
                capSemVs = `${cadaVs}:`
                obtemUltimoVs()
                cadaVs = `${capSemVs}1-${ultimoVs}`
        }
        // A cada passagem da lista, verifica se a passagem tenha um intervalo de versículos, i.é: Sl 23:1-4 ...
        if (cadaVs.match("-")) {
            // se sim:
            // pega a parte Sl 23: <1-4>
            let parteVersiculos = cadaVs.split(":")[1]
            // o versiculo final seria no exemplo = 4.
            let versFinal = parteVersiculos.split("-")[1]
            // o vers. inicial seria no exemplo = 1.
            let versInicial = parteVersiculos.split("-")[0]
            // abaixo seria o resultado de 3 (3 a mais).
            nroVersiculosExtras = Number(versFinal) - Number(versInicial)
            // acima: ALÉM do versInicial tem mais nroVersiculosExtras. (Ex.: 15-17 = 15, 16, 17)
        }else{
            // Caso não haja tracinho na passagem de listaGarimpada (indicando que é só 1 versículo):
            nroVersiculosExtras = 0   
        }
        // retira tudo o que pode existir depois de hífem (incluindo o hífem). Caso contr. não acharia em acf.js a passagem.
        cadaVs = cadaVs.replace(/-.*/, "").trim()
        // percorre biblia selecionada = todos os versículos do arq.js:
        bibliaSelecionada.map((a, b) => {
            // encontrando o versículo pedido pelo usuário dentro de acf.js ou arc.js...
            if (a[0] === cadaVs) {
                // executará a repetição (se houver) de nro de Vers. Extras:
                // caso não o nroVersiculosExtras for 0, somente imprimirá o único vers. pedido pelo usuário:
                for(rep=0; rep <= nroVersiculosExtras; rep++){
                    // b+rep = representa o index (b de map) do vs encontrado em acf.js + nro de iterações (rep) dos próx. versículos solicitados (ex: 15-17):
                    textoFinal += `<strong>${bibliaSelecionada[b+rep][0]}:</strong> "${bibliaSelecionada[b+rep][1]}"<br><br>`
                }
            }
        })
    })
    
    // aparece os elementos de "salvar lista como...":
    document.querySelectorAll(".oculta").forEach(a => a.style.display = "block")

    // A coluna onde será impresso o texto será a de mesmo nome do botão Pressionado + prefixo: 'div'
	resultado = "div" + botaoPressionado
    
    // Verifica se já existe uma coluna aberta com o nome da Tradução escolhida, se não, cria uma nova coluna:
    if (!document.getElementById(resultado)){
        // Se não tem, 
        let novaColuna = document.createElement('div')
        novaColuna.className = 'subdivisao'
        novaColuna.id = resultado
        document.querySelector('.resultado').appendChild(novaColuna)    
        document.getElementById(resultado).style.background = 'white'
    }
    
    // Se for resultado de busca, vai destacar o texto:
    if (ocorrencias != ''){
        let palavra = new RegExp(palavraBuscada, 'gi')
        textoFinal = textoFinal.replace(palavra, `<span class='amarelo'>${palavraBuscada}</span>`)
    }
    
    // Existindo ou não o texto da coluna será impresso:
    document.getElementById(resultado).innerHTML = textoFinal
}


function salvaLista() {
    let data = new Date()
    let dia = data.toDateString().split(" ")[2]
    let mes = data.getMonth() + 1
    if (mes < 10) {
        mes = "0" + mes.toString()
    }
    let ano = data.toDateString().split(" ")[3]
    let hoje = `${ano}${mes}${dia}`
    let hora = data.toTimeString().split(" ")[0]
    let nomeLista = document.querySelector("#nomeLista").value
    let listaObj = {}
		listaObj.data = hoje
		listaObj.hora = hora
		listaObj.nomeLista = nomeLista
		listaObj.versiculos = versiculosTexto
    listaVersiculos.push(listaObj)
    localStorage.listaVersiculos = JSON.stringify(listaVersiculos)
    document.title = nomeLista
}

 
function teclaPressionada(e){
	// se a tecla pressionada for ALT + 1
	if (e.altKey && (e.keyCode == 49 || e.keyCode == 97)) {
	e.preventDefault()
		// Pega a seleção, faz trim...
		selecao = document.getSelection().toString().trim()
        // aqui faz um replace de H000 para H (tirando os zeros à direita de H maiúsculo):
        selecao = selecao.replace(/H0+/gi, 'H')
        // no caso de uma referencia em grego com g minúsculo:
        selecao = selecao.replace(/^g/g, 'G')
        
        // só prossegue se tem uma string selecionada:
        if(selecao != '') {   
            // É STRONG ???             
            // recebe dados se selecao está nos dicionários strong:
            strongGR = strongsGreekDictionary[selecao]
            strongHB = strongsHebrewDictionary[selecao]
            if (strongGR != undefined || strongHB != undefined) {
                console.log('É strong! ' + strongGR + strongHB)
                abreStrong()
            } else {
                // É MORFOLÓGICO ???
                // recebe se é valor morfológico:

                selecaoGR = morphGR.filter( a=> a[0] == selecao )
                selecaoHB = morphHB.filter( a=> a[0] == selecao ) 
                if (selecaoGR.length > 0){ listaMorph = selecaoGR; console.log( ' É morfológico... ' + listaMorph ); abreMorfo()} // / chama funcao... abre morfo no popup
                if (selecaoHB.length > 0){ listaMorph = selecaoHB; console.log(' É morfológico... ' + listaMorph); abreMorfo()} // / chama funcao... abre morfo no popup 
                
                // SE NÃO É MORFOLÓGICO NEM STRONG ....(aqui tb pode encaixar os dicionarios thompson e nave...)
                if (selecaoGR == 0 && selecaoHB == 0){ console.log('Não é morfolog. nem strong') } // chama funcao... para abrir passagem no popup
                
            }
        }
    }
    
    if(e.altKey && (e.keyCode == 84 || e.keyCode == 87)){
	e.preventDefault()
        console.log('pressionou alt + T ou W')
        selecao = document.getSelection().toString().trim()
        selecao = selecao.replace(/ /g, '%20')
        let url = `https://translate.google.com.br/#view=home&op=translate&sl=auto&tl=pt&text=${selecao}`
        // https://www.google.com/search?q=biblia
        window.open(url, '_blank').focus()
        // 
    }

    if(e.altKey && e.keyCode == 71){
	e.preventDefault()
        console.log('pressionou alt + G')
        selecao = document.getSelection().toString().trim()
        selecao = selecao.replace(/ /g, '%20')
        let url = `https://www.google.com/search?q=${selecao}`
        window.open(url, '_blank').focus()
        // 
    }

}


function abreStrong(){
    if (strongGR){selecaoStrong = strongGR}
    if (strongHB){selecaoStrong = strongHB}
    // NÃO ACHA STRONG HB PQ É PRECISO EDITAR OS H000x PARA Hx - na biblia TR, na strongGR e strongHB e OT masorético!!!    ERRO 
    let nro = selecao
    let palavra = selecaoStrong.lemma
    let derivacao = selecaoStrong.derivation
    let significado = selecaoStrong.strongs_def
    let traduzido = selecaoStrong.kjv_def

    // prepara as ocorrências da palavra grega encontradas no Texto Receptus: 
    listaStrong = []
    bibliaTR.filter(a=>{if(a[1].match(nro)){listaStrong.push(a[0])}})
    // bibliaMASORETICA.filter..... caso seja uma ref strong em hb.
    let ocorrenciasStrong = listaStrong.length
    let listaS = listaStrong.toString().replace(/,/g, ', ')

    // monta texto:
    textoPopup = `<h3>DICIONÁRIO STRONG</h3><strong>Ref. Nro.: </strong>${nro}<br><br><strong>Palavra:</strong> ${palavra}<br><br><strong>Derivação:</strong> ${derivacao}<br><br><strong>Significado:</strong> ${significado}.<br><br><strong>Traduzido por:</strong> ${traduzido}.<br><br> <strong>Qtde. de ocorrências no T.R.:</strong> ${ocorrenciasStrong}<br><br><hr>${listaS}<br><br>`

    // abre popup:
    abrePopup()
    
}

function abreMorfo(){
        let morphCod  = listaMorph[0][0]
        let morphElem = listaMorph[0][1]
        let morphDef  = listaMorph[0][2]
        let morphDesc = listaMorph[0][3]
        let morphEx   = listaMorph[0][4]
        
        // converte para maiúscula a primeira letra da frase:
        morphDef  = morphDef[0].toUpperCase() + morphDef.slice(1)
        morphDesc = morphDesc[0].toUpperCase() + morphDesc.slice(1)
        morphEx   = morphEx[0].toUpperCase() + morphEx.slice(1)

        // Da slice exemplo converte os caracteres _e_ para tags (destaca a palavra que define o termo)
        morphEx = morphEx.replace(/_/, '<u>').replace(/_/, '</u>')

        textoPopup = `<h3>MORFOLOGIA</h3><strong>Código: </strong>${morphCod}<br><br><strong>Elementos: </strong>${morphElem}<br><br><strong>Definição: </strong>${morphDef}<br><br><strong>Descrição: </strong>${morphDesc}<br><br><strong>Exemplo: </strong>${morphEx}<br><br>`
        
        abrePopup()

}

function abrePassagem(){}

function abrePopup(){

    // aparece janela e botao de fechar:	
    document.getElementById('fecha').style.display = 'block'
    document.getElementById('flutuante').style.display = 'block'

    // Apaga todo texto da janela e imprime dentro o texto encontrado:
    document.getElementById('flutuante').innerHTML = ''
    document.getElementById('flutuante').innerHTML = textoPopup
    
}

function fechaPopup(){
	// Desaparece com a janela das Strongs e com o botão de fechar.
	document.getElementById('flutuante').style.display = 'none'
	document.getElementById('fecha').style.display = 'none'
}


function limpaInput() {
	// apaga mensagens das caixas de input ao ganhar o foco:
    this.placeholder = ""
    document.getElementById('livro').value = ""
    document.getElementById('cap').value = ""
    document.getElementById('vs').value = ""
}

function limpaTela(){
    limpaInput()
    // remove todos os elementos com classe = subdivisao (colunas com as traduções):
	let colunasDeTexto = document.querySelectorAll('.subdivisao')	
   	colunasDeTexto.forEach(a=> a.remove())
	// colunasDeTexto.forEach(a=> a.innerHTML = "")                 // anteriormente.
	// colunasDeTexto.forEach(a=> a.style.background = '#fff2e6')   // anteriormente.
    // reseta área dos formulários:
	document.getElementById('areaTexto').value = ""
	document.getElementById('areaTexto').placeholder = "Cole aqui o texto a ser garimpado"
    document.getElementById('procura').value = ""
	document.getElementById('procura').placeholder = "Digite palavra para buscar..."
	document.getElementById('nomeLista').placeholder = "Nome da Lista..."
	// desaperece os elementos de "salvar lista como...":
    document.querySelectorAll('.oculta').forEach(a=> a.style.display = 'none')
}


function abrirVersiculo(){
    // escolher o nome do livro, capítulo e versículo
    // livro = //[já definido em mudaNomes()]
    cap = document.getElementById('cap').value
    vs = document.getElementById('vs').value
    capSemVs = `${livro} ${cap}:`
    if(vs == ''){
        obtemUltimoVs()
        vs = `1-${ultimoVs}`
    }
    passagem = `${livro} ${cap}:${vs}`
    listaGarimpada = [passagem]
    mostraVs()
}


function obtemUltimoVs(){
    let listaX = []
    bibliaACF.filter(a=> {if(a[0].match(capSemVs)){listaX.push(a)}})
    ultimoVs = listaX.length
    // só não funciona ainda para o MyC
}

// disparadores e eventos:
/* 
document.getElementById("bibliaARC").addEventListener("click", mudaNomes)
document.getElementById("bibliaACF").addEventListener("click", mudaNomes)
document.getElementById("bibliaNVI").addEventListener("click", mudaNomes)
document.getElementById("bibliaKJV").addEventListener("click", mudaNomes)
document.getElementById("bibliaTR").addEventListener("click", mudaNomes)
*/

function buscaPalavra(){
    palavraBuscada = document.getElementById('procura').value
    let palavra = new RegExp('\\b' + palavraBuscada + '\\b', 'gi')
    let listaX = []
    botaoPressionado = event.target.id
	// define que a array bibliaSelecionada seja a de mesmo nome do botaoSelecionado:
	bibliaSelecionada = eval(botaoPressionado)
    bibliaSelecionada.map((a,b)=>{if(a[1].match(palavra)){listaX.push(a[0])}})
    ocorrencias = listaX.length
    document.getElementById("areaTexto").value = listaX
    mudaNomes()
}


function abrir(){
    ocorrencias = ''
    let btsBiblias = document.querySelectorAll(".btsBiblias")
    btsBiblias.forEach(a=> a.removeEventListener("click", buscaPalavra))
    btsBiblias.forEach(a=> a.addEventListener("click", mudaNomes))
}

function procurar(){
    limpaInput()
    let btsBiblias = document.querySelectorAll(".btsBiblias")
    btsBiblias.forEach(a=> a.removeEventListener("click", mudaNomes))
    btsBiblias.forEach(a=> a.addEventListener("click", buscaPalavra))
}

function garimpar(){
    ocorrencias = ''
    limpaInput()
    let btsBiblias = document.querySelectorAll(".btsBiblias")
    btsBiblias.forEach(a=> a.removeEventListener("click", buscaPalavra))
    btsBiblias.forEach(a=> a.addEventListener("click", mudaNomes))    
}


document.getElementById("limpaTela").addEventListener("click", limpaTela)
document.getElementById("btSalva").addEventListener("click", salvaLista)
document.getElementById("livro").addEventListener("click", abrir)
document.getElementById("procura").addEventListener("focus", procurar)
document.getElementById("areaTexto").addEventListener("focus", garimpar)
document.getElementById("nomeLista").addEventListener("focus", limpaInput)

document.getElementById('fecha').addEventListener("click", fechaPopup)

// ouvidor para disparar evento ao pressionar qualquer tecla dentro de todo o documento:
document.addEventListener('keydown', teclaPressionada)


// para evitar ERRO inexplicável em Gn 1:1 na LTT:  (!!!!!! ??????)
// Tente comentar linha abaixo e abrir Gn 1:1 na LTT.
// bibliaLTT[1][0] =  'Gn 1:1'

// let listaLivros = ["Gn", "Ex", "Lv", "Nm", "Dt", "Js", "Jz", "Rt", "1Sm", "2Sm", "1Rs", "2Rs", "1Cr", "2Cr", "Ed", "Ne", "Et", "Jó", "Sl", "Pv", "Ec", "Ct", "Is", "Jr", "Lm", "Ez", "Dn", "Os", "Jl", "Am", "Ob", "Jn", "Mq", "Na", "Hc", "Sf", "Ag", "Zc", "Ml", "Mt", "Mc", "Lc", "Jo", "At", "Rm", "1Co", "2Co", "Gl", "Ef", "Fp", "Cl", "1Ts", "2Ts", "1Tm", "2Tm", "Tt", "Fm", "Hb", "Tg", "1Pe", "2Pe", "1Jo", "2Jo", "3Jo", "Jd", "Ap"]

// =========================================================

/* PARA REALIZAR BUSCAS::

    palavra = new RegExp('\\bpastor\\b', 'gi')
    listaX = []
    bibliaACF.map((a,b)=>{if(a[1].match(palavra)){listaX.push(a[0])}})
    listaX
    let ocorrencias = listaX.length

    No caso de buscar várias palavras:
    *O mesmo procedimento acima, mas:
    *   fatia a frase em lista de array
    *   executa a função buscar com o item[0]
    *   mas ao invés de dar as ref dos versículos, devolve o texto dos vs:
    *   '    bibliaACF.map((a,b)=>{if(a[1].match(palavra)){listaX.push(a[1])}})
    * Agora neste array acima, realiza de novo a busca com o item[1] sobre o array listaX... etc
    * Depois pode jogar este texto no textarea e automaticamente abrir no resultado.
    

   PARA MUDAR O LISTENER DO BOTÃO:
   * Conforme dá focus em um input, muda o addEventListener.



*/


