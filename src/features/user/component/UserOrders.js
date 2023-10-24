import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchLoggedInUserOrderAsync,
  selectUserOrders,
  selectedUserInfo
} from '../userSlice'

function UserOrders () {
  const dispatch = useDispatch()
  const user = useSelector(selectedUserInfo)
  const orders = useSelector(selectUserOrders)

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id))
  }, [dispatch])

  return (
    <>
      {orders &&
        orders.map((order, index) => (
          <div key={index}>
            <div className='mx-auto bg-white mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <h1 className='text-5xl my-5 font-bold tracking-tight'>
                  Order # {order.id}
                </h1>
                <h3 className='text-xl my-5 font-bold tracking-tight text-red-500'>
                  Order Status : {order.status}
                </h3>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {order.items.map(order => (
                      <li key={order.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={order.thumbnail}
                            alt={order.title}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>
                                <a href={order.href}>{order.title}</a>
                              </h3>
                              <p className='ml-4'>${order.price}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {order.brand}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm'>
                            <div className='text-gray-500'>
                              <label
                                htmlFor='quantity'
                                className='inline mr-2 text-sm font-medium leading-6 text-gray-900'
                              >
                                Qty: {order.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                  <p>Total Products</p>
                  <p>{order.totalItemsCount} Items</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Shipping Address:
                </p>
                <div className='flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-black'>
                  <div className='flex min-w-0 gap-x-4'>
                    <div className='min-w-0 flex-auto'>
                      <p className='text-sm font-semibold leading-6 text-gray-900'>
                        {order.selectedAddresses
                          ? order.selectedAddresses.name
                          : 'N/A'}
                      </p>
                      <p className='mt-1 truncate text-xs leading-5 text-gray-900'>
                        {order.selectedAddresses
                          ? order.selectedAddresses.street
                          : 'N/A'}
                      </p>
                      <p className='mt-1 truncate text-xs leading-5 text-gray-900'>
                        {order.selectedAddresses
                          ? order.selectedAddresses.pinCode
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                    <p className='text-sm leading-6  text-gray-900'>
                      Phone:{' '}
                      {order.selectedAddresses
                        ? order.selectedAddresses.phone
                        : 'N/A'}
                    </p>
                    <p className='text-sm leading-6 text-gray-500'>
                      {order.selectedAddresses
                        ? order.selectedAddresses.city
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default UserOrders
