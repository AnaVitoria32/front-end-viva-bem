import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/api";

export default function Login({ setUser }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const user = await apiPost("/login", { email, senha });

      if (!user || !user.email) {
        throw new Error("Login inválido");
      }

      // Salva o usuário
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      // Redirecionar pelo tipo
      if (user.role === "NUTRITIONIST") {
        navigate("/dashboard-nutri");
      } else if (user.role === "PATIENT") {
        navigate("/dashboard-paciente");
      } else {
        setErro("Tipo de usuário desconhecido.");
      }

    } catch (err) {
      setErro("Email ou senha incorretos");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: "#eef5ff" }}>

      <div className="card shadow p-4"
           style={{ width: "380px", borderRadius: "18px" }}>
           
        <h2 className="text-center mb-4"
            style={{ fontWeight: 700, color: "#2f6fed" }}>
          Viva Bem
        </h2>

        <form onSubmit={handleLogin}>
          
          {erro && (
            <div className="alert alert-danger py-2">{erro}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seuemail@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Senha</label>
            <input
              type="password"
              className="form-control rounded-4"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-4"
            disabled={loading}
            style={{ backgroundColor: "#2f6fed" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          
          <button
            className="btn btn-link mt-3"
            onClick={() => navigate("/cadastro")}
          >
            Não tem conta? Cadastre-se
          </button>

        </form>

      </div>
    </div>
  );
  
}

