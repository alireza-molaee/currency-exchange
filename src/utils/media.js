const sizes = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
};

const getSize = (size, isMin = false) => {
  const calculatedSize = isMin ? size + 1 : size;
  return calculatedSize + "px";
};

export const devices = {
  mobile: `(max-width: ${getSize(sizes.mobile)})`,
  tablet: `(min-width: ${getSize(sizes.mobile, true)}) and (max-with: ${getSize(
    sizes.tablet
  )})`,
  laptop: `(min-width: ${getSize(sizes.tablet, true)}) and (max-with: ${getSize(
    sizes.laptop
  )})`,
  desktop: `(min-width: ${getSize(sizes.laptop, true)})`,
  mobileOrTablet: `(max-width: ${getSize(sizes.tablet)})`,
  laptopOrDesktop: `(min-width: ${getSize(sizes.tablet, true)})`,
};
