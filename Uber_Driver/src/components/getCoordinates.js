import axios from "axios";
import API_KEY from "../../config";
const getCoordinates = async (location, callback) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${API_KEY}`
    );

    const features = response.data.features;
    if (features.length > 0) {
      const { center } = features[0];
      const latitude = center[1];
      const longitude = center[0];
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