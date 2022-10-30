import { PullRequest } from 'src/common/interfaces/github/base/pull-request'
import { User } from 'src/common/interfaces/github/base/user'

export interface PizzaioloEvent {
  action: string
  pull_request: PullRequest
  user: User
}
