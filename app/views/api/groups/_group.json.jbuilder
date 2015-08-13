json.extract!(
  group,
  :id,
  :name,
  :body,
  :author_id
)

json.set! :author_name, group.author.username.capitalize

if display_users
  json.users do
    json.array! group.users do |user|
      json.partial! 'api/users/user', user: user, display_groups: false,
      display_events: false,
      display_comments: false
    end
  end
end

if display_events
  json.events do
    json.array! group.events do |event|
      json.partial! 'api/events/event', event: event, display_users: false,
      display_comments: false,
      display_groups: false
    end
  end
end

if display_comments
  json.comments do
    json.array! group.comments do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
