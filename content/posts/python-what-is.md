---
  excerpt: To be defined
  publishedAt: 2025-06-29
  title: What is Python?
---

What is Python

In the software engineer world, almost everyone heard about the programming language Python. Given the raise of data science in the last few years, it became the most popular language, uncrowding Java and JavaScript, which powers most of business applications (Oracle enterprise) and the web respectivily. There a lot of reasons why it became popular:

**Data science growth** As we see in SOs, where people adopt those because there is a great application they need, the adoption of Python by data science community was much given the data analysis libraries NumPy, pandas and scikit. After that TensorFlow and PyTorch cements its role in AI/ML.

**It's simple to learn**: which is something we will explore in the next months.

**Open Source**": No license costs means that companies will not have surprisingly bad news after months or even years building on top of Python.


## Installing Python
So, we can't run the Pythons programs without to have Python runtime installed. So, let's start installing asdf:

```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.15.0
```

After that add the two lines above to your .bashrc file:

```
. "$HOME/.asdf/asdf.sh"
. "$HOME/.asdf/completions/asdf.bash"
```

After that just run `source .bashrc` to refresh the current session with the new bash variables and asdf is installed.
Now we will enable the python plugin:

```
asdf plugin add python https://github.com/asdf-community/asdf-python.git
```

Before that, just make sure your SO is updated with the latest packages.

Now, we need to install Python requirements with the following command:

```
sudo apt install build-essential zlib1g-dev libbz2-dev libreadline-dev libssl-dev libsqlite3-dev tk-dev
```

After that we are good to install python latest version:

```
asdf install python 3.13.5
```

## Python Interpreter
In python we have different flavours of interpreters, the most two famous of them are CPython, also know as Python, and we have PyPy, which is Python interpreter writtein in Python itself. General thumb of rule, is CPython is more compatible with other extensions, while PyPy is significantly faster in CPU intensive tasks. We will still with CPython, give it's more compatible with data analysis related librarieies like NumPy and SciPy.


Code Editors

For this course I will use VS Code as my go to code editor. Here is the list of extensions that I recommended to write code in Python:

1. Python (by Microsoft):
Essential for Python development—provides IntelliSense, linting, debugging, and more.


Your First Python Program

To run a python code, just use the command `python` followed by your python script, like:
`python main.py`

Python Extension

Linting Python Code

Formatting Python Code

Running Python Code

Python Implementations

How Python Code is Executed

Quiz

Follow Me Around

Learning Paths