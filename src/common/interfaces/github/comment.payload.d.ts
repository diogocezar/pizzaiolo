import { Organization } from 'src/common/interfaces/github/base/oganization'
import { Thread } from 'src/common/interfaces/github/base/thread'
import { BasePullRequest } from 'src/common/interfaces/github/base_pull_request'

export interface CommentPayload extends BasePullRequest {
  thread: Thread
  organization: Organization
}
