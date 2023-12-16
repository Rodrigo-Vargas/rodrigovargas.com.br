---
   excerpt: In this post, we are going to explore how to create partials, how to nest routes and how to insert items in database using Ruby on Rails
   publishedAt: "2023-12-12"
   title: Build a forum with Rails and TDD - A User may respond to threads
---

Hello everybody, Rodrigo here. Our Rails forum already shows a list of threads, a single thread, and the replies of a given thread, but users still can`t interact with these threads, so in the post, we will see how we can use Rails features to make this work.

## Creating some partials

Let`s do a bit of refactoring in the replies section of the single thread page. We will move this entire section to a partial file, so we can clean up our view a bit. I like to put all partials in the same folder, so I will create a folder called ********partials******** inside *****views***** to store the partial files of this project, but you can follow a different approach, just keep your structure in mind when you are going to reference a partial file. Inside the **************views/partials************** folder, I will create a file named *replies.html.erb* and for its content I will move the piece of code that renders the replies section in the file *views/forum_threads/show.html.erb* to this new file:

```html
<% @thread.replies.each do | reply | %>
   <div class="box">
      <div>
      <%= reply.user.email %> said <%= reply.created_at_for_humans %>
      </div>
      <p><%= reply.body %></p>
   </div>
<% end %>
```

And in the ******show.html.erb****** file, I will call the render method passing the path of the partial created as a parameter:

```html
<div class="container">
   <div class="box">
      <h1><%= @thread.title %></h1>
      <article><%= @thread.body %></article>
   </div>

   <hr />

   <%= render "partials/replies" %>
</div>
```

Great, if we run our tests again they should pass without any issues.

## A thread has a creator

To make our threads more informative, we can add the creator of this thread in the same way we did to the replies, also, if we do this, we can query for all threads of a single user, which came very handy in the forum apps. So, the first step we need to do is to create a migration to add this field in the *forum_thread* model, let`s run the command `rails generate migration AddUserIdToForumThread user:references`, a new migration is generated:

```ruby
class AddUserIdToForumThread < ActiveRecord::Migration[7.1]
  def change
    add_reference :forum_threads, :user, null: false, foreign_key: true
  end
end
```

I must admit that Rails is kind of magical in some ways, if we follow the conventions, it can properly identify the target model and the field that should be added, very productive. After checking the migration, the next logical step would be to perform the command r`ails db:migrate`, but because the field user_id doesn`t accept null occurrences, we will rebuild our database in the same way we did for the replies, running the commands `rails db:drop` and then `rails db:migrate`.

Now, we need to adjust the seeds file and the fixtures as we did in the last post:

```ruby
2.times do |i|
   password = Faker::Internet.password
   thread_user = User.new
   thread_user.email = Faker::Internet.email
   thread_user.password = password
   thread_user.password_confirmation = password
   thread_user.save!

   thread = ForumThread.create(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph,
      user_id: thread_user.id
   )

   5.times do |i|
      password = Faker::Internet.password
   
      user = User.new
      user.email = Faker::Internet.email
      user.password = password
      user.password_confirmation = password
      user.save!

      5.times do |j|
         Reply.create(
            body: Faker::Lorem.paragraph,
            thread_id: thread.id,
            user_id: user.id
         )
      end
   end   
end
```

And the file *forum_thread.yml*:

```yaml
<% 10.times do |n| %>
  thread_<%= n %>:
    title: <%= Faker::Lorem.sentence %>
    body: <%= Faker::Lorem.paragraph %>
    user: user_<%= n %>
<% end %>
```

Also, notice that I used this magical value *user_<%= n %>*, which is a reference to the file ******************fixtures/users.yml******************, where is defined the name of users as an object key. Great, the seeding work is complete, now we can run the tests and make sure that everything is good.

Moving on, let`s create a new test inside the file *test/controllers/forum_threads_controller_test.rb* to check if a given thread has a creator:

```ruby
test "a thread has a creator" do
  assert_instance_of User, @forum_thread.creator
end
```

 

Pretty simple, right? If we run this test again, we should see an error, which is expected given we don`t have an association yet:

```html
ActiveRecord::Fixture::FixtureError: table "forum_threads" has no columns named "creator".
```

Let’s open the file *app/models/forum_thread.rb*, and add the reference there:

```ruby
class ForumThread < ApplicationRecord
    has_many :replies, :foreign_key => "thread_id"
    belongs_to :creator, class_name: "User", :foreign_key => "user_id"
end
```

In this case, we are using some options like *class_name* and *foreign_key*, given we want to have a property called *creator* instead of the Rails’ convention which would be just *****user.*****

## A user can add replies

