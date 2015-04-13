---
title: What is my URL scheme?
categories: advanced
layout: learning_center
permalink: /:categories/:title
---

A URL scheme is what identifies your app deep links and how other apps can link into it. All of URL
schemes are formed by a scheme name, followed by a colon character (":"), and the remainder of the
URI called the scheme-specific part.

The scheme name is a string that you choose for your own apps
(usually for your own company) so if your company is called *MyCompany* you can use `com.mycompany`
and your complete URL scheme would look like:

{% highlight java %}
com.mycompany://
{% endhighlight %}

A URL scheme allows you to launch a native application from another app or a web application. You
can set options in the URL that will be passed to the launched application.

A request to the Google Maps URL Scheme should be of the following form:

comgooglemaps://?parameters
Parameters are described in detail later in this document.

Before you present one of these URLs to a user in your app you should first verify that the application is installed. Your app can check that the URL scheme is available with the following code:

A URI scheme is the top level of the uniform resource identifier (URI) naming structure in computer networking. All URIs and absolute URI references are formed with a scheme name, followed by a colon character (":"), and the remainder of the URI called (in the outdated RFCs 1738 and 2396, but not the current STD 66/RFC 3986) the scheme-specific part. The syntax and semantics of the scheme-specific part are left largely to the specifications governing individual schemes, subject to certain constraints such as reserved characters and how to "escape" them.

URI schemes are frequently and incorrectly referred to as "protocols", or specifically as URI protocols or URL protocols, since most were originally designed to be used with a particular protocol, and often have the same name. The http scheme, for instance, is generally used for interacting with web resources using HyperText Transfer Protocol. Today, URIs with that scheme are also used for other purposes, such as RDF resource identifiers and XML namespaces, that are not related to the protocol. Furthermore, some URI schemes are not associated with any specific protocol (e.g. "file") and many others do not use the name of a protocol as their prefix (e.g. "news").

URI schemes should be registered with IANA, although non-registered schemes are used in practice. RFC 4395 describes the procedures for registering new URI schemes.

Contents  [hide] 
1 Generic syntax
1.1 Examples
2 Official IANA-registered schemes
3 Unofficial but common URI schemes
4 References
5 External links
Generic syntax[edit]
Internet standard STD 66 (also RFC 3986) defines the generic syntax to be used in all URI schemes. Every URI is defined as consisting of four parts, as follows:

<scheme name> : <hierarchical part> [ ? <query> ] [ # <fragment> ]
The scheme name consists of a sequence of characters beginning with a letter and followed by any combination of letters, digits, plus ("+"), period ("."), or hyphen ("-"). Although schemes are case-insensitive, the canonical form is lowercase and documents that specify schemes must do so with lowercase letters. The scheme name is followed by a colon (":").

The hierarchical part of the URI is intended to hold identification information hierarchical in nature. If this part begins with a double forward slash ("//"), it is followed by an authority part and a path. If the hierarchical part doesn't begin with ("//") it contains only a path.

The authority part holds an optional user-information part, terminated with "@" (e.g. username:password@); a hostname (e.g., domain name or IP address); and an optional port number, preceded by a colon ":".
The path part, if present, may optionally begin with a single forward slash ("/"). It may not begin with two slash characters ("//"). The path is a sequence of segments (conceptually similar to directories, though not necessarily representing them) separated by a forward slash ("/"). Historically, each segment was specified to contain parameters separated from it using a semicolon (";"), though this was rarely used in practice and current specifications allow but no longer specify such semantics.
The query is an optional part, separated by a question mark ("?"), that contains additional identification information that is not hierarchical in nature. The syntax of the query string is not well defined; however by convention it is most often a sequence of <key>=<value> pairs separated by a semicolon[1][2][3] or an ampersand. For example:

Semicolon: key1=value1;key2=value2;key3=value3
Ampersand: key1=value1&key2=value2&key3=value3
The fragment is an optional part separated from the front parts by a hash ("#"). It holds additional identifying information that provides direction to a secondary resource, e.g., a section heading (in an article) identified by the remainder of the URI. When the primary resource is an HTML document, the fragment is often an id attribute of a specific element and web browsers will make sure this element is visible.

Examples[edit]
The following figure displays two example URIs (foo://username:password@example.com:8042/over/there/index.dtb?type=animal&name=narwhal#nose and urn:example:animal:ferret:nose) and their component parts. (The examples are derived from RFC 3986 — STD 66, chapter 3).

  foo://username:password@example.com:8042/over/there/index.dtb?type=animal&name=narwhal#nose
  \_/   \_______________/ \_________/ \__/            \___/ \_/ \______________________/ \__/
   |           |               |       |                |    |            |                |
   |       userinfo           host    port              |    |          query          fragment
   |    \________________________________/\_____________|____|/ \__/        \__/
 scheme                 |                          |    |    |    |          |
  name              authority                      |    |    |    |          |
   |                                             path   |    |    interpretable as keys
   |                                                    |    |
   |    \_______________________________________________|____|/       \____/     \_____/
   |                         |                          |    |          |           |
 scheme              hierarchical part                  |    |    interpretable as values
  name                                                  |    |
   |            path               interpretable as filename |
   |   ___________|____________                              |
  / \ /                        \                             |
  urn:example:animal:ferret:nose               interpretable as extension

                path
         _________|________
 scheme /                  \
  name  userinfo  hostname       query
  _|__   ___|__   ____|____   _____|_____
 /    \ /      \ /         \ /           \
 mailto:username@example.com?subject=Topic
