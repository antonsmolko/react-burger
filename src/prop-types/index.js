import PropTypes from "prop-types";

export const constructorItemPropTypes = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
}).isRequired

export const constructorItemsPropTypes = PropTypes.arrayOf(constructorItemPropTypes)
