import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Sheet, Typography } from "@mui/joy";
import Input from "./Input";

function List() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [trabajador, setTrabajador] = useState([]);

  const username = import.meta.env.VITE_USERNAME
  const password = import.meta.env.VITE_PASSWORD

  const headers = {
    Authorization: "Basic " + btoa(username + ":" + password),
  };

  useEffect(() => {
    axios
      .get("https://liquidacionesbackend-production.up.railway.app/api/trabajador", { headers })
      .then((response) => {
        setOptions(
          response.data?.map((trabajador) => {
            return {
              value: trabajador.rut,
              label: trabajador.nombre + " " + trabajador.apellido,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSelect(option) {
    setSelectedOption(option);
    axios
      .get(`https://liquidacionesbackend-production.up.railway.app/api/trabajador/${option.value}`, {
        headers: headers,
      })
      .then((response) => {
        setTrabajador(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
        <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Seleccionar Trabajador
          </Typography>
          <Sheet sx={{ width: "30rem" }}>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleSelect}
            />
          </Sheet>
        </Sheet>
      </Sheet>
      <Input trabajador={trabajador} />
    </>
  );
}

export default List;
