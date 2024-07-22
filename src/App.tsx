import Header from "./components/header/Header.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import AppRoutes from "@/routes/AppRoutes.tsx";

function App() {

  return (
    <>
        <Header/>
        <div className="main-container">
            <Navbar/>
            <AppRoutes/>
        </div>
    </>
  )
}

export default App
