json.array! @events do |event|
  json.partial! 'event', event: event,
  display_comments: false,
  display_users: false
end
