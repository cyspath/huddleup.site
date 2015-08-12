json.array! @users do |user|
  json.partial! 'user', user: user,
  display_groups: false,
  display_events: false,
  display_comments: false
end
