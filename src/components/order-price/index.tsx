import React, { FC, ReactNode } from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
interface IOrderPrice {
  className?: string,
  children: ReactNode
}

const OrderPrice: FC<IOrderPrice> = ({ className, children }) => {
  const orderPriceStyles = cn('d-flex', className);

  return (
    <div className={orderPriceStyles}>
      <span className="text text_type_digits-default mr-2">{children}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default OrderPrice;
