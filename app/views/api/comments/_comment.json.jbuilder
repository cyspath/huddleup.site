json.extract!(
  comment,
  :id,
  :body,
  :commentable_id,
  :commentable_type,
  :author_id,

)

if comment.author

  json.set! :author_name, comment.author.username.capitalize

  json.set! :author_thumb_url, comment.author.images.first.thumb_url
end




json.set! :created_at, comment.created_at
