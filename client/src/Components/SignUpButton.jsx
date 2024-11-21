import React from "react";

function SignUpButton({signUpButtonType}) {
  return (
    <button
      type={signUpButtonType}
      className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-[#32d671] hover:bg-[#2dc467]  rounded-xl"
    >
      Create an User
    </button>
  );
}

export default SignUpButton;
