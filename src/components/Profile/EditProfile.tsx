import { useState, useEffect } from "react";
import { supabase } from "../../../api";
import styles from "./EditProfile.module.scss";
import { useRouter } from "next/router";
import { Session } from "@supabase/gotrue-js";

export default function EditProfile({ session }: Session | any) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: any) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.email}>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className={styles.username}>
        <label htmlFor="username">名前</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.button}>
        <button
          onClick={() => {
            updateProfile({ username });
          }}
          disabled={loading}
        >
          {loading ? "ローディング中。。。" : "更新"}
        </button>

        <button
          onClick={() => {
            supabase.auth.signOut();
            router.reload();
          }}
        >
          サインアウト
        </button>
      </div>
    </div>
  );
}
