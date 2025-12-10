import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost, apiDelete } from "../api/api"; // apiDelete para remoção
import { useNavigate } from "react-router-dom";

export default function Patients({ user, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    const res = await apiGet("/patients");
    setPatients(res.patients || []);
  }

  async function addPatient(e) {
    e.preventDefault();

    await apiPost("/patients", { nome, email });

    setNome("");
    setEmail("");

    loadPatients();
  }

  async function deletePatient(id, nomePaciente) {
    const confirm = window.confirm(`Tem certeza que deseja deletar o paciente "${nomePaciente}"?`);
    if (!confirm) return;

    await apiDelete(`/patients/${id}`);
    loadPatients();
  }

  return (
    <Layout user={user} onLogout={onLogout} menuItems={[]} accent="sidebar-green">
      {/* Título + botão voltar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Pacientes</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard-nutri")}
        >
          Voltar ao Dashboard
        </button>
      </div>

      {/* Formulário de cadastro */}
      <form onSubmit={addPatient} className="mb-5">
        <div className="row g-2">
          <div className="col-md-6">
            <input 
              className="form-control" 
              placeholder="Nome"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>
          <div className="col-md-6">
            <input 
              className="form-control" 
              placeholder="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary w-100">+</button>
          </div>
        </div>
      </form>

      {/* Lista de pacientes */}
      <ul className="list-group">
        {patients.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.nome}</strong> — <span>{p.email}</span>
            </div>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => deletePatient(p.id, p.nome)}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
