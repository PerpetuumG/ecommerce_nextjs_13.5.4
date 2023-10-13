import React, { FC } from 'react';
import Link from 'next/link';
import ProductImage from '@/components/productImage/ProductImage';

type Props = {
  product: Product;
};
const Product: FC = ({ product }: Props) => {
  return (
    <Link
      className={
        'h-96 flex flex-col border group-hover:scale-105 transition-transform ease-out duration-200'
      }
      prefetch={false}
      href={`/product/${product.id}`}
    >
      <div className={'relative max-h-72 flex-1'}>
        <ProductImage product={product} fill />
      </div>

      <div className={'font-semibold flex items-center justify-between mt-4 mb-1'}>
        <p>{product.title}</p>
        <p>${product.price}</p>
        <p className={'italic text-xs w-64 line-clamp-2 text-gray-600'}>{product.description}</p>
      </div>
    </Link>
  );
};

export default Product;
