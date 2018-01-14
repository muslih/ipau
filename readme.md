# Ipau
A design which makes you start your own front-end development without hurt.

## History
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure dolores id, vel nihil unde, fugit, doloribus eligendi voluptates eos ad laboriosam excepturi voluptatibus culpa eaque quaerat officia eius corporis consequatur.

## About Ipau

## Install
Make sure you installed yarn in your machine! 

1. Clone this repo and set rename the folder with whatever you want,
```bash 
git clone git@github.com:muslih/ipau.git myweb
cd myweb/
```
2. Run install command
```bash
yarn install && bower install
```
3. Ready to go for development!
```bash
yarn run dev
```

## Features

## Directory Structure
Below the directory structure
```bash
.
├── app
│   ├── 404.html
│   ├── LICENSE.txt
│   ├── apple-touch-icon.png
│   ├── browserconfig.xml
│   ├── crossdomain.xml
│   ├── css
│   │   └── main.css
│   ├── favicon.ico
│   ├── fonts
│   │   └── bootstrap
│   │       ├── glyphicons-halflings-regular.eot
│   │       ├── glyphicons-halflings-regular.svg
│   │       ├── glyphicons-halflings-regular.ttf
│   │       ├── glyphicons-halflings-regular.woff
│   │       └── glyphicons-halflings-regular.woff2
│   ├── humans.txt
│   ├── img
│   ├── index.html
│   ├── js
│   │   ├── main.js
│   │   └── plugins.js
│   ├── robots.txt
│   ├── tile-wide.png
│   └── tile.png
├── bower.json
├── gulpfile.js
├── package.json
├── readme.md
├── src
│   ├── concat
│   │   └── concat.js
│   ├── css
│   │   ├── _variable.scss
│   │   └── main.scss
│   ├── js
│   │   ├── main.js
│   │   └── waluh.js
│   ├── pages
│   │   └── index.ipau
│   └── templates
│       └── layout.ipau
└── yarn.lock
```

All web generated in `app` directory don't change files in this directory because it will change automatically once we changed any file in `src` directory

### Add new page
To add new page just create a file with `ipau` extension inside `src/pages` directory, and make sure you exteds the layout and put the content inside the blocks as below
```html
{% extends "main-layout.ipau" %}

{% block content %}
<h1>This is the new page</h1>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis reprehenderit, eum libero molestias repudiandae quis rerum. Rerum nesciunt cupiditate, molestiae consectetur cum laborum hic laudantium omnis, delectus alias molestias debitis.
</p>
{% endblock %}
```
You can find all the layouts in `src/templates` just pick one and put it above the file as explained before.

### Add new layout
To add new layout you can create new file inside `src/templates/` and make sure the file with  `ipau` extension. Don't forget to add block content inside new layout file, so it can be called in page file

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  {% block content %} {% endblock %}
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

## Lisence

Ipau is licensed under the [☺ license.](http://licence.visualidiot.com/).

You, the licensee, are hereby granted free usage in both personal and commerical environments, without any obligation of attribution or payment (monetary or otherwise). The licensee is free to use, copy, modify, publish, distribute, sublicence, and/or merchandise the work, subject to the licensee inflecting a positive message unto someone. This includes (but is not limited to): smiling, being nice, saying “thank you”, assisting other persons, or any similar actions percolating the given concept.

The above copyright notice serves as a permissions notice also, and may optionally be included in copies or portions of the work.

The work is provided “as is”, without warranty or support, express or implied. The author(s) are not liable for any damages, misuse, or other claim, whether from or as a consequence of usage of the given work.


