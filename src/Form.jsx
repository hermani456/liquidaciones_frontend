import * as React from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import { NumericFormat } from "react-number-format";
import { checkRut, capitalizeAll } from "../utils/index";

export default function Form() {
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [rut, setRut] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [afp, setAfp] = React.useState("MODELO");
  const [salud, setSalud] = React.useState("FONASA");
  const [cargo, setCargo] = React.useState("");
  const [sueldo_base, setSueldo] = React.useState("");
  const [contrato, setContrato] = React.useState("INDEFINIDO");
  const [fechaIngreso, setFechaIngreso] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(false);

  let cleanRut = rut.replace(/\./g, "");
  cleanRut = cleanRut.replace(/-/g, "");

  const cleanSueldo = (sueldo) => {
    let cleanSueldo = sueldo.replace(/\./g, "");
    cleanSueldo = cleanSueldo.replace(/\$/g, "");
    return cleanSueldo;
  };

  const cleanSueldoBase = cleanSueldo(sueldo_base);

  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 400) {
      alert("Trabajador ya existe");
    }
    if (response.status === 200) {
      clearForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    const data = {
      nombre,
      apellido,
      rut: cleanRut,
      direccion,
      email,
      afp,
      salud,
      cargo,
      sueldo_base: cleanSueldoBase,
      contrato,
      fecha_ingreso: fechaIngreso,
    };

    postData("https://liquidaciones_backend.railway.internal/api/trabajador", data);
  };

  const clearForm = () => {
    setNombre("");
    setApellido("");
    setRut("");
    setDireccion("");
    setEmail("");
    // setAfp("");
    // setSalud("");
    setCargo("");
    setSueldo("");
  };

  const afps = [
    "CAPITAL",
    "CUPRUM",
    "HABITAT",
    "MODELO",
    "PLANVITAL",
    "PROVIDA",
    "UNO",
  ];

  return (
    <Sheet
      component="form"
      sx={{
        mx: "10rem",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography>Ingreso de Trabajador</Typography>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Nombres</FormLabel>
          <Input
            size="sm"
            value={capitalizeAll(nombre)}
            onChange={(e) => setNombre(capitalizeAll(e.target.value))}
          />
        </FormControl>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Apellidos</FormLabel>
          <Input
            size="sm"
            value={capitalizeAll(apellido)}
            onChange={(e) => setApellido(capitalizeAll(e.target.value))}
          />
        </FormControl>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Rut</FormLabel>
          <Input
            size="sm"
            value={rut}
            error={!checkRut(rut)}
            onChange={(e) => setRut(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Email</FormLabel>
          <Input
            size="sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            gap: 9,
          }}
        >
          <Sheet>
            <FormLabel>AFP</FormLabel>
            <Select
              size="sm"
              onChange={(e) => {
                setAfp(e.target.textContent);
              }}
              value={afp}
            >
              {afps.map((afp, i) => (
                <Option key={i} value={afp}>
                  {afp}
                </Option>
              ))}
            </Select>
          </Sheet>
          <Sheet>
            <FormLabel>Prevision</FormLabel>
            <Select
              value={salud}
              size="sm"
              onChange={(e) => setSalud(e.target.textContent)}
            >
              <Option value="FONASA">FONASA</Option>
            </Select>
          </Sheet>
          <Sheet>
            <FormLabel>Contrato</FormLabel>
            <Select
              size="sm"
              value={contrato}
              onChange={(e) => setContrato(e.target.textContent)}
            >
              <Option value="INDEFINIDO">INDEFINIDO</Option>
              <Option value="PLAZO FIJO">PLAZO FIJO</Option>
            </Select>
          </Sheet>
          <Sheet>
            <FormLabel>Fecha Ingreso</FormLabel>
            <Input
              size="sm"
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
            />
          </Sheet>
        </Box>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Cargo</FormLabel>
          <Input
            size="sm"
            value={capitalizeAll(cargo)}
            onChange={(e) => setCargo(capitalizeAll(e.target.value))}
          />
        </FormControl>
        <FormControl sx={{ width: "50%" }}>
          <FormLabel>Sueldo Base</FormLabel>
          {/* <Input
            type="number"
            size="sm"
            // format as 000.000.000
            value={sueldo_base.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            onChange={(e) => setSueldo(e.target.value)}
          /> */}
          {/* <Input size="sm"> */}
          <NumericFormat
            value={sueldo_base}
            // to int
            onChange={(e) => setSueldo(e.target.value)}
            thousandSeparator="."
            decimalSeparator=","
            prefix="$"
            allowNegative={false}
            customInput={Input}
          />
          {/* </Input> */}
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Sheet>
  );
}
