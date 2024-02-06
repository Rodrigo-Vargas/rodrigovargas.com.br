---
  excerpt: In the ninth post in a series, we will conclude the implementation of filtering threads by channels.
  publishedAt: 2024-01-16
  title: Build a forum with Rails and TDD - A user can filter threads by channel
---

Hey everyone, Rodrigo here. In the ninth post of this series, we will finish the feature of filtering threads by channels, which we have been working on in the last two posts.

## Validation replies

Just before we dive into the subject of today’s post, I just would like to complement something that was left behind in the last post, which was the validation of replies. As you remember we added a validation to the threads, making sure that we are asking for both title and body for every thread created. If we check the *RepliesController*, we will see that we are just creating the reply, and not validating anything, let’s fix it.

Let’s begin creating a new test inside the *test/controllers/replies_controller_test.rb* file:

```ruby
require "test_helper"

class RepliesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "a reply requires a body" do
    @forum_thread = forum_threads().first
    @user = users().first

    sign_in @user

    post forum_thread_replies_url(@forum_thread.id), params: {
      reply: {
      }
    }

    assert_response :bad_request
    assert_equal(["can't be blank"], response.parsed_body[:body])
  end
end
```

As you can remember, this is a very similar structure to what we did on the threads test. First, we create a new reply, posting to the forum_thread_replies_url, and then we check if the body field has the proper validation and if the HTTP status code of the response is 400, or a bad request.

To run this test, we can execute the command `rails test test/controllers/replies_controller_test.rb`, or we can just go with `rails test`, which will run all the tests, and and we should see our new test breaking, let’s fix it.

Open the file *app/controllers/replies_controller.rb* and change the action *create* inside of it:

## Checking if a thread belongs to a channel

So, let’s start writing a test that will assert that only threads of a given channel will be displayed on the channel detail page. We can do it all at once, or we can split it in a more TDD approach, let’s follow the second approach.

First, we need to make sure that the threads by channel page are returning a 200 response, so we can do it in the following way.

```ruby
test "a user can filter threads according to a channel" do
  get "/threads/" + @channel.slug

  assert_response :success
end
```

Pretty simple, just a request to the page we want, and a call to the assert_response method. If we run the tests now, they should fail with a 404 response returned instead of a 200.

```bash
Failure:
ForumThreadsControllerTest#test_a_user_can_filter_threads_according_to_a_channel [/home/rodrigo/code/forum/test/controllers/forum_threads_controller_test.rb:150]:
Expected response to be a <2XX: success>, but was a <404: Not Found>
```

And it does. This is expected because we don’t have a mapped route to this page, let’s fix it in the *config/routes.rb*:

```ruby
Rails.application.routes.draw do
  devise_for :users
  resources :forum_threads, except: ['show', 'update', 'destroy', 'index'], path: "threads"  do
    resources :replies
  end

  get '/threads(/:channel)', to: 'forum_threads#index'
  get '/threads/:channel/:id', to: 'forum_threads#show', as: 'forum_thread'
end
```

First thing, we need to remove the index routes from the *resources :forum_threads* command, so we can customize the index route as we want. Also, noticed that I added an extra parameter called path at the end, to fix something that I left behind which was the inconsistency between */forum_threads* and */threads* that we had before, so let’s name everything as threads, which is simpler.

Moving on, we created a new line to define the index route. Notice that we are adding the /:*channel* between parentheses, which is the way we declare optional parameters in Rails.

If we run our tests, we should have a green. Overcome this part, now we can improve our test to check if also we are showing only the threads related to that channel, so let’s tweak it a bit:

```ruby
test "a user can filter threads according to a channel" do
  @threadInChannel = forum_threads().select {| thread | thread.channel_id == @channel.id }.first()
  @threadNotInChannel = forum_threads().select {| thread | thread.channel_id != @channel.id }.first()

  get "/threads/#{@channel.slug}" 

  assert_response :success
  assert_select "h4", text: @threadInChannel.title
  assert_select "h4", {count: 0, text: @threadNotInChannel.title}
end
```

