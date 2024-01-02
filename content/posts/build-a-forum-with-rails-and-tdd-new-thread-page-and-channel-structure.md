---
   title: Build a forum with Rails and TDD - New thread page and channel structure
   excerpt: In one more post about Rails and TDD, we will explore a bit more about Devise and create a new thread relationship
   publishedAt: "2024-01-02"
---
Hey everyone, Rodrigo here. In today’s post, we will continue our forum project, finishing what we started in the last post, where we prepared e endpoint to receive the thread information, now we need to build the publish thread page, so users can input the information by themselves.

## Creating a publish threads page

So, let’s open the forum threads controller file, and we will add a new action to it:

```ruby
def new
  @thread = ForumThread.new
end
```

Pretty simple, we are just initializing a new ForumThread object, that will be used by Rails to build the URL and bind the information the user will input to it.

The next step is to create a new view, where we will add the fields we want users to be able to add, in this case, *title* and *body*. Let’s create a new view file named *app/views/forum_threads/new.html.erb*, and add the following code to it:

```html
<div class="container mx-auto">
   <%= form_with(model: @thread) do |form| %>
      <div>
         <div class="mb-10">
            <label for="title">Title</label>
            <%= form.text_field :title, class: "w-full block border border-gray-300 rounded-sm" %>
         </div>
         
         <div class="mb-10">
            <label for="body">Body</label>
            <%= form.text_area :body, rows: 8, class:"w-full block border border-gray-300 rounded-sm" %>
         </div>

         <div>
            <%= form.submit value: "Create thread", class: "bg-gray-800 text-white rounded-lg py-3 px-5"  %>
         </div>
      </div>
   <% end %>
</div>
```

The first magical thing here is in the *form_with* method*,* which in this case, we don’t need to inform the URL, Rails automatically infers it based on the type of object we are passing as a parameter, in this case *@thread,* the object we create inside the controller ******forum_thread.****** Besides that, the remaining code is related to creating the text field for the title field, and a text area for the body. If we access http://localhost:3000/forum_threads/new in the browser, we should have something like this displayed:

![A page containing two fields and a button to create a new thread](/images/posts/build-a-forum-with-rails-and-tdd-new-thread-page-and-channel-structure/new-thread-page.png)

If we populate the fields and give a submit, a new thread should be created, and after that, it will redirect us to the newly thread created.

![A page containing two fields filled with lorem ipsum text and a button to create a new thread](/images/posts/build-a-forum-with-rails-and-tdd-new-thread-page-and-channel-structure/new-thread-page-filled.png)

And, we can add a comment as well, to check if everything is working great:

![A thread page detail showing information used to create it before](/images/posts/build-a-forum-with-rails-and-tdd-new-thread-page-and-channel-structure/new-thread-created.png)

So far so good! Now, we need to check if the form page behavior is also coherent when the user is not authenticated, we don’t want to guests be able to see the threads form page, but when they try to create a thread, an error is thrown.

So let’s start creating a new test in the *test/controllers/forum_threads_controller_test.rb* file to assess this requirement:

```ruby
test "guests cannot see the create thread page" do
  get new_forum_thread_url()

  assert_response :redirect
  assert_redirected_to "/users/sign_in"
end
```

So, here we are checking if a guest user accesses the ********************new_forum_thread_url,******************** the response should be a redirect to a URL *user/sign_in*, **which is the out-of-box URL *Devise* provides to us for the login page.

If we run the tests now, it should fail. Instead of having a redirect, an unauthorized response is been returned. This is happening because of the tweak we did on the ******Devise****** failure app. So, let’s change it once more, to handle both situations. Edit the file *app/lib/custom_failure_app.rb* to look like this:

```ruby
class CustomFailureApp < Devise::FailureApp
  def respond
    if request.get?
      super
    else
      json_failure
    end
  end

  def json_failure
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = "{'error' : 'authentication error'}"
  end
end
```

Now, we are testing first if the request is a GET, which indicates that the user is trying to access a page, but not inserting the information yet. The else condition is covering this second part, so this way we can have both scenarios covered here. There are other ways to do it, but for now, is good enough.

Now that we already covered this part, let’s increment our application with another feature, to be able to separate threads by channels.

## Adding a channel to threads

If you take a look on the home page, you are going to see that all threads are appearing in the same pool at home. As the number of threads increases, it becomes harder and harder to find something specific. So, let’s add a channel to each thread, so that way, we can filter threads by its channel.

Following the TDD approach once more, we will create a new test to assert every thread has a channel:

```ruby
test "a thread has a channel" do
  assert_instance_of Channel, @forum_thread.channel
end
```

If we run the tests, they should fail:

