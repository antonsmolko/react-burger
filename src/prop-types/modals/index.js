import PropTypes from 'prop-types';

export const modalContentPropTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};

export const modalLayoutPropTypes = {
  ...modalContentPropTypes,
  isOpen: PropTypes.bool
};

export const modalPropTypes = {
  ...modalLayoutPropTypes,
  unMount: PropTypes.func.isRequired
};
