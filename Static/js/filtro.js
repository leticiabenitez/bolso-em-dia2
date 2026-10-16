var filtroStatus = document.querySelector("#filtro-status")
var filtroTipo = document.querySelector("#filtro-tipo")
var buscarCategoria = document.querySelector("#buscar-categoria")


function filtrarCategorias() {
    var valorStatus = filtroStatus.value
    var valorTipo = filtroTipo.value
    var valorBusca = buscarCategoria.value.toLowerCase()

    var itens = document.querySelectorAll(".item-categoria")

    itens.forEach(function (item) {
        var statusCategoria = item.dataset.status
        var tipoCategoria = item.dataset.tipo
        var nomeCategoria = item.dataset.nome.toLowerCase()

        var mostrarStatus = valorStatus == "todos" || statusCategoria == valorStatus
        var mostrarTipo = valorTipo == "todos" || tipoCategoria == valorTipo
        var mostrarNome = nomeCategoria.includes(valorBusca)

        if (mostrarStatus && mostrarTipo && mostrarNome) {
            item.style.display = "flex"
        } else {
            item.style.display = "none"
        }
    })
}


filtroStatus.addEventListener("change", function () {
    filtrarCategorias()
})


filtroTipo.addEventListener("change", function () {
    filtrarCategorias()
})


buscarCategoria.addEventListener("input", function () {
    filtrarCategorias()
})