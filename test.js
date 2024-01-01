
// let sueldo = 750000;

// sueldo = sueldo - sueldo * 0.07 - sueldo * 0.1058 - sueldo * 0.006;
// // sueldo = sueldo - sueldo * 0.10 - sueldo * 0.10 - sueldo * 0.10

// // console.log(sueldo)

// // 7 + 0.58 + 0.06 = 7.64

// // 86.6 + 23.6 =

// let sueldo_base = 728000;
// let gratificacion = sueldo_base * 0.25 >= 182083 ? 182083 : sueldo_base * 0.25;
// // console.log(gratificacion);

// const afpTrabajador = "Capital";

// const afpList = [
//   { name: "Capital", comision: 0.1144 },
//   { name: "Cuprum", comision: 0.1144 },
//   { name: "Habitat", comision: 0.1127 },
//   { name: "Modelo", comision: 0.1058 },
//   { name: "Planvital", comision: 0.1116 },
//   { name: "Provida", comision: 0.1145 },
//   { name: "Uno", comision: 0.1049 },
// ];

// const afpComision = afpList.find((afp) => afp.name === afpTrabajador).comision;

// // console.log(afpComision);

// // console.log((0.1049*100).toFixed(2))

// // console.log(Math.round(1037.619))

// // count the length of a word

// // console.log("diegocampuzanorios@servicioswillka.cl".length)

// // const datet = "2023-09-01T04:00:00.000Z";
// // const date2 = new Date(datet);
// // const dd = date2.getDate();
// // const mm = date2.getMonth() + 1;
// // const yyyy = date2.getFullYear();
// // const asd = date2.toDateString();
// // console.log(asd);

// const rut = "241234567"; 

// "24.123.456-7"


// // format rut to 22.412.345-6
// const formatRut = (rut) => {
//   let rutFormated = rut.split("").reverse().join("");
//   rutFormated = rutFormated.replace(/^([\d]{3})([\d]{1,3})/, "$1.$2.");
//   rutFormated = rutFormated.replace(/^([\d]{3})([\d]{1,3})/, "$1.$2-");
//   rutFormated = rutFormated.split("").reverse().join("");
//   return rutFormated;
// };

// function formatString(str) {
//   return str.slice(0, 2) + '.' + str.slice(2, 5) + '.' + str.slice(5, 8) + '-' + str.slice(8);
// }

// console.log(formatString("241234567")); // Outputs: "24.123.456-7"

// regex verify chilean rut
function checkRut(rut) {
  // Despejar Puntos
  let valor = rut.replace(/\./g, "");
  // Despejar Guión
  valor = valor.replace(/-/g, "");
  // Aislar Cuerpo y Dígito Verificador
  const cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();
  // Formatear RUN
  rut = cuerpo + "-" + dv;
  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    return false;
  }
  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;
  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    let index = multiplo * valor.charAt(cuerpo.length - i);
    // Sumar al Contador General
    suma = suma + index;
    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }
  // Calcular Dígito Verificador en base al Módulo 11
  let dvEsperado = 11 - (suma % 11);
  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    return false;
  }
  // Si todo sale bien, eliminar errores (decretar que es válido)
  return true;
}

// console.log(checkRut("223451232"));

// delete the $ symbol from a string
const cleanSueldo = (sueldo) => {
  let cleanSueldo = sueldo.replace(/\./g, "");
  cleanSueldo = cleanSueldo.replace(/\$/g, "");
  return cleanSueldo;
}

// console.log(cleanSueldo("$750.000"));

// uppercase to capitalize first letter
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// console.log(capitalize("DIEGO"));

// all uppercase to capitalize first letter and trim
const capitalizeAll = (string) => {
  return string.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

// console.log(capitalizeAll("DIEGO CAMPUZANO RIOS"))

// get month name from date
// const getMonthName = (date) => {
//   const date2 = new Date(date);
//   const month = date2.toLocaleString("default", { month: "long" });
//   return month;
// }

// console.log(getMonthName("2021-08-01T04:00:00.000Z"));

// get month name from date in spanish
const getMonthName= (date) => {
  const date2 = new Date(date);
  const month = date2.toLocaleString("es-ES", { month: "long" });
  return month;
}

// console.log(getMonthName("2021-08-01T04:00:00.000Z").toUpperCase());

const sueldo = 550000

const valorHora = sueldo * 0.0077777

console.log(sueldo / 30 * 28 / 180 * 1.5)


console.log(Math.round(valorHora))

console.log(process)


