import axios from "axios";
import { API_MAP } from "../../config";
const getCoordinates = async (location, callback) => {
  console.log(API_MAP)
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${API_MAP}`
    );

    const features = response.data.features;
    if (features.length > 0) {
      const { center } = features[0];
      const latitude = center[1];
      const longitude = center[0];
      console.log(location)
      callback({ latitude, longitude });
    } else {
      // Không tìm thấy địa điểm
      callback(null);
    }
  } catch (error) {
    console.error(error);
    callback(null);
  }
};

export default getCoordinates;