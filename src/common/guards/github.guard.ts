import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class GithubWebHookGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const algo = crypto
      .createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
      .update(req.rawBody)
      .digest('hex')

    const signature = `sha1=${algo}`

    return signature === req.headers['x-hub-signature']
  }
}
