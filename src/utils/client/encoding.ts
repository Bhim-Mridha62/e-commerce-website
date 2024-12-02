export const encodeData = (data: string) => {
  try {
    const json = JSON.stringify(data);
    const base64 = btoa(json);
    return base64;
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

// Function to decode data
export const decodeData = (encodedData: string) => {
  try {
    if (encodedData) {
      const json = atob(encodedData);
      return JSON.parse(json);
    } else {
      throw new Error("Invalid encoded data format");
    }
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
