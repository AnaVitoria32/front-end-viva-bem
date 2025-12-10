import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function NovaDieta({ user, onLogout }) {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    paciente_id: "",
    peso: "",
    idade: "",
    doencas: "",
    observacoes: "",
    periodo_inicio: "",
    periodo_fim: "",
    descricao: ""
  });

  useEffect(() => {
    async function load() {
      const res = await apiGet("/patients");
      setPacientes(res.patients || []);
    }
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function create() {
    if (!form.paciente_id) {
      alert("Selecione um paciente.");
      return;
    }

    await apiPost("/dietas", form);

    alert("Dieta criada com sucesso!");
    navigate("/dietas");
  }

  const menuItems = [
    { label: "Dashboard", action: () => navigate("/dashboard-nutri") },
    { label: "Pacientes", action: () => navigate("/pacientes") },
    { label: "Dietas", action: () => navigate("/dietas") },
  ];

  return (
    <Layout user={user} menuItems={menuItems} onLogout={onLogout} accent="sidebar-green">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Criar Nova Dieta</h3>

        <button className="btn btn-secondary" onClick={() => navigate("/dietas")}>
          Voltar
        </button>
      </div>

      <div className="card p-4 shadow-sm rounded-4">
        <div className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label">Paciente</label>
            <select
              className="form-select"
              name="paciente_id"
              value={form.paciente_id}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              className="form-control"
              name="peso"
              value={form.peso}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Idade</label>
            <input
              type="number"
              className="form-control"
              name="idade"
              value={form.idade}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Doenças</label>
            <input
              type="text"
              className="form-control"
              name="doencas"
              value={form.doencas}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Observações</label>
            <input
              type="text"
              className="form-control"
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Início do período</label>
            <input
              type="date"
              className="form-control"
              name="periodo_inicio"
              value={form.periodo_inicio}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Fim do período</label>
            <input
              type="date"
              className="form-control"
              name="periodo_fim"
              value={form.periodo_fim}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Descrição da Dieta</label>
            <textarea
              rows="4"
              className="form-control"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12">
            <button className="btn btn-success w-100" onClick={create}>
              Criar Dieta
            </button>
          </div>
        </div>
      </div>

    </Layout>
  );
}
