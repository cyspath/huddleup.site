json.extract!(
  event,
  :id,
  :title,
  :location,
  :date,
  :body,
  :author_id,
  :group_id,
)

json.set! :group_name, event.group.name
json.set! :author_name, event.author.username.capitalize


if event.date && event.date >= Date.today
  json.set! :status, "Upcoming"
else
  json.set! :status, "Past"
end

if display_users
  json.users do
    json.array! event.users do |user|
      json.partial! 'api/users/user', user: user, display_groups: false,
      display_events: false,
      display_comments: false
    end
  end
end

if display_comments
  json.comments do
    json.array! event.comments do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
