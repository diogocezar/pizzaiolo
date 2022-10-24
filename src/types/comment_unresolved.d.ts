export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: Date
  updated_at: Date
  pushed_at: Date
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url?: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license?: any
  allow_forking: boolean
  is_template: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface Head {
  label: string
  ref: string
  sha: string
  user: User
  repo: Repo
}

export interface Base {
  label: string
  ref: string
  sha: string
  user: User
  repo: Repo
}

export interface Self {
  href: string
}

export interface Html {
  href: string
}

export interface Issue {
  href: string
}

export interface Comments {
  href: string
}

export interface ReviewComments {
  href: string
}

export interface ReviewComment {
  href: string
}

export interface Commits {
  href: string
}

export interface Statuses {
  href: string
}

export interface Links {
  self: Self
  html: Html
  issue: Issue
  comments: Comments
  review_comments: ReviewComments
  review_comment: ReviewComment
  commits: Commits
  statuses: Statuses
}

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
}

export interface Reactions {
  url: string
  total_count: number
  '+1': number
  '-1': number
  laugh: number
  hooray: number
  confused: number
  heart: number
  rocket: number
  eyes: number
}

export interface Comment {
  url: string
  pull_request_review_id: number
  id: number
  node_id: string
  diff_hunk: string
  path: string
  position: number
  original_position: number
  commit_id: string
  original_commit_id: string
  user: User
  body: string
  created_at: Date
  updated_at: Date
  html_url: string
  pull_request_url: string
  author_association: string
  _links: Links
  reactions: Reactions
  start_line?: any
  original_start_line?: any
  start_side?: any
  line: number
  original_line: number
  side: string
}

export interface Thread {
  node_id: string
  comments: Comment[]
}

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: Date
  updated_at: Date
  pushed_at: Date
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url?: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license?: any
  allow_forking: boolean
  is_template: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface Organization {
  login: string
  id: number
  node_id: string
  url: string
  repos_url: string
  events_url: string
  hooks_url: string
  issues_url: string
  members_url: string
  public_members_url: string
  avatar_url: string
  description: string
}

export interface Sender {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface CommentUnresolvedPayload {
  action: string
  pull_request: PullRequest
  thread: Thread
  repository: Repository
  organization: Organization
  sender: Sender
}