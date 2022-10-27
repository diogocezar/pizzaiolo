import { Organization } from '@/types/base/oganization'
import { Thread } from '@/types/base/thread'
import { BasePullRequest } from 'src/types/base/base_pull_request'

export interface CommentPayload extends BasePullRequest {
  thread: Thread
  organization: Organization
}
