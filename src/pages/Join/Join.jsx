import React, { useState } from "react";
import styles from "./Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    pw: "",
    pwConfirm: "",
  });
  const [showPW, setShowPW] = useState(false);
  const [showPWConfirm, setShowPWConfirm] = useState(false);
  const [isFireBaseLoading, setIsFireBaseLoading] = useState(false);

  const isFormFilled = Object.values(form).every((v) => v !== "");
  const isPWValid = form.pw === form.pwConfirm;
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFireBaseLoading) return;

    if (!isFormFilled) return alert("항목들을 모두 채워주세요.");
    if (!isPWValid) return alert("비밀번호가 다릅니다.");
    if (form.pw.length < 6)
      return alert("비밀번호는 6자 이상으로 만들어주세요.");
    try {
      setIsFireBaseLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.pw,
      );

      await updateProfile(result.user, {
        displayName: form.nickname,
      });

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        nickname: form.nickname,
        email: form.email,
        role: "user",
        createdAt: serverTimestamp(),
        wishGames: [],
        records: {
          stadium: [],
          home: [],
        },
      });

      alert("회원가입이 완료됐어요! 로그인 해주세요 😊");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일이에요!");
      } else if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 올바르지 않아요.");
      } else {
        alert("회원가입 중 오류가 발생했어요.");
      }
    } finally {
      setIsFireBaseLoading(false);
    }
  };

  const handlePWShow = (type) => {
    if (type === "pw") setShowPW((prev) => !prev);
    else setShowPWConfirm((prev) => !prev);
  };

  return (
    <div className={styles.join}>
      <div className={styles.contents}>
        <p className={styles.title}>회원가입</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className={styles.input}
            onChange={handleChange}
          />

          <label htmlFor="id">E-MAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            onChange={handleChange}
          />

          <label htmlFor="pw">비밀번호</label>
          <div className={styles.inputWrap}>
            <input
              type={`${showPW ? "text" : "password"}`}
              id="pw"
              name="pw"
              className={`${styles.input} ${styles.pw}`}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPW ? faEyeSlash : faEye}
              className={styles.eyeIcon}
              onClick={() => handlePWShow("pw")}
            />
          </div>

          <label htmlFor="pwConfirm">비밀번호 확인</label>
          <div className={styles.inputWrap}>
            <input
              type={`${showPWConfirm ? "text" : "password"}`}
              id="pwConfirm"
              name="pwConfirm"
              className={`${styles.input} ${!isPWValid && styles.inputError}`}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPWConfirm ? faEyeSlash : faEye}
              className={styles.eyeIcon}
              onClick={() => handlePWShow("pwConfirm")}
            />
          </div>

          <button
            disabled={isFireBaseLoading}
            className={`${styles.joinBtn} ${isFormFilled && isPWValid && styles.actionBtn}`}
          >
            {isFireBaseLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
}
