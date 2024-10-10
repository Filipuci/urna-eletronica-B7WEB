const c = el => document.querySelector(el)
const cs = el => document.querySelectorAll(el)

const seuVotoPara = c('.d-1-1 span')
const cargo = c('.d-1-2 span')
const descricao = c('.d-1-4')
const aviso = c('.d-2')
const lateral = c('.d-1-right')
const numeros = c('.d-1-3')

let etapaAtual = 0
let numero = ''
let branco = false
let votos = []

function começarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    branco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter(item => {
        if (item.numero === numero) {
            return true
        }
        else {
            return false
        }
    })

    if(candidato.length > 0) {
        candidato = candidato[0],
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`
        
        let fotosHtml = ''
        
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"> <img src="images/${candidato.fotos[i].url}"/> ${candidato.fotos[i].legenda} </div>`
            } else {
                fotosHtml += `<div class="d-1-image"> <img src="images/${candidato.fotos[i].url}"/> ${candidato.fotos[i].legenda} </div>`
            }
        }
        
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

cs('.number').forEach(btn => {
    btn.addEventListener('click', () => {
        let elNumero = c('.numero.pisca')
        if (elNumero !== null) {
            elNumero.innerHTML = btn.textContent
            numero = `${numero}${btn.textContent}`

            elNumero.classList.remove('pisca')
            if(elNumero.nextElementSibling) {
                elNumero.nextElementSibling.classList.add('pisca')
            } else {
                atualizaInterface()
            }
        }
    })
});

c('.botao--branco').addEventListener('click', () => {
    if (numero === '') {
        branco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
    }
})

c('.botao--corrige').addEventListener('click', () => {
    começarEtapa()
})

c('.botao--confirma').addEventListener('click', () => {
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false

    if(branco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado) {
        etapaAtual++
        if(etapas[etapaAtual] !== undefined) {
            começarEtapa()
        } else {
            c('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
})

começarEtapa()