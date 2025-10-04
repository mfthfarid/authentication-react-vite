import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
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
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!data.gender) {
      errors.gender = "Please select your gender";
    }

    if (!data.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return errors;
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h3>🎉 Registration Successful!</h3>
          <p>
            Thank you for registering. We've sent a confirmation email to your
            inbox.
          </p>
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
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.email}
            </span>
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
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <span style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
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
          </div>
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
              className={styles.select}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formData.agreeToTerms}>
          Create Account
        </button>
      </form>
      <div className={styles.signup}>
        Belum punya akun?{" "}
        <Link to={"/register"} className={styles.link}>
          Daftar Sekarang
        </Link>
        {/* <a href="#" className={styles.link}>
                  Daftar sekarang
                </a> */}
      </div>
    </div>
  );
};

export default RegistrationForm;
