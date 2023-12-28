---
   excerpt: How to protect routes using Devise and how to allow users to publish threads, are two things we will talk about in this post, in our TDD and Ruby on Rails series
   publishedAt: "2023-12-27"
   title: Build a Forum with Rails and TDD - A user can publish threads
---

Hey everyone, Rodrigo here, and in today's post we will add a new capability in our Rails forum, where we will allow users to create new threads, let`s dive into it.

## Using TDD to create a new thread:

So, following the TDD approach, we need to create a test to check if an authenticated user can create a new thread. Open the file *test/controllers/forum_threads_controller_test.rb* and add the following test:

```ruby
test "an authenticated user can create new forum threads" do

end
```

Now, we need to think about what we will need to do in this test, first of all, we need an authenticated user, so we can use the same method *******sign_in******* to authenticate a user in our test:

```ruby
test "an authenticated user can create new forum threads" do
  sign_in @user
end
```

After that, we need to create a new thread, and after that, we need to call the POST route of threads to create this new thread in the database, this is very similar to what we did in the last post with a reply creation:

```ruby
test "an authenticated user can create new forum threads" do
    sign_in @user

    body = Faker::Lorem.paragraph
    title = Faker::Lorem.sentence

    post forum_threads_url(), params: {
      forum_thread: {
        body: body,
        title: title
      }
    }
  end
```

Finally, we need our assert command to check if the pass is passing or not. In this case, to check if the thread was properly created, we can perform a request to the threads list and check if the new thread was created there:

```ruby
test "an authenticated user can create new forum threads" do
    sign_in @user

    body = Faker::Lorem.paragraph
    title = Faker::Lorem.sentence

    post forum_threads_url(), params: {
      forum_thread: {
        body: body,
        title: title
      }
    }

    **assert_response :redirect

    follow_redirect!
    assert_response :success
    assert_select "h1", text: title**
  end
```

Just providing a further explanation regarding the assert. We want our forum_threads controller to redirect the user to the newly created thread, so our assert should check if the response was a redirect (3xx) code, perform the redirect itself, check if the page that the user has been redirected to a valid one, and finally check if the title we used to create the thread, was indeed the title of the newly thread created. If all these conditions are true, we have a successful thread creation.

If we run our tests at this moment, we should see a message where Rails is telling us it was expecting a redirect code, but got a 404 instead:

```bash
Failure:
ForumThreadsControllerTest#test_an_authenticated_user_can_create_new_forum_threads [/home/rodrigo/code/forum/test/controllers/forum_threads_controller_test.rb:63]:
Expected response to be a <3XX: redirect>, but was a <404: Not Found>
```

This is expected given we don’t have an action to create a thread in our application yet. 

## Changing the controller to allow users to create threads

Now, we need our forum threads controller to be able to receive the thread information the user provided and store it in a new database row, so let’s open the file *app/controllers/forum_threads_controller.rb*, and create a new action named *create:*

```ruby
def create
  thread_params = params[:forum_thread]
  thread_params["user_id"] = current_user.id

  @thread = ForumThread.new(thread_params)      

  @thread.save

  redirect_to(forum_thread_url(@thread.id))
end
```

