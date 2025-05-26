import { useContext, useState, useEffect } from "react";
import { IPAddressContext } from "../context/ip-address-context";

import isValidIp from "../utils/isValidIp";

const IpAddressForm = () => {
  const { ipAddress, setIpAddress } = useContext(IPAddressContext);
  const [ipValue, setIpValue] = useState(ipAddress);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    setIpValue(ipAddress);
  }, [ipAddress]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpValue(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidIp(ipValue)) {
      setIpAddress(ipValue.trim());
      setInputError("");
    } else {
      setInputError("Please enter a valid IP address or domain");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='w-full lg:flex flex-col items-center justify-center mt-5'
    >
      <div className=' relative flex lg:w-[40rem]  rounded-2xl overflow-hidden '>
        <input
          type='text'
          onChange={onChangeHandler}
          value={ipValue}
          className='bg-white w-full p-4 outline-0 text-xl'
          placeholder='Search for any IP address or domain'
        />

        <button className='bg-Very-Dark-Gray flex items-center lg:cursor-pointer hover:bg-[#383838] justify-center w-[20%] lg:w-[10%] p-4'>
          <svg xmlns='http://www.w3.org/2000/svg' width='12' height='14'>
            <path fill='none' stroke='#FFF' strokeWidth='3' d='M2 1l6 6-6 6' />
          </svg>
        </button>
      </div>
      {inputError && <p className='text-red-400'>{inputError}</p>}
    </form>
  );
};

export default IpAddressForm;
