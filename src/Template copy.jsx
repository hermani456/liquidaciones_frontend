import { Sheet, Typography, Table, Divider, List, ListItem } from "@mui/joy";
import React from "react";
import logo from "./assets/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Template = () => {
  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  console.log(date, today);
  
  const generatePDF = () => {
    const report = new jsPDF("portrait", "pt", "a4");
    const width = report.internal.pageSize.getWidth();
    const height = report.internal.pageSize.getHeight();
    report.html(document.querySelector("#template"), {
      callback: function (pdf) {
        pdf.save("download.pdf");
      },
    });
  };
  const downloadPDF = () => {
    const capture = document.querySelector("#template");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("download.pdf");
    });
  };

  return (
    <Sheet
      sx={{
        mx: "24rem",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      id="template"
    >
      {/* align items vertically inside div */}
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
        <ul style={{ marginLeft: "1rem", padding: "0", listStyleType: "none" }}>
          <li
            style={{
              margin: "0",
              padding: "0",
              listStyleType: "none",
              lineHeight: "1.2",
            }}
          >
            Servicios Willka
          </li>
          <li
            style={{
              margin: "0",
              padding: "0",
              listStyleType: "none",
              lineHeight: "1.2",
            }}
          >
            77.123.456-0
          </li>
          <li
            style={{
              margin: "0",
              padding: "0",
              listStyleType: "none",
              lineHeight: "1.2",
            }}
          >
            Pozo Almonte #456
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
      <Sheet
        variant="outlined"
        sx={{
          margin: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
          sx={{ display: "flex", justifyContent: "flex-start", my: "" }}
        >
          <Sheet
            sx={{
              mx: "3rem",
              my: "0.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>Nombre: Pepito Perez</Typography>
            <Typography>Rut: 1233456-6</Typography>
            <Typography>Cargo: Administrativo</Typography>
          </Sheet>
          <Sheet
            sx={{
              mx: "3rem",
              my: "0.5rem",
              display: "flex",
              flexDirection: "column",
              marginLeft: "8rem",
            }}
          >
            <Typography>Trabaja desde: 04/05/06</Typography>
            <Typography>Contrato: Indefinido</Typography>
            <Typography>Email: weon@weon.wn</Typography>
          </Sheet>
        </Sheet>
      </Sheet>
      {/* <Sheet
        variant="outlined"
        sx={{
          margin: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
        <div style={{ display: "flex" }}>
          <Sheet sx={{ mx: "1rem", my: "0.5rem", flexGrow: 1 }}>
            <Typography>Nombre: Pepito Perez</Typography>
            <Typography>Rut: 1233456-6</Typography>
            <Typography>Cargo: Administrativo</Typography>
          </Sheet>
          <Sheet sx={{ mx: "1rem", my: "0.5rem", flexGrow: 2 }}>
            <Typography>Trabaja desde: 04/05/06</Typography>
            <Typography>Contrato: Indefinido</Typography>
            <Typography>Email: weon@weon.wn</Typography>
          </Sheet>
        </div>
      </Sheet> */}
      <Sheet
        variant="outlined"
        sx={{
          margin: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
            }}
          >
            <Typography>Dias Feriados: 0</Typography>
            <Typography>Dias Ausentes: 0</Typography>
            <Typography>Dias Trabajados: 30</Typography>
          </Sheet>
          <Divider orientation="vertical"></Divider>
          <Sheet
            sx={{
              mx: "1rem",
              my: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>A.F.P: Modelo</Typography>
            <Typography>Tasa: 10,58%</Typography>
          </Sheet>
          <Divider orientation="vertical"></Divider>
          <Sheet
            sx={{
              mx: "1rem",
              my: "0.5rem",
              display: "flex",
            }}
          >
            <Sheet>
              <Typography>Salud: Fonasa</Typography>
              {/* <Divider orientation="vertical"></Divider> */}
            </Sheet>
            <Sheet>
              <Typography>Cargas: 1</Typography>
            </Sheet>
          </Sheet>
        </div>
        <Divider orientation="horizontal"></Divider>
        <Sheet
          sx={{ display: "flex", justifyContent: "space-evenly", my: "1rem" }}
        >
          <Sheet
            sx={{
              mx: "3rem",
              my: "0.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Base: </Typography>
              <Typography sx={{ textAlign: "right" }}>$123.000.000</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Proporcional:</Typography>
              <Typography sx={{ textAlign: "right" }}>$123.000.000</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Atrasos: </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Grat. Legal: </Typography>
              <Typography sx={{ textAlign: "right" }}>$456.000</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Total Bonificaciones:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                Sueldo Imponible:
              </Typography>
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                $0
              </Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Movilizacion:</Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Colacion: </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Viatico: </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Asignacion Familiar:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Total no Imponible:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$999.999</Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Total Haberes:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Sueldo Tributable:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
          </Sheet>
          <Sheet
            sx={{
              mx: "3rem",
              my: "0.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Prevision:</Typography>
              <Typography sx={{ textAlign: "right" }}>$456.000</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>APV:</Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Salud:</Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Adicional Salud:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Impuesto Unico:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Seguro de Cesantia:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Total Descuento Previsional:
              </Typography>
              <Typography sx={{ textAlign: "right" }}>$0</Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                Sueldo Liquido:
              </Typography>
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                $0
              </Typography>
            </Sheet>
            <Divider orientation="horizontal" sx={{ my: "0.5rem" }}></Divider>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Anticipos:</Typography>
              <Typography sx={{ textAlign: "right" }}>-$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>Prestamos:</Typography>
              <Typography sx={{ textAlign: "right" }}>-$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <Typography sx={{ textAlign: "right" }}>
                Otros descuentos
              </Typography>
              <Typography sx={{ textAlign: "right" }}>-$0</Typography>
            </Sheet>
            <Sheet
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
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
                height: "100%",
                padding: "0.3rem",
              }}
            >
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                Liquido a Pagar:
              </Typography>
              <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
                $1.000.000
              </Typography>
            </Sheet>
          </Sheet>
        </Sheet>
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          margin: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
          sx={{ display: "flex", justifyContent: "space-between", my: "1rem", mx: '1rem' }}
        >
          <Sheet
            sx={{
              my: "0.5rem",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography sx={{ textAlign: "center", mt: '4rem'}}>
              Diego Antonio Campuzano Rios
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
              width: '50%'
            }}
          >
            <Typography sx={{fontSize: '0.8rem', mt: '1.8rem'}}>
              Recibi a plena conformidad el monto indicado en esta liquidacion
              de sueldo, la cual corresponde plenamente a mi remuneracion
              acordada.
            </Typography>
          </Sheet>
        </Sheet>
      </Sheet>

      <button onClick={downloadPDF} type="button">
        Download
      </button>
    </Sheet>
  );
};

export default Template;
