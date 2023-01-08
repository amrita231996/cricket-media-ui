import { useEffect, useRef } from 'react';

import './index.scss';

const OTP = (props) => {

    const digitGroup = useRef(null);

    const { handleVerify } = props;

    const handleKeyUp = (event, inputs, index) => {

        if(event.keyCode === 8 || event.keyCode === 37) {
            const prev = inputs[index-1];
            
            if(prev) {
                prev.focus();
            }
        } else if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode === 39) {
            const next = inputs[index+1];
            
            if(next) {
                next.focus();
            } else {
                const inputs = Array.from(digitGroup.current.getElementsByTagName('input'));
                const enteredOTP = inputs.map( input => input.value).join('');
                handleVerify(enteredOTP); 
            }
        }
    }

    useEffect(()=>{
        const inputs = Array.from(digitGroup.current.getElementsByTagName('input'));
        for(let i=0;i<inputs.length;++i) {
            let input = inputs[i];
            input.maxLength = 1;
            input.addEventListener('keyup', (event) => {handleKeyUp(event,inputs,i)})
        }
    }, []);

    return <div className="otp">

        <form method="get" ref={digitGroup} className="digit-group" data-group-name="digits" data-autosubmit="false" autoComplete="off">
            <input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
            <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
            <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
            <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
            <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
            <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
        </form>
    </div>

}

export default OTP;