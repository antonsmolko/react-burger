import React from 'react'
import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './item.module.scss'
import { constructorItemPropTypes } from "../../../prop-types";

const Item = ({ item, count = 0 }) => {
	return (
		<div className={itemStyles.item}>
			{count > 0 && <Counter count={count} size="default" />}
			<div className={`${itemStyles.image} pl-4 pr-4 mb-1`}>
				<img src={item.image} alt={item.name}/>
			</div>
			<div className={`${itemStyles.price} mb-1`}>
				<span className="text text_type_digits-default pr-2">{item.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${itemStyles.name} text text_type_main-default`}>{item.name}</p>
		</div>
	);
}

Item.propTypes = {
	item: constructorItemPropTypes,
	count: PropTypes.number
}

export default Item;
