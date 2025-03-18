document.addEventListener("DOMContentLoaded", () => {
    const amigos = [];
    const inputAmigo = document.getElementById("amigo");
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");
    const btnAgregar = document.querySelector(".button-add");
    const btnSortear = document.querySelector(".button-draw");

    function actualizarLista() {
        listaAmigos.innerHTML = "";
        amigos.forEach((amigo, index) => {
            const li = document.createElement("li");
            li.textContent = amigo;
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "X";
            btnEliminar.classList.add("btn-eliminar");
            btnEliminar.onclick = () => eliminarAmigo(index);
            li.appendChild(btnEliminar);
            listaAmigos.appendChild(li);
        });
    }

    function agregarAmigo() {
        const nombre = inputAmigo.value.trim();
        if (nombre && !amigos.includes(nombre)) {
            amigos.push(nombre);
            actualizarLista();
            inputAmigo.value = "";
            inputAmigo.focus();
        }
    }

    function eliminarAmigo(index) {
        amigos.splice(index, 1);
        actualizarLista();
    }

    function sortearAmigo() {
        if (amigos.length < 2) {
            resultado.textContent = "Debes agregar al menos dos amigos para sortear.";
            return;
        }

        const sorteados = [...amigos];
        for (let i = sorteados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
        }

        resultado.innerHTML = sorteados.map((amigo, index) => {
            const siguiente = sorteados[(index + 1) % sorteados.length];
            return `<li>${amigo} → ${siguiente}</li>`;
        }).join("");
    }

    btnAgregar.addEventListener("click", agregarAmigo);
    btnSortear.addEventListener("click", sortearAmigo);

    inputAmigo.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            agregarAmigo();
        }
    });
});
