import React from "react";

const Alert = ({ alert }) => {
  return (
    // Checks if alert not null then shows div with message else stays null
    alert !== null ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "black",
          padding: "2px",
          fontWeight: "600px"
        }}
      >
        {alert.msg}
      </div>
    ) : null
  );
};

export default Alert;
