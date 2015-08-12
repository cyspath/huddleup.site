json.extract!(
  comment,
  :id,
  :body,
  :author_id,
  :user_id,
  :group_id,
  :event_id
)


json.set! :author_name, comment.author.username.capitalize
json.set! :created_at, comment.created_at
