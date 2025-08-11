import React, { useRef, useState } from 'react';
import './OtpInput.scss';

interface OtpInputProps {
    length: number;
    onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...otpValues];
        updatedOtp[index] = value;
        setOtpValues(updatedOtp);
        onChange(updatedOtp.join(''));

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault(); // ✅ Stop browser from pasting into just one box

        const pasteData = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(pasteData)) return;

        const newOtp = pasteData.split('').slice(0, length);
        const finalOtp = [...Array(length)].map((_, i) => newOtp[i] || '');
        setOtpValues(finalOtp);
        onChange(finalOtp.join(''));

        setTimeout(() => {
            const nextIndex = Math.min(pasteData.length, length - 1);
            inputsRef.current[nextIndex]?.focus();
        }, 0);
    };

    return (
        <div className="otp-container">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues[i]}
                    ref={el => (inputsRef.current[i] = el)}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className="otp-input"
                />
            ))}
        </div>
    );
};

export default OtpInput;
