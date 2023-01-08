import { Button } from 'carbon-components-react';
import { useRef } from 'react';
import './index.scss';

const CricketMediaButton = (props) => {

    const { 
        label,
        classes,
        onClick,
        onChange,
        icon,
        name,
        type='button',
        parentClass = '',
        disabled = false
    } = props;

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    return <div className={`form-element button ${parentClass}`}>
        { 
        type === 'file'
        ?
        <label className="custom-file-upload">
            { 
            icon && <>
                <img className='button-icon' src={icon} />
                <input type='file' ref={inputRef} onChange={onChange} name={name} />
                <button onClick={handleClick} className={classes}>{label}</button>
            </>
            }
        </label> 
        :
        <>
        {icon && <img className='button-icon' src={icon} /> }
        <Button className={classes} onClick={onClick} disabled={disabled} >{label}</Button>
        </>
        }
    </div>
}

export default CricketMediaButton;