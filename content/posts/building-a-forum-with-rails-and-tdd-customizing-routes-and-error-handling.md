---
   excerpt: In this Rails forum-building post, we will learn how to customize URLs in Rails, so we can cover more scenarios and also we will see how we can do validation of models in the ActiveRecord API in Rails, let's check it out.

   publishedAt: 2024-01-09
   title: Build a forum with Rails and TDD - Customizing routes and error handling
---

Hey everyone, Rodrigo here. Continuing our build a forum with Rails series, in the last post, we created a new structure for forum threads, grouping them by channel, in this post, we will create a custom path for threads that take into account the channel where that thread belongs, let`s begin.

## Customizing an entity path

Let's begin writing a new test to check if the URL of a thread is in the format ```ruby/threads/<channel_name>/<thread_id>```:

```ruby
test "a thread has a url with a channel" do
  assert_equal(forum_thread_url(@forum_thread.channel.name, @forum_thread.id), "http://www.example.com/threads/#{@forum_thread.channel.name}/#{@forum_thread.id}")
end
```

This is a basic test, just comparing two strings, which we are checking if the string returned by the ****************forum_thread_url**************** is indeed the format that we are expecting. Note that we are also prepending *http://www.example.com*, which is something that rails added by default in URLs of the development environment.

If we run our tests now they should fail because the format of URL is still ```/forum_threads/<forum_id>,``` so let’s tweak a bit the file *routes.rb*:

```ruby
Rails.application.routes.draw do
  devise_for :users
  resources :forum_threads, except: ['show', 'update', 'destroy']  do
    resources :replies
  end

  get '/threads/:channel/:id', to: 'forum_threads#show', as: 'forum_thread' 
end
```

So, the first thing we need to do here is modify the resources generated in the *forum_thread* model. We don’t want Rails to generate the show route for us, so we need to suppress it, but we also need to suppress update and destroy routes, otherwise rails will assign the forum_thread_url to these routes, which is something we don’t want. And at the line next to the last one, we are defining the new threads show route, which we are pointing to the forum_threads controller at the show action. Also, we are defining a name of the route for it, which we will keep as ************forum_thread************.

Great, this time, if we run our tests, we should see a lot of errors, given we need to provide two parameters to forum_thread_url instead of one, so these are the locations we need to update:

app/controllers/forum_threads_controller.rb

```ruby
def create
    @thread = ForumThread.new(thread_params)
    @thread.user_id = current_user.id
    @thread.save
    
    redirect_to(forum_thread_url(@thread.channel.name, @thread.id))
 end
```

app/controllers/replies_controller.rb

```ruby
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

    @thread = ForumThread.find_by_id(id)

    redirect_to(forum_thread_url(@thread.channel.name, id))
 end
```

test/controllers/forum_threads_controller_test.rb

```ruby
test "a user can read a single thread" do
  response = get forum_thread_url(@forum_thread.channel.name, @forum_thread.id)
  assert_response :success

  assert_select "h1", text: @forum_thread.title
end

test "a user can read replies that are associated with a thread" do
  response = get forum_thread_url(@forum_thread.channel.name, @forum_thread.id)
  assert_select "p", text: @reply.body
end

...

test "a thread has a url with a channel" do
  assert_equal(forum_thread_url(@forum_thread.channel.name, @forum_thread.id), "http://www.example.com/threads/#{@forum_thread.channel.name}/#{@forum_thread.id}")
end

...

test "an_authenticated_user_can_add_a_reply_in_a_forum_thread" do
  sign_in @user

  body = Faker::Lorem.paragraph

  post forum_thread_replies_url(@forum_thread.id), params: {
    reply: {
      body: body
    }
  }

  response = get forum_thread_url(@forum_thread.channel.name, @forum_thread.id)
  assert_select "p[class='reply-body']", text: body 
end
```

test/system/forum_threads_test.rb

```ruby
test "should update Forum thread" do
  visit forum_thread_url(@forum_thread)
  click_on "Edit this forum thread", match: :first

  click_on "Update Forum thread"

  assert_text "Forum thread was successfully updated"
  click_on "Back"
end

...

test "should destroy Forum thread" do
  visit forum_thread_url(@forum_thread)
  click_on "Destroy this forum thread", match: :first

  assert_text "Forum thread was successfully destroyed"
end
```

*app/views/forum_threads/index.html.erb*

```html
<div class="container">
   <% @threads.each do | thread | %>
      <a href="<%= forum_thread_url(thread.channel.name, thread.id) %>" class="bg-white block mb-5 p-5 hover:shadow-md">
         <h4 class="text-xl text-gray-800"><%= thread.title %></h4>
         <article class="text-gray-5 00"><%= thread.body %></article>
      </a>
   <% end %>
