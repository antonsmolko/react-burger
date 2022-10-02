import React from "react";
import PropTypes from 'prop-types'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Item from './item'
import { useConstructorItems } from "../../hooks";
import burgerConstructorStyles from './burger-constructor.module.scss'
import { constructorItemsPropTypes } from "../../prop-types";

const BurgerConstructor = ({ items, price = 0 }) => {
	const { first, rest, last } = useConstructorItems(items)

	return (
		<section className="pt-25 pl-4">
			<Item item={first} isLocked={true} type="top" />
				<div className="overflow-y-hidden h-full mt-4 mb-4">
					<div className="custom-scroll">
						<div className={burgerConstructorStyles.items}>
							{rest.map((item) => <Item item={item} key={item._id} />)}
						</div>
					</div>
				</div>
			<Item item={last} isLocked={true} type="bottom" />
			<footer className={`${burgerConstructorStyles.footer} mt-10`}>
				<div className={burgerConstructorStyles.price}>
					<span className="text text_type_digits-medium">{price}</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</footer>
		</section>
	);
}

BurgerConstructor.propTypes = {
	items: constructorItemsPropTypes,
	price: PropTypes.number
}

export default BurgerConstructor;
