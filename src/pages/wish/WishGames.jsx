import React from "react";
import styles from "./WishGames.module.css";
import WishCard from "../../Components/wish/WishCard";
import useUser from "../../hooks/useUser";

export default function WishGames() {
  const { user } = useUser();
  const wishGames = user?.wishGames || [];

  return (
    <div className={styles.page}>
      <p className={styles.title}>위시 리스트</p>
      <div className={styles.cards}>
        {wishGames.map((game) => (
          <WishCard gameId={game} />
        ))}
      </div>
    </div>
  );
}
