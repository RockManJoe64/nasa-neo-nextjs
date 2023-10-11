import _ from 'lodash'

export async function getSentrySummary(days = 30) {
  const url = `https://ssd-api.jpl.nasa.gov/sentry.api?days=${days}`
  const res = await fetch(url)
  const data = res.json()

  return data
}

export function parseSummary(sentryData) {
  const payload = sentryData.data
  const rows = []
  sentryData.data.forEach((value) => {
    const des = _.get(value, 'des')
    const row = {
      des,
      name: _.get(value, 'fullname'),
      lastObservedDate: _.get(value, 'last_obs'),
      absoluteMagnitude: _.get(value, 'h'),
      diameter: _.get(value, 'diameter'),
      relativeVelocityOnEntry: _.get(value, 'v_inf'),
      palermoHazardScaleCumulative: _.get(value, 'ps_cum'),
      palermoHazardScaleMax: _.get(value, 'ps_max'),
      torinoHazardScale: _.get(value, 'ts_max'),
      range: _.get(value, 'range'),
      potentialImpactCount: _.get(value, 'n_imp'),
      sbdbUrl: `http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=${encodeURIComponent(des)}`,
    }
    rows.push(row)
  })
  const sortedRows = _.sortBy(rows, ['lastObservedDate'])

  return sortedRows
}
