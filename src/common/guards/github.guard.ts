import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class GithubWebHookGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const encryptedBody = crypto
      .createHmac(
        'sha1',
        process.env.GITHUB_WEBHOOK_SECRET as crypto.BinaryLike
      )
      .update(req.rawBody)
      .digest('hex')

    const signature = `sha1=${encryptedBody}`

    return signature === req.headers['x-hub-signature']
  }
}
