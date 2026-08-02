import React from "react";

export default function Card({ title, icon: Icon, actions, children, style, className = "" }) {
  return (
    <div className={`card ${className}`} style={style}>
      {(title || actions) && (
        <div className="card-header">
          {title && (
            <div className="card-header-title">
              {Icon && <Icon size={16} />}
              {title}
            </div>
          )}
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
