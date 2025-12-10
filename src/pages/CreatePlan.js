import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet, apiPost } from "../api/api";

export default function CreatePlan({ user, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [refeicoes, setRefeicoes] = useState([
    { nome: "", horario: "" }
  ]);

  useEffect(() => {
    async function loadPatients() {
      const res = await apiGet("/patients");
      setPatients(res.patients || []);
    }
    loadPatients();
  }, []);

  function addRefeicao() {
    setRefeicoes([...refeicoes, { nome: "", horario: "" }]);
  }

  function updateRefeicao(index, field, value) {
    const clone = [...refeicoes];
    clone[index][field] = value;
    setRefeicoes(clone);
  }

  async function salvarPlano() {
    if (!titulo || !pacienteId) {
      alert("Preencha título do plano e selecione o paciente!");
      return;
    }

    const body = {
      titulo,
      descricao,
      paciente_id: pacienteId,
      criado_por: user.id,
      refeicoes
    };

    const res = await apiPost("/dietas", body);

    if (res.id) {
      alert("Plano criado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPacienteId("");
      setRefeicoes([{ nome: "", horario: "" }]);
    }
  }

  const menuItems = [
    { label: "Dashboard", action: () => {} },
    { label: "Pacientes", action: () => {} },
    { label: "Criar Plano", action: () => {} },
    { label: "Consultas", action: () => {} },
    { label: "Configurações", action: () => {} }
  ];

  return (
    <Layout user={user} menuItems={menuItems} onLogout={onLogout} accent="sidebar-green">

      <div className="card shadow-sm p-4 rounded-4">
        <h4 className="fw-bold mb-4">Criar Plano Alimentar</h4>

        <div className="mb-3">
          <label className="form-label fw-semibold">Título</label>
          <input
            type="text"
            className="form-control rounded-4"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Plano saudável semanal"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Descrição</label>
          <textarea
            className="form-control rounded-4"
            rows="3"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Observações gerais do plano..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Paciente</label>
          <select
            className="form-select rounded-4"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <h5 className="fw-bold mt-4">Refeições</h5>
        {refeicoes.map((r, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control rounded-4"
                placeholder="Nome da refeição"
                value={r.nome}
                onChange={(e) => updateRefeicao(index, "nome", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="time"
                className="form-control rounded-4"
                value={r.horario}
                onChange={(e) => updateRefeicao(index, "horario", e.target.value)}
              />
            </div>
          </div>
        ))}

        <button className="btn btn-outline-success rounded-4 mb-3" onClick={addRefeicao}>
          + Adicionar Refeição
        </button>

        <button className="btn btn-success rounded-4 w-100" onClick={salvarPlano}>
          Salvar Plano Alimentar
        </button>
      </div>
    </Layout>
  );
}
