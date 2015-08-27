class DumpsController < ApplicationController

    def users
      render text: SeedDump.dump(User)
    end

    def comments
      render text: SeedDump.dump(Comment)
    end

    def event_members
      render text: SeedDump.dump(EventMember)
    end

    def events
      render text: SeedDump.dump(Event)
    end

    def group_members
      render text: SeedDump.dump(GroupMember)
    end

    def groups
      render text: SeedDump.dump(Group)
    end

    def images
      render text: SeedDump.dump(Image)
    end

    def ratings
      render text: SeedDump.dump(Rating)
    end

end
