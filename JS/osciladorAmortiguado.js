const CalculoOsciladorAmortiguado = (masa, K, Y, x0, v0, t0) => {
    if ( ( (Y**2)/( 4 * (masa**2) ) ) === ( K/masa ) ) {
        const r = -Y/(2*masa);
        const x = ( Math.E ** ( r * t0 ) ) * ( v0 + ( r * v0 + (Y/masa) * x0 ) * t0 ) + x_0;
        return x;
    } else if ( ( (Y**2)/( 4 * (masa**2) ) ) > ( K/masa ) ) {
        const r1 = -Y/(2*masa) + Math.sqrt( ( (Y**2)/( 4 * (masa**2) ) ) - ( K/masa ) );
        const r2 = -Y/(2*masa) - Math.sqrt( ( (Y**2)/( 4 * (masa**2) ) ) - ( K/masa ) );
        const x = ( 1 / (r1 - r2) ) * ( ( v0 + (Y/masa)*x0 ) * ( Math.E ** (r1*t0) - Math.E ** (r2*t0) ) + x0 * ( r1 * Math.E ** (r1*t0) - r2 * Math.E ** (r2*t0) ) );
        return x;
    } else {
        const w = Math.sqrt( ( K/masa ) - ( (Y**2)/( 4 * (masa**2) ) ) );
        const b = Y / (2 * masa);
        const x = ( Math.E ** (-b*t0) ) * ( ( (v0 + b*x0) / w )*Math.sin(w*t0) + x0*Math.cos(w*t0-Math.PI/2) ) + x_0;
        return x;
    }
}

const HabilitarDeshabilitar = (bool) => {
    masaNumber.disabled = bool;
    masaRange.disabled = bool;
    KNumber.disabled = bool;
    KRange.disabled = bool;
    YNumber.disabled = bool;
    YRange.disabled = bool;
    tiempoNumber.disabled = bool;
    tiempoRange.disabled = bool;
    botonInicio.disabled = bool;
}

const OsciladorAmortiguado = (masa, K, Y, t_iterado) => {
    if (t_iterado < tiempo_limite*1000) {
        HabilitarDeshabilitar(true);
        if (paso) {
            paso = false;
            setTimeout( () => {
                paso = true;
                let alturaResorte = CalculoOsciladorAmortiguado(masa, K, Y, x_0, 0, t_iterado/1000) * METROS_A_PIXELES;
                resorte.style.height = `${alturaResorte}px`;
                OsciladorAmortiguado(masa, K, Y, t_iterado + INTERVALOS_MILISEGUNDOS);
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
    OsciladorAmortiguado(masaNumber.value, KNumber.value, YNumber.value, 0);
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

const cambiaYRange = () => {
    YNumber.value = YRange.value;
}
const cambiaYNumber = () => {
    YRange.value = YNumber.value;
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

const YNumber = document.getElementById('constanteRozamientoNumber');
const YRange = document.getElementById('constanteRozamientoRange');

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

if ( YNumber && YRange ) {
    YRange.addEventListener('mouseup', cambiaYRange);
    YNumber.addEventListener('keyup', cambiaYNumber);
}

if ( tiempoNumber && tiempoRange ) {
    tiempoRange.addEventListener('mouseup', cambiaTiempoRange);
    tiempoNumber.addEventListener('keyup', cambiaTiempoNumber);
}

botonInicio.addEventListener('click', IniciaSimulador);