json.extract!(
  group,
  :id,
  :name,
  :body,
  :author_id,
  :created_at
)

json.set! :num_events, group.events.count


json.set! :author_name, group.author.username.capitalize

arr = group.name.split(" ").map { |word| word.capitalize }
str = arr.join(" ")
json.set! :group_name, str

if group.images.length > 0

  json.set! :group_url_cropped, group.images.last.thumb_url_cropped
  json.set! :group_url_cropped_id, group.images.last.id

end

json.images do
  json.array! group.images do |image|
    json.partial! 'api/images/image', image: image
  end
end

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

  json.upcoming_events do
    json.array! group.events do |event|
      if event.date && event.date >= Date.today
        json.partial! 'api/events/event', event: event, display_users: false,
        display_comments: false,
        display_groups: false
      end
    end
  end

  json.past_events do
    json.array! group.events do |event|
      if event.date && event.date < Date.today
        json.partial! 'api/events/event', event: event, display_users: false,
        display_comments: false,
        display_groups: false
      end
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
