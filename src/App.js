import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Cadastro from "./pages/Cadastro";
import NutriDashboard from "./pages/NutriDashboard";
import CreatePlan from "./pages/CreatePlan";
import PacienteDashboard from "./pages/PacienteDashboard";
import Patients from "./pages/Patients";

// NOVOS IMPORTS
import Dietas from "./pages/Dietas";
import NovaDieta from "./pages/NovaDieta";

function App() {
  const [user, setUser] = useState(null);

  // -------------------------
  // 🔐 CARREGAR CSRF TOKEN UMA ÚNICA VEZ
  // -------------------------
  useEffect(() => {
    async function loadCsrf() {
      try {
        const res = await fetch("http://localhost:8080/auth/csrf-token", {
          credentials: "include", // necessário para receber o cookie de CSRF
        });

        const data = await res.json();
        window.__CSRF_TOKEN__ = data.csrfToken;

        console.log("CSRF token carregado:", data.csrfToken);
      } catch (err) {
        console.error("Erro ao carregar CSRF:", err);
      }
    }

    loadCsrf();
  }, []);

  // -------------------------
  // Carregar usuário salvo
  // -------------------------
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "NUTRITIONIST" ? (
                <Navigate to="/dashboard-nutri" />
              ) : (
                <Navigate to="/dashboard-paciente" />
              )
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        {/* CADASTRO */}
        <Route
          path="/cadastro"
          element={<Cadastro setUser={setUser} />}
        />

        {/* DASHBOARD NUTRICIONISTA */}
        <Route
          path="/dashboard-nutri"
          element={
            user?.role === "NUTRITIONIST"
              ? <NutriDashboard user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/pacientes"
          element={
            user?.role === "NUTRITIONIST"
              ? <Patients user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        {/* CRIAR PLANO */}
        <Route
          path="/criar-plano"
          element={
            user?.role === "NUTRITIONIST"
              ? <CreatePlan user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        {/* DIETAS */}
        <Route
          path="/dietas"
          element={
            user?.role === "NUTRITIONIST"
              ? <Dietas user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/dietas/nova"
          element={
            user?.role === "NUTRITIONIST"
              ? <NovaDieta user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

        {/* DASHBOARD PACIENTE */}
        <Route
          path="/dashboard-paciente"
          element={
            user?.role === "PATIENT"
              ? <PacienteDashboard user={user} onLogout={handleLogout} />
              : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
