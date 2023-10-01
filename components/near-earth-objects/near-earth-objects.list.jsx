import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import React from 'react'
import { toIsoDate } from '../data-format/date-formats'
import { toDiameter, toDistance, toVelocity } from '../data-format/number-formats'
import parseNeoData from './near-earth-objects'

export default function NearEarthObjectsList({ neodata }) {
  const parsedData = parseNeoData(neodata)

  return (
    <Box sx={{ m: 2 }}>
      {parsedData.map((neo) => (
        <Accordion key={neo.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Link href={neo.jplUrl} target="_blank" rel="noopener">
              <Typography>{neo.name}</Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Hazardous?:</strong> {neo.isHazardous ? 'Yes' : 'No'}
              <br />
              <strong>Approach Date:</strong> {toIsoDate(neo.approachDate)}
              <br />
              <strong>Miss Distance (km):</strong> {toDistance(neo.missDistance)}
              <br />
              <strong>Relative Velocity (km/h):</strong> {toVelocity(neo.relativeVelocity)}
              <br />
              <strong>Min. Diameter (km):</strong> {toDiameter(neo.diameterMin)}
              <br />
              <strong>Max. Diameter (km):</strong> {toDiameter(neo.diameterMax)}
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
