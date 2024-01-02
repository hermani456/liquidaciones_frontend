import { Sheet, Typography, Divider, Button } from "@mui/joy";
import React from "react";
import logo from "./assets/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  formatToClp,
  NumberAsString,
  afpList,
  formatRut,
  getMonthName,
} from "../utils/index";

const Template = ({ trabajador }) => {
  const rut = trabajador?.[0]?.rut || "";
  const asignacionFamiliar = trabajador?.[0]?.asignacionFamiliar || 0;
  const viatico = trabajador?.[0]?.viatico || 0;
  const colacion = trabajador?.[0]?.colacion || 0;
  const movilizacion = trabajador?.[0]?.movilizacion || 0;
  const anticipo = trabajador?.[0]?.anticipo || 0;
  let sueldoBase = trabajador?.[0]?.sueldo_base || 0;
  const diasAusentes = trabajador?.[0]?.diasAusentes || 0;
  const diasTrabajados = 30 - diasAusentes || 0;
  const horasExtras = trabajador?.[0]?.horasExtras || 0;
  const diasFeriados = trabajador?.[0]?.diasFeriados || 0;
  const prestamo = trabajador?.[0]?.prestamo || 0;
  // const valorHoraExtra = sueldoBase * 0.0077777;
  // console.log("valor hora extra", valorHoraExtra);
  // const pagarPorHorasExtras = Math.round(horasExtras * valorHoraExtra);
  // console.log("pago horas extras", pagarPorHorasExtras);
  // const valorDia = sueldoBase / 30;
  // console.log("valor dia", valorDia);
  // sueldoBase = Math.round(diasTrabajados * valorDia);
  // console.log("pago por dia trabajado", pagoDiaTrabajado);
  //
  // const feriadosTrabajados = 1;
  // const pagoFeriadosTrabajados = Math.round(8 * valorHoraExtra);
  // console.log("pago por feriados trabajados", pagoFeriadosTrabajados);

  const gratificacion =
    sueldoBase * 0.25 >= 182083 ? 182083 : sueldoBase * 0.25 || 0;
  const imponible = sueldoBase + gratificacion + horasExtras + diasFeriados;
  const totalNoImponible =
    asignacionFamiliar + viatico + colacion + movilizacion;
  const totalHaberes = imponible + totalNoImponible;
  const date2 = new Date(trabajador?.[0]?.fecha_ingreso);
  // ("0" + this.getDate()).slice(-2)
  // ("0" + (this.getMonth() + 1)).slice(-2)
  const fechaIngreso = `${("0" + date2.getDate()).slice(-2)}/${(
    "0" +
    (date2.getMonth() + 1)
  ).slice(-2)}/${date2.getFullYear()}`;
  const afpTrabajador = trabajador?.[0]?.afp || "";
  const afp = afpList.find((afp) => afp.name == afpTrabajador)?.comision || 0;
  const salud = trabajador?.[0]?.salud === "FONASA" ? 0.07 : 0;
  const cesantia = trabajador?.[0]?.contrato === "INDEFINIDO" ? 0.006 : 0;
  const totalDescuentos = Math.round(
    Math.round(imponible * afp) +
      Math.round(imponible * salud) +
      Math.round(imponible * cesantia)
  );
  const sueldoLiquido = imponible + totalNoImponible - totalDescuentos;
  const liquidoAPagar = sueldoLiquido - anticipo - prestamo;
  const today = new Date();
  const date = `${("0" + today.getDate()).slice(-2)}/${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}/${today.getFullYear()}`;

  const downloadPDF = () => {
    const capture = document.querySelector("#template");
    html2canvas(capture, { scale: 3, quality: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${trabajador?.[0]?.nombre}(${getMonthName(today)}).pdf`);
    });
  };

  return (
    <>
      <Sheet
        sx={{
          width: "21cm",
          padding: "1rem",
          borderRadius: "1rem",
          margin: "auto",
        }}
        id="template"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            width={70}
            height={70}
            alt="logo"
            style={{ margin: "1rem" }}
          />
          <Divider orientation="vertical"></Divider>
          <ul
            style={{
              marginLeft: "1rem",
              padding: "0",
              listStyleType: "none",
            }}
          >
            <li
              style={{
                margin: "0",
                padding: "0",
                listStyleType: "none",
                lineHeight: "1.2",
              }}
            >
              Servicios Willka Spa.
            </li>
            <li
              style={{
                margin: "0",
                padding: "0",
                listStyleType: "none",
                lineHeight: "1.2",
              }}
            >
              77.798.031-9
            </li>
            <li
              style={{
                margin: "0",
                padding: "0",
                listStyleType: "none",
                lineHeight: "1.2",
              }}
            >
              Aldunate 215, Pozo Almonte
            </li>
            <li
              style={{
                margin: "0",
                padding: "0",
                listStyleType: "none",
                lineHeight: "1.2",
              }}
            >
              www.servicioswillka.cl
            </li>
          </ul>
        </div>
        <Typography
          level="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Remuneración
        </Typography>
        <Typography
          level="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Liquidación de sueldo
        </Typography>
        <Typography
          level="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* {getMonthName(today).toUpperCase()} {today.getFullYear()} */}
          DICIEMBRE 2023
        </Typography>
        <Sheet
          variant="outlined"
          sx={{
            margin: "1rem",
            borderRadius: "0.5rem",
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sheet color="neutral" variant="soft">
            <Typography
              level="subtitle2"
              sx={{ margin: "0", px: "1rem", py: "0.6rem" }}
            >
              INFORMACIÓN DEL TRABAJADOR
            </Typography>
          </Sheet>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Sheet
              sx={{
                mx: "1rem",
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Nombre: </span>
                {trabajador?.[0]?.nombre} {trabajador?.[0]?.apellido}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Rut: </span>
                {formatRut(rut)}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Cargo: </span>
                {trabajador?.[0]?.cargo}
              </Typography>
            </Sheet>
            <Sheet
              sx={{
                mr: "1rem",
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Trabaja desde: </span>
                {fechaIngreso}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Contrato: </span>
                {trabajador?.[0]?.contrato}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "bold" }}>Email: </span>
                {trabajador?.[0]?.email}
              </Typography>
            </Sheet>
          </Sheet>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{
            margin: "1rem",
            borderRadius: "0.5rem",
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sheet color="neutral" variant="soft">
            <Typography
              level="subtitle2"
              sx={{ margin: "0", px: "1rem", py: "0.6rem" }}
            >
              DETALLE
            </Typography>
          </Sheet>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Sheet
              sx={{
                mx: "1rem",
                my: "0.5rem",
                display: "flex",
                flexDirection: "row",
                width: "46%",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
                Días Feriados: 0
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
                Días Ausentes: {diasAusentes}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
                Días Trabajados: {diasTrabajados}
              </Typography>
            </Sheet>
            <Divider orientation="vertical"></Divider>
            <Sheet
              sx={{
                mx: "1rem",
                my: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                width: "27%",
              }}
            >
              <Typography
                sx={{ fontSize: "0.9rem", textAlign: "center", width: "10%" }}
              >
                A.F.P: {afpTrabajador}
              </Typography>
              <Typography
                sx={{ fontSize: "0.9rem", textAlign: "center", width: "30%" }}
              >
                Tasa: {(afp * 100).toFixed(2)}%
              </Typography>
            </Sheet>
            <Divider orientation="vertical"></Divider>
            <Sheet
              sx={{
                mx: "1rem",
                my: "0.5rem",
                display: "flex",
                width: "27%",
              }}
            >
              <Sheet>
                <Typography
                  sx={{ fontSize: "0.9rem", textAlign: "center", width: "10%" }}
                >
                  Salud: Fonasa
                </Typography>
              </Sheet>
              {/* <Divider orientation="vertical"></Divider> */}
              <Sheet>
                <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
                  Cargas:{" "}
                </Typography>
              </Sheet>
            </Sheet>
          </div>
          <Divider orientation="horizontal"></Divider>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              my: "1rem",
            }}
          >
            <Sheet
              sx={{
                mx: "3rem",
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Base: </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(sueldoBase)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Horas Extras:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>{formatToClp(horasExtras)}</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Feriados: </Typography>
                <Typography sx={{ textAlign: "right" }}>{formatToClp(diasFeriados)}</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Grat. Legal:{" "}
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(gratificacion)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Total Bonificaciones:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>$0</Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right", fontWeight: "boldbold" }}>
                  Imponible:
                </Typography>
                <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatToClp(imponible)}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Movilización:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(movilizacion)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Colación: </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(colacion)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Viatico: </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(viatico)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Asignación Familiar:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(asignacionFamiliar)}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Total no Imponible:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(totalNoImponible)}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Total Haberes:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(totalHaberes)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                {/* <Typography sx={{ textAlign: "right" }}>
                  Sueldo Tributable:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>$0</Typography> */}
              </Sheet>
            </Sheet>
            <Sheet
              sx={{
                mx: "3rem",
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Prevision:</Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(Math.round(imponible * afp))}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>APV:</Typography>
                <Typography sx={{ textAlign: "right" }}>$0</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Salud:</Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(Math.round(imponible * salud))}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Adicional Salud:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>$0</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Impuesto Único:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>$0</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Seguro de Cesantía:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(Math.round(imponible * cesantia))}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right", fontSize: "0.9rem" }}>
                  Descuentos Previsionales:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>
                  {formatToClp(
                    Math.round(
                      Math.round(imponible * afp) +
                        Math.round(imponible * salud) +
                        Math.round(imponible * cesantia)
                    )
                  )}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                  Sueldo Liquido:
                </Typography>
                <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatToClp(sueldoLiquido)}
                </Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Anticipos:</Typography>
                <Typography sx={{ textAlign: "right" }}>
                  -{formatToClp(anticipo)}
                </Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>Prestamos:</Typography>
                <Typography sx={{ textAlign: "right" }}>{formatToClp(prestamo)}</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Otros descuentos
                </Typography>
                <Typography sx={{ textAlign: "right" }}>-$0</Typography>
              </Sheet>
              <Sheet
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ textAlign: "right" }}>
                  Total Descuentos:
                </Typography>
                <Typography sx={{ textAlign: "right" }}>-$0</Typography>
              </Sheet>
              <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
              <Sheet
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  borderRadius: "0.3rem",
                  bgcolor: "#e0e0e0",
                  width: "100%",
                  padding: "0.3rem",
                }}
              >
                <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                  Liquido a Pagar:
                </Typography>
                <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatToClp(liquidoAPagar)}
                </Typography>
              </Sheet>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "0.6rem",
                  marginTop: "0.2rem",
                }}
              >
                {NumberAsString(liquidoAPagar)}
              </Typography>
            </Sheet>
          </Sheet>
        </Sheet>
        <Sheet
          variant="outlined"
          sx={{
            margin: "1rem",
            borderRadius: "0.5rem",
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sheet color="neutral" variant="soft" sx={{ display: "flex" }}>
            <Typography
              level="subtitle2"
              sx={{ margin: "0", px: "1rem", py: "0.6rem" }}
            >
              Fecha de Emision: {date}
            </Typography>
            <Typography
              level="subtitle2"
              sx={{ margin: "0", px: "1rem", py: "0.6rem" }}
            >
              Por: Macarena Araya
            </Typography>
          </Sheet>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: "1rem",
              mx: "1rem",
            }}
          >
            <Sheet
              sx={{
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Typography sx={{ textAlign: "center", mt: "4rem" }}>
                {trabajador?.[0]?.nombre + " " + trabajador?.[0]?.apellido}
              </Typography>
              <Typography sx={{ textAlign: "center", fontSize: "0.7rem" }}>
                RECIBI CONFORME
              </Typography>
            </Sheet>
            <Sheet
              sx={{
                my: "0.5rem",
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", mt: "1.8rem" }}>
                Recibí a plena conformidad el monto indicado en esta liquidación
                de sueldo, la cual corresponde plenamente a mi remuneración
                acordada.
              </Typography>
            </Sheet>
          </Sheet>
        </Sheet>
        <Typography sx={{ fontSize: "0.7rem", textAlign: "center" }}>
          Desarrollado por: Diego Campuzano Rios
        </Typography>
      </Sheet>
      <Sheet sx={{ display: "flex", justifyContent: "center", my: "2rem" }}>
        <Button onClick={downloadPDF}>Download</Button>
      </Sheet>
    </>
  );
};

export default Template;
