import { FetcherError } from '@vercel/commerce/utils/errors'
import getUserNameFromEmail from '../../utils/get-username-from-email'
import type { SignupEndpoint } from '.'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
  commerce,
}) => {

  // TODO: Add proper validations with something like Ajv
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    await config.restMiddlewareFetch(
      'POST',
      `/buyers/${process.env.ORDERCLOUD_BUYER_ID}/users`,
      {
        ID: getUserNameFromEmail(email),
        FirstName: firstName,
        LastName: lastName,
        Active: true,
        Email: email,
        Password: password,
        Username: getUserNameFromEmail(email),
      }
    )
  } catch (error) {
    if (error instanceof FetcherError && error.status === 409) {
      const hasEmailError = error.errors?.some((e) =>
        e.message.includes('User.UsernameMustBeUnique')
      )
      // If there's an error with the email, it most likely means it's duplicated
      if (hasEmailError) {
        return res.status(400).json({
          data: null,
          errors: [
            {
              message: 'The email is already in use',
              code: 'duplicated_email',
            },
          ],
        })
      }
    }
    throw error
  }

  // Login the customer right after creating it
  await commerce.login({ variables: { email, password }, res, config })

  res.status(200).json({ data: null })
}

export default signup
