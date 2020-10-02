"use strict";

const Metalsmith = require("metalsmith");
const drafts = require("metalsmith-drafts");
const permalinks = require("metalsmith-permalinks");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const sass = require("metalsmith-sass");

const collections = require("./collections");
const each = require("./each");



// get the handlebars partials and register them
const fs = require("fs");
const path = require("path");

let partials = {};
const incPath = path.join(__dirname, "../tpl/inc");
const files = fs.readdirSync(incPath);

files.forEach(f => partials[f] = fs.readFileSync(path.join(incPath, f), "utf8"));


// create some handlebars helpers
let helpers = {
	"makeId": input => (input || "").trim().toLowerCase().replace(/<small>[^<]+<\/small>/, "").replace("&#x27;", "'").replace(/[\s\W]+/g, "-").replace(/-$/, "")
};


// setup Metalsmith and run
Metalsmith(__dirname)
	.clean(true)
	.metadata({
		siteTitle: "we evolve",
		defaultDescription: "desc",
		baseUrl: "https://we-evolve.co.uk",
		twitter: "stoogoff"
	})
	.source("../src")
	.destination("../dist")

	.use(each((file, key, files) => {
		if(key.endsWith(".DS_Store") || key.endsWith("~")) {
			delete files[key];
		}
	}))
	.use(drafts())
	/*.use(each((file, path) => {
		if(file.collection && !("sort" in file)) {
			if(file.published) {
				file.sort = file.published;
			}
			else if(file.shortTitle) {
				file.sort = file.shortTitle;
			}
			else if(file.title) {
				file.sort = file.title;
			}
		}
	}, ".md"))*/
	.use(collections({
		"games": "title"
	}))
	.use(sass({
		outputDir: "media/css/"
	}))
	.use(markdown({
		smartypants: true,
		gfm: true,
		xhtml: true
	}))
	.use(permalinks({
		relative: false
	}))
	.use(each(f => f.path += f.path ? "/" : "" ))
	.use(each((file, key, files) => {
		if(!file.layout) {
			delete files[key];
		}
	}, ".html"))
	.use(layouts({
		directory: "../tpl",
		engineOptions: {
			partials: partials,
			helpers: helpers
		}
	}))

	// log
	.use(each((f, k) => console.log(k)))

	.build(err => console.log(err || "\n\t...Fin...\n"));