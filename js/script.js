/* ==========================================================
   script.js - Funciones auxiliares de manipulación del DOM
   Taller #4 Programación Web I
   ========================================================== */

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

/* Crea una línea "Etiqueta: valor" reutilizable en el detalle */
function crearFilaDato(etiqueta, valor) {
    let fila = crearElemento('p')
    fila.classList.add('letraGeneral')

    let etiquetaTexto = crearElemento('span')
    etiquetaTexto.textContent = etiqueta + ': '

    let valorTexto = crearElemento('span')
    valorTexto.textContent = valor
    valorTexto.style.color = '#101828'
    valorTexto.style.fontWeight = 'bold'

    adicionarElementoAContenedor(etiquetaTexto, fila)
    adicionarElementoAContenedor(valorTexto, fila)
    return fila
}

/* Formatea el precio con separador de miles, ej: 1899.99 -> 1,899.99 */
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