import React from 'react'
import { useTable } from 'react-table'

import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import _ from 'lodash'

const useStyles = makeStyles({
  container: {
    maxWidth: '80%'
  },
  table: {
    minWidth: '75%'
  },
});

export default function NearEarthObjectsTable({ neodata }) {
  // Transform data
  const tableData = parseData(neodata)

  // Config table
  const columns = columnConfig()

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData })

  const classes = useStyles();

  return (  
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
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
  const memoizedRows = React.useMemo(() => sortedRows)
  return memoizedRows
}

function nameColumnAccessor(row) {
  return (
    <Link href={row.jplUrl} target="_blank" rel="noopener">{row.name}</Link>
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
