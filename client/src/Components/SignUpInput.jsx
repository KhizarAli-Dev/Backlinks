import React from "react";

function SignUpInput({
  signUpType,
  signUpValue,
  signUpPlaceHolder,
  onChange,
  signUpName,
}) {
  return (
    <input
      type={signUpType}
      value={signUpValue}
      name={signUpName}
      placeholder={signUpPlaceHolder}
      onChange={onChange}
      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4  transition-all rounded-xl focus:outline-none focus:ring-2"
    />
  );
}

export default SignUpInput;