</div>
```

Phew, now we are ready to run our tests again using `rails test test/controllers/forum_threads_controller_test.rb`, and they should pass without errors.

Also, we can run the application and check if the URLs are properly working:

![A screenshot of the threads list rails page, showing four threads with the new URL being displayed at bottom left of browser](/images/posts/building-a-forum-with-rails-and-tdd-customizing-routes-and-error-handling/threads-list-with-new-urls.png)

Note that we can see both new URLs are being generated correctly, as well the application is properly routing to the thread pages:

![A screenshot of the one thread detail page, showing the information about the page, at the top we can see the new URL format](/images/posts/building-a-forum-with-rails-and-tdd-customizing-routes-and-error-handling/thread-detail-page-with-new-url.png)

So far so good, URLs are in a format that we want, so let’s take a look into some error validation.

## Adding error validation in Rails

If we check the logic that we have for adding a new thread, we will notice that we don’t have any validation, like, what if the user doesn’t inform a body, or if they don’t provide a channel_id? Currently, the controllers will just try to create it anyway, and all the validation database is done directly on the database, which is not ideal, right? So, we need to validate and return a proper response for it.

So, the first step is going to be to create a test to assert the post URL is returning a proper error if we try to create a forum_thread without a title:

```ruby
test "a thread requires a title" do
  sign_in @user

  body = Faker::Lorem.paragraph

  response_code = post forum_threads_url(), params: {
    forum_thread: {
      body: body,
      channel_id: @channel.id
    }
  }

  assert_response :bad_request
  assert_equal(["can't be blank"], response.parsed_body[:title])
end
```

At this point, you should be familiar with this structure, we are logging the user, and creating a new thread, this time, without a title, and at the end, we have our assert condition, which is in this case, a bad request (400 HTTP code) response, as long as an dictionary containing an array of errors, where every key is indeed the name of the field which contains invalid information.

This pattern of errors, using a dictionary, is the native structure that the ActiveRecord of rails built, when an invalid model is being persisted on the database, let’s take a look at the modifications needed in the controller:

```ruby
def create
  @thread = ForumThread.new(thread_params)
  @thread.user_id = current_user.id
  @thread.save

  **if @thread.valid?
     redirect_to(forum_thread_url(@thread.channel.name, @thread.id))
  else
     render json: @thread.errors.to_json, status: 400 
  end**
end
```

Now, after executing the save command in the thread model, we are checking if it is valid, if positive, we are still doing what we have already been doing before, which is redirecting the user to the new thread page, but if it is invalid, we are returning a JSON structure containing all errors of that model, alongside a 400 HTTP code response.

And that’s all modifications inside the controller, now we need to tell Rails, which fields we would like to validate, and the forum thread model file, is the place to do it:

```ruby
class ForumThread < ApplicationRecord
  has_many :replies, :foreign_key => "thread_id"
  belongs_to :creator, class_name: "User", :foreign_key => "user_id"
  belongs_to :channel

  validates :title, presence: true
end
```

Rails has this handy method *validates* which we can pass a lot of options, you can check more of that in the [official documentation](https://guides.rubyonrails.org/active_record_validations.html), but we should explore more of it in the next posts of the series. As you can see, it`s pretty straightforward, just the name of the field and the validations that we would like to check, in this case, we are checking if it is provided by the user, which means that this field is mandatory, or required.

Now, we can run our tests and they should pass. Let’s follow the same approach, to the *body* field in the forum thread model. First, we need to create the test, which is very similar to what we did for the *title* field:

```ruby
test "a thread requires a body" do
  sign_in @user

  title = Faker::Lorem.sentence

  response_code = post forum_threads_url(), params: {
    forum_thread: {
      title: title,
      channel_id: @channel.id
    }
  }

  assert_response :bad_request
  assert_equal(["can't be blank"], response.parsed_body[:body])
end
```

And then, we add a new validation line in the *app/models/forum_thread.rb* file as we did before:

```ruby
class ForumThread < ApplicationRecord
  ...

  validates :title, presence: true
  validates :body, presence: true
end
```

Let’s run our tests once more, and they should pass as well:

![A command shell showing that 12 runs and 20 assertions of the suit are made without any errors](/images/posts/building-a-forum-with-rails-and-tdd-customizing-routes-and-error-handling/tests-passing-after-body-and-title-validation.png)

Great! Now, let’s focus on the last case, which is the channel_id, we need to validate both if the channel_id is provided by the user, but also, we need to make sure that this is a valid channel, otherwise it will fail on the binding process. Rails made this incredibly easy, let me show you.

First, let’s copy once more the structure to create the thread:

```ruby
test "a thread requires a valid channel" do
  sign_in @user

  response_code = post forum_threads_url(), params: {
    forum_thread: {
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph,
      channel_id: 999
    }
  }

  assert_response :bad_request
  assert_equal(["must exist", "can't be blank"], response.parsed_body[:channel])
end
```

At the end, we will assert that two errors should be returned for this test, channel must exist, and can’t be blank. For last, we will add this “*presence true*” **validation in the model, just like we did before.

```ruby
class ForumThread < ApplicationRecord
  ...

  validates :title, presence: true
  validates :body, presence: true
  validates :channel, presence: true
end
```

And that’s all! Great, eh? Rails will already identify the channel as a relationship and will validate if the ID provided is valid for that relationship or not. Finally, let’s run once more the tests suit, and we should have a green.

And that’s all for today folks, if you have any questions, please let me know in the comments section below, see you at the next post.