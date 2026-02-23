import React, { useState } from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ id: "", pw: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const isActive = form.id && form.pw;

  return (
    <div className={styles.login}>
      <div className={styles.contents}>
        <p className={styles.title}>로그인</p>
        <form className={styles.form}>
          <input
            className={styles.id}
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            onChange={handleChange}
          />
          <input
            className={styles.pw}
            type="password"
            id="pw"
            name="pw"
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button
            className={`${styles.loginBtn} ${isActive ? styles.active : ""}`}
          >
            로그인
          </button>
        </form>
        <NavLink to="/join" className={styles.join}>
          회원가입
        </NavLink>
      </div>
    </div>
  );
}
