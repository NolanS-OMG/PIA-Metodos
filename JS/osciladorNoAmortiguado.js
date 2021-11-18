const CalculoOsciladorNoAmortiguado = (masa, K, x0, v0, t0) => {
    const x = x0 * Math.cos( Math.sqrt( K/masa ) * t0 - Math.PI/2) + ( v0/Math.sqrt( K/masa ) ) * Math.sin( Math.sqrt( K/masa ) * t0 ) + x_0;
    return x;
}

const HabilitarDeshabilitar = (bool) => {
    masaNumber.disabled = bool;
    masaRange.disabled = bool;
    KNumber.disabled = bool;
    KRange.disabled = bool;
    tiempoNumber.disabled = bool;
    tiempoRange.disabled = bool;
    botonInicio.disabled = bool;
}

const OsciladorNoAmortiguado = (masa, K, t_iterado) => {
    if (t_iterado < tiempo_limite*1000) {
        HabilitarDeshabilitar(true);
        if (paso) {
            paso = false;
            setTimeout( () => {
                paso = true;
                let alturaResorte = CalculoOsciladorNoAmortiguado(masa, K, x_0, 0, t_iterado/1000) * METROS_A_PIXELES;
                resorte.style.height = `${alturaResorte}px`;
                OsciladorNoAmortiguado(masa, K, t_iterado + INTERVALOS_MILISEGUNDOS);
            }, INTERVALOS_MILISEGUNDOS );
        }
    } else {
        HabilitarDeshabilitar(false);
        resorte.style.height = `${X_0_DEFAULT}px`;
    }
    tiempoMostrado.textContent = `t = ${t_iterado/1000}s`
}

const IniciaSimulador = () => {
    paso = true;
    OsciladorNoAmortiguado(masaNumber.value, KNumber.value, 0);
}

const MostrarMasa = (masa) => {
    peso.textContent = `${masa}kg`;
}

const cambiaMasaRange = () => {
    masaNumber.value = masaRange.value;
    MostrarMasa(masaRange.value);
}
const cambiaMasaNumber = () => {
    masaRange.value = masaNumber.value;
    MostrarMasa(masaNumber.value);
}

const cambiaKRange = () => {
    KNumber.value = KRange.value;
}
const cambiaKNumber = () => {
    KRange.value = KNumber.value;
}

const cambiaTiempoRange = () => {
    tiempoNumber.value = tiempoRange.value;
    tiempo_limite = tiempoRange.value;
}
const cambiaTiempoNumber = () => {
    tiempoRange.value = tiempoNumber.value;
    tiempo_limite = tiempoRange.value;
}

const METROS_A_PIXELES = 10;
const INTERVALOS_MILISEGUNDOS = 10;

const botonInicio = document.getElementById('iniciarSimulacion');

const resorte = document.getElementById('resorte');
const peso = document.getElementById('peso');
const tiempoMostrado = document.getElementById('tiempoMostrado');

// CONSTANTES
const masaNumber = document.getElementById('masaNumber');
const masaRange = document.getElementById('masaRange');

const KNumber = document.getElementById('constanteHookeNumber');
const KRange = document.getElementById('constanteHookeRange');

const tiempoNumber = document.getElementById('tiempoLimiteNumber');
const tiempoRange = document.getElementById('tiempoLimiteRange');

let paso = true;
let x_0 = (resorte.offsetHeight) / METROS_A_PIXELES;
const X_0_DEFAULT = resorte.offsetHeight;
let tiempo_limite = tiempoRange.value;

if ( masaNumber && masaRange ) {
    masaNumber.addEventListener('keyup', cambiaMasaNumber);
    masaRange.addEventListener('mouseup', cambiaMasaRange);
    peso.textContent = `${masaNumber.value}kg`;
}

if ( KNumber && KRange ) {
    KRange.addEventListener('mouseup', cambiaKRange);
    KNumber.addEventListener('keyup', cambiaKNumber);
}

if ( tiempoNumber && tiempoRange ) {
    tiempoRange.addEventListener('mouseup', cambiaTiempoRange);
    tiempoNumber.addEventListener('keyup', cambiaTiempoNumber);
}

botonInicio.addEventListener('click', IniciaSimulador);