import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import nasaLogo from '../public/nasa_logo.png'
import NearEarthObjectsTable from '../components/near-earth-objects/near-earth-objects.table'
import _ from 'lodash'
import { fetchFeedToday } from '../components/near-earth-objects/near-earth-objects'

export async function getServerSideProps(context) {
  const data = await fetchFeedToday()

  // Pass data to the page via props
  return { props: { data } }
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src={nasaLogo} alt="Picture of NASA logo" width={250} height={200}/>
        <p className={styles.description}>
          Near Earth Objects Today
        </p>
        <NearEarthObjectsTable neodata={data}></NearEarthObjectsTable>
      </main>
    </div>
  )
}
