import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import parseNeoData from './near-earth-objects'
import { toIsoDate } from '../data-format/date-formats'
import { toDiameter, toDistance, toVelocity } from '../data-format/number-formats'

export default function NearEarthObjectsList({ neodata }) {
  const parsedData = parseNeoData(neodata)

  return (
    <div>
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
    </div>
  )
}
