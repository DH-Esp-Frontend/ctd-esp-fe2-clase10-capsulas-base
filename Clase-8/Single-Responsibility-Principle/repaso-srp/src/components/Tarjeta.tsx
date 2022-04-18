import React from "react";
import "../App.css";

interface IProps {
  titulo: string;
  imagen: string;
}

const Tarjeta: React.FC<IProps> = ({ titulo, imagen }) => {
  return (
    <div className="tarjeta">
      <div>
        <img src={imagen} alt={`imagen-${titulo}`} />
      </div>
      <div>
        <h2>{titulo}</h2>
      </div>
    </div>
  );
};

export default Tarjeta;
