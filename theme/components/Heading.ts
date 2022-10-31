import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import type { SystemStyleInterpolation } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleInterpolation = (props) => {
  return {
    fontWeight: '500',
    color: mode('blackAlpha.800', 'whiteAlpha.800')(props),
  };
};

const sizes = {
  lg: defineStyle({
    fontSize: '32px',
    lineHeight: '40px',
    letterSpacing: '-0.5px',
  }),
  md: defineStyle({
    fontSize: '24px',
    lineHeight: '32px',
  }),
  sm: defineStyle({
    fontSize: '18px',
    lineHeight: '24px',
  }),
};

const Heading = defineStyleConfig({
  sizes,
  baseStyle,
});

export default Heading;