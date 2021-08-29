import styles from '../../styles/Home.module.css'
import _ from 'lodash'
import React from 'react'
import { useTable } from 'react-table'

export default function NearEarthObjectsTable({ neodata }) {
  // Transform data
  const tableData = parseData(neodata)

  const columns = columnConfig()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    { column.render('Header') }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
        rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {
              row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    { cell.render('Cell') }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function parseData(data) {
  const payload = data.near_earth_objects
  const rows = []
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
      }
      rows.push(row)
    })
  })
  const sortedRows = _.sortBy(rows, ['approachDate'])
  console.log(`sortedRows.length=${sortedRows.length}`)
  const memoizedRows = React.useMemo(() => sortedRows)
  return memoizedRows
}

function nameColumnAccessor(row) {
  return (
    <a href={row.jplUrl} target="_blank">{row.name}</a>
  )
}

function columnConfig() {
  return React.useMemo(() => [
    {
      Header: 'Name',
      id: 'name',
      accessor: nameColumnAccessor
    },
    {
      Header: 'Hazardous?',
      accessor: 'isHazardous'
    },
    {
      Header: 'Approach Date',
      accessor: 'approachDate'
    },
    {
      Header: 'Miss Distance (km)',
      accessor: 'missDistance'
    },
    {
      Header: 'Rel. Velocity (km/h)',
      accessor: 'relativeVelocity'
    },
    {
      Header: 'Min Dia. (km)',
      accessor: 'diameterMin'
    },
    {
      Header: 'Max Dia. (km)',
      accessor: 'diameterMax'
    },
  ])
}
