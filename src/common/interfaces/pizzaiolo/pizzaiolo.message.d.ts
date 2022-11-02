import { PullRequest } from 'src/common/interfaces/github/base/pull-request'

export interface PizzaioloMessage {
  timestamp: string
  pull_request: PullRequest | { id: number }
  url: string
}
