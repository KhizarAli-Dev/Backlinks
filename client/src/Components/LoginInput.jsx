import React from 'react'

function LoginInput({loginType,loginValue,loginPlaceHolder,onChange,loginName}) {
  return (
    <input
    type={loginType}
    value={loginValue}
    name={loginName}
    placeholder={loginPlaceHolder}
    onChange={onChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2193b0]"
  />
  )
}

export default LoginInput