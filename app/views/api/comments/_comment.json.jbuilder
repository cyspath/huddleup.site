json.extract!(
  comment,
  :id,
  :body,
  :commentable_id,
  :commentable_type,
  :author_id,

)


json.set! :author_name, comment.author.username.capitalize
json.set! :created_at, comment.created_at
