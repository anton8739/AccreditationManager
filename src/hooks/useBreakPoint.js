const responsiveValues = {
  xs: 0,
  sm: 576,
  md: 769,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

// todo: for information. May be to delete later
const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

// todo: for information. May be to delete later
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

export const useBreakPoint = () => {
  const unit = 'px';
  const step = 5;

  function up(key) {
    const value = typeof responsiveValues[key] === 'number' ? responsiveValues[key] : key;
    return `(min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof responsiveValues[key] === 'number' ? responsiveValues[key] : key;
    return `(max-width:${value - step / 100}${unit})`;
  }

  // todo: implement only and between methods

  return {
    up,
    down,
  };
};
