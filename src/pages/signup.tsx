import type { NextPage } from "next";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, ISignUp } from "../common/validation/auth";
import { trpc } from "../common/trpc";

import { Button } from "@/components/button/button";
import styles from "@/styles/CardPage.module.css"

const SignUp: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          reset();
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [mutateAsync, router, reset]
  );

  return (
    <div>
      <main>
        <div className={styles.loginscreen}>
          <div className={styles.loginmain}>
            <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
              <h2 className={styles.cardTitle}>Create an account</h2>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Username"
                    className={styles.inputBordered}
                    {...field}
                  />
                )}
              />

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
                Create account
              </Button>
              <Link href="/login" className={styles.link}>
                Go to login
              </Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;