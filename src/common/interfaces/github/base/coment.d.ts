import { Links } from 'src/common/interfaces/github/base/links'
import { Reactions } from 'src/common/interfaces/github/base/reactions'
import { User } from 'src/common/interfaces/github/base/user'

export interface Comment {
  url: string
  pull_request_review_id: number
  id: number
  node_id: string
  diff_hunk: string
  path: string
  position: number
  original_position: number
  commit_id: string
  original_commit_id: string
  user: User
  body: string
  created_at: Date
  updated_at: Date
  html_url: string
  pull_request_url: string
  author_association: string
  _links: Links
  reactions: Reactions
  start_line?: any
  original_start_line?: any
  start_side?: any
  line: number
  original_line: number
  side: string
}
