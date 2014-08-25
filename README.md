## EPUB Problems
This is a compilation of poorly formatted XHTML, CSS, and Javascript that will cause undesirable output in an easy to maintain format. The goal is to allow anyone to easily add additional examples of issues and build an EPUB 3 file for testing purposes.

### Usage

This project uses NodeJS and Gulp for the build system. Once you've installed NodeJS and the Gulp CLI tool, simply run `gulp` on the command line to build the project. The compiled and organized source will be found in the `./build` directory and the completed EPUB will be located under `./target/problem.epub`.

#### First Time

If you are using this project for the first time, you will need to have some things in place to get started. You will need to install Node on your machine. I will leave this as an exercise to the reader. Once you have Node installed, navigate to the this project's directory. You will need to execute the following commands in order to setup the project:

```bash
# Install the CLI for our build tool
npm install gulp --global
# Install our local build dependencies
npm install
```

Once these commands have run, you will be able to build the project by running `gulp`.

### Contributing

To add an issue, please place your sources under the appropriate directories inside of `./src`. Please place the appropriate file types in the appropriate directories. There should be one issue per spine item. In some cases, there may be subdirectories within the `./src/xhtml` directory for classes of issues such as `font` or `margin`. Only place issues related to the subtype within the subdirectories. 
