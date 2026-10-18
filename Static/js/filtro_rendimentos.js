var buscarRendimento = document.querySelector("#buscar-rendimento")
var filtroMes = document.querySelector("#filtro-mes")
var filtroCategoria = document.querySelector("#filtro-categoria")
var filtroStatus = document.querySelector("#filtro-status")

var tipoTodos = document.querySelector("#tipo-todos")
var tipoReceitas = document.querySelector("#tipo-receitas")
var tipoDias = document.querySelector("#tipo-dias")
var tipoServicos = document.querySelector("#tipo-servicos")

var ordenarData = document.querySelector("#ordenar-data")
var ordenarValor = document.querySelector("#ordenar-valor")

var itens = document.querySelectorAll(".item-rendimento")

var tipoSelecionado = "todos"
var ordemData = "desc"
var ordemValor = "desc"


// adiciona as categorias existentes no filtro
itens.forEach(function (item) {
    var nomeCategoria = item.dataset.categoria
    var opcoes = filtroCategoria.querySelectorAll("option")
    var categoriaExiste = false

    opcoes.forEach(function (opcao) {
        if (opcao.value == nomeCategoria) {
            categoriaExiste = true
        }
    })

    if (categoriaExiste == false) {
        var novaOpcao = document.createElement("option")

        novaOpcao.value = nomeCategoria
        novaOpcao.textContent = nomeCategoria

        filtroCategoria.appendChild(novaOpcao)
    }
})


function filtrarRendimentos() {
    var valorBusca = buscarRendimento.value.toLowerCase()
    var valorMes = filtroMes.value
    var valorCategoria = filtroCategoria.value
    var valorStatus = filtroStatus.value

    itens.forEach(function (item) {
        var descricao = item.dataset.descricao.toLowerCase()
        var categoria = item.dataset.categoria
        var status = item.dataset.status
        var tipo = item.dataset.tipo
        var data = item.dataset.data

        var partesData = data.split("-")
        var mesRendimento = Number(partesData[1])

        var mostrarBusca = descricao.includes(valorBusca)

        var mostrarMes =
            valorMes == "todos" ||
            mesRendimento == valorMes

        var mostrarCategoria =
            valorCategoria == "todos" ||
            categoria == valorCategoria

        var mostrarStatus =
            valorStatus == "todos" ||
            status == valorStatus

        var mostrarTipo =
            tipoSelecionado == "todos" ||
            tipo == tipoSelecionado


        if (mostrarBusca && mostrarMes && mostrarCategoria && mostrarStatus && mostrarTipo) {
            item.style.display = "table-row"
        } else {
            item.style.display = "none"
        }
    })
}


buscarRendimento.addEventListener("input", function () {
    filtrarRendimentos()
})


filtroMes.addEventListener("change", function () {
    filtrarRendimentos()
})


filtroCategoria.addEventListener("change", function () {
    filtrarRendimentos()
})


filtroStatus.addEventListener("change", function () {
    filtrarRendimentos()
})


tipoTodos.addEventListener("click", function () {
    tipoSelecionado = "todos"

    tipoTodos.classList.add("ativo")
    tipoReceitas.classList.remove("ativo")
    tipoDias.classList.remove("ativo")
    tipoServicos.classList.remove("ativo")

    filtrarRendimentos()
})


tipoReceitas.addEventListener("click", function () {
    tipoSelecionado = "movimentacao"

    tipoTodos.classList.remove("ativo")
    tipoReceitas.classList.add("ativo")
    tipoDias.classList.remove("ativo")
    tipoServicos.classList.remove("ativo")

    filtrarRendimentos()
})


tipoDias.addEventListener("click", function () {
    tipoSelecionado = "dia_trabalhado"

    tipoTodos.classList.remove("ativo")
    tipoReceitas.classList.remove("ativo")
    tipoDias.classList.add("ativo")
    tipoServicos.classList.remove("ativo")

    filtrarRendimentos()
})


tipoServicos.addEventListener("click", function () {
    tipoSelecionado = "servico_extra"

    tipoTodos.classList.remove("ativo")
    tipoReceitas.classList.remove("ativo")
    tipoDias.classList.remove("ativo")
    tipoServicos.classList.add("ativo")

    filtrarRendimentos()
})


ordenarData.addEventListener("click", function () {
    var tabela = document.querySelector("#tabela-rendimentos")
    var linhas = document.querySelectorAll(".item-rendimento")
    var listaLinhas = Array.from(linhas)

    listaLinhas.sort(function (linha1, linha2) {
        var data1 = linha1.dataset.data
        var data2 = linha2.dataset.data

        if (ordemData == "asc") {
            return data1.localeCompare(data2)
        } else {
            return data2.localeCompare(data1)
        }
    })

    listaLinhas.forEach(function (linha) {
        tabela.appendChild(linha)
    })

    if (ordemData == "desc") {
        ordemData = "asc"
    } else {
        ordemData = "desc"
    }
})


ordenarValor.addEventListener("click", function () {
    var tabela = document.querySelector("#tabela-rendimentos")
    var linhas = document.querySelectorAll(".item-rendimento")
    var listaLinhas = Array.from(linhas)

    listaLinhas.sort(function (linha1, linha2) {
        var valor1 = Number(linha1.dataset.valor)
        var valor2 = Number(linha2.dataset.valor)

        if (ordemValor == "asc") {
            return valor1 - valor2
        } else {
            return valor2 - valor1
        }
    })

    listaLinhas.forEach(function (linha) {
        tabela.appendChild(linha)
    })

    if (ordemValor == "desc") {
        ordemValor = "asc"
    } else {
        ordemValor = "desc"
    }
})