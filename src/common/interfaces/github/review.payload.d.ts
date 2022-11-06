import { Links } from 'src/common/interfaces/github/base/links'
import { User } from 'src/common/interfaces/github/base/user'
import { BasePullRequest } from 'src/common/interfaces/github/base_pull_request'

export interface Review {
  id: number
  node_id: string
  user: User
  body?: any
  commit_id: string
  submitted_at: Date
  state: string
  html_url: string
  pull_request_url: string
  author_association: string
  _links: Links
}

export interface ReviewPayload extends BasePullRequest {
  action: string
  review: Review
}
