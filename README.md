# Git Practice Exercises

This repository contains a fake web application, some sample branches and some explanatory text
to help understand and practice some git concepts. The example project is in HTML, CSS, and JavaScript and
the exercises are framed as requests for changes from other departments. The actual are intended to be simple,
the goal here is to get hands-on practice with the git operations that arise.

## How to Use

These exercises are designed to be stepped through in order, and require some coordination of branches to
get the repository in the right state. If you have a facilitator, they can do the parts marked _Facilitator_
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

## Exercise 1: Moving Branches

You open your email to find this message from the web content department:

> Uh oh, Jeff just noticed that the copyright date in the footer hasn't been updated in a while!
> Please get that updated and pushed to production right away!

Here at Tiny Jungle we use the `production` branch to deploy to production and we use `dev` for testing before
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
and we know 100% that the code that was tested by QA is exactly what is now tagged `production`. (Note that this is very 
similar to a "fast forward" merge, which we normally avoid because it can obscure the history of a branch, but it in 
this case it would work perfectly.)

Here's how we do that:

   * Make sure we're on the dev branch and have a clean state with `git status`
   * Move the production branch `git branch -f production`
   
Normally `git branch` wants to make a new branch, but here the `-f` forces it to move the `production` branch to the 
current commit rather than try and create it new. So now if we look at the state of our repository we just see that
our current commit is tagged `dev` and also `production`. To push this to the remote you'll need to switch to the 
branch and push it.

The thing to take away from this exercise is to think about branches as pointers to commits. They can move around and 
change independent of the actual commits in the history.

## Exercise 2: Rebasing

Another day another email:

> Hi, so legal is telling us we need to collect sales tax from our customers now. So we'll need to
> calculate that on top of the cart total and show it to the user and have a new "grand total" below
> that. Thanks!

So you set off and start adding the tax calculations code. At your team stand-up your hear that your colleague Blair is
working on the feature to calculate shipping and show that in a "grand total" below the cart. So they have already
implemented some code that you'll want to use, rather than duplicate it yourself. Blair is almost done and promises to 
merge it into `dev` soon, but what then? You've already started your branch so it will be behind dev. You could do 
something crazy like merge Blair's branch into yours but that goes against best practices and will make a mess of 
the history. You could merge `dev` into your branch which would be slightly less controversial, but would still make 
the history messy by reversing the expected direction of merges. The best thing to do here is to rebase.

_**Facilitator:** Now we'll switch gears for a second and merge Blair's branch. So put a different hat on or 
something, and do the following:_

   * `git checkout dev`
   * `git merge --no-ff blair-add-shipping-and-total`

_Now that work is in `dev` so you can stop being Blair. Switch back to yourself now._

Okay, `dev` now has everything in it we need. Ideally we would be starting our branch right now, but we couldn't just
sit around waiting for everyone else so we had to get started earlier! Since we can't go back in time, we'll need to 
figure out how to get the code we need while not losing the progress we've made so far. (Incidentally, if you find
yourself in this situation and you really haven't done much on your branch yet, it can be easier to just delete it and
start it over from the newly-updated `dev`). 

If we were to do a manual process we might create a new branch off of `dev` and re-do the edits and commits from our 
other branch one by one, after which we'd delete our old branch. That can work if you don't have much in the old branch,
but thankfully rebasing is almost exactly that process, automated by git! Git will start with the `dev` branch and 
_replay_ your commits from your other branch, in order, onto it. This re-writes the history of your branch so it looks
like you started fresh from `dev`, perfect!

Our branch is called `me-add-tax-and-total`, by the way. It already has some commits with the code for calculating tax.
Let's rebase it onto `dev`:

   * `git checkout dev`
   * `git rebase me-add-tax-and-total`
   
You should see output from git with a log of the commits it is applying. If you run into a conflict it will pause part
way through. You can get address the conflict and use `git rebase --continue`, but hopefully you won't run into that yet.

If you look at a visual tool like gitk or SourceTree you should now see your branch with your commits sitting on top of
the up-to-date `dev` branch. Note that if you had already pushed the branch to a remote then `git status` will report
that you are both ahead and behind by some number of commits. To resolve that you need to force push (`git push -f`).
Further note that force pushing is a _really bad idea_ if anyone else has touched the branch or based work on it. So you
should only rebase _your own feature branches_, ideally before they have been pushed to a remote. Rebasing branches that
other people may have copies of should only be done with a _lot_ of communication and team sign-off.

Recommended reading for more detail and guidance: [The Git Book chapter on rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

## Exercise 3 - Merge Conflicts

In order to understand where merge conflicts come from it's important to understand how the changes in a commit are 
applied to files. When you look at a git diff of lines that are changed you will actually see the original line removed
and the modified line added. So there's no such thing as a plain "modify", there is only "remove" and "add". When you
checkout out the branch with the commit and git applies the changes to the files in your working copy it removes and
adds those lines to end up with the right file contents. 

If one commit removes a line and replaces it, and then another commit also has the same line in its remove part, git 
will flag this as a conflict, because it is left in an inconsistent state where it can't reliably make the patch. 
It will mark the problem area with the infamous `<<<<<` and `>>>>>` sections. Between this it will actually put the 
changes from both commits, with a dividing line of `======` between them. It does this so that you, the human, can 
decide which chunk of code "wins". Your job is to reconcile the two, make the changes to the code and leave it in a
working state. Note that you can keep one chunk or the other, or combine parts from each as you choose. Just make sure
the final product is the correct code for the commit.

To see this situation and practice resolving it, let's return to our "tax and total" branch in progress. As often 
happens, there is a critical area of the code that changes for multiple reasons. So both our branch and Blair's both
changed the same line, meaning removed the same old line, meaning that one of the diffs won't apply successfully.

Go ahead and merge the branch that we already rebased:

   * `git checkout dev`
   * `git merge --no-ff me-add-tax-and-total`

Recommended reading for more detail: [The Git Book chapter on basic merge conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts)
