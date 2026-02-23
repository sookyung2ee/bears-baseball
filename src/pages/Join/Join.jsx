import React, { useState } from "react";
import styles from "./Join.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Join() {
  const [form, setForm] = useState({ name: "", id: "", pw: "", pwConfirm: "" });
  const [isPWValid, setIsPWValid] = useState(false);
  const [showPW, setShowPW] = useState(false);
  const [showPWConfirm, setShowPWConfirm] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    console.log("handleChange");
    const { name, value } = e.target;
    setForm((prev) => {
      const newForm = { ...prev, [name]: value.trim() };
      if (name === "pw" || name === "pwConfirm") {
        setIsPWValid(newForm.pw === newForm.pwConfirm);
      }
      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormFilled = Object.values(form).every((v) => v !== "");
    if (!isFormFilled) return alert("항목들을 모두 채워주세요.");
    if (!isPWValid) return alert("비밀번호가 다릅니다.");
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
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            onChange={handleChange}
          />

          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
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

          <button className={styles.joinBtn}>회원가입</button>
        </form>
      </div>
    </div>
  );
}
