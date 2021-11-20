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

  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email,
    });
    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  }
  if (submitted) {
    return (
      <div className={styles.container}>
        <h1>Please check your email to sign in</h1>
      </div>
    );
  }

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
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
          disabled={loading}
        >
          <span>{loading ? "送信中。。。" : "送信"}</span>
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
