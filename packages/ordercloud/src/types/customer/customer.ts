interface OcCustomerMeta {
  token: string
}

interface OcCustomerXp {
  token: string
}

export interface OcCustomer {
  Active: boolean
  Email: string
  FirstName: string
  LastName: string
  ID: string
  Phone: string
  Username: string
  meta: OcCustomerMeta
  xp: OcCustomerXp
}
