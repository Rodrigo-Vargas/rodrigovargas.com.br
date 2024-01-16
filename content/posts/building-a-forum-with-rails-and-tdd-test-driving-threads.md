---
   excerpt: Let's see how TDD can be used in Rails in our build a forum series with this great framework
   publishedAt: 2023-11-29
   title: Build a forum with Rails and TDD - Test driving threads
---

Hey everyone, Rodrigo here. So in the second post of this build a forum series, we are going to set up the index page of threads, where our goal is to set up *devise (*a famous user generation gem), a list of all threads in the database, as well as set up some basic tests and a detail page for it, let’s dive into it.

## Setup devise

First of all, let’s follow the instructions that we can find on the *[Devise GitHub repository](https://github.com/heartcombo/devise)* about how to install the devise, begin the gem installation through the command bundle adds devise, Then, we should run the generate command to set up the initial devise configuration.

`rails generate devise:install`

After user configuration is done,  the next step should be to create the ActiveRecord user model itself through the command `rails generate devise User`, and the command *rails db:migrate*, to apply the changes into your database. Checking our database through the SQLite explorer, we can see the table newly generated user table.

![A screenshot showing the users table and its columns on SQLite explorer in VSCode](/images/posts/building-a-forum-with-rails-and-tdd-test-driving-threads/users-table.png)

To finish the users’ setup, we are going to add some data seeding into the file **********seeds.rb********** using *Faker* to generate some unique users for us:

```ruby
2.times do |i|
   thread = ForumThread.create(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph
   )

   5.times do |j|
      Reply.create(
         body: Faker::Lorem.paragraph,
         thread_id: thread.id
      )
   end
end

5.times do |i|
   password = Faker::Internet.password

   user = User.new
   user.email = Faker::Internet.email
   user.password = password
   user.password_confirmation = password
   user.save!
end
```

Just like we did on the threads data seed, we are performing a loop with 5 iterations, where we use Faker to generate an email and a password for us, and with that information, we instantiated a new user model, then populated and saved it.

## Generate data for tests with fixtures

So following the TDD approach, we should begin writing the test that will cover our feature. It could be a bit odd at the beginning, given you are testing something that doesn’t exist, but this will make more sense when you get used to this approach. Before jumping into the test itself, let me talk a bit about ********fixtures********. Fixtures are just a fancy word for fake data, we pre-define a set of data that can be used in different scenarios in the tests. To make things easier for us, Rails already creates a fixture file inside the folder *****test/fixtures*****, if you take a look there, you should see a file named forum_thread.yml, with a basic YAML structure.

Let’s use the same approach we did on our database seed file, and take advantage of Faker to generate some data for us:

```yaml
<% 10.times do |n| %>
  thread_<%= n %>:
    title: <%= Faker::Lorem.sentence %>
    body: <%= Faker::Lorem.paragraph %>
<% end %>
```

That way, Rails will generate 10 objects called thread_0, thread_1, and so on with data generated with Faker. Now, we can move on with our test creation.

## Writing the threads list feature test

Data already set, let’s open the file *test/controllers/forum_threads_controller_test.rb* and write our first test that will access the list URL of threads and check if it returned a 200 response.

```
require "test_helper"

class ForumThreadsControllerTest < ActionDispatch::IntegrationTest
  test "a user can see all threads" do
    get forum_threads_url
    assert_response :success
  end
end
```

 This test will assert the basics of our controller, which is to get the list page of threads, which Rails has a convention to call *forum_threads_url* and check if the response of this request is 200 or success. Great, after creating the file run the command *bin/rails test test/controllers/forum_threads_controller_test.rb* at your terminal and the result should be something like this:

```bash
Error:
ForumThreadsControllerTest#test_should_get_index:
NameError: undefined local variable or method forum_threads_url' for #<ForumThreadsControllerTest:0x00007f8a7eb9cf70>
test/controllers/forum_threads_controller_test.rb:9:in block in class:ForumThreadsControllerTest'
```

Just what we expected, since we don’t have any controllers for the threads method. We can generate the threads controller with the command *bin/rails generate controller ForumThreads*, doing that, the following files will be generated:

- app/controllers/forum_threads_controller.rb
- app/views/forum_threads
- test/controllers/forum_threads_controller_test.rb
- app/helpers/forum_threads_helper.rb

Given we already created the file *forum_threads_controller_test.rb*, the console will ask you if you want to override the file, you can just type *n* to ignore it. Great, we already have our controller in place, but we need to set the routes.rb file, so that, the application can recognize *forum_threads_url* as a valid variable. To do it, open the *********routes.rb********* file and put the following snippet of code:

```ruby
Rails.application.routes.draw do
  resources :forum_threads
end
```

The resource keyword, is a magic way that tells Rails to generate all routes regarding a given resource, in our case ForumThreads. If you run the command *bin/rails routes*, you should be able to see the configured routes:

```bash
	
forum_threads        GET    /forum_threads(.:format)                forum_threads#index
new_forum_threads    GET    /forum_threads/new(.:format)            forum_threads#new
edit_forum_threads   GET    /forum_threads/edit(.:format)           forum_threads#edit
forum_threads        GET    /forum_threads(.:format)                forum_threads#show
                     PATCH  /forum_threads(.:format)                forum_threads#update
                     PUT    /forum_threads(.:format)                forum_threads#update
										 DELETE /forum_threads(.:format)                forum_threads#destroy
										 POST   /forum_threads(.:format)                forum_threads#create
```

Running the command *bin/rails test*, we should see a new error message, where the testing is failing because the rote *forum_threads_url* is returning a 404 instead of 200, which makes sense, given our newly generated controller doesn’t have any actions yet. Let’s configure it to properly respond the index route:

```ruby
class ForumThreadsController < ApplicationController
   def index
      @threads = ForumThread.all
   end
end
```

Also, create a new view called index*.html.erb* inside **app/views/forum_threads** with the following content:

```html
<% @threads.each do | thread | %>
   <h4><%= thread.title %></h4>
   <article><%= thread.body %></article>
<% end %>
```

And we are good to go. The code is pretty simple, we are just getting a list of threads from our database and printing it in a HTML file. If we run the *bin/rails test* again*,* we should see a success message, saying that our test passed successfully.

Now, we can also check our page in a browser, just running the application locally and accessing http://localhost:3000/forum_threads:

![A basic HTML page showing four test threads, with title and a short description](/images/posts/building-a-forum-with-rails-and-tdd-test-driving-threads/forum-threads-list-page.png)

## Writing a test that assesses content on a page

If you tried to put anything on the HTML of the forum threads view and rerun the tests, you should see that even if the page is not properly displaying a list of threads, the test will still pass successfully. This is due to the fact that we are just testing the response status code of the index page. We need to add a new assessment to make sure that new threads are appearing correctly at our home. To do it, let’s tweak our test a bit:

```ruby
require "test_helper"

class ForumThreadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @forum_thread = forum_threads(:one)
  end

  test "a user can see all threads" do
    response = get forum_threads_url
    assert_response :success

    assert_select "h4", text: @forum_thread.title
  end
end
```

So, explaining a bit about the code above, we use the setup part to populate a variable named @forum_thread with data coming from the fixture file we created before. The Fixture API in Rails allows us to use this handy forum_threads method that will return the list of threads created there. A lot of methods in Rails are created by conventions, so if our model was called User, the fixture method that we should use would be *users()*. Given we need just one element for our test, and this method returns an array, I just get the first one to use as the reference for the test.

Moving on, in our test method, after calling the URL in the same way we did before, the only thing we need to do is use the method *assert_select*  to find an element h4 with the same value as that title. That way, we can say to *minitest* framework, to match our view structure with our integration test.

## Testing our thread detail page

So, before finishing this post, let’s create a test to assert if the thread detail page is working as expected. So, let’s begin creating a test for it in a separate method:

```ruby
require "test_helper"

class ForumThreadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @forum_thread = forum_threads(:one)
  end

  test "a user can see all threads" do
    response = get forum_threads_url
    assert_response :success

    assert_select "h4", text: @forum_thread.title
  end
  
  test "a user can read a single thread" do
		response = get forum_thread_url(@forum_thread.id)
    assert_response :success

    assert_select "h1", text: @forum_thread.title
  end
end
```

Running the tests we should see an error, given we don’t have a method for the show action, so let’s access the threads controller and create it:

```ruby
class ForumThreadsController < ApplicationController
   def index
      @threads = ForumThread.all
   end

   def show
      id = params.extract_value(:id)
      @thread = ForumThread.find_by_id(id)
   end
end
```

Finally, we need to create a *************show.html.erb************* view for it:

```html
<h1><%= @thread.title %></h1>
<article><%= @thread.body %></article>
```

And now, our tests should be running fine and we finished our initial test setup with that. In the next time, we will include responses in our threads, I see you there.