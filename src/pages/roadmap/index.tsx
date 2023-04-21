import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";

import { Navbar } from '@/components/NavBar/navbar';
import styles from '@/styles/Roadmap.module.css';

import { Button } from "@/components/button/button";
import Link from "next/link";
import { useCallback } from "react";

import { prisma } from "../../common/prisma";

import moment from "moment";
import { useRouter } from "next/router";

type IFeature = {
  featureName: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session) {
    const features = await prisma.feature.findMany({
      take: 100,
      select: {
        id: true,
        name: true,
        createdAt: true,
        _count: {
          select: { votesInfo: true },
        },
        votesInfo: {
          select: { userId: true },
          where: { userId: parseInt(session.user.userId!) }
        },
      },
    });

    const featuresWithUserVote = features.map((feature) => ({
      ...feature,
      userVoted: feature.votesInfo.length > 0,
    }));

    return {
      props: { features: JSON.stringify(featuresWithUserVote) }
    };
  }

  const features = await prisma.feature.findMany({
    take: 100,
    select: {
      id: true,
      name: true,
      createdAt: true,
      _count: {
        select: { votesInfo: true },
      },
      votesInfo: {
        select: { userId: true }
      },
    },
  });

  return {
    props: { features: JSON.stringify(features) },
  };
};

type Props = {
  features: string;
}

type Feature = {
  id: number;
  name: string;
  createdAt: Date;
  _count: {
    votesInfo: number;
  };
  userVoted: boolean;
}

const Roadmap = ({ features }: Props) => {
  const router = useRouter();
  const session = useSession();
  const parsedFeatures = JSON.parse(features ? features : "[]");
  parsedFeatures.sort((a: Feature, b: Feature) => {
    return b._count.votesInfo - a._count.votesInfo;
  });

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
        let res = await fetch("/api/feature", {
          method: "POST",
          body: JSON.stringify(body),
        });
        console.log(res)
        reset();
        router.replace(router.asPath);
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
  );

  async function submitVote(featureId: number, userVoted: boolean) {
    if (userVoted) {
      try {
        const body = { featureId };
        const response = await fetch('/api/vote/' + featureId, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log('Vote submitted successfully');
        router.replace(router.asPath);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    } else {
      try {
        const body = { featureId };
        const response = await fetch('/api/vote', {
          method: 'POST',
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log('Vote submitted successfully');
        router.replace(router.asPath);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  }

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
          {parsedFeatures.map((feature: Feature) => (
            <article className={styles.roadmapItem} key={feature.id}>
              <button className={`${styles.voteButton} ${feature.userVoted ? styles.voteButtonVoted : null}`} onClick={() => { submitVote(feature.id, feature.userVoted) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                <span className={styles.voteButtonCount}>{feature._count.votesInfo}</span>
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