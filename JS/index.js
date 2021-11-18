const simulaciones = document.getElementById('Simulaciones');
console.log(simulaciones);
const muestraSimulaciones = document.getElementById('elegirSimulaciones');

let mostrado = false;

const MostrarSimulaciones = () => {
    muestraSimulaciones.style.display = 'flex';
}

const OcultarSimulaciones = () => {
    muestraSimulaciones.style.display = 'none';
}

const CambiarMuestraSimulaciones = () => {
    if (mostrado) {
        OcultarSimulaciones();
        mostrado = false;
    } else {
        MostrarSimulaciones();
        mostrado = true;
    }
}

simulaciones.addEventListener('click', CambiarMuestraSimulaciones);