Things are becoming more interesting now, as we prepare the terrain for store and show replies, it`s time to add a capability for users to do it by themselves. So, let’s begin with the endpoint that will handle user information and store it in the database, and, because we are using TDD, let`s begin writing the tests. Inside the file *test/controllers/forum_threads_controller_test.rb*, create a new test like the one below:

 

```
test "an_authenticated_user_can_add_a_reply_in_a_forum_thread" do    
end
```

Let’s begin getting a user and performing its login using *Devise* helpers. For this we should include its helpers and modify the method set up to have a proper user being retrieved from the database:

```ruby
class ForumThreadsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @forum_thread = forum_threads().first
    @reply = replies().select {| reply | reply.thread_id == @forum_thread.id }.first()
    @user = users().first
  end

...
```

Nothing magical here, just a new reference for the ******************IntegrationHelpers****************** class inside Devise namespace, and a new *****@user***** variable, in the same we did for threads. Now we can use the ******sign_in****** method to authenticate this user, create a new reply object, and perform a post request to the proper URL:

```ruby
test "an_authenticated_user_can_add_a_reply_in_a_forum_thread" do
    sign_in @user

    @new_reply = Reply.new
    @new_reply.body = Faker::Lorem.paragraph
    @new_reply.thread_id = @forum_thread.id
    @new_reply.user_id = @user.id

    post forum_thread_replies_url(@forum_thread.id), params: {
      reply: @new_reply
    }
  end
```

If you run this test, it will fail, because the *forum_thread_replies_url*, doesn`t exist, because we never created a specific route to the replies model until now. To fix it, let’s head to the file *********routes.rb********* and modify it in this way:

```ruby
Rails.application.routes.draw do
  devise_for :users
  resources :forum_threads do
    resources :replies
  end
end
```

This is called *************nested resources************* in Rails, that way we can build REST routes where we can build relationships between models, as we did in this example, telling to Rails that a forum_threads can have many replies. Also, if we run the command `rails routes`, we should see the new URls there:

![A bash command output showing the new forum thread replies routes](/images/posts/build-a-forum-with-rails-and-tdd-a-user-may-respond-threads/rails-routes.png)

Great, the last step we need to do in our test, (before we run it and it fails) is to create the assert of the test, we can do this, by performing a get request to the thread details page, where we added a new reply, and checking if the text used in replies’s body is visible on the page, the final version of the test should look like this:

```ruby
test "an_authenticated_user_can_add_a_reply_in_a_forum_thread" do
    sign_in @user

    @new_reply = Reply.new
    @new_reply.body = Faker::Lorem.paragraph
    @new_reply.thread_id = @forum_thread.id
    @new_reply.user_id = @user.id

    post forum_thread_replies_url(@forum_thread.id), params: {
      reply: @new_reply
    }

    response = get forum_thread_url(@forum_thread.id)
		assert_select "p[class='reply-body']", text: body
  end
```

And running it, we should see an error message:

```html
ForumThreadsControllerTest#test_an_authenticated_user_can_add_a_reply_in_a_forum_thread
--- expected
+++ actual
@@ -1 +1 @@
-"Commodi voluptas reprehenderit. Provident explicabo mollitia. Et sed voluptas."
+"Et cum et. Ducimus voluptates nisi. Dignissimos voluptas eveniet."
.
Expected 0 to be >= 1.
```

## Creating an endpoint to handle new reply requests

The last thing that we need to do to finish this project feature, is to create a new controller to the *replies* model and write the code to handle the information and store it in the database. Let’s run the command `rails generate controller replies` to speed up the controller creation. In the generated file *app/controllers/replies_controller.rb*, add the following code:

```ruby
class RepliesController < ApplicationController
   def create
      id = params.extract_value(:forum_thread_id)[0]

      reply = params[:reply]

      body = reply["body"]
 
      @reply = Reply.new(
         user_id: current_user.id,
         body: body,
         thread_id: id
      )

      @reply.save
   end
end
```

The first thing we did, was to extract the thread ID from the forum_thread_ir parameter, if you don`t know from where I got this string, take a look at `rails routes` command output, you should see this variable there. After we do something similar to extract the body of the response, then create a new reply object and save it at the end. Very little verbose I would say. Now, we can run our tests again, and it should pass without errors

Also, we can add inside the *****************RepliesController***************** class a snippet of code to validate the user authentication before running the action code:

```ruby
class RepliesController < ApplicationController
   **before_action :authenticate_user!**
   def create
			...

```

Very simple, the method ******************authenticate_user****************** comes out-of-box from Devise, which is a very handy way to validate if a given user is authenticated.

And that’s all for today’s post people. See you in the next one.