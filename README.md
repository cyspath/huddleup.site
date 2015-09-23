# HuddleUp.site

## [Live Link](http://www.huddleup.site)

#### HuddleUp is asingle-page app for pets to meetup, inspired by Meetup.com. HuddleUp is built on Rails and Backbone.js.

### Front-end
* Prevents lingering listeners on zombie subviews by utilizing a custom composite view class

### Back-end
* Groups, Huddle Events, and Users share Images and Comments table via polymorphic associations
* Search queries database and returns Group, Event and User matches with context of matched data type
* Custom authentication using Bcrypt to store secret hash without setting User#password and stores session token via SecureRandom::urlsafe_base64

## Minimum Viable Product
HuddleUp is inspired by Meetup.com built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create groups
- [ ] Create events
- [ ] View groups and events
- [ ] Able to attend or leave events
- [ ] Comment on groups, events, and other pet's profile page
- [ ] Chat with each other
- [ ] Able to see other attendees
- [ ] Browse for group and events
- [ ] Search for group and events


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, basic index page set up (~1 day)

User authentication with Rails will be implemented. By the end of the day pets will be able to log in and directed to the root page. The log-in splash page will be awesome but it has to wait. The root page in short will be very simple at this stage, containing sample groups pre-made by me in the rails console. Today is mainly to ensure I am on the right path with everything working correctly (Heroku to be exact).


### Phase 2: Creating and joining groups and events (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create groups, join groups, and create events, all
inside a single Backbone controlled staticpage(root).

Controllers and API routes will be set-up in this stage, Rails will return json and Backbone will manipulate the json to display the results ( Backbone model, collection, router, view, etc ). By the end of this phase users will be able to create groups, join groups, create events, and join events. Group page will show its events, and event page will show its users.


### Phase 3: Bogging down the details in event show page (~2 days)

The interface will be perfected abit, users will be able to create events and add photos (in the future a slideshow will be inserted in the event showpage). The showpage should also have options to set user status to going, maybe, and not going. This will be reflected on the event's right-hand sidebar which should contain a list of users and their status. Additionally comment functionality should be added for groups, user's showpage, and event's showpage.


### Phase 4: User's profile page (~1-2 days)

At this stage users profile page will have more fancy stuff such as their groups, upcoming events, avatar, description, as well as a "bail-bar"/"flakebility"/"chance of showing up" gauge that tells other users of this users credibility at attending events. Also a reward badge will be given based on number of events attended. At this point some CSS will be implemented to make the site somewhat presentable so I have an approximate idea on how to arrange features on the page.


### Phase 5: Seed the database, more css styling (~1 day)
Users(pets) will be seeded. More css styling. Splash page will have a video background/animation. Root page after logging in will have a slideshow of popular destinations/events.


### Bonus Features (TBD)
- [ ] "Up" button to rate users, and a anonymous "Down" button as well.
- [ ] Pagination/infinite scroll
- [ ] custom animation using photoshop and css background-shit technique
- [ ] trim the borders, make the page theme appearing but not overwhelming
- [ ] dropdown bars
- [ ] depressable button upon click
- [ ] splash page animation: a pet getting off work (for human) and goes online to search for some fun events or destinations to go to
