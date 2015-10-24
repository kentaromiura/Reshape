#!/bin/sh
FILES=(
	./test_transforms/**/*.js 
	./index.js
)
TRANSFORMS=(
	./test_transforms/objectify.js
	./test_transforms/tabTo2Spaces.js
	./test_transforms/trimSpacesBeforeNewLine.js
	./test_transforms/ensureFilesEndInNewLine.js
)
AFTER_ALL=(
	./test_transforms/applyChanges.js
)
./reshape -p $FILES -e $TRANSFORMS -aa $AFTER_ALL
