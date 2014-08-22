## EPUB Problems
This is a compilation of poorly formatted HTML, CSS, and Javascript that will cause undesirable output in an easy to maintain format. The goal is to allow anyone to easily add additional examples of issues and build an EPUB 3 file for testing purposes.

### Usage

This project uses NodeJS and Gulp for the build system. Once you've installed NodeJS and the Gulp CLI tool, simply run `gulp` on the command line to build the project. The compiled and organized source will be found in the `./build` directory and the completed EPUB will be located under `./target/problem.epub`.

### Contributing

To add an issue, please place your sources under the appropriate directories inside of `./src`. Please place the appropriate file types in the appropriate directories. All directories within `./src` can be referenced from the root, e.g. `/css/font-size-style.css` or `/images/full-screen-image.css`. There should be one issue per spine item. In some cases, there may be subdirectories within the `./src/html` directory for classes of issues such as `font` or `margin`. Only place issues related to the subtype within the subdirectories. 
