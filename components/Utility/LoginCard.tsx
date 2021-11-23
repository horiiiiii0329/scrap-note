import styles from "./LoginCard.module.scss";
import { useState } from "react";
import { supabase } from "../../api";
import LoadingThreeDots from "./LoadingThreeDots";
import { LightBulbIcon } from "@heroicons/react/outline";

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("メールボックスをチェックしてください！");
    } catch (error) {
      let errorMessage = "有効なメールアドレスを入力してください";
      if (error instanceof Error) {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.icon}>
        <LightBulbIcon style={{ width: "80px", cursor: "pointer" }} />
      </h1>
      <p>メールアドレスにログインリンクを送信する</p>
      <div>
        <input
          className={styles.input}
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        {!loading ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            disabled={loading}
          >
            <span>送信</span>
          </button>
        ) : (
          <span className={styles.loader}>
            <LoadingThreeDots />
          </span>
        )}
      </div>
    </div>
  );
}

export default LoginCard;
