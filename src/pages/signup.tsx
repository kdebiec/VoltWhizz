import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, ISignUp } from "../common/validation/auth";
import { trpc } from "../common/trpc";

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
      <Head>
        <title>Next App - Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Create an account!</h2>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Type your username..."
                    className="input input-bordered w-full max-w-xs my-2"
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
                    placeholder="Type your email..."
                    className="input input-bordered w-full max-w-xs"
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
                    placeholder="Type your password..."
                    className="input input-bordered w-full max-w-xs my-2"
                    {...field}
                  />
                )}
              />

              <div className="card-actions items-center justify-between">
                <Link href="/" className="link">
                  Go to login
                </Link>

                <button className="btn btn-secondary" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;