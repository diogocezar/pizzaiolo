import { Repo } from '@/types/base/repo'
import { User } from '@/types/base/user'

export interface Head {
  label: string
  ref: string
  sha: string
  user: User
  repo: Repo
}
