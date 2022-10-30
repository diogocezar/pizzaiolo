import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as rawBody from 'raw-body'

@Injectable()
export class GithubWebHookGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (req.readable) {
      const X_HUB_SIGNATURE = 'x-hub-signature'
      const bodyFormatted = await rawBody(req)
      const chunk = bodyFormatted.toString().trim()
      const headerSignature = req.headers[X_HUB_SIGNATURE]
      // TODO: Temporary to validate!
      console.log(headerSignature)
      const signature = `sha1=${crypto
        .createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET)
        .update(chunk)
        .digest('hex')}
      `
      console.log(signature)
      return headerSignature === signature
    }
    return false
  }
}
