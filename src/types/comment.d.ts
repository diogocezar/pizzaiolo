import { Organization } from '@/types/base/oganization'
import { Thread } from '@/types/base/thread'
import { User } from '@/types/base/user'
import { PullRequest, Repository } from '@/types/comment'

export interface CommentPayload {
  action: string
  pull_request: PullRequest
  thread: Thread
  repository: Repository
  organization: Organization
  sender: User
}
