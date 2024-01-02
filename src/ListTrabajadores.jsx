import React from "react";
import AsyncSelect from 'react-select/async';

const ListTrabajadores = () => {
  const [trabajador, setTrabajador] = React.useState([]);
  const [nombres, setNombres] = React.useState([]);

  const formatToClp = (num) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(num);
  }

  const getTrabajador = async () => {
    const res = await fetch("http://liquidaciones_backend.railway.internal/api/trabajador");
    const data = await res.json();
    setTrabajador(data);
  };

  const getNombres = async () => {
    const res = await fetch("http://liquidaciones_backend.railway.internal/api/trabajador/nombres");
    const data = await res.json();
    console.log(data)
  }

  React.useEffect(() => {
    getTrabajador();
    getNombres();
  }, []);


  // const loadOptions = async (inputValue) => {
  //   const response = await fetch(`http://localhost:3000/api/trabajador?search=${inputValue}`);
  //   const data = await response.json();
  //   return data;
  // }

  // const promiseOptions = inputValue =>
  //   new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(loadOptions(inputValue));
  //     }, 1000);
  //   })

  return (
    <div>
      {trabajador.map((trabajador) => {
        return (
          <div key={trabajador.rut}>
            <h1>{trabajador.nombre}</h1>
            <h1>{trabajador.apellido}</h1>
            <h1>{trabajador.rut}</h1>
            <h1>{trabajador.direccion}</h1>
            <h1>{trabajador.email}</h1>
            <h1>{trabajador.afp}</h1>
            <h1>{trabajador.salud}</h1>
            <h1>{trabajador.cargo}</h1>
            <h1>{formatToClp(trabajador.sueldo_base)}</h1>
          </div>
        );
      })}
      {/* {options && <AsyncSelect options={options} />} */}
    </div>
  );
};

export default ListTrabajadores;
