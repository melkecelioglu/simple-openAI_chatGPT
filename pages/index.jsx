import Head from 'next/head';
import {useState} from 'react';
import styles from "./index.module.css";

export default function Home() {

  const [count, setCounter] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

async function onSubmit(e) {

      e.preventDefault()

      try {
      if(count == 10) {
        return console.log('you have reached your limit')
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({animal: animalInput})
      });

      const data = await response.json();
      if(response.status !== 200) {
        throw data.error || new Error(`Requst failed with status ${response.status}`);
      }

      setResult(data.result);
      setCounter(count + 1)
      setAnimalInput("");

    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.body}>      
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       <img src='/favicon.ico' className={styles.icon} />
       <h3>Name My Pet</h3>
       <form onSubmit={onSubmit}>
          <input
          type='text'
          name='animal'
          value={animalInput}
          onChange={(e) =>{
            setAnimalInput(e.target.value)
            console.log(animalInput)
          }
        } 
          placeholder='Enter an animal'
          />
          <input
            type="submit" 
            value="Generate names"/>
       </form>
       <div className={styles.result}>{result}</div>
      </main>
      </div>
  )
}
