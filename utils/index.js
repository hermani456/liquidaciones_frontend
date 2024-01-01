const Unidades = (num) => {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
};

const Decenas = (num) => {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;
  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
};

const DecenasY = (strSin, numUnidades) =>
  numUnidades > 0 ? strSin + " Y " + Unidades(numUnidades) : strSin;

const Centenas = (num) => {
  let centenas = Math.floor(num / 100);
  let decenas = num - centenas * 100;
  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
    default:
      return Decenas(decenas);
  }
};

const Seccion = (num, divisor, strSingular, strPlural) => {
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let letras = "";
  if (cientos > 0) {
    letras = cientos > 1 ? Centenas(cientos) + " " + strPlural : strSingular;
  } else {
    letras = strSingular;
  }
  if (resto > 0) {
    letras += "";
  }
  return letras;
};

const Miles = (num) => {
  let divisor = 1000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  let strCentenas = Centenas(resto);
  return strMiles == "" || cientos === 0
    ? strCentenas
    : strMiles + " " + strCentenas;
};

const Millones = (num) => {
  let divisor = 1000000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMillones = Seccion(
    num,
    divisor,
    millon(num, true),
    millon(num, false)
  );
  let strMiles = Miles(resto);
  return strMillones == "" || cientos === 0
    ? strMiles
    : strMillones + " " + strMiles;
};

const millon = (num, singular) => {
  let letraMillon = singular ? "UN MILLON" : "MILLONES";
  if (num % 1000000 == 0) {
    letraMillon = letraMillon + " DE";
  }
  return letraMillon;
};

export const NumberAsString = (num, centavos = false, currency) => {
  currency = currency || {};
  let data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: centavos ? Math.round(num * 100) - Math.floor(num) * 100 : 0,
    letrasCentavos: "",
    letrasMonedaPlural: currency.plural || "PESOS",
    letrasMonedaSingular: currency.singular || "PESO",
    letrasMonedaCentavoPlural: currency.centPlural || "CENTAVOS",
    letrasMonedaCentavoSingular: currency.centSingular || "CENTAVO",
  };

  if (data.centavos > 0) {
    let centavos =
      data.centavos == 1
        ? Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
        : Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
    data.letrasCentavos = "CON " + centavos;
  }

  if (data.enteros == 0) {
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
  if (data.enteros == 1) {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      " " +
      data.letrasCentavos
    );
  } else {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      " " +
      data.letrasCentavos
    );
  }
};

// console.log(NumberAsString(750000).replace("  ", " "))

export const formatToClp = (num) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(num);
};

export const afpList = [
  { name: "CAPITAL", comision: 0.1144 },
  { name: "CUPRUM", comision: 0.1144 },
  { name: "HABITAT", comision: 0.1127 },
  { name: "MODELO", comision: 0.1058 },
  { name: "PLANVITAL", comision: 0.1116 },
  { name: "PROVIDA", comision: 0.1145 },
  { name: "UNO", comision: 0.1049 },
];

export function formatRut(str) {
  return (
    str.slice(0, 2) +
    "." +
    str.slice(2, 5) +
    "." +
    str.slice(5, 8) +
    "-" +
    str.slice(8)
  );
}

export const checkRut = (rut) => {
  let valor = rut.replace(/\./g, "");
  valor = valor.replace(/-/g, "");
  const cuerpo = valor.slice(0, -1);
  if (cuerpo.length > 8) {
    return false;
  }
  let dv = valor.slice(-1).toUpperCase();
  rut = cuerpo + "-" + dv;
  let suma = 0;
  let multiplo = 2;
  for (let i = 1; i <= cuerpo.length; i++) {
    let index = multiplo * valor.charAt(cuerpo.length - i);
    suma = suma + index;
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }
  let dvEsperado = 11 - (suma % 11);
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  if (dvEsperado != dv) {
    return false;
  }
  return true;
};

// capitalize first letter
export const capitalizeAll = (string) => {
  return string.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
};

// get month name from date in spanish
export const getMonthName = (date) => {
  const date2 = new Date(date);
  const month = date2.toLocaleString("es-ES", { month: "long" });
  return month;
};
