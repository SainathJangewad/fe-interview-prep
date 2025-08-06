import { useState } from 'react';
import OtpInput from './OtpInput'

const OtpParent: React.FC = () => {
    const [otp, setOtp] = useState('');

    return (
        <div>
            <h2>Enter OTP</h2>
            <OtpInput length={4} onChange={setOtp} />
            <p>Entered OTP: {otp}</p>
        </div>
    );
};

export default OtpParent;
