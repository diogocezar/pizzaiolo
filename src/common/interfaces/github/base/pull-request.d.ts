export interface PullRequest {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User
  body: string
  created_at: Date
  updated_at: Date
  closed_at?: any
  merged_at?: any
  merge_commit_sha: string
  assignee?: any
  assignees: any[]
  requested_reviewers: any[]
  requested_teams: any[]
  labels: any[]
  milestone?: any
  draft: boolean
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  head: Head
  base: Base
  _links: Links
  author_association: string
  auto_merge?: any
  active_lock_reason?: any
  merged: boolean
}
