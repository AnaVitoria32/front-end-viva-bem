import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiDelete } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dietas({ user, onLogout }) {
  const [dietas, setDietas] = useState([]);
  const navigate = useNavigate();

  async function loadDietas() {
    const res = await apiGet("/dietas");
    setDietas(res.dietas || []);
  }

  useEffect(() => {
    loadDietas();
  }, []);

  async function removeDieta(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta dieta?")) return;

    await apiDelete(`/dietas/${id}`);
    loadDietas();
  }

  const menuItems = [
    { label: "Dashboard", action: () => navigate("/dashboard-nutri") },
    { label: "Pacientes", action: () => navigate("/pacientes") },
    { label: "Criar Plano", action: () => navigate("/dietas/nova") },
    { label: "Dietas", action: () => navigate("/dietas") },
  ];

  return (
    <Layout user={user} menuItems={menuItems} onLogout={onLogout} accent="sidebar-green">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Dietas</h3>

        <button
          className="btn btn-success"
          onClick={() => navigate("/dietas/nova")}
        >
          + Criar Nova Dieta
        </button>
      </div>

      <div className="card p-4 shadow-sm rounded-4">
        <table className="table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Período</th>
              <th>Peso</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {dietas.map(d => (
              <tr key={d.id}>
                <td>{d.paciente_nome}</td>
                <td>
                  {new Date(d.periodo_inicio).toLocaleDateString()} -{" "}
                  {new Date(d.periodo_fim).toLocaleDateString()}
                </td>
                <td>{d.peso} kg</td>
                <td>{d.idade} anos</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeDieta(d.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {dietas.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Nenhuma dieta cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
