# Git Practice Exercises

This repository contains some a very fake web application, some sample branches and some explanatory text
to help understand and practice some git concepts. The example project is in HTML, CSS, and JavaScript and
the exercises are framed as requests for changes from other departments. The actual changes should be simple,
the goal here is to get hands-on practice with the git operations that arise.

## How to Use

These exercises are designed to be stepped through in order, and require some coordination of branches to
get the repository in the right state. If you have a faciliatator, they can do the parts marked _Facilitator_
otherwise you can do them yourself.

Either way, everyone doing the exercise should **fork the repository**!

## Topics

   * What a branch actually is, and how you can manipulate them
   * Rebasing
   * Merge Conflicts

Also covered along the way:

   * Good commit messages
   * Resetting your working copy and starting clean

## Exercises

Welcome to the web team here at Tiny Jungle. Our founder wrote this awesome shopping cart app himself at the end of the
last century. We're sure you'll have lots of fun keeping it up to date!

Follow along with the requests below. They are aimed to be simple to implement 

## Exercise 1: Moving Branches

You open your email to find this message from the web content department:

> Uh oh, Jeff just noticed that the copyright date in the footer hasn't been updated in a while!
> Please get that updated and pushed to production right away!

Here at Tiny Jungle we use the `production` branch in git to deploy to production. We also use `dev` for testing before
release. So your goal is to get your changes onto the dev branch and then to production. We'll look at two ways of
doing that.

### Making the Change

   * First, make sure you are on the dev branch and in a clean state by typing `git status` (doesn't hurt to `git pull`
     to make sure you have the latest changes before you start).
   * Make a feature branch for your work `git checkout -b update-copyright-year`. You want the branch name to be
     descriptive of the work you're doing.
   * Make the change (a quick edit to the html file)
   * Add and commit: `git add index.html` and `git commit -m "Update copyright year in shopping cart footer"`
   * Merge your work into dev: `git checkout dev` and `git merge --no-ff update-copyright-year`
   * Optional but a good idea: clean up your feature branch `git branch -d update-copyright-year`

Okay, you should now have a dev branch with the correct copyright year. So now how do we get those changes to 
production? Many teams just merge the dev branch into production. There's nothing wrong with this other than the usual
sorts of problems that can arise from merging branches. But there is another way to do it that is potentially a little 
bit cleaner, and will help clarify what a branch actually _is_.

If you have read the chapter from the [Git book](http://git-scm.com) about branches - 
[Git Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell#_create_new_branch) - 
you will know that a branch is really just a pointer to a specific commit in the repository's history. 
When you make a new commit on a branch the pointer automatically moves up, including if you merge another branch. 

We can use that to our advantage and avoid adding any additional commits or doing any merges. It works like this: after
QA has tested the changes on dev and we're ready to promote them to production, we just move the `production` branch
pointer to where `dev` currently is. This is cool because there's no merge, there's no additional commits in the history,
and we know 100% that the code that was tested by QA is exactly what is now tagged `production`.

Here's how we do that:

   * Make sure we're on the dev branch and have a clean state with `git status`
   * Move the production branch `git branch -f production`
   
Normally `git branch` wants to make a new branch, but here the `-f` forces it to move the `production` branch to the 
current commit rather than try and create it new. So now if we look at the state of our repository we just see that
our current commit is tagged `dev` and also `production`. To push this to the remote you'll need to switch to the 
branch and push it.

The thing to take away from this exercise is to think about branches as pointers to commits. They can move around and 
change independent of the actual commits in the history.

