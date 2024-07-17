
let despesas = [];
let totalValor = 0;
let rFixa = 0;
let rExtra = 0;
let saldo = 0;

document.getElementById('calc_renda').addEventListener('click', calcularRenda);
document.getElementById('adicionar-despesa').addEventListener('click', adicionarDespesa);
document.getElementById('calcSaldo').addEventListener('click',calcularSaldo)

function calcularRenda() {
    rFixa = parseFloat(document.getElementById('fixa').value);
    rExtra = parseFloat(document.getElementById('extra').value);
    const resultado = rFixa + rExtra;
    document.getElementById('total').innerText = `R$ ${resultado.toFixed(2)}`;
}

document
  .getElementById("adicionar-despesa")
  .addEventListener("click", adicionarDespesa);

function adicionarDespesa() {
  const nome = document.getElementById("nova-despesa-nome").value;
  const valor = parseFloat(document.getElementById("nova-despesa-valor").value);
  const data = document.getElementById("nova-despesa-data").value;
  if (nome !== "" && valor > 0) {
    despesas.push({ nome, valor, data });
    atualizarTabela();
    document.getElementById("nova-despesa-nome").value = "";
    document.getElementById("nova-despesa-valor").value = "";
    document.getElementById("nova-despesa-data").value = "";
  }
}

function atualizarTabela() {
  const tbody = document.getElementById("despesas-tbody");
  tbody.innerHTML = "";
  despesas.forEach((despesa, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${despesa.nome}</td>
            <td>R$ ${despesa.valor.toFixed(2)}</td>
            <td>${despesa.data}</td>
            <td class="actions">
                <button class="editar" data-index="${index}"><i class='bx bxs-pencil'></i></button>
                <button class="remover" data-index="${index}"><i class='bx bx-x'></i></button>
            </td>
        `;
    tbody.appendChild(row);
  });
  calcularTotal();
  adicionarEventos();
}

function calcularTotal() {
  totalValor = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
  document.getElementById("total-valor").innerText = `R$ ${totalValor.toFixed(
    2
  )}`;
}

function adicionarEventos() {
  const editarButtons = document.querySelectorAll(".editar");
  const removerButtons = document.querySelectorAll(".remover");

  editarButtons.forEach((button) => {
    button.addEventListener("click", editarDespesa);
  });

  removerButtons.forEach((button) => {
    button.addEventListener("click", removerDespesa);
  });
}

function editarDespesa(event) {
  const index = event.target.dataset.index;
  const despesa = despesas[index];
  const nome = prompt("Novo nome da despesa:", despesa.nome);
  if (nome !== null) {
    despesa.nome = nome;
    atualizarTabela();
  }
}

function removerDespesa(event) {
  const index = event.target.dataset.index;
  despesas.splice(index, 1);
  atualizarTabela();
}

atualizarTabela();

function calcularSaldo() {
    const rendaTotal = rFixa + rExtra
    saldo = rendaTotal - totalValor;
    document.getElementById('saldoValue').innerText = `R$ ${saldo.toFixed(2)}`;
  }