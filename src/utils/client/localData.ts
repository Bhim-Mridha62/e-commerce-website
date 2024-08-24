export const getRecentSearches = () => {
  if (typeof window !== "undefined") {
    const storedSearches = localStorage.getItem("recentSearches");
    const searches = storedSearches ? JSON.parse(storedSearches) : [];
    // Map to desired format with label and value
    return searches.map((search: string) => ({
      label: search,
      value: search,
    }));
  }

  return [];
};

export const setRecentSearches = (inputValue: string) => {
  if (typeof window !== "undefined") {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      const storedSearches = localStorage.getItem("recentSearches");
      const searches = storedSearches ? JSON.parse(storedSearches) : [];

      let recentSearches = getRecentSearches();
      // Remove duplicate if it exists
      recentSearches = searches.filter(
        (search: string) => search !== trimmedValue
      );
      // Add the new search to the top
      recentSearches.unshift(trimmedValue);
      // Keep only the latest 7 searches
      if (recentSearches.length > 7) {
        recentSearches.pop();
      }
      // Store in local storage

      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }
};
