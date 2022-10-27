import { PullRequest } from '@/types/base/pull-request'
import { Repository } from '@/types/base/repository'
import { User } from '@/types/base/user'

export interface PullRequestPayload {
  action: string
  pull_request: PullRequest
  repository: Repository
  sender: User
}
