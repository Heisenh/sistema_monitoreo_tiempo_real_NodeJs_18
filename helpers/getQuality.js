
const getQuality = (noiseForQuality) => {
  const air_quality = noiseForQuality < 40 ? 'Buena' : 'Moderada';
  return air_quality;
}

export default getQuality;
