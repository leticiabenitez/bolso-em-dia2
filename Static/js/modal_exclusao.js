var botoesExcluir = document.querySelectorAll(".abrir-modal-exclusao")
var modalExclusao = document.querySelector("#modal-exclusao")
var cancelarExclusao = document.querySelector("#cancelar-exclusao")
var formExclusao = document.querySelector("#form-exclusao")

botoesExcluir.forEach(function (botao) {
    botao.addEventListener("click", function () {
        formExclusao.action = botao.dataset.url
        modalExclusao.style.display = "flex"
    })
})

cancelarExclusao.addEventListener("click", function () {
    modalExclusao.style.display = "none"
})