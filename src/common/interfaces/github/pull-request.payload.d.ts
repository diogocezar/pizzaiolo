import { PullRequest } from 'src/common/interfaces/github/base/pull-request'
import { Repository } from 'src/common/interfaces/github/base/repository'
import { User } from 'src/common/interfaces/github/base/user'

export interface PullRequestPayload {
  action: string
  pull_request: PullRequest
  sender: User
  repository: Repository
}
