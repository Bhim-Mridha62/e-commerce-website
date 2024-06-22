export const encodeData = (data) => {
  try {
    const json = JSON.stringify(data);
    const base64 = btoa(json);
    return `a${base64}a`;
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

// Function to decode data
export const decodeData = (encodedData) => {
  try {
    if (encodedData.startsWith("a") && encodedData.endsWith("a")) {
      const base64 = encodedData.slice(1, -1);
      const json = atob(base64);
      return JSON.parse(json);
    } else {
      throw new Error("Invalid encoded data format");
    }
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
