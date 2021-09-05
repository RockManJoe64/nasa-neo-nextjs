import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTable } from 'react-table';
import parseNeoData from './near-earth-objects';
import { toIsoDate } from '../data-format/date-formats';
import { toDiameter, toDistance, toVelocity } from '../data-format/number-formats';

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
  const parsedData = parseNeoData(neodata)
  const tableData = React.useMemo(() => parsedData, [parsedData])

  // Config table
  const columns = React.useMemo(() => columnConfig(), [])

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

function nameColumnAccessor(row) {
  return (
    <Link href={row.jplUrl} target="_blank" rel="noopener">{row.name}</Link>
  )
}

function columnConfig() {
  return [
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
      accessor: 'approachDate',
      Cell: (props) => {
        const formatted = toIsoDate(props.value)
        return <span>{formatted}</span>
      }
    },
    {
      Header: 'Miss Distance (km)',
      accessor: 'missDistance',
      Cell: (props) => {
        const formatted = toDistance(props.value)
        return <span>{formatted}</span>
      }
    },
    {
      Header: 'Rel. Velocity (km/h)',
      accessor: 'relativeVelocity',
      Cell: (props) => {
        const formatted = toVelocity(props.value)
        return <span>{formatted}</span>
      }
    },
    {
      Header: 'Min Dia. (km)',
      accessor: 'diameterMin',
      Cell: (props) => {
        const formatted = toDiameter(props.value)
        return <span>{formatted}</span>
      }
    },
    {
      Header: 'Max Dia. (km)',
      accessor: 'diameterMax',
      Cell: (props) => {
        const formatted = toDiameter(props.value)
        return <span>{formatted}</span>
      }
    },
  ]
}
