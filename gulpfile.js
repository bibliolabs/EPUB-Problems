
var gulp = require("gulp");
var fs = require("fs");

// Default performs a clean build
gulp.task("default", ["clean", "build"], function() {});

// Remove all build related files
gulp.task("clean", function() {
	fs.rmdir("build", function() {});
});

// Setup the build directory structure
gulp.task("prepare", function() {
	fs.mkdirSync("build");
	["META-INF", "css", "js", "html", "images"].forEach(function(path) {
		fs.mkdirSync("build/" + path);
	});
});

gulp.task("build", ["prepare"], function() {

});

// TODO: Compile list of HTML, CSS, JS, and images for the manifest
// TODO: Order the spine items based on order of directory names and then finally the file names
// TODO: Generate files based on templates

// TODO: Create templates for `package.opf`, `META-INF/container.xml`, & `mimetype`

