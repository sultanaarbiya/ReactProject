import React from 'react';
import { Spring } from 'react-spring';
import './BeizerCurve.css';

function BeizerCurve() {
  return (
    <div className="container">
      <Spring
        from={{ borderRadius: '0%', transform: 'rotate(0deg)' }}
        to={{ borderRadius: '50%', transform: 'rotate(45deg)' }}
      >
        {props => (
          <div className="cubic-shape" style={props}></div>
        )}
      </Spring>
    </div>
  );
}

export default BeizerCurve;
