const secretKey = "bhimdk@123";

export const encodeData = (data) => {
  try {
    const json = JSON.stringify(data);
    let encoded = "";
    for (let i = 0; i < json.length; i++) {
      encoded += String.fromCharCode(
        json.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
      );
    }
    return btoa(encodeURIComponent(encoded));
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

export const decodeData = (encodedData) => {
  try {
    const decoded = decodeURIComponent(atob(encodedData));
    let json = "";
    for (let i = 0; i < decoded.length; i++) {
      json += String.fromCharCode(
        decoded.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
      );
    }
    return JSON.parse(json);
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
