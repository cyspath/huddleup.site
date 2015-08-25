json.extract!(
  event,
  :id,
  :title,
  :location,
  :date,
  :body,
  :author_id,
  :group_id,
  :created_at
)

arr = event.group.name.split(" ").map { |word| word.capitalize }
str = arr.join(" ")
json.set! :group_name, str

if event.images.length > 0

  json.set! :event_url_cropped, event.images.last.thumb_url_cropped
  json.set! :event_url_cropped_id, event.images.last.id

end

arr = event.title.split(" ").map { |word| word.capitalize }
str = arr.join(" ")
json.set! :event_name, str


json.set! :author_name, event.author.username.capitalize

json.images do
  json.array! event.images do |image|
    json.partial! 'api/images/image', image: image
  end
end

json.group do
  json.partial! 'api/groups/group', group: event.group,
  display_events: false,
  display_comments: false,
  display_users: true

end


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
