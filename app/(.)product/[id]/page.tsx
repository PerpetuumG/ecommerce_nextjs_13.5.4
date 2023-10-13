'use client';

import ProductImage from '@/components/productImage/ProductImage';
import { Dialog } from '@headlessui/react';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import React, { FC } from 'react';

const Modal: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();
      setProduct(product);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className='relative z-50'
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      {/* Full-screen scrollable container */}
      <div className='fixed inset-0 w-screen overflow-y-auto'>
        {/* Container to center the panel */}
        <div className='flex min-h-full items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto max-w-3xl rounded bg-white p-10'>
            {loading ? (
              <div
                className={
                  'h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin'
                }
              />
            ) : (
              <div className={'flex gap-x-8 h-96'}>
                {product?.image && (
                  <div className={'relative w-72 h-full hidden md:inline'}>
                    <ProductImage product={product} fill />
                  </div>
                )}

                <div className={'flex flex-1 flex-col'}>
                  <div className={'flex-1'}>
                    <h4 className={'font-semibold'}>{product?.title}</h4>
                    <p className={'font-medium text-sm'}>${product?.price}</p>

                    <div className={'flex items-center text-sm my-4'}>
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className={'flex items-center ml-2 mr-6'}>
                          {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
                            <StarIcon className={'h-4 w-4 text-yellow-500'} key={i} />
                          ))}

                          {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
                            <StarIconOutline className={'h-4 w-4 text-yellow-500'} key={i} />
                          ))}
                        </div>
                      )}

                      <p className={'text-blue-600 hover:underline cursor-pointer text-xs'}>
                        See all {product?.rating.count} reviews
                      </p>
                    </div>

                    <p className={'line-clamp-5 text-sm'}>{product?.description}</p>
                  </div>

                  <div className={'space-y-3 text-sm'}>
                    <button
                      className={
                        'button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'
                      }
                    >
                      Add to basket
                    </button>
                    <button
                      className={
                        'button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'
                      }
                      onClick={() => window.location.reload()}
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