```html
Error:
ForumThreadsControllerTest#test_a_thread_has_a_channel:
NameError: uninitialized constant ForumThreadsControllerTest::Channel
test/controllers/forum_threads_controller_test.rb:36:in `block in class:ForumThreadsControllerTest'
```

This is expected, given we don’t have any class called *******Channel******* yet, we need to create the model, and for that, let rails generate it for us:

```bash
rails generate model Channel
```

Opening the file *db/migrate/20231229131055_create_channels.rb* (the timestamp will be different in your case), we can now define which fields we want to be included in the channel model. The first one, of course, will be the name, given we want every channel to have a proper name. Also, I will add a second field called *slug*, which will be used later to make URLs more friendly, like */threads/rails* or *********************/threads/active-model*********************, so, in this case, we need a slug associated with the channel, because the name can contains spaces and another special character that will make the URL less readable.

Now, we can add these fields in the channel migration:

```ruby
class CreateChannels < ActiveRecord::Migration[7.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :slug
      t.timestamps
    end
  end
end
```

After that, run the command `rails db:migrate` to persist the new table in the database. Also, don’t forget to run `RAILS_ENV=test rails db:migrate`, which is the same thing, but to persist it in the testing database.

If we run the tests, we should see a different error:

```bash
Error:
ForumThreadsControllerTest#test_a_thread_has_a_channel:
NoMethodError: undefined method channel' for #<ForumThread id: 904369371, title: "Blanditiis rerum sed praesentium.", body: "Deserunt nemo quo. Dolor numquam quod. Earum sunt ...", created_at: "2023-12-29 13:23:38.637291000 +0000", updated_at: "2023-12-29 13:23:38.637291000 +0000", user_id: 338193910>     test/controllers/forum_threads_controller_test.rb:36:in block in class:ForumThreadsControllerTest'
```

This happens because we still don’t have an association between a thread and a channel. Let’s begin fixing it by adding a new migration to add a channel_id field in the thread:

```bash
rails generate migration AddChannelIdToForumThread channel:references
```

Just before running migrate commands again, we need to reset the current database, given threads are already created without channel_id. This could be prevented, if we add a null allow condition in the migration, but given we are in the development stage yet, we can afford to roll back everything and migrate again. So run the command `rails db:reset` and after that, we are good to migrate using both `rails db:migrate` and `RAILS_ENV=test rails db:migrate`

Besides the database being fixed, we still have a couple of more things to fix before giving it a new try in tests. Now, we need to fix the model, so open the file *app/models/forum_thread.rb*, and add the relationship with the channel:

```ruby
class ForumThread < ApplicationRecord
    has_many :replies, :foreign_key => "thread_id"
    belongs_to :creator, class_name: "User", :foreign_key => "user_id"
    **belongs_to :channel**
end
```

Pretty simple right? Just like we did before, but because this time we kept the convention, we don’t need the extra parameters we used before, in the *creator* relationship.

The last step is to write the fixtures for the channel, open the file *test/fixtures/channels.yml* and add the following piece of code:

```yaml
<% 10.times do |n| %>
  <% name = Faker::Lorem.word %>
  channel_<%= n %>:
    name: <%= name %>
    slug: <%= name %>
<% end %>
```

This fixture is simple because it doesn’t have any reference inside it with other models, so it’s just a for loop creating 10 new channels. The only point of attention here is that we need to store the generated name before assigning it to the channel’s name and slug, otherwise, both different names will be generated.

Another fixture we need to change is the *test/fixtures/forum_threads.yml*, given now we have a channel relationship that was not that before:

```yaml
<% 10.times do |n| %>
  thread_<%= n %>:
    title: <%= Faker::Lorem.sentence %>
    body: <%= Faker::Lorem.paragraph %>
    creator: user_<%= n %>
    **channel: channel_<%= n %>**
<% end %>
```

Great, now we can try to give a run on the tests:

```bash
Error:
ForumThreadsControllerTest#test_an_authenticated_user_can_create_new_forum_threads:
ActionController::UrlGenerationError: No route matches {:action=>"show", :controller=>"forum_threads", :id=>nil}, missing required keys: [:id]
app/controllers/forum_threads_controller.rb:23:in create'     test/controllers/forum_threads_controller_test.rb:61:in block in class:ForumThreadsControllerTest'
```

There is one test failing and this is because the user needs to provide the channel associated with that thread at the moment of thread creation. So, to fix it, let’s tweak two points of the *test/controllers/forum_threads_controller_test.rb:*

```ruby

setup do
    ...
    @channel = channels().first
  end

test "an authenticated user can create new forum threads" do
    sign_in @user

    body = Faker::Lorem.paragraph
    title = Faker::Lorem.sentence

    response = post forum_threads_url(), params: {
      forum_thread: {
        body: body,
        title: title,
        **channel_id: @channel.id**
      }
    }

    ...
  end
```

Very similar to what we did for replies and users, we get a channel from the channel collection defined in fixtures, and use its id in the thread creation. If we give a new try in the tests, they should pass all this time.

And that’s all for today’s post, in the next post, we will continue to tweak this feature, changing the path to reflect that new structure, see you there.