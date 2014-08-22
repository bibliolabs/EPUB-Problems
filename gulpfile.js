
var gulp = require("gulp");
var fs = require("fs-extra");
var remove = require("remove");
var glob = require("glob");
var archiver = require("archiver");
var Handlebars = require("handlebars");

// Default performs a clean build
gulp.task("default", ["clean", "build"], function() {});

// Remove all build related files
gulp.task("clean", function() {
	if (fs.existsSync("build")) {
		remove.removeSync("build");
	}

	if (fs.existsSync("target")) {
		remove.removeSync("target");
	}
});

// Setup the build directory structure
gulp.task("prepare", ["clean"], function() {
	fs.mkdirSync("target");
	fs.mkdirSync("build");
	["META-INF", "css", "js", "html", "images"].forEach(function(path) {
		fs.mkdirSync("build/" + path);
	});
});

gulp.task("build", ["prepare"], function() {
	var copy = function(prefix) {
		return function(path) {
			fs.copySync(path, "build/" + path.slice(prefix.length));
		
			return path;
		};
	};
	var trim = function(prefix) {
		return function(path) {
			return path.trim(prefix.length);
		};
	};

	// Move the EPUB source files into the build directory
	var css = glob.sync("src/css/**/*").map(trim("src/")).map(copy());
	var js = glob.sync("src/js/**/*").map(trim("src/")).map(copy());
	var images = glob.sync("src/images/**/*").map(trim("src/")).map(copy());
	var html = glob.sync("src/html/**/*").map(trim("src/")).map(copy());
	
	var packageData = {
		css: css,
		js: js,
		images: images,
		// Ensure ordering of spine items based on filename
		html: html.sort()
	};

	// Compile and write the template files into the build directory
    [{ target: "META-INF/container.xml", template: "container.xml.handlebars", data: {} },
	 { target: "mimetype", template: "mimetype.handlebars", data: {} },
	 { target: "package.opf", template: "package.opf.handlebars", data: packageData }].forEach(function(template) {
		fs.writeFileSync("build/" + template.target, 
			Handlebars.compile(fs.readFileSync("src/templates/" + template.template).toString())(template.data));
	});

	// Write the contents of the build directory into the EPUB file
	// TODO: Zip the build directory into an EPUB .zip file and place in the build directory
	var epub = archiver("zip");
	epub.pipe(fs.createWriteStream("target/problem.epub"));
	epub.bulk([{
		expand: true,
		cwd: "build",
		src: ["build/mimetype", "**"]
	}]);
	epub.finalize();
});

