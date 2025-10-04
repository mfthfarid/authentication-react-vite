import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Data statis
  const staticEmail = "admin@gmail.com";
  const staticPassword = "Admin123";

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email harus diisi";
    if (!regex.test(value)) return "Format email tidak valid";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password harus diisi";
    if (value.length < 8) return "Password minimal 8 karakter";
    if (!/(?=.*[a-z])/.test(value)) return "Harus ada huruf kecil";
    if (!/(?=.*[A-Z])/.test(value)) return "Harus ada huruf besar";
    if (!/(?=.*\d)/.test(value)) return "Harus ada angka";
    return "";
  };

  useEffect(() => {
    if (emailTouched) {
      setEmailError(validateEmail(email));
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      setPasswordError(validatePassword(password));
    }
  }, [password, passwordTouched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      if (email !== staticEmail) {
        setEmailError("Email tidak terdaftar!");
      } else if (password !== staticPassword) {
        setPasswordError("Password salah!");
      } else {
        setIsSubmitting(true);
        setTimeout(() => {
          console.log("Login:", { email, password, rememberMe });
          setIsSubmitting(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);

          // Reset form
          setEmail("");
          setPassword("");
          setRememberMe(false);
        }, 1500);
      }
    }
  };

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
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Selamat Datang</h1>
          <p className={styles.subtitle}>Masuk ke akun Anda</p>
        </div>

        {success && (
          <div className={styles.alert}>
            ✓ Login berhasil! Selamat datang kembali.
          </div>
        )}

        <div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={getInputClass(emailTouched, emailError, email)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="nama@example.com"
              disabled={isSubmitting}
            />
            {emailTouched && emailError && (
              <span className={styles.errorMsg}>⚠ {emailError}</span>
            )}
            {emailTouched && !emailError && email && (
              <span className={styles.successMsg}>✓ Email valid</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={`${getInputClass(
                  passwordTouched,
                  passwordError,
                  password
                )} ${styles.passwordInput}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                placeholder="Masukkan password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordTouched && passwordError && (
              <span className={styles.errorMsg}>⚠ {passwordError}</span>
            )}
            {passwordTouched && !passwordError && password && (
              <span className={styles.successMsg}>✓ Password kuat</span>
            )}
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
              />
              <span>Ingat saya</span>
            </label>
            <Link to="/forgot-password" className={styles.link}>
              Lupa password?
            </Link>
          </div>

          <button
            type="button"
            className={`${styles.button} ${
              isSubmitting || emailError || passwordError
                ? styles.buttonDisabled
                : ""
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting || !!emailError || !!passwordError}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </button>
        </div>

        <div className={styles.signup}>
          Belum punya akun?{" "}
          <Link to={"/register"} className={styles.link}>
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
