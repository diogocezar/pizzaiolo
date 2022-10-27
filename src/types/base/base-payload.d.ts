export interface BasePayload {
  action: string
  pull_request: PullRequest
  repository: Repository
  sender: Sender
}
