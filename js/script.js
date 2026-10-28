function crearElemento(tag) {
    let nodo = document.createElement(tag)
    return nodo
}

function crearNodoConTexto(tag, texto) {
    let nodo = crearElemento(tag)
    nodo.textContent = texto
    return nodo
}

function crearImagen(src, alt) {
    let nodo = crearElemento('img')
    nodo.src = src
    nodo.alt = alt
    return nodo
}

function adicionarElementoAContenedor(elemento, contenedor) {
    contenedor.appendChild(elemento)
}

function adicionarElementoABody(elemento) {
    document.body.appendChild(elemento)
}


function crearCajaDato(etiqueta, valor, conEstrella) {
    let caja = crearElemento('div')
    caja.classList.add('cajaDato')

    let pEtiqueta = crearNodoConTexto('p', etiqueta)
    pEtiqueta.classList.add('etiquetaDato')

    let pValor = crearNodoConTexto('p', valor)
    pValor.classList.add('valorDato')

    if (conEstrella) {
        pValor.textContent = ''
        let estrella = crearElemento('span')
        estrella.classList.add('estrellaDato')
        estrella.textContent = '★ '
        let numero = crearElemento('span')
        numero.textContent = valor
        adicionarElementoAContenedor(estrella, pValor)
        adicionarElementoAContenedor(numero, pValor)
    }

    adicionarElementoAContenedor(pEtiqueta, caja)
    adicionarElementoAContenedor(pValor, caja)
    return caja
}


function formatearPrecio(valor) {
    return Number(valor).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

function mostrarMensajeError(texto) {
    let mensaje = document.getElementById('mensajeError')
    if (mensaje) {
        mensaje.textContent = texto
    }
}

function ocultarMensajeCarga() {
    let mensaje = document.getElementById('mensajeCarga')
    if (mensaje) {
        mensaje.classList.add('oculto')
    }
}