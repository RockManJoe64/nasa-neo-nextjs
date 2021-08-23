import Image from 'next/image'
import styles from '../styles/Home.module.css'
import nasaLogo from '../public/nasa_logo.png'
import { DateTime } from 'luxon'
import _ from 'lodash'

export async function getServerSideProps(context) {
  const today = DateTime.now();
  const startDate = today.toFormat('yyyy-LL-dd');
  const endDate = today.plus({ days: 1 }).toFormat('yyyy-LL-dd');
  const apiKey = 'X'; // TODO fill in with the right api key
  
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  
  // Fetch data from external API
  const res = await fetch(url);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } }
}

export default function Home({ data }) {
  // Transform data
  const payload = data.near_earth_objects;
  const rows = [];
  _.values(payload).forEach(value => {
    value.forEach(neo => {
      const row = {
        name: _.get(neo, 'name', '-'),
        jplUrl: _.get(neo, 'nasa_jpl_url', '#'),
        isHazardous: _.get(neo, 'is_potentially_hazardous_asteroid', '-'),
        approachDate: _.get(neo, 'close_approach_data[0].close_approach_date_full', '-'),
        missDistance: _.get(neo, 'close_approach_data[0].miss_distance.kilometers', '-'),
        relativeVelocity: _.get(neo, 'close_approach_data[0].relative_velocity.kilometers_per_hour', '-'),
        diameterMin: _.get(neo, 'estimated_diameter.kilometers.estimated_diameter_min', '-'),
        diameterMax: _.get(neo, 'estimated_diameter.kilometers.estimated_diameter_max', '-')
      };
      rows.push(row);
    });
  });

  const sortedRows = _.sortBy(rows, ['approachDate']);

  // Create table rows
  const tableRows = [];
  sortedRows.forEach(row => {
    tableRows.push(
      <tr>
        <td className={styles.tableCell}><a href={row.jplUrl}>{row.name}</a></td>
        <td className={styles.tableCell}>{row.isHazardous ? 'Y' : 'N'}</td>
        <td className={styles.tableCell}>{row.approachDate}</td>
        <td className={styles.tableCell}>{row.missDistance}</td>
        <td className={styles.tableCell}>{row.relativeVelocity}</td>
        <td className={styles.tableCell}>{row.diameterMin}/{row.diameterMax}</td>
      </tr>
    );
  });
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src={nasaLogo} alt="Picture of NASA logo" width={250} height={200}/>
        <p className={styles.description}>
          Near Earth Objects Today
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableCell}>Name</th>
              <th className={styles.tableCell}>Hazardous?</th>
              <th className={styles.tableCell}>Approach Date</th>
              <th className={styles.tableCell}>Miss Distance (km)</th>
              <th className={styles.tableCell}>Rel. Velocity (km/h)</th>
              <th className={styles.tableCell}>Diameter Min/Max (km)</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </main>
    </div>
  )
}
