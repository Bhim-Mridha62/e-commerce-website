import React, { useState, useEffect } from "react";
function text() {
  
  const [combinedData, setCombinedData] = useState([]);
  
  return (
    <div>
      <div>
        <h1>API Data</h1>
        <pre>{JSON.stringify(combinedData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default text;
