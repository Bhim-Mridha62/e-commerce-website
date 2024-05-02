const isMobile = () => {
    if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;
        return screenWidth < 768;
      }
      return false;
  };
  
  export default isMobile;