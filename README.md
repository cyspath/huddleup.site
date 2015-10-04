# HuddleUp.site

## [Live Link](http://www.huddleup.site)

#### Imagine a world where pets could use the internet. HuddleUp is a single-page app for pets to meetup, inspired by Meetup.com. HuddleUp is built on Rails and Backbone.js.

* Prevents lingering listeners on ‘zombie’ subviews by utilizing a custom composite view class

* Group, Huddle Event, and User models share Images and Comments table via Rails’ polymorphic associations

* Custom authentication using Bcrypt to store secret hash without setting User#password

* getOrFetch async method on collections to prevent extra database queries when revisiting the same group/huddle/user page as significantly reducing the loading time. For example, first page load time ```(Views: 636.1ms | ActiveRecord: 19.5ms)```  vs second visit ```(Views: 6.9ms | ActiveRecord: 0.6ms)``` of user profile page.

* Customized and designed loading spinners in photoshop. Spinner fades out when models are fetched or have already been fetched, backbone view instance variable ```loaded``` is then set to true to prevent spinners rendering by subsequent ```view.render``` calls by other listeners.

* Taken scalability into consideration, only partial ```Group``` and ```Huddle``` events are queried, using ```#find_by_sql```, from database for the home page - which contains a list of groups as well as a slide show of upcoming huddles. ```Groups``` and ```Huddles``` for homepage showing are limited to 40.

* Custom made view models with forms.


### Site Overview

### Front-end
* Prevents lingering listeners on zombie subviews by utilizing a custom composite view class

### Back-end
* Groups, Huddle Events, and Users share Images and Comments table via polymorphic associations
* Search queries database and returns Group, Event and User matches with context of matched data type
* Custom authentication using Bcrypt to store secret hash without setting User#password and stores session token via SecureRandom::urlsafe_base64
