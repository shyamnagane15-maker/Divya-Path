import React from "react";

export default function Button({
  children,
  variant = "secondary", // primary | gold | secondary | ghost | danger
  size, // "sm"
  icon: Icon,
  loading,
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {Icon && !loading && <Icon size={size === "sm" ? 14 : 16} />}
      {loading ? "Working…" : children}
    </button>
  );
}
