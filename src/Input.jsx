import { Sheet } from "@mui/joy";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import React from "react";
import Template from "./Template";
import { useEffect } from "react";
import { getMonthName } from "../utils/index";
import { NumericFormat } from "react-number-format";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const Append = ({ trabajador }) => {
  const today = new Date();
  const currentMonth = getMonthName(today).toUpperCase();
  const [asignacionFamiliar, setAsignacionFamiliar] = React.useState("");
  const [viatico, setViatico] = React.useState("");
  const [colacion, setColacion] = React.useState("");
  const [movilizacion, setMovilizacion] = React.useState("");
  const [anticipo, setAnticipo] = React.useState("");
  const [diasAusentes, setDiasAusentes] = React.useState("");
  const [horasExtras, setHorasExtras] = React.useState("");
  const [diasFeriados, setDiasFeriados] = React.useState("");
  const [prestamo, setPrestamo] = React.useState("");
  const [mes, setMes] = React.useState(currentMonth);

  const cleanSueldo = (sueldo) => {
    let cleanSueldo = sueldo.replace(/\./g, "");
    cleanSueldo = cleanSueldo.replace(/\$/g, "");
    return cleanSueldo;
  };

  useEffect(() => {
    setAnticipo("");
    setAsignacionFamiliar("");
    setColacion("");
    setMovilizacion("");
    setViatico("");
    setDiasAusentes("");
    setHorasExtras("");
    setDiasFeriados("");
    setPrestamo("");
    setMes(currentMonth);
  }, [trabajador]);

  const arrayTrabajar = trabajador?.map((trabajador) => {
    return {
      rut: trabajador.rut,
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      direccion: trabajador.direccion,
      email: trabajador.email,
      afp: trabajador.afp,
      salud: trabajador.salud,
      cargo: trabajador.cargo,
      sueldo_base: trabajador.sueldo_base,
      contrato: trabajador.contrato,
      fecha_ingreso: trabajador.fecha_ingreso,
      asignacionFamiliar: parseInt(asignacionFamiliar),
      viatico: parseInt(viatico),
      colacion: parseInt(colacion),
      movilizacion: parseInt(movilizacion),
      anticipo: parseInt(anticipo),
      diasAusentes: parseInt(diasAusentes),
      horasExtras: parseInt(horasExtras),
      diasFeriados: parseInt(diasFeriados),
      prestamo: parseInt(prestamo),
      mes: mes,
    };
  });


  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  return (
    <>
      <Sheet
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          mx: "10rem",
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          my: "2rem",
        }}
      >
        <Sheet sx={{ display: "flex", flexDirection: "column" }}>
          <Sheet sx={{ display: "flex", gap: 1 }}>
            <FormControl>
              <FormLabel>Movilizacion</FormLabel>
              <NumericFormat
                value={movilizacion}
                onChange={(e) => setMovilizacion(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Colacion</FormLabel>
              <NumericFormat
                value={colacion}
                onChange={(e) => setColacion(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Viatico</FormLabel>
              <NumericFormat
                value={viatico}
                onChange={(e) => setViatico(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Asignacion familiar</FormLabel>
              <NumericFormat
                value={asignacionFamiliar}
                onChange={(e) =>
                  setAsignacionFamiliar(cleanSueldo(e.target.value))
                }
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Anticipo</FormLabel>
              <NumericFormat
                value={anticipo}
                onChange={(e) => setAnticipo(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
          </Sheet>
          <Sheet sx={{ display: "flex", gap: 1 }}>
            <FormControl>
              <FormLabel>Dias Ausentes</FormLabel>
              <Input
                value={diasAusentes}
                onChange={(e) => setDiasAusentes(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Horas Extras</FormLabel>
              <NumericFormat
                value={horasExtras}
                onChange={(e) => setHorasExtras(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Feriados</FormLabel>
              <NumericFormat
                value={diasFeriados}
                onChange={(e) => setDiasFeriados(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Prestamo</FormLabel>
              <NumericFormat
                value={prestamo}
                onChange={(e) => setPrestamo(cleanSueldo(e.target.value))}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Seleccionar Mes</FormLabel>
              <Select
                value={mes || currentMonth}
                onChange={(_, value) => setMes(value)}
              >
                {meses.map((mes, i) => (
                  <Option key={i} value={mes}>{mes}</Option>
                ))}
              </Select>
            </FormControl>
          </Sheet>
        </Sheet>
      </Sheet>
      <Template trabajador={arrayTrabajar} />
    </>
  );
};

export default Append;
