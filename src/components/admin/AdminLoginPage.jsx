import React, { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo, { CircularBrandLogo } from "../common/BrandLogo";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";

export default function AdminLoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onLogin(cleanUsername, password);
      if (!success) {
        setError("Invalid credentials. Please verify your administrator username and password.");
      }
    } catch (err) {
      setError("Authentication failed. Please check network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-brand">
          <div className="login-logo-circle">
            <CircularBrandLogo size={56} />
          </div>
          <h1 className="login-brand-title">
            Dine<span className="text-coral">EQR</span>
          </h1>
          <span className="login-parent-badge">by Black Cardinal</span>
          <p className="login-tagline">Scan. Explore. Order.</p>
        </div>

        <div className="login-card-divider" />

        <div className="login-heading-area">
          <h2 className="login-title">Administrator Portal</h2>
          <p className="login-subtitle">
            Enter authorized credentials to manage restaurants, menus, QR table stands, and platform analytics.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={16} className="text-danger flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="field-label" htmlFor="admin-username">
              Username
            </label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="admin-password">
              Password
            </label>
            <div className="input-with-icon password-input-wrap">
              <Lock size={16} className="input-icon" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Card Footer */}
        <div className="login-card-footer">
          <Link to="/" className="return-home-link">
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </Link>
          <div className="login-security-tag">
            <ShieldCheck size={13} className="text-coral" />
            <span>Authorized Access Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
