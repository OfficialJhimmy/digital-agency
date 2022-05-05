import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./CustomLoader.scss";
function CustomLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="loading">
      <PuffLoader color={"#ee315d"} loading={loading} size={60} />
    </div>
  );
}

export default CustomLoader;
