export interface PullRequestPayload {
  action: string
  pull_request: PullRequest
  repository: Repository
  sender: User
}
