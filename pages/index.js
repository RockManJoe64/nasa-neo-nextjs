import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import nasaLogo from '../public/nasa_logo.png'
import NearEarthObjectsTable from '../components/near-earth-objects/near-earth-objects.table'
import { DateTime } from 'luxon'
import _ from 'lodash'

export async function getServerSideProps(context) {
  const today = DateTime.now()
  const startDate = today.toFormat('yyyy-LL-dd')
  const endDate = today.plus({ days: 1 }).toFormat('yyyy-LL-dd')
  const apiKey = 'X' // TODO fill in with the right api key
  
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  
  // Fetch data from external API
  const res = await fetch(url)
  const data = await res.json()

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