Let me show you this new approach to creating a new entity in Rails. Different from what we did in our replies creation, where we defined each attribute of the new Reply, here we are using the params object itself and passing it as a parameter to the [ForumThread.new](http://ForumThread.new) method. This is called *mass assignment* and can be pretty useful in some cases, especially where we have an object with dozens of attributes.

One downside of this approach is that it can be a bit unsafe, given users can send parameters that they are not supposed to send, like an encrypted password in a user entity, or a protected field in a given entity. To protect us from forgetting to define these parameters, Rails will throw an error if we try to run the code above:

```bash
Error:
ForumThreadsControllerTest#test_an_authenticated_user_can_create_new_forum_threads:
ActiveModel::ForbiddenAttributesError: ActiveModel::ForbiddenAttributesError
app/controllers/forum_threads_controller.rb:16:in create'     test/controllers/forum_threads_controller_test.rb:56:in block in class:ForumThreadsControllerTest'
```

## Defining allowed parameters in mass attribution in Rails

Great, so let’s define the parameters we want to user can mass assign, creating a private method named *****thread_params***** inside the ***forum threads controller***:

```ruby
class ForumThreadsController < ApplicationController
 ...

def create
    @thread = ForumThread.new(thread_params)
    @thread.user_id = current_user.id
    @thread.save
    
    redirect_to(forum_thread_url(@thread.id))
  end

  private
    def thread_params
       params.require(:forum_thread).permit(:body, :title)
    end
end
```

By doing this, we can also simplify the thread creation, we just need to call the new method of the ForumThread class and the model is good to be saved. Also, we are assigning the user_id in a separate line because we don’t want users can provide a user_id for the newly created thread, so this could allow users to create new threads on behalf of other users, this is a good example of why is important to proper set the mass assigning allowed parameters.

After saving the new thread, we are just redirecting the user to the thread detail page.

## Guests can’t create threads

Just to cover all scenarios here, let’s create a new test inside the file *test/controllers/forum_threads_controller_test.rb* just to make sure guests can’t create new threads:

```ruby
test "guests_may_not_create_threads" do
  body = Faker::Lorem.paragraph
  title = Faker::Lorem.sentence

  response = post forum_threads_url(), params: {
    forum_thread: {
      body: body,
      title: title
    }
  }

	assert_response :unauthorized
end
```

At this point, we are just calling the post route to try to create a new thread. If we run our tests now, we should see an error:

```bash
Error:
ForumThreadsControllerTest#test_guests_may_not_create_threads:
NoMethodError: undefined method id' for nil:NilClass     app/controllers/forum_threads_controller.rb:14:in create'
test/controllers/forum_threads_controller_test.rb:74:in `block in class:ForumThreadsControllerTest'
```

This happens because, besides the route allowing to guest users create threads, this is failing because the object current_user is null, it fails to get an id property inside of it.

So, let’s fix it, by adding some protection in the action *create* inside *forum_threads controller*:

```ruby
def create
  if !user_signed_in?
     self.status = 401
     self.response_body = "{'error' : 'authentication error'}"
     return
  end

  @thread = ForumThread.new(thread_params)
  @thread.user_id = current_user.id
  @thread.save
  
  redirect_to(forum_thread_url(@thread.id))
end
```

We want to check if the user is authenticated, but only for the create action. We want to guest users still be able to see both the list of threads and the thread details page, so we can add this validation inside the create action. Running the tests again we should see all of them passing:

 

```bash
Finished in 2.752442s, 2.5432 runs/s, 3.9965 assertions/s.
7 runs, 11 assertions, 0 failures, 0 errors, 0 skips
```

## Customizing the *Devise* unauthorized behavior

The solution above is fine, but it has a downside, we need to do that for every action we want only authenticated users can have access. To do it in a better way, we can customize *Devise* failure handling. To do this, let’s begin creating a new file *app*/*lib//failure_app.rb*, with the following content:

```ruby
class CustomFailureApp < Devise::FailureApp
  def respond
    json_failure
  end

  def json_failure
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = "{'error' : 'authentication error'}"
  end
end
```

We are overwriting the base method *respond* from Devise, which is called every time that a failure occurs on authentication, as it happens when a user is not authenticated.

The last step is to tell Devise to use our class, instead of the native class FailureApp. We can do this by editing the file *config/initializers/devise.rb*:

```ruby
config.warden do |manager|
  manager.failure_app = CustomFailureApp
end
```

Warden is a middleware where Devise is built on top, basically at this line of code, we are telling Warden to use our custom class instead of the native one, registered in Devise.

Last, but not least important, we need to add a *************before_action************* calling the *authenticate_user!* method of Devise, so that will call our CustomFailureApp class.

```ruby
class ForumThreadsController < ApplicationController
   before_action :authenticate_user!, only: [:create]

   def index
	 ...
end
```

Notice that we are adding the tag *only* in this case because we want to keep the behavior we ad before, where guests are still able to see posts. Finally, we don’t need the validation inside the method create anymore, so we can simplify it again:

```ruby
class ForumThreadsController < ApplicationController
   before_action :authenticate_user!, only: [:create]

   def index
      @threads = ForumThread.all
   end

   def show
      id = params.extract_value(:id)
      @thread = ForumThread.find_by_id(id)
      @reply = Reply.new;
   end

   def create
      @thread = ForumThread.new(thread_params)
      @thread.user_id = current_user.id
      @thread.save
      
      redirect_to(forum_thread_url(@thread.id))
    end

    private
      def thread_params
         params.require(:forum_thread).permit(:body, :title)
      end
end
```

And that’s all, If we run our tests, again we should have a green response. In the future, we can tweak the CustomFailureApp to redirect users when the request is not in JSON format, but I will keep this from another post.

That’s all for today folks, next post we will talk about error handling, see you there.