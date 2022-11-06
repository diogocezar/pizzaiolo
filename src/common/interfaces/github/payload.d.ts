import { BasePullRequest } from 'src/common/interfaces/github/base_pull_request'
import { CommentPayload } from 'src/common/interfaces/github/base/comment.payload'
import { ReviewPayload } from 'src/common/interfaces/github/review'

export type Payload = BasePullRequest | CommentPayload | ReviewPayload
