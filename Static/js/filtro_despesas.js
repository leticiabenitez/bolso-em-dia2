var buscarDespesa = document.querySelector("#buscar-despesa")
var filtroMes = document.querySelector("#filtro-mes")
var filtroCategoria = document.querySelector("#filtro-categoria")

var periodoTodas = document.querySelector("#periodo-todas")
var periodoMes = document.querySelector("#periodo-mes")
var periodoTresMeses = document.querySelector("#periodo-tres-meses")

var ordenarData = document.querySelector("#ordenar-data")
var ordenarValor = document.querySelector("#ordenar-valor")

var itens = document.querySelectorAll(".item-despesa")

var periodoSelecionado = "todas"
var ordemData = "desc"
var ordemValor = "desc"


// coloca no filtro as categorias que existem na tabela
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


// filtra as despesas
function filtrarDespesas() {
    var valorBusca = buscarDespesa.value.toLowerCase()
    var valorMes = filtroMes.value
    var valorCategoria = filtroCategoria.value

    var hoje = new Date()
    var mesAtual = hoje.getMonth() + 1
    var anoAtual = hoje.getFullYear()

    itens.forEach(function (item) {
        var descricao = item.dataset.descricao.toLowerCase()
        var categoria = item.dataset.categoria
        var data = item.dataset.data

        var partesData = data.split("-")

        var anoDespesa = Number(partesData[0])
        var mesDespesa = Number(partesData[1])

        var mostrarBusca = descricao.includes(valorBusca)

        var mostrarMes =
            valorMes == "todos" ||
            mesDespesa == valorMes

        var mostrarCategoria =
            valorCategoria == "todos" ||
            categoria == valorCategoria

        var mostrarPeriodo = true


        if (periodoSelecionado == "mes") {
            mostrarPeriodo =
                mesDespesa == mesAtual &&
                anoDespesa == anoAtual
        }


        if (periodoSelecionado == "tres-meses") {
            var numeroMesAtual = anoAtual * 12 + mesAtual
            var numeroMesDespesa = anoDespesa * 12 + mesDespesa
            var diferencaMeses = numeroMesAtual - numeroMesDespesa

            mostrarPeriodo =
                diferencaMeses >= 0 &&
                diferencaMeses <= 2
        }


        if (mostrarBusca && mostrarMes && mostrarCategoria && mostrarPeriodo) {
            item.style.display = "table-row"
        } else {
            item.style.display = "none"
        }
    })
}


// busca pela descrição
buscarDespesa.addEventListener("input", function () {
    filtrarDespesas()
})


// filtro pelo mês
filtroMes.addEventListener("change", function () {
    filtrarDespesas()
})


// filtro pela categoria
filtroCategoria.addEventListener("change", function () {
    filtrarDespesas()
})


// todas
periodoTodas.addEventListener("click", function () {
    periodoSelecionado = "todas"

    periodoTodas.classList.add("ativo")
    periodoMes.classList.remove("ativo")
    periodoTresMeses.classList.remove("ativo")

    filtrarDespesas()
})


// este mês
periodoMes.addEventListener("click", function () {
    periodoSelecionado = "mes"

    periodoTodas.classList.remove("ativo")
    periodoMes.classList.add("ativo")
    periodoTresMeses.classList.remove("ativo")

    filtrarDespesas()
})


// últimos 3 meses
periodoTresMeses.addEventListener("click", function () {
    periodoSelecionado = "tres-meses"

    periodoTodas.classList.remove("ativo")
    periodoMes.classList.remove("ativo")
    periodoTresMeses.classList.add("ativo")

    filtrarDespesas()
})


// ordena pela data
ordenarData.addEventListener("click", function () {
    var tabela = document.querySelector("#tabela-despesa")
    var linhas = document.querySelectorAll(".item-despesa")
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


// ordena pelo valor
ordenarValor.addEventListener("click", function () {
    var tabela = document.querySelector("#tabela-despesa")
    var linhas = document.querySelectorAll(".item-despesa")
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