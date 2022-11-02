import { Repository } from 'src/common/interfaces/github/base/repository'
import { User } from 'src/common/interfaces/github/base/user'

export interface Head {
  label: string
  ref: string
  sha: string
  user: User
  repo: Repository
}
