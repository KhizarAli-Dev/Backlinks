import React from "react";

function LoginButton({buttonType,onSubmit}) {
  return (
    <button
      type={buttonType}
      onSubmit={onSubmit}
      className="w-full bg-[#196f85] text-white py-2 rounded-md hover:bg-[#1c86a3] transition-all duration-300"
    >
      Login
    </button>
  );
}

export default LoginButton;
