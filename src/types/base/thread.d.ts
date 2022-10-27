import { Comment } from '@/types/comment'

export interface Thread {
  node_id: string
  comments: Comment[]
}
