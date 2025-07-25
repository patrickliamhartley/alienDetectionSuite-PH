import React from 'react';

interface SpaceShipIconProps {
  color: string;
  size: number;
}

const sizeBuffer = "5";

const SpaceShipIcon: React.FC<SpaceShipIconProps> = ({ color, size }) => (
  <svg 
    fill={color} 
    version="1.1" 
    id="Capa_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 575.447 575.447" 
    xmlSpace="preserve"
    width={size + sizeBuffer}
    height={size + sizeBuffer}
    stroke="Chartreuse"
    strokeWidth="20"
    strokeOpacity="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="10"
    strokeDasharray="0"
    strokeDashoffset="0"
    style={{ transform: 'translate(-50%, -50%)' }}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <path d="M84.069,344.59c7.188,8.523,53.008,44.805,209.627,44.805c156.62,0,201.495-43.977,207.928-54.019 c0-55.782-53.084-155.755-181.556-166.778l-0.934-48.857c21.568-7.082,37.051-27.371,36.596-51.263 c-0.572-29.28-24.778-52.611-54.112-52.074c-29.315,0.572-52.628,24.791-52.068,54.129c0.455,23.915,16.728,43.597,38.587,49.827 l0.765,39.713c-0.099,0.012-0.123,2.878-0.076,7.748C151.078,171.681,81.442,275.222,84.069,344.59z"></path>
          <path d="M575.447,339.848c0-33.699-32.648-59.763-82.241-77.851c9.82,16.611,16.558,33.361,20.307,48.903 c16.885,9.832,26.063,20.004,26.063,28.947c0,29.462-98.111,72.27-251.858,72.27c-153.746,0-251.846-42.808-251.846-72.27 c0-11.069,13.849-24.008,39.282-35.871c5.021-15.799,12.804-31.925,23.29-47.433C39.901,274.685,0,302.598,0,339.848 c0,35.371,35.931,62.333,89.657,80.49l-41.577,113h37.857l38.226-103.121c43.07,10.451,93.376,16.325,144.306,17.527v111.307 h35.872V447.803c55.862-1.133,111.096-7.904,157.01-20.154L497.982,533h37.611l-40.088-116.129 C543.803,398.807,575.447,373.036,575.447,339.848z"></path>
        </g>
      </g>
    </g>
  </svg>
);

export default SpaceShipIcon; 
