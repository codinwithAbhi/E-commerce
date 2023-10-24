import React, { useState, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice'
import { selectedUserInfo } from '../features/user/userSlice'
import {
  createOrderAsync,
  selectCurrentOrder
} from '../features/order/orderSlice'

import {
  selectedItems,
  updateCartItemsAsync,
  deleteCartItemsAsync
} from '../features/cart/cartSlice.js'

function Checkout () {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const items = useSelector(selectedItems)
  const user = useSelector(selectedUserInfo)
  const currentOrder = useSelector(selectCurrentOrder)
  const [selectedAddresses, setSelectedAddresses] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  console.log(paymentMethod)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  )
  const totalItemsCount = items.reduce(
    (total, item) => item.quantity + total,
    0
  )

  const handleQuantity = (e, product) => {
    dispatch(updateCartItemsAsync({ ...product, quantity: +e.target.value }))
    reset()
  }

  const handelDelete = (e, id) => {
    dispatch(deleteCartItemsAsync(id))
  }
  const handleAddress = e => {
    setSelectedAddresses(user.addresses[e.target.value])
  }
  const handlePayment = e => {
    setPaymentMethod(e.target.value)
  }
  const handleOrder = e => {
    if ((selectedAddresses, paymentMethod)) {
      const order = {
        items,
        totalAmount,
        totalItemsCount,
        user,
        paymentMethod,
        selectedAddresses,
        status: 'pending'
      }
      dispatch(createOrderAsync(order))
    } else {
      alert('Enter Adress and Payment Method')
    }
  }
  return (
    <>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className='mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
          <div className='lg:col-span-3'>
            <form
              className=' bg-white px-5 py-12 mt-10'
              noValidate
              onSubmit={handleSubmit(data => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data]
                  })
                )
                reset()
              })}
            >
              <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
                    Personal Information
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Full name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('name', {
                            required: 'Full name is required'
                          })}
                          id='name'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Email address
                      </label>
                      <div className='mt-2'>
                        <input
                          id='email'
                          {...register('email', {
                            required: 'Email is required'
                          })}
                          type='email'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Phone Number
                      </label>
                      <div className='mt-2'>
                        <input
                          id='phone'
                          {...register('phone', {
                            required: 'Phone-Number is required'
                          })}
                          type='tel'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Street address
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('street', {
                            required: 'street-address is required'
                          })}
                          id='street'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2 sm:col-start-1'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        City
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('city', {
                            required: 'City is required'
                          })}
                          id='city'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='state'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        State / Province
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('state', {
                            required: 'State is required'
                          })}
                          id='state'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='pinCode'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        ZIP / Postal code
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('pinCode', {
                            required: 'pinCode is required'
                          })}
                          id='pinCode'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                  <button
                    type='button'
                    className='text-sm font-semibold leading-6 text-gray-900'
                  >
                    Reset
                  </button>
                  <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Add Address
                  </button>
                </div>
                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Addresses
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Choose from Existing address
                  </p>
                  <ul role='list'>
                    {user.addresses.map((address, index) => (
                      <li
                        key={index}
                        className='flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-black'
                      >
                        <div className='flex min-w-0 gap-x-4'>
                          <input
                            onChange={handleAddress}
                            name='address'
                            type='radio'
                            value={index}
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {address.name}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-900'>
                              {address.street}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-900'>
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                          <p className='text-sm leading-6  text-gray-900'>
                            Phone: {address.phone}
                          </p>
                          <p className='text-sm leading-6 text-gray-500'>
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='mt-10 space-y-10'>
                    <fieldset>
                      <legend className='text-sm font-semibold leading-6 text-gray-900'>
                        Payment Methods
                      </legend>
                      <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Choose One
                      </p>
                      <div className='mt-6 space-y-6'>
                        <div className='flex items-center gap-x-3'>
                          <input
                            onChange={handlePayment}
                            id='cash'
                            name='payments'
                            value='cash'
                            type='radio'
                            checked={paymentMethod === 'cash'}
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <label
                            htmlFor='cash'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Cash On Delivery
                          </label>
                        </div>
                        <div className='flex items-center gap-x-3'>
                          <input
                            onChange={handlePayment}
                            id='card'
                            name='payments'
                            value='card'
                            type='radio'
                            checked={paymentMethod === 'card'}
                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                          <label
                            htmlFor='card'
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='lg:col-span-2 '>
            <div className='mx-auto bg-white mt-10 max-w-7xl px-0 sm:px-0 lg:px-0'>
              <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                <h1 className='text-5xl my-5 font-bold tracking-tight'>Cart</h1>
                <div className='flow-root'>
                  <ul role='list' className='-my-6 divide-y divide-gray-200'>
                    {items.map(product => (
                      <li key={product.id} className='flex py-6'>
                        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>

                        <div className='ml-4 flex flex-1 flex-col'>
                          <div>
                            <div className='flex justify-between text-base font-medium text-gray-900'>
                              <h3>{product.title}</h3>
                              <p className='ml-4'>{product.price}</p>
                            </div>
                            <p className='mt-1 text-sm text-gray-500'>
                              {product.brand}
                            </p>
                          </div>
                          <div className='flex flex-1 items-end justify-between text-sm'>
                            <div className='text-gray-500'>
                              <label
                                htmlFor='quantity'
                                className='inline mr-2 text-sm font-medium leading-6 text-gray-900'
                              >
                                Qty
                              </label>
                              <select
                                onChange={e => handleQuantity(e, product)}
                                value={product.quantity}
                              >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                              </select>
                            </div>

                            <div className='flex'>
                              <button
                                onClick={e => handelDelete(e, product.id)}
                                type='button'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                              >
                                Remove
                              </button>
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
                  <p>${totalAmount}</p>
                </div>
                <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                  <p>Total Products</p>
                  <p>{totalItemsCount} Items</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Shipping and taxes calculated at checkout.
                </p>
                <div className='mt-6'>
                  <div
                    onClick={handleOrder}
                    className='flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                  >
                    Order Now
                  </div>
                </div>
                <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                  <p>
                    or
                    {'\n'}
                    <Link to='/'>
                      <button
                        type='button'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
