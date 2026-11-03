import { assetUrl } from '../utils/assets';

// Logos de las instituciones (esquina inferior izquierda).
export default function SchoolLogos() {
  return (
    <div className="logos-container">
      <a
        href="https://www.ielasnieves.edu.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={assetUrl('img/nieves.png')}
          alt="Institución Educativa Las Nieves"
          className="logo-circular"
        />
      </a>

      <a
        href="https://www.politecnicojic.edu.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={assetUrl('img/poli.jfif')}
          alt="Politécnico Colombiano Jaime Isaza Cadavid"
          className="logo-circular"
        />
      </a>
    </div>
  );
}
