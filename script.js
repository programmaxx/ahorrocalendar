
const calendario = document.getElementById("calendario");
const frascoMonto = document.getElementById("frasco-monto");

let diasCalendario = [];
let franco = "miércoles"; // hasta 15/06
let cuotasAsignadas = [];

function crearGasto() {
    const nombre = document.getElementById("nombreGasto").value;
    const monto = parseFloat(document.getElementById("montoTotal").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);
    const ganancia = parseFloat(document.getElementById("gananciaDiaria").value);
    
    const montoPorCuota = monto / cuotas;
    const diasPorCuota = Math.ceil(montoPorCuota / ganancia);

    cuotasAsignadas = [];
    let diaActual = 1;
    for (let i = 0; i < cuotas; i++) {
        let diasAsignados = 0;
        while (diasAsignados < diasPorCuota) {
            const fecha = new Date(2025, 4, diaActual); // mayo = mes 4
            if (fecha.getDay() !== 3) { // 3 = miércoles (día franco hasta 15/06)
                cuotasAsignadas.push(diaActual);
                diasAsignados++;
            }
            diaActual++;
        }
    }

    renderizarCalendario();
}

function renderizarCalendario() {
    calendario.innerHTML = "";
    let ahorro = 0;

    for (let i = 1; i <= 31; i++) {
        const dia = document.createElement("div");
        dia.classList.add("dia");

        const fecha = new Date(2025, 4, i); // mayo = mes 4
        const diaSemana = fecha.toLocaleString('es-AR', { weekday: 'long' });

        dia.innerText = i;

        if (diaSemana === franco) {
            dia.classList.add("franco");
        } else if (cuotasAsignadas.includes(i)) {
            dia.classList.add("trabajo");
        } else {
            dia.classList.add("libre");
            ahorro++;
        }

        calendario.appendChild(dia);
    }

    frascoMonto.innerText = `$${ahorro * parseFloat(document.getElementById("gananciaDiaria").value || 0)}`;
}