Let’s walk through the modifications. First, we created two variables to hold a thread that is the channel and another one that is not in the channel, and for that, we are using the fixtures API and querying for a thread that corresponds to this criteria.

In the end, we are checking if we can find an h4 title in the channel threads list page that contains the channel in the thread, but most importantly, we also doing an assert to check if the thread has a channel different from the one we are accessing the detail page, should not be shown there.

Good, if we run our tests now, we should see that one of them is failing, given we are still showing all the threads in the threads list page, let’s work on it now.

## Filtering out threads that do not belong to the channel

So, to fix our tests we need to change the action *index* inside the *forum_threads_controller:*

```ruby
def index
  @channel_slug = params.extract_value(:channel)

  if (@channel_slug)
     @channel = Channel.find_by_slug(@channel_slug)
     @threads = ForumThread.where(channel_id: @channel.id)
  else
     @threads = ForumThread.all
  end
end
```

Now, we are receiving the new parameter “*:channel”* that was mapped in the *routes.rb* file, and testing if it has any value because we still are allowing users to search in all threads, regarding the channel. Then, inside the if/else condition, we need first to query the channel using the slug we received, given the thread doesn’t know the slug of the channel, just its id. After finding the channel associated with the slug provided by the route, we can query for all threads that have that ID and populate it in the variable *@threads.* And that’s it, if we run our tests again, they should be green.

We can improve our code, simplifying the if/else condition if we ask to Rails provide the threads associated with a channel. For that, we can declare the relationship between those two entities, and then we can do something like @channel.threads, which will simplify our code.

First, let’s write a test that expects a channel to contain zero or more threads. To do this, we will open file *test/models/channel_test.rb*, which was created during the model generation, and pull this test inside of it

```ruby
require "test_helper"

class ChannelTest < ActiveSupport::TestCase
  test "a channel consists of threads" do
    @channel = channels().first

    @thread_type = @channel.threads.const_get(:ActiveRecord_Associations_CollectionProxy)

    assert_equal @channel.threads.class, @thread_type
  end
end
```

We are doing a little hack at the *@thread_type* variable because Rails doesn't expose the type of the relationship in a public way, we need to use this *const_get* method to get it. After that, we are just doing a simple equal assert between what's returned from the @channel.threads relationship and what we captured before.

Now, to run this test, we will change the command, because we are using a different test file, so just execute the *rails test test/models/channel_test.rb* command in the terminal and we should get our first error:

```bash
Error:
ChannelTest#test_a_channel_consists_of_threads:
NoMethodError: undefined method threads' for #<Channel id: 790345431, name: "dolor", slug: "dolor", created_at: "2024-01-30 22:24:32.456119000 +0000", updated_at: "2024-01-30 22:24:32.456119000 +0000">     test/models/channel_test.rb:7:in block in class:ChannelTest'
```

This is something that we are expecting, given we haven’t defined the relationship yet. So, let’s head to the file *app/models/channel.rb* to define the relationship with the threads model:

```ruby
class Channel < ApplicationRecord
  has_many :threads
end
```

If we do the relationship in this simple way, we should get an error in the tests:

```bash
Error:
ChannelTest#test_a_channel_consists_of_threads:
ArgumentError: The Thread model class for the Channel#threads association is not an ActiveRecord::Base subclass.
test/models/channel_test.rb:7:in `block in class:ChannelTest'
```

This is happening because if we define the relationship as *threads,* Rails will look for a class called *Thread*, which is not our case, given the threads class is named *ForumThread*. To fix it, we need to tell Rails what the class name should look, like this:

```ruby
class Channel < ApplicationRecord
	has_many :threads, class_name: "ForumThread"
end
```

And that’s all! If we run our tests again, we should see them passing.

In the next post, we will explore ways to tell our users how to use this feature, making channel links visible in the forum, so they can click and navigate in channel’s threads, see you there.