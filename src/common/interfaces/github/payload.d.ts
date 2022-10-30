import { BasePullRequest } from 'src/common/interfaces/github/base/base_pull_request'
import { CommentPayload } from 'src/common/interfaces/github/comment'
import { ReviewPayload } from 'src/common/interfaces/github/review'

export type Payload = BasePullRequest | CommentPayload | ReviewPayload
