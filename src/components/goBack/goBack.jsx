import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import "./goBack.css"; // Asegúrate de importar los estilos CSS adecuados

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1); // Navega hacia atrás en la pila de historial
  };

  return (
    <button className="go-back-button" onClick={goBackHandler}>
      <MdOutlineArrowBack className="arrow" />
      <span>Go Back</span>
    </button>
  );
};

export default GoBackButton;
