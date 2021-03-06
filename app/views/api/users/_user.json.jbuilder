json.extract!(
  user,
  :id,
  :username,
  :bio,
  :sex,
  :residence,
  :occupation,
  :age_preference,
  :interest_fact,
  :created_at,
  )

json.set! :alias, user.username.capitalize
json.set! :join_date, user.created_at.strftime("%b %d, %Y")

if user.images.length > 0

  json.set! :user_url_cropped, user.images.first.thumb_url_cropped
  json.set! :user_url_cropped_id, user.images.first.id

end

json.images do
  json.array! user.images do |image|
    json.partial! 'api/images/image', image: image
  end
end


if display_groups
  json.groups do
    json.array! user.groups do |group|
      json.partial! 'api/groups/group', group: group, display_events: false,
      display_comments: false,
      display_users: false
    end
  end
end


if display_events
  json.upcoming_events do
    json.array! user.events do |event|
      if event.date && event.date >= Date.today
        json.partial! 'api/events/event', event: event, display_users: false,
        display_comments: false,
        display_groups: false
      end
    end
  end

  json.past_events do
    json.array! user.events do |event|
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
    json.array! user.comments do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
