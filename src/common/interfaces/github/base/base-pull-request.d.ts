export interface BasePullRequest {
  action: string
  pull_request: PullRequest
  sender: User
  repository: Repository
}
