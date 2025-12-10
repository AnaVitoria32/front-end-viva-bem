import React from "react";
import "./Layout.css";

export default function Layout({ user, menuItems, accent = "sidebar-blue", children, onLogout }) {
  return (
    <div className="d-flex min-vh-100 bg-light-blue">

      {/* Sidebar */}
      <aside className={`sidebar shadow-sm p-4 ${accent}`}>
        <h2 className="fw-bold mb-5 text-center text-white">VivaBem</h2>

        <nav className="flex-grow-1">
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <button
                  className="btn menu-btn text-start w-100 fw-semibold"
                  onClick={item.action}
                >
                  <i className="bi bi-chevron-right me-2"></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button className="btn logout-btn w-100 fw-semibold mt-4" onClick={onLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Sair
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4">

        {/* Topbar */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          {/* Search bar */}
          <div className="search-wrapper d-flex align-items-center">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
            />
          </div>

          {/* User info */}
          <div className="d-flex align-items-center user-info">
            <span className="fw-semibold me-3">{user?.name}</span>
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
