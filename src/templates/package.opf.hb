<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="3.0" xml:lang="en" unique-identifier="ident">
  <metadata>
    <!-- Metadata starts -->
    <dc:identifier xmlns:dc="http://purl.org/dc/elements/1.1/" id="ident">BiblioLabsTestEPUB08062014</dc:identifier>
    <dc:title xmlns:dc="http://purl.org/dc/elements/1.1/">Problem EPUB</dc:title>
    <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">BiblioLabs</dc:creator>
    <dc:date xmlns:dc="http://purl.org/dc/elements/1.1/">2014-08-06T17:39:00</dc:date>
    <dc:language xmlns:dc="http://purl.org/dc/elements/1.1/">en-US</dc:language>
    <meta property="dcterms:modified">2014-08-06T17:39:00Z</meta>
    <!-- Metadata ends -->
  </metadata>
  <manifest>
    <!--List all files in the ePub-->
	<!-- TODO: Create ToC -->
    <!-- <item id="nav" properties="nav" href="html/toc.xhtml" media-type="application/xhtml+xml"/> -->
	{{#each css}}
	<item id="css_{{this}}" href="{{this}}" media-type="text/css" />
	{{/each}}
	{{#each js}}
	<item id="js_{{this}}" href="{{this}}" media-type="application/javascript" />
	{{/each}}
	{{#each images}}
	<item id="image_{{this}}" href="{{this}}" media-type="image/png" />
	{{/each}}
	{{#each html}}
	<item id="html_{{this}}" href="{{this}}" media-type="application/xhtml+xml" />
	{{/each}}
  </manifest>
  <spine>
    <!--Reference all spine items in the ePub-->
	<!-- TODO: Add ToC reference -->
    <!-- <itemref idref="nav" linear="no"/> -->
  
  	{{#each html}}
	<itemref idref="html_{{this}}" linear="yes" />
	{{/each}}
  </spine>
</package>
