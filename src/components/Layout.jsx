import { Outlet } from 'react-router-dom';
import Header from './Header';
import SchoolLogos from './SchoolLogos';

// Estructura común de las páginas con sesión iniciada:
// cabecera arriba, contenido de la ruta en el centro (<Outlet />) y logos.
export default function Layout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <SchoolLogos />
    </>
  );
}
