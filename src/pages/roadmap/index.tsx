import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";
import { useForm, Controller } from "react-hook-form";

import { Navbar } from '@/components/NavBar/navbar'
import styles from '@/styles/Roadmap.module.css'

import Link from "next/link";
import { Button } from "@/components/button/button";
import { useCallback } from "react";

import { prisma } from "../../common/prisma";

import { GetStaticProps } from "next"
import { Feature } from "@prisma/client";

import moment from "moment";

type IFeature = {
  featureName: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.feature.findMany({
    take: 10,
  });
  return {
    props: { feed: JSON.stringify(feed) },
    revalidate: 10,
  };
};

type Props = {
  feed: string;
}

const Roadmap = ({feed} : Props) => {
  const session = useSession();
  const parsedFeed = JSON.parse(feed? feed : "[]")
  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'short' });

  const { handleSubmit, control, reset } = useForm<IFeature>({
    defaultValues: {
      featureName: "",
    },
  });

  const onSubmit = useCallback(
    async (data: IFeature) => {
      try {
        console.log(data.featureName)
        const name = data.featureName
        const body = { name };
        await fetch("/api/feature", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(body),
        });
        reset();
        // location.reload()
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  return (
    <>
      <Navbar />
      <div className={styles.narrowContainer}>
        {session.status == "unauthenticated" ? (
          <div className={styles.loginAlert}>
            <p>Please login to vote for a new feature</p>
            <div className={styles.buttonsContainer}>
              <Link href="/login" className={styles.buttonLink}>
                Login
              </Link>
              <Link href="/signup" className={styles.buttonLink}>
                Signup
              </Link>
            </div>
          </div>
        ) : null
        }
        {session.status == "authenticated" ? (
          <>
          <h1 className={styles.roadmapTitle}>Add feature proposition</h1>
          <form className={styles.addFeature} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="featureName"
              control={control}
              render={({ field }) => (
                <input
                  type="featureName"
                  placeholder="Feature Name"
                  className={styles.inputBordered}
                  {...field}
                />
              )}
            />
            <Button>
              Add Feature
            </Button>
          </form>
          </>
        ) : null
        }
        <div className={styles.roadmapContainer}>
          <h1 className={styles.roadmapTitle}>Feature propositions</h1>
          {parsedFeed.map((feature: Feature) => (
            <article className={styles.roadmapItem} key={feature.id}>
            <button className={styles.voteButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span className={styles.voteButtonCount}>400</span>
            </button>
            <div className={styles.roadmapItemContent}>
              <h3 className={styles.roadmapItemTitle}>{feature.name}</h3>
              <div className={styles.roadmapItemDesc}>
                <span>{moment(feature.createdAt).fromNow()}</span>
              </div>
            </div>
          </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Roadmap;