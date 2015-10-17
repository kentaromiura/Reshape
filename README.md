Reshape
===========

_Reshape your code_

Reshape is a refactoring tool that you can use to make changes to your JavaScript projects in a easy to test way

Reshape will accept a glob and/or a list of files and run a series of transforms on this file paths,
the output of every transform gets feed as the input of the next one, 
once finished it will pass the results of all those transforms to another list of transform,
so that they can act at a global level.

Example
=======

Let's say we have an input folder like this
```
./test/input/
├── a.js
├── b.js
└── c.js
```

where _c_ just requires _a_ and _b_ which in our example are just plain objects.

We want to move those files to an _output_ directory, 
then we want to rename those files to add _reshaped_ in front of the file name,
then though c.js will try to require a and b, but those don't exist anymore, 
so we have to change the source to reflect the name change.

so we want to write a series of refactor step

*objectify* will take a path and create and object of the type:
```
{
	path,
	source
}
```

as you can notice the first transform will always take an array of String and can return whatever you want,
in my case I'll just return an object so I can decorate it with all the metadata I need

then this object will be feed to *move* that will just set a _delete_ flag with the current path before modifying it to the new one
then the path will be again changed by *rename* to add the _reshaped_ in front of the source name
then *fixRequires* will use [jscodeshift](https://github.com/facebook/jscodeshift) (which is always passed as a second parameter) to find and replace the _require_ s using static analysis

up until this point nothing really happened, we just collected actions to do, we now need an
*applyChanges* transform that uses the collected metadata and does actions on those

the command for applying all this series of refactoring will just be:

```
./reshape -p ./test/**/*.js -e ./test_transforms/objectify.js ./test_transforms/move.js ./test_transforms/rename.js -aa ./test_transforms/fixRequires.js ./test_transforms/applyChanges.js
```
or if your shell don't support glob
```
./reshape -p "./test/**/*.js" -e ./test_transforms/objectify.js ./test_transforms/move.js ./test_transforms/rename.js -aa ./test_transforms/fixRequires.js ./test_transforms/applyChanges.js
```
