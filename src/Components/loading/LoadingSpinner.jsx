import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div>로딩중</div>
    // <div className={styles.spinnerWrapper}>
    //   <div className={styles.spinner}>
    //     <div>
    //       <div className={styles.spinnerBorder}></div>
    //       <div className={styles.spinnerInner}>
    //         <img
    //           src="/images/gom_home.png"
    //           alt="Loading Bear"
    //           className={styles.spinnerImage}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
