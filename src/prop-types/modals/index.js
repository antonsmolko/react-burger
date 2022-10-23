import PropTypes from 'prop-types';
import { childrenPropTypes } from '../common';

export const modalContentPropTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: childrenPropTypes
};

export const modalLayoutPropTypes = {
  ...modalContentPropTypes,
  children: childrenPropTypes
};

export const modalPropTypes = {
  ...modalLayoutPropTypes,
  children: childrenPropTypes
};
