// const TITULO_TAREAS = document.getElementById('agregarTareas');
// const BOTON_AGREGAR = document.getElementById('btnAgregar');


// BOTON_AGREGAR.addEventListener('click', (e) => {
//     e.preventDefault()
//     TITULO_TAREAS.value = ""
//     const tituloTarea = TITULO_TAREAS.value
//     // console.log(tarea1)
//     if (tituloTarea) {
//         const nuevaTarea = new Tarea(tituloTarea)
//         guardarTarea(nuevaTarea)
//         actualizarLista()
//     }
//     // localStorage.setItem('tituloTareas', tarea1)
// });


//////////////////////////////// CONSTRUCTOR DE OBJETOS Y TAREAS
class Tarea {
    constructor(titulo, estado = 'en curso') {
        this.titulo = titulo
        this.estado = estado
    }
}
//////////////////////////////// AGREGAR TAREAS ////////////////////////////////
document.getElementById('formAgregarTareas').addEventListener('submit', agregarTarea);

function agregarTarea(e) {
    e.preventDefault()
    const titulo = document.getElementById('agregarTareas').value
    if (titulo) {
        const nuevaTarea = new Tarea(titulo)
        guardarTarea(nuevaTarea)
        actualizarLista()
    }
}

//////// GUARDAR Y BUSCAR LAS TAREAS AGREGADAS EN EL LOCAL
function guardarTarea(tarea){
    let tareas = obtenerTareas()
    tareas.push(tarea)
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

function obtenerTareas(){
    let tareas = localStorage.getItem('tareas')
    return tareas ? JSON.parse(tareas) : []
}


//////////////////////////////// MOSTRAR TAREAS EN LA LISTA ////////////////////////////////
function actualizarLista() {
    const lista = document.getElementById('lista')
    lista.innerHTML = ''
    let tareas = obtenerTareas()

    tareas.forEach((tarea, i) => {
        const tareaElement = document.createElement('div')
        tareaElement.classList.add('divListaDeTareas')
        tareaElement.innerHTML = `
            <button class="btnTareaRealizada ${tarea.estado === 'completada' ? 'completada' : ''}" onclick="marcarTarea(${i})"></button>
            <li class="tarea ${tarea.estado === 'completada' ? 'tarea-completada' : ''}">${tarea.titulo}</li>
            <div class="divEliminarTarea"><button class="eliminarTarea" onclick="eliminarTarea(${i})"></div>
        `
        lista.appendChild(tareaElement)
    })
}


//////// MARCAR TAREA COMO REALIZADA
function marcarTarea(i) {
    let tareas = obtenerTareas()
    let tarea = tareas[i]

    tarea.estado = (tarea.estado === 'en curso') ? 'completada' : 'en curso'
    localStorage.setItem('tareas', JSON.stringify(tareas))
    actualizarLista()
}

//////////////////////////////// ELIMINAR UNA TAREA
function eliminarTarea(i) {
    let tareas = obtenerTareas()
    tareas.splice(i, 1)
    localStorage.setItem('tareas', JSON.stringify(tareas))
    actualizarLista()
}

//////////////////////////////// LIMPIAR TODAS LAS TAREAS
document.getElementById('btnLimpiarTareas').addEventListener('click', limpiarTareas)

function limpiarTareas() {
    localStorage.removeItem('tareas')
    actualizarLista()
}