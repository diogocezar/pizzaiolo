import { BasePullRequest } from 'src/types/base/base_pull_request'

export interface PullRequestPayload extends BasePullRequest {
  number: number
}
