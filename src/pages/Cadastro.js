import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";

export default function Cadastro({ setUser }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novoUser = await apiPost("/register", {
        nome,
        email,
        senha,
        role,
      });

      localStorage.setItem("user", JSON.stringify(novoUser));
      setUser(novoUser);

      if (role === "NUTRITIONIST") navigate("/dashboard-nutri");
      else navigate("/dashboard-paciente");

    } catch (err) {
      setErro("Erro ao criar conta. Email já existe?");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#eef5ff" }}>

      <div className="card shadow p-4" style={{ width: "420px", borderRadius: "18px" }}>
        <h2 className="text-center mb-3" style={{ fontWeight: 700, color: "#2f6fed" }}>
          Criar Conta
        </h2>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <label className="fw-semibold">Nome</label>
          <input
            className="form-control rounded-4 mb-3"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label className="fw-semibold">Email</label>
          <input
            className="form-control rounded-4 mb-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="fw-semibold">Senha</label>
          <input
            className="form-control rounded-4 mb-3"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label className="fw-semibold">Tipo de Conta</label>
          <select
            className="form-control rounded-4 mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="PATIENT">Paciente</option>
            <option value="NUTRITIONIST">Nutricionista</option>
          </select>

          <button className="btn btn-primary w-100 rounded-4"
            style={{ backgroundColor: "#2f6fed" }}>
            Criar Conta
          </button>
        </form>

        <button
          className="btn btn-link mt-3"
          onClick={() => navigate("/")}
        >
          Já tem conta? Fazer login
        </button>
      </div>
    </div>
  );
}
