import React  from 'react';
import BallIcon from "../../assets/images/icons/ball-white.svg";
import './run.scss';

const Run = (props)=>{
    return(<div className='run-section'>
    <div className="runs-stats">
      <img src={BallIcon} alt=""/>
      <div>{props.run}</div>
      </div>
  </div>)
}

export default Run;