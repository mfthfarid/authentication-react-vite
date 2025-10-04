import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
const EnhancedRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate field in real-time if it's been touched
    if (touched[name]) {
      const fieldError = validateField(
        name,
        type === "checkbox" ? checked : value
      );
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(
      name,
      type === "checkbox" ? checked : value
    );
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase, and numbers";
        }
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";

      case "gender":
        if (!value) return "Please select your gender";
        return "";

      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        // Check if user is at least 13 years old
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) return "You must be at least 13 years old";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ""))) {
          return "Please enter a valid phone number";
        }
        return "";

      case "agreeToTerms":
        if (!value) return "You must agree to the terms and conditions";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        agreeToTerms: false,
      });
      setTouched({});
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = [
      "Very Weak",
      "Weak",
      "Fair",
      "Good",
      "Strong",
      "Very Strong",
    ];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // pindah ke halaman login setelah 3 detik
  useEffect(() => {
    if (isSubmitted) {
      // update progress bar setiap 100ms
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            navigate("/"); // redirect ke login
            return 100;
          }
          return prev + 5; // tambah 5% tiap 100ms → total 2 detik
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isSubmitted, navigate]);

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h3>🎉 Registration Successful!</h3>
          <p>
            Thank you for registering. We&apos;ve sent a confirmation email.
          </p>
          <p>Redirecting to login page...</p>

          {/* progress bar */}
          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Join our community today</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${
                errors.firstName ? styles.error : ""
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.firstName}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${
                errors.lastName ? styles.error : ""
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        {/* Password Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              placeholder="Create a strong password"
            />

            {formData.password && (
              <div style={{ marginTop: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginBottom: "0.25rem",
                  }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: "4px",
                        backgroundColor:
                          i <= passwordStrength.strength
                            ? [
                                "#e74c3c",
                                "#e67e22",
                                "#f1c40f",
                                "#2ecc71",
                                "#27ae60",
                              ][i - 1]
                            : "#ecf0f1",
                        borderRadius: "2px",
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color:
                      passwordStrength.strength >= 4
                        ? "#27ae60"
                        : passwordStrength.strength >= 3
                        ? "#f1c40f"
                        : "#e74c3c",
                  }}>
                  Strength: {passwordStrength.label}
                </span>
              </div>
            )}

            {errors.password && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.password}
              </span>
            )}

            {formData.password && !errors.password && (
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#27ae60",
                  marginTop: "0.5rem",
                }}>
                ✓ Password meets requirements
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${
                errors.confirmPassword ? styles.error : ""
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.confirmPassword}
              </span>
            )}

            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#27ae60",
                    marginTop: "0.5rem",
                  }}>
                  ✓ Passwords match
                </div>
              )}
          </div>
        </div>

        {/* Password Requirements */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            textAlign: "left",
          }}>
          <strong>Password must contain:</strong>
          <ul style={{ margin: "0.5rem 0 0 1rem", padding: 0 }}>
            <li
              style={{
                color: formData.password.length >= 8 ? "#27ae60" : "#7f8c8d",
              }}>
              At least 8 characters
            </li>
            <li
              style={{
                color: /[a-z]/.test(formData.password) ? "#27ae60" : "#7f8c8d",
              }}>
              One lowercase letter
            </li>
            <li
              style={{
                color: /[A-Z]/.test(formData.password) ? "#27ae60" : "#7f8c8d",
              }}>
              One uppercase letter
            </li>
            <li
              style={{
                color: /[0-9]/.test(formData.password) ? "#27ae60" : "#7f8c8d",
              }}>
              One number
            </li>
          </ul>
        </div>

        {/* Personal Information */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={styles.select}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.gender}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`${styles.input} ${
                errors.dateOfBirth ? styles.error : ""
              }`}
            />
            {errors.dateOfBirth && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.dateOfBirth}
              </span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.phone ? styles.error : ""}`}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && (
            <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={styles.checkbox}
            />
            <span className={styles.checkboxLabel}>
              I agree to the Terms and Conditions and Privacy Policy
            </span>
          </label>
          {errors.agreeToTerms && (
            <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.agreeToTerms}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Create Account
        </button>
      </form>
      <div className={styles.signin}>
        Sudah punya akun?{" "}
        <Link to={"/"} className={styles.link}>
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );
};

export default EnhancedRegistrationForm;
