# React-DotNet Tutorial

This is a repository to go along with the .NET user group discussion on ReactJs, Redux and 
AspNet Core. The back end is a simple server that has come crud operations for
creating and getting employee objects from the database.

The final application is in the master branch and you can rewind to the begining 
following the instructions in the tutorial section.

## Table of Contents

1. [Requirements](#requirements)
2. [Features](#features)
3. [Getting Started](#getting-started)

## Requirements

* node `^4.2.0`
* npm `^3.0.0`
* Visual Studio 2015

## Getting Started

First clone the source:

```shell
git clone https://github.com/justsayno/React-DotNet
cd React-DotNet
```

You will also need to create a SQL database and set your user secret value for the database connection string. E.G:

``` shell
user-secret set Data:DefaultConnection:ConnectionString "Server={Server_Name};Database={DB_Name};User Id={DB_User };Password={DB_User_Password};"
```

(For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709)

The project has two parts. One is the Server and one is the FrontEnd.

To the server up and runing either open the solution in Visual Studio >=2013, select 
React-DotNet.Server as the startup project and run run. 

If you prefer the command line then use the following commands:

```shell
cd React-DotNet.Server
dnu restore                 # Restore all the packages for the server project
dnx ef database update      # Run the database migrations
dnx web --ASPNET_ENV development   # Use DNX run time to run the project in development mode
```

To start the front end build and hot reloading get back to the root of the project on the command line and
do the following commands:

```shell
cd React-DotNet.Client
npm install                 # Install Node modules listed in ./package.json (may take a while the first time)
npm start                   # Compile and launch and run on localhost:3000 with hot reloading
```

Now load the application in the browser at http://localhost:3000
