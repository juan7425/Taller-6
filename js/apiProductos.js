
const urlAPI = 'https://dummyjson.com'

/* Guarda la lista completa para poder filtrarla con el buscador */
let listaProductos = []

/* RF1: catálogo*/
async function cargarProductos() {
    let contenedor = document.getElementById('contenedorProductos')

    try {
        let endPoint = urlAPI + '/products?limit=20'
        console.info('Consultando ' + endPoint)

        let respuesta = await fetch(endPoint)
        if (!respuesta.ok) {
            throw new Error('la API respondió con el estado ' + respuesta.status)
        }

        let datos = await respuesta.json()

        if (!datos.products || datos.products.length === 0) {
            mostrarMensajeError('La API no devolvió productos para mostrar.')
            return
        }

        listaProductos = datos.products
        mostrarProductos(listaProductos, contenedor)
        activarBuscador()

    } catch (error) {
        mostrarMensajeError('No se pudo cargar el catálogo: ' + error.message)

    } finally {
        ocultarMensajeCarga()
    }
}

function mostrarProductos(productos, contenedor) {
    contenedor.innerHTML = ''
    productos.forEach(producto => {
        let tarjeta = crearTarjetaProducto(producto)
        adicionarElementoAContenedor(tarjeta, contenedor)
    })
}

function crearTarjetaProducto(producto) {
    let tarjeta = crearElemento('div')
    tarjeta.classList.add('tarjetaProducto')

    /* Clic sobre la tarjeta: abre el detalle con el id real */
    tarjeta.addEventListener('click', function () {
        window.location.href = 'producto.html?id=' + producto.id
    })

    let imagen = crearImagen(producto.thumbnail, producto.title)
    imagen.classList.add('imagenProducto')
    adicionarElementoAContenedor(imagen, tarjeta)

    let pCategoria = crearNodoConTexto('p', producto.category)
    pCategoria.classList.add('categoriaProducto')
    adicionarElementoAContenedor(pCategoria, tarjeta)

    let pNombre = crearNodoConTexto('p', producto.title)
    pNombre.classList.add('letraTitulo')
    adicionarElementoAContenedor(pNombre, tarjeta)

    let filaPrecio = crearElemento('div')
    filaPrecio.classList.add('filaPrecio')

    let pPrecio = crearNodoConTexto('p', '$' + formatearPrecio(producto.price))
    pPrecio.classList.add('precioProducto')
    adicionarElementoAContenedor(pPrecio, filaPrecio)

    let pCalificacion = crearNodoConTexto('p', '★ ' + producto.rating)
    pCalificacion.classList.add('calificacionProducto')
    adicionarElementoAContenedor(pCalificacion, filaPrecio)

    adicionarElementoAContenedor(filaPrecio, tarjeta)

    let pStock = crearNodoConTexto('p', 'Stock: ' + producto.stock)
    pStock.classList.add('letraGeneral')
    adicionarElementoAContenedor(pStock, tarjeta)

    let boton = crearNodoConTexto('button', 'Ver detalle')
    boton.classList.add('botonVerDetalle')
    adicionarElementoAContenedor(boton, tarjeta)

    return tarjeta
}

/*Buscador del catálogo*/
function activarBuscador() {
    let input = document.getElementById('inputBuscar')
    if (!input) {
        return
    }

    input.addEventListener('input', function () {
        let texto = input.value.toLowerCase().trim()
        let contenedor = document.getElementById('contenedorProductos')
        let mensajeVacio = document.getElementById('mensajeVacio')

        let filtrados = listaProductos.filter(function (producto) {
            let nombre = producto.title.toLowerCase()
            let categoria = producto.category.toLowerCase()
            return nombre.includes(texto) || categoria.includes(texto)
        })

        if (filtrados.length === 0) {
            contenedor.innerHTML = ''
            mensajeVacio.textContent = 'No se encontraron productos con ese criterio.'
            mensajeVacio.classList.remove('oculto')
        } else {
            mensajeVacio.classList.add('oculto')
            mostrarProductos(filtrados, contenedor)
        }
    })
}

/*RF2: detalle*/
async function cargarDetalleProducto(idProducto) {

    if (idProducto === null || idProducto === '' || isNaN(Number(idProducto))) {
        mostrarMensajeError('No se recibió un identificador de producto válido en la URL.')
        ocultarMensajeCarga()
        return
    }

    try {
        let endPoint = urlAPI + '/products/' + idProducto
        console.info('Consultando ' + endPoint)

        let respuesta = await fetch(endPoint)

        if (respuesta.status === 404) {
            mostrarMensajeError('El producto con identificador ' + idProducto + ' no existe.')
            return
        }

        if (!respuesta.ok) {
            throw new Error('la API respondió con el estado ' + respuesta.status)
        }

        let producto = await respuesta.json()
        mostrarDetalleProducto(producto)

    } catch (error) {
        mostrarMensajeError('No se pudo cargar el producto: ' + error.message)

    } finally {
        ocultarMensajeCarga()
    }
}

function mostrarDetalleProducto(producto) {
    let contenedor = document.getElementById('contenedorDetalle')

    let caja = crearElemento('div')
    caja.classList.add('contenedorDetalle')

    let imagen = crearImagen(producto.thumbnail, producto.title)
    imagen.classList.add('imagenDetalle')
    adicionarElementoAContenedor(imagen, caja)

    let info = crearElemento('div')
    info.classList.add('infoDetalle')

    let categoria = crearNodoConTexto('p', producto.category)
    categoria.classList.add('categoriaDetalle')
    adicionarElementoAContenedor(categoria, info)

    let titulo = crearNodoConTexto('p', producto.title)
    titulo.classList.add('tituloDetalle')
    adicionarElementoAContenedor(titulo, info)

    let precio = crearNodoConTexto('p', '$' + formatearPrecio(producto.price))
    precio.classList.add('precioDetalle')
    adicionarElementoAContenedor(precio, info)

    let filaCalificacion = crearElemento('div')
    filaCalificacion.classList.add('filaCalificacion')

    let estrella = crearNodoConTexto('span', '★')
    estrella.classList.add('estrellaDetalle')
    adicionarElementoAContenedor(estrella, filaCalificacion)

    let valorCalificacion = crearNodoConTexto('span', producto.rating + ' de 5')
    valorCalificacion.classList.add('valorCalificacion')
    adicionarElementoAContenedor(valorCalificacion, filaCalificacion)

    adicionarElementoAContenedor(filaCalificacion, info)

    let marca = producto.brand ? producto.brand : 'Sin marca'

    adicionarElementoAContenedor(crearFilaDato('Marca', marca), info)
    adicionarElementoAContenedor(crearFilaDato('Stock disponible', producto.stock), info)
    adicionarElementoAContenedor(crearFilaDato('Descuento', producto.discountPercentage + ' %'), info)

    let descripcion = crearNodoConTexto('p', producto.description)
    descripcion.classList.add('descripcionDetalle')
    adicionarElementoAContenedor(descripcion, info)

    adicionarElementoAContenedor(info, caja)

    contenedor.innerHTML = ''
    adicionarElementoAContenedor(caja, contenedor)

    /* Opción visible para regresar al catálogo */
    let contenedorRegresar = crearElemento('div')
    contenedorRegresar.classList.add('contenedorRegresar')

    let enlaceRegresar = crearNodoConTexto('a', 'Regresar al catálogo')
    enlaceRegresar.href = 'index.html'
    enlaceRegresar.classList.add('botonRegresar')

    adicionarElementoAContenedor(enlaceRegresar, contenedorRegresar)
    adicionarElementoAContenedor(contenedorRegresar, contenedor)
}