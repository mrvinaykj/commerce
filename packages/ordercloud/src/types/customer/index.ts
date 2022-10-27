export * as Card from './card'
export * as Address from './address'

import * as Core from '@vercel/commerce/types/customer'
import { OcCustomer } from './customer'
export type Customer = Core.Customer

export type OrdercloudCustomer = OcCustomer

export type CustomerTypes = {
  customer: Core.Customer
}

export type CustomerHook<T extends CustomerTypes = CustomerTypes> = {
  data: T['customer'] | null
  fetchData: { customer: T['customer'] } | null
}

export type CustomerSchema<T extends CustomerTypes = CustomerTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: T['customer'] } | null
      }
    }
  }
}
