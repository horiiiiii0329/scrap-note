import { Session } from "@supabase/gotrue-js";
import { useState, useEffect } from "react";
import { supabase } from "../../api";
import EditProfile from "./EditProfile";
import styles from "./ProfileCard.module.scss";

function ProfileCard({ session }: Session | any) {
  const [userName, setUserName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProfile();
    const mySubscription = supabase
      .from("profiles")
      .on("*", () => getProfile())
      .subscribe();
    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, []);

  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserName(data.username);
      }
    } catch (e) {
      alert((e as Error).message);
    } finally {
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h2>
          こんにちわ : {userName ? userName : "名無し"} <span>さん</span>
        </h2>

        <button onClick={() => setShowModal(!showModal)}>プロフィール</button>
      </div>
      <div className={styles.modal}>
        {showModal && <EditProfile session={session} />}
      </div>
    </>
  );
}

export default ProfileCard;
