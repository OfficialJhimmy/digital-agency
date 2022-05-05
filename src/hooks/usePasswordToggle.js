import React, { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";

const usePasswordToggle = () => {
  const [visible, setVisiblity] = useState(false);

  const Icon = visible ? (
    <AiOutlineEye
      onClick={() => setVisiblity((visiblity) => !visiblity)}
      style={{ width: "17px", height: "17px" }}
    />
  ) : (
    <AiFillEyeInvisible
      onClick={() => setVisiblity((visiblity) => !visiblity)}
      style={{ width: "17px", height: "17px" }}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
