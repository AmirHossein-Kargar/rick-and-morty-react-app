import React from 'react';

function Loader() {
  return (
    <div style={{ textAlign: "center", color: "var(--slate-300)" }}>
      {/* Spinner */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid rgba(200, 200, 200, 0.3)",
          borderTop: "5px solid black",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "20px auto",
        }}
      ></div>
      {/* Text */}
      <h3>Loading Data...</h3>
    </div>
  );
}

export default Loader;
