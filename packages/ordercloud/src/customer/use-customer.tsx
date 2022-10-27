import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import type {
  Customer,
  CustomerHook,
  OrdercloudCustomer,
} from '../types/customer'

export default useCustomer as UseCustomer<typeof handler>

function normalizeUser(customer: OrdercloudCustomer | any): Customer | null {
  if (customer) {
    return {
      firstName: customer.FirstName,
      lastName: customer.LastName,
      email: customer.Email,
      id: customer.ID,
    }
  } else return null
}

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: '/api/customer',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch(options)
    const ordercloudCustomer = normalizeUser(data?.customer)
    console.log(ordercloudCustomer)
    return ordercloudCustomer ?? null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
