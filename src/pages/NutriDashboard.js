import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function NutriDashboard({ user, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      // Pacientes
      const resPatients = await apiGet("/patients");
      setPatients(resPatients.patients || []);

      // Consultas (simulado por enquanto)
      const fakeConsultas = [
        { id: 1, paciente: "João Lima", data: "27/11/2025 - 14:00" },
        { id: 2, paciente: "Maria Torres", data: "28/11/2025 - 10:30" },
        { id: 3, paciente: "Clara Nunes", data: "29/11/2025 - 09:00" }
      ];
      setConsultas(fakeConsultas);
    }
    load();
  }, []);

  // MENU DO NUTRICIONISTA
 const menuItems = [
  { label: "Dashboard", action: () => navigate("/dashboard-nutri") },
  { label: "Pacientes", action: () => navigate("/pacientes") },
  { label: "Criar Plano", action: () => navigate("/dietas") },
  { label: "Consultas", action: () => {} },
  { label: "Configurações", action: () => {} },
];


  return (
    <Layout user={user} menuItems={menuItems} onLogout={onLogout} accent="sidebar-green">
      
      {/* Cards de cima */}
      <div className="row g-4 mb-4">

        {/* CARD 1 — Pacientes Recentes */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded-4">
            <h5 className="fw-bold mb-3">Pacientes Recentes</h5>

            <ul className="list-unstyled">
              {(patients.slice(0, 3)).map((p) => (
                <li key={p.id} className="dashboard-list-item">
                  <i className="bi bi-person-heart me-2 text-primary"></i>
                  {p.name}
                </li>
              ))}

              {patients.length === 0 && (
                <p className="text-muted text-center">Nenhum paciente cadastrado.</p>
              )}
            </ul>
          </div>
        </div>

        {/* CARD 2 — Próximas Consultas */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded-4">
            <h5 className="fw-bold mb-3">Próximas Consultas</h5>

            <ul className="list-unstyled">
              {consultas.map((c) => (
                <li key={c.id} className="dashboard-list-item">
                  <i className="bi bi-calendar-check me-2 text-success"></i>
                  {c.paciente} — <span className="fw-semibold">{c.data}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Card grande inferior */}
      <div className="card shadow-sm p-5 rounded-4">
        <h5 className="fw-bold mb-4">Resumo Geral</h5>
        <p className="text-muted">Aqui você poderá adicionar gráficos ou estatísticas no futuro.</p>
      </div>

    </Layout>
  );
}
