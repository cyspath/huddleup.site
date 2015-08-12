# Schema Information

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references groups)
name        | string    | not null
body        | string    |
avatar      | image     |

## groupMember
column name | data type | details
------------|-----------|-----------------------
user_id     | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references users)

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references groups)
group_id    | integer   | not null, foreign key (references groups)
title       | string    | not null
location    | string    | not null
date        | string    | not null
body        | string    |
avatar      | image     |

## eventMember
column name | data type | details
------------|-----------|-----------------------
user_id     | integer   | not null, foreign key (references users)
event_id    | integer   | not null, foreign key (references users)


## comments/replies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references groups)
user_id     | integer   | not null, foreign key (references users)
group_id    | integer   | not null, foreign key (references groups)
event_id    | integer   | not null, foreign key (references groups)
body        | string    | not null

## tags (prefered groups for a specific user)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
group_type  | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references posts)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
