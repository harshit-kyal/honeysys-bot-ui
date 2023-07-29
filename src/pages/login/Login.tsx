import React from 'react';
import BackButton from '../../components/BackButton';
import { CheckBox } from '@polynomialai/alpha-react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const navigation = useNavigate();
    const handleGetStartedClick = () => {
        navigation("/otp");
    };
    return (
        <div className='px-2 py-4'>
            <BackButton />
            <div className='text-[26px] font-bold -mt-4'>
                Log in and Embrace the <span className='text-primary'>Retail Revolution</span>
            </div>
            <div className='text-[14px] font-normal'>
                Provide Your Mobile Number
            </div>
            <div className='mt-4 flex'>
                <select className='px-3'>
                    <option className='px-3'>{`+91 (IND)`}</option>
                </select>
                <input type='tel' name='phoneno' id='phoneno' placeholder='Enter your mobile number' className='ml-2' required max={10} min={10}></input>
            </div>
            <div className='mt-8'>
                <CheckBox
                    onChange={function Ha() { }}
                    // selected
                    text="By clicking on “Send Verification Code” you accept our Terms & Conditions and authorize us for your future support and guidance."
                    className={`break-words text-[10px] text-gray-400`}
                />
            </div>
            <div className="flex justify-center mt-8 w-100">
                <Button title="Send Verification Code" handleClick={handleGetStartedClick} />
            </div>
        </div>
    );
};

export default Login;