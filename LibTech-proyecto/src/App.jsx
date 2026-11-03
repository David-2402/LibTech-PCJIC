import "./App.css";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Catalog from "./components/Catalog";
import BottomLogos from "./components/BottomLogos";

function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <>
          <Header />
          <main className="main-content">
            <Catalog />
          </main>
        </>
      ) : (
        <Login />
      )}
      <BottomLogos />
    </>
  );
}

export default App;
