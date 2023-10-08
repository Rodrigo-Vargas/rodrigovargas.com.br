---
   categories: [elixir]
   date: '2022-05-07'
   excerpt:
   locale: en
   title: Setup a Elixir Development Environment on local nachine
---

We will start updating the apt repository and installing all packages of distro


```bash
  sudo apt update && sudo apt upgrade -y
```

After that we will set the environment variable WSL_HOST to be able to access webservers inside the wsl container

export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2) >> .bashrc

## Installing ASDF

Install asdf dependencies

apt install curl git


```bash
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
source ~/.bashrc
```

Check if asdf is correctly installed running the command:

```bash
asdf
```

## Installing Erlang

Install erlang dependencies:

```bash
apt-get -y install build-essential autoconf m4 libncurses5-dev libgl1-mesa-dev libglu1-mesa-dev libpng-dev libssh-dev unixodbc-dev xsltproc fop
```



```bash
asdf plugin add erlang
```

```bash
rodrigo@DESKTOP-RB4M1AC:~$ asdf list erlang
  24.3.4
```

```bash
asdf global erlang 24.3.4
```


## Install Elixir

```bash
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
```

```bash
asdf install elixir latest
```

## Creating a new app

mix new reddit --sup --app reddit


The files/directories we'll be focusing on in this tutorial are:

lib/ - Where our application code will live
lib/reddit/application.ex - Where we'll describe how the application should be started and how it should be supervised
mix.exs - Where we'll describe the configuration of our application and it's dependencies. Now that Mix has scaffolded up our project, let's add the dependencies we need to set up our server.
