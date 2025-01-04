export const getNavbarHeight = (): number => {
  const navbar = document?.querySelector("#navbar-header") as HTMLElement;

  // Return the height if navbar exists
  if (navbar) {
    return navbar.offsetHeight;
  }

  // Return a default value if the navbar isn't found
  return 112;
};
export const scrollToElement = (elementId: string): void => {
  const element = document?.getElementById(elementId);
  if (element) {
    // Get the navbar height
    const navbarHeight = getNavbarHeight();

    // Scroll to the element with an adjustment for the navbar height
    window.scrollTo({
      top: element.offsetTop - navbarHeight, // Adjust the scroll position
      behavior: "smooth", // Smooth scroll
    });
  }
};
