
var gulp = require("gulp");
var fs = require("fs-extra");
var remove = require("remove");
var glob = require("glob");
var zlib = require("zlib");
var archiver = require("archiver");
var uuid = require("node-uuid");
var Handlebars = require("handlebars");

// Configurations
var config = {
	source: "./src/",
	build: "./build/",
	target: "./target/",
	src: {
		xhtml: "./src/xhtml/",
		css: "./src/css/",
		js: "./src/js/",
		images: "./src/images/",
		templates: "./src/templates/"
	}
};

// Default performs a clean build
gulp.task("default", ["clean", "build"], function() {});

// Remove all build related files
gulp.task("clean", function() {
	if (fs.existsSync(config.build)) {
		remove.removeSync(config.build);
	}

	if (fs.existsSync(config.target)) {
		remove.removeSync(config.target);
	}
});

// Setup the build directory structure
gulp.task("prepare", ["clean"], function() {
	fs.mkdirSync(config.target);
	fs.mkdirSync(config.build);
	["META-INF", "css", "js", "xhtml", "images"].forEach(function(path) {
		fs.mkdirSync(config.build + path);
	});
});

gulp.task("build", ["prepare"], function() {
	var copy = function() {
		return function(path) {
			fs.copySync(config.source + path, config.build + path);
		
			return path;
		};
	};
	var trim = function(prefix) {
		return function(path) {
			return path.slice(prefix.length);
		};
	};

	// Move the EPUB source files into the build directory
	var css = glob.sync(config.src.css +  "**/*.css").map(trim(config.source)).map(copy());
	var js = glob.sync(config.src.js + "**/*.js").map(trim(config.source)).map(copy());
	var images = glob.sync(config.src.images + "**/*.*").map(trim(config.source)).map(copy());
	var xhtml = glob.sync(config.src.xhtml + "**/*.xhtml").map(trim(config.source)).map(copy());
	
	var mapper = function(path) {
		return {
			id: "id_" + uuid.v4(),
			path: path
		};
	};
	var packageData = {
		css: css.map(mapper),
		js: js.map(mapper),
		images: images.map(mapper),
		// Ensure ordering of spine items based on filename
		xhtml: xhtml.sort().map(mapper)
	};
	var tableData = {
		xhtml: xhtml.sort().map(trim("xhtml/")).map(mapper)
	};
	
	// Compile and write the template files into the build directory
    [{ target: "META-INF/container.xml", template: "container.xml.handlebars", data: {} },
	 { target: "mimetype", template: "mimetype.handlebars", data: {} },
	 { target: "package.opf", template: "package.opf.handlebars", data: packageData },
	 { target: "xhtml/toc.xhtml", template: "toc.xhtml.handlebars", data: tableData }].forEach(function(template) {
		fs.writeFileSync(config.build + template.target, 
		Handlebars.compile(fs.readFileSync(config.src.templates + template.template).toString())(template.data));
	});

	// Write the contents of the build directory into the EPUB file
	var epub = archiver("zip", { zlib: { level: zlib.Z_NO_COMPRESSION } });
	epub.pipe(fs.createWriteStream(config.target + "problem.epub"));
	epub.bulk([{
		expand: true,
		cwd: "build",
		src: ["mimetype", "**/*"]
	}]);
	epub.finalize();
});

