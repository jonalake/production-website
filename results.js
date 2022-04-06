// const apiKey = 'NWM3ODI5NmMtZTFmZi00NmE3LTkwMDgtNGJkNjM3M2NiODgz'

const queryString = new URLSearchParams(window.location.search)
const searchParms = {
    days: +`${queryString.get('forcast_length')}`,
    location: `${queryString.get('location')}, ${queryString.get('state')}`,
}

console.log(searchParms)