import { Links } from '@/types/base/links'
import { PullRequest } from '@/types/base/pull-request'
import { Repository } from '@/types/base/repository'
import { User } from '@/types/base/user'

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

export interface ReviewPayload {
  action: string
  review: Review
  pull_request: PullRequest
  repository: Repository
  sender: User
}
