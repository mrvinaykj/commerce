import type { CustomerEndpoint } from '.'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, res, config }) => {
    const token = req.cookies[config.customerCookie]
    const customer = await config.restUserFetch('GET', `/me`, undefined, {
      token: token,
    })
    if (!customer) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Customer not found', code: 'not_found' }],
      })
    }
    return res.status(200).json({ data: { customer } })
  }

export default getLoggedInCustomer
