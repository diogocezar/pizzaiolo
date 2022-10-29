import { User } from 'src/common/interfaces/github/base/user'
import { PullRequest } from 'src/common/interfaces/github/base/pull-request'
import { Comment } from 'src/common/interfaces/github/base/coment'
import { Thread } from 'src/common/interfaces/github/base/thread'
import { Review } from 'src/common/interfaces/github/review'

interface PayloadAction {
  title: string
  merged: boolean
  review?: Review
  comment?: Comment
  thread?: Thread
  draft: boolean
  user: User
  html_url: string
  pull_request: PullRequest
  created_at: Date
}
