import { BasePullRequest } from 'src/types/base/base_pull_request'

export interface PullRequestPayload {
  action: string
  pull_request: PullRequest
  repository: Repository
  sender: User
}
