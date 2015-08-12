json.array! @groups do |group|
  json.partial! 'group', group: group,
  display_events: false,
  display_comments: false,
  display_users: false
end
