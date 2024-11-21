import React from "react";

function TextInput({
  inputType,
  inputValue,
  onChange,
  placeHolder,
  onBlur,
  name,
}) {
  return (
    <>
      <input
        type={inputType}
        value={inputValue}
        onChange={onChange}
        placeholder={placeHolder}
        onBlur={onBlur}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
}

export default TextInput;
