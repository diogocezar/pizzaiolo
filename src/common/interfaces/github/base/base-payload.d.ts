import { PullRequest } from 'src/common/interfaces/github/base/pull-request'
import { Repository } from 'src/common/interfaces/github/base/repository'
import { User } from 'src/common/interfaces/github/base/user'

export interface BasePayload {
  action: string
  pull_request: PullRequest
  repository: Repository
  sender: User
}
