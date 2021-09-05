import _ from 'lodash'

export default function parseNeoData(data) {
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
  
  return sortedRows
}
