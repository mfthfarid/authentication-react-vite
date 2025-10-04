import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  //   email statis
  const registeredEmail = "admin@gmail.com";

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email harus diisi";
    if (!regex.test(value)) return "Format email tidak valid";
    return "";
  };

  // 🔹 Realtime validasi hanya setelah input disentuh
  useEffect(() => {
    if (emailTouched) {
      const errorMsg = validateEmail(email);
      setEmailError(errorMsg);
    }
  }, [email, emailTouched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);

    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    if (emailErr) {
      setMessage("");
      return;
    }

    // Jika format email valid, lanjut proses kirim
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      if (email === registeredEmail) {
        setMessage("✅ Link reset password telah dikirim ke email Anda.");
        setLoading(false);

        // Auto-redirect ke login setelah 3 detik
        setTimeout(() => {
          setEmail("");
          navigate("/");
        }, 3000);
      } else {
        setMessage("❌ Email tidak ditemukan. Coba lagi.");
        setLoading(false);
      }
    }, 1500);
  };

  // Efek loading bar (progres naik setiap 100ms)
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 5 : 100));
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const getInputClass = (touched, error, value) => {
    let className = styles.inputField;
    if (touched && error) {
      className += ` ${styles.inputError}`;
    } else if (touched && value && !error) {
      className += ` ${styles.inputSuccess}`;
    }
    return className;
  };

  return (
    <div className={styles.container}>
      <h2>Lupa Password</h2>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Masukkan email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          className={getInputClass(emailTouched, emailError, email)}
        />
        {emailTouched && emailError && (
          <span className={styles.errorMsg}>⚠ {emailError}</span>
        )}
        {emailTouched && !emailError && email && (
          <span className={styles.successMsg}>✓ Email valid</span>
        )}

        <button
          type="submit"
          className={styles.button}
          disabled={loading || emailError}>
          {loading ? "Mengirim..." : "Kirim Link Reset"}
        </button>
      </form>

      {loading && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {message && <p className={styles.errorMsg}>{message}</p>}
    </div>
  );
}
