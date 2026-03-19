import React, { useState } from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithEmail } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", pw: "" });

  const isActive = form.email && form.pw;

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.pw)
      return alert("이메일과 비밀번호를 입력해주세요!");

    try {
      const user = await signInWithEmail(form.email, form.pw);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        alert("존재하지 않는 계정이에요.");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 틀렸어요.");
      } else if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 올바르지 않아요.");
      } else {
        alert("로그인 중 오류가 발생했어요.");
      }
    }
  };

  const handleGuestLogin = async () => {
    const email = "guest@bears.com";
    const pw = "bears123";
    try {
      const user = await signInWithEmail(email, pw);
      navigate("/");
    } catch (error) {
      alert("게스트 로그인 실패");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.contents}>
        <p className={styles.title}>로그인</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.id}
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
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
            type="button"
            className={`${styles.btn} ${styles.testLoginBtn}`}
            onClick={handleGuestLogin}
          >
            게스트로 바로 시작하기
          </button>
          <button
            className={`${styles.btn} ${styles.loginBtn} ${isActive ? styles.active : ""}`}
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
