"use client";

import Image from "next/image";
import { Pacifico } from "next/font/google";
import { useState } from "react";

import Input from "@/components/Input";
import data from './data.json'
import styles from "./page.module.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const stories = data.filter((story) =>
    story.headlines.basic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(stories)

  return (
    <main>
      <header className={styles.header}>
        <h1 className={pacifico.className}>Semillero Digital</h1>
      </header>
      <div className={styles.hero} />
      <div className={styles.search}>
        <div className={styles.searchInputContainer}>
          <Input
            className={styles.input}
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
            placeholder="Buscar..."
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.grid}>
          {stories.map((story, index) => {
            return (
              <a
                key={story._id}
                className={styles.card}
                href={'https://elcomercio.pe' + story.canonical_url}
                target="_blank"  
              >
                <Image
                  src={`https://picsum.photos/id/${index}/280/220`}
                  alt={story.headlines.basic}
                  priority={true}
                  width={280}
                  height={220}
                />
                <h2>{story.headlines.basic} <span>-&gt;</span></h2>
                <p>{story.subheadlines.basic}</p>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  );
}
