import { Comment } from 'src/common/interfaces/github/base/coment'

export interface Thread {
  node_id: string
  comments: Comment[]
}
