import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, ILogin } from "../common/validation/auth";

import { Button } from "@/components/button/button";
import styles from "@/styles/CardPage.module.css"

const LogIn: NextPage = () => {
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await signIn("credentials", { ...data, callbackUrl: "/roadmap" });
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <div>
      <main>
        <div className={styles.loginscreen}>
          <div className={styles.loginmain}>
            <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
              <h2 className={styles.cardTitle}>Welcome back!</h2>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.inputBordered}
                    {...field}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.inputBordered}
                    {...field}
                  />
                )}
              />
              <Button>
                Login
              </Button>
              <Link href="/signup" className={styles.link}>
                  Go to sign up
                </Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogIn;