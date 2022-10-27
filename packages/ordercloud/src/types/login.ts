import * as Core from '@vercel/commerce/types/login'

export * from '@vercel/commerce/types/login'

export type LoginMutationVariables = {
  email: string
  password: string
}

export type LoginOperation = Core.LoginOperation & {
  variables: LoginMutationVariables
  res: Response
}
