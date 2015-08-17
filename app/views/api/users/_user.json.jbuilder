json.extract!(
  user,
  :id,
  :username,
  :bio
  )

json.set! :alias, user.username.capitalize

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
