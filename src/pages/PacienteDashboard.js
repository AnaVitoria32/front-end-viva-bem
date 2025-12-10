import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../api/api";

export default function PacienteDashboard({ user, onLogout }) {
  const [plan, setPlan] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await apiGet(`/dietas/${user.id}`);
        setPlan(res[0]); // a rota retorna um array direto

        if (res.plans && res.plans.length > 0) {
          setPlan(res.plans[0]); // plano mais recente
        }
      } catch (err) {
        console.error("Erro ao carregar plano:", err);
      }
    }

    // mensagens fictícias
    setMessages([
      { id: 1, text: "Olá! Como você está se sentindo hoje?" },
      { id: 2, text: "Lembre-se de beber água regularmente 😊" }
    ]);

    loadPlan();
  }, [user]);

  function sendMessage() {
    if (!messageInput.trim()) return;

    const nova = { id: Date.now(), text: messageInput };
    setMessages([nova, ...messages]);
    setMessageInput("");
  }

  const menuItems = [
    { label: "Meu Plano", action: () => {} },
    { label: "Mensagens", action: () => {} },
    { label: "Histórico", action: () => {} },
    { label: "Configurações", action: () => {} }
  ];

  return (
    <Layout user={user} menuItems={menuItems} onLogout={onLogout} accent="sidebar-blue">
      
      <div className="row g-4 mb-4">

        {/* CARD 1 — Plano Alimentar */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded-4">
            <h5 className="fw-bold mb-3">Seu Plano Alimentar</h5>

            {plan ? (
              <>
                <p><strong>Peso:</strong> {plan.peso} kg</p>
                <p><strong>Idade:</strong> {plan.idade} anos</p>
                <p><strong>Doenças:</strong> {plan.doencas || "Nenhuma"}</p>
                <p><strong>Período:</strong> {plan.periodo_inicio} até {plan.periodo_fim}</p>

                <h6 className="mt-3 fw-bold">Descrição da Dieta:</h6>
                <p>{plan.descricao}</p>

                <button className="btn btn-primary rounded-4 mt-3 w-100">
                  Ver detalhes completos
                </button>
              </>
            ) : (
              <p className="text-muted">Nenhum plano foi enviado ainda.</p>
            )}
          </div>
        </div>

        {/* CARD 2 — Mensagens */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded-4">
            <h5 className="fw-bold mb-3">Enviar Mensagem</h5>

            <div className="mb-3">
              <textarea
                className="form-control rounded-4"
                rows="3"
                placeholder="Escreva sua mensagem..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-primary rounded-4 w-100 mb-3" onClick={sendMessage}>
              Enviar
            </button>

            <h6 className="fw-semibold mt-4">Mensagens Recentes</h6>
            <ul className="list-unstyled mt-3">
              {messages.map((m) => (
                <li key={m.id} className="dashboard-list-item">
                  <i className="bi bi-chat-dots me-2 text-info"></i>
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="card shadow-sm p-5 rounded-4">
        <h5 className="fw-bold mb-4">Sua Evolução</h5>
        <p className="text-muted">Aqui futuramente você poderá acompanhar seu progresso.</p>
      </div>

    </Layout>
  );
}
