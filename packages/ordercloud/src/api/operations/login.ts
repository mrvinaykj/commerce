import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { ServerResponse } from 'http'

import type { LoginOperation } from '../../types/login'
import type { OrdercloudConfig, Provider } from '../index'
import { serialize } from 'cookie'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<OrdercloudConfig>
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    variables,
    config,
    res: response,
  }: {
    variables?: T['variables']
    res: ServerResponse
    config?: Partial<OrdercloudConfig>
  }): Promise<T['data']> {
    // Get fetch from the config
    const { getUserToken } = commerce.getConfig(config)
    // Get all products
    const token = await getUserToken<LoginOperation>(
      variables?.email as string,
      variables?.password as string
    )
    response.setHeader(
      'Set-Cookie',
      serialize(config?.customerCookie as string, token, { path: '/' })
    )
    return {
      result: token,
    }
  }

  return login
}
