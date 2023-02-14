"use client";

import LiffMockPlugin from "@line/liff-mock";
import liff from "@line/liff";
import { useEffect, useState } from "react";

const liffId = "dummy";
liff.use(new LiffMockPlugin());

type LineUserProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export default function Home() {
  const [profile, setProfile] = useState<LineUserProfile>();
  const [idToken, setIdToken] = useState<string | null>("");

  useEffect(() => {
    try {
      liff
        //mock사용시 @ts-ignore를 지우면 타입에러가 발생함
        //@ts-ignore
        .init({ liffId, mock: true, withLoginOnExternalBrowser: true })
        .then(async () => {
          if (!liff.isLoggedIn()) await liff.login();
          const getProfile = await liff.getProfile();
          setProfile(getProfile);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <main>
      <div>displayName: {profile?.displayName}</div>
      <div>userId: {profile?.userId}</div>
      <div>pictureUrl: {profile?.pictureUrl ?? "noImg"}</div>
      <div>statusMessage: {profile?.statusMessage}</div>
      <button
        onClick={() => setIdToken((prev) => (prev ? "" : liff.getIDToken()))}
      >
        {idToken ? "clear" : "click here and get your id token!"}
      </button>

      <div>your id token is: {idToken}</div>
    </main>
  );
}
