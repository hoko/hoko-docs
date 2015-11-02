---
title: How to setup a custom domain?
categories: advanced
layout: learning_center
permalink: /:title
description: Personalized smart links with custom domains.
---

Setup a custom domain to generate smart links with your domain,
e.g. `http://myapp.link/TCw1RoX`. This is a bit tricky but we will assist you through the process.

Before hand, we recommend you to have knowledge about the DNS records, network and SSL certificates
of your domain. After that you must point your custom domain to us and setup a secure
custom domain.

**Be aware that since the official release of Android Marshmallow and iOS 9 your custom domain must
be accessible through a secure connection (HTTPS/SSL).**

## Point your custom domain to HOKO

You can personalize your smart links URLs with custom domains. Hence your smart links will look
like `domain.co/TCw1RoX` instead of `yourapp.hoko.link/TCw1RoX`. To activate a custom domain follow
these simple steps:

**1. Purchase the short domain you'd like to use or use a subdomain.**

This domain can only be used for your shortened URLs. We strongly recommend that you only use short
domain names, e.g. 10 characters or less. You can also use a previously owned domain and just make
a subdomain for HOKO smart links like `l.mydomain.com`.

**2. Create a DNS record for your domain.**

You can either setup an **A** record (if you're using the full domain as the links domain) or a
**CNAME** if you're using a subdomain:

* if it's a root domain (like mydomain.com) create an **A** record pointing to `52.18.77.36`.
* if it's a subdomain (like link.myd.co) create a **CNAME** record pointing to `hoko.link`.

Either way, you should see a screen like this when visiting your address on your browser:

![dns_ready](https://s3-eu-west-1.amazonaws.com/hoko-misc/dns_ready.png)

**3. Tell us about your custom domain.**

If you see the screen above then everything is working on your end. For now, the only way to have a
custom domain is if you tell us about it.

Send an e-mail to <a href="mailto:support@hokolinks.com">support@hokolinks.com</a> and tell us what
is the application and the custom domain that you are using and we will manually enable it whitin
24 hours.

## Setup a secure custom domain

With Android Marshmallow’s new App Links and iOS 9 Universal Links, your custom domain must support
SSL communications (HTTPS) because your app will request an authentication file using a HTTPS
request.

You can check this configuration file by opening
`https://yoursubdomain.hoko.link/apple-app-site-association` or
`https://yoursubdomain.hoko.link/.well-known/assetlinks.json`

We provide this certification for free with our standard sub domains. Internally we use
[Namecheap.com](http://www.namecheap.com) as our registar and for SSL we use their
[Comodo](http://www.comodo.com) certificates.

If you want to use a custom domain you must then buy a SSL certificate and send us the bundle file
provided by the CA and your private key. We will then perform the same actions one would perform in
a web server to secure a domain using a SSL certificate.

Alternatively, you can quickly have SSL using [Cloudflare](https://www.cloudflare.com/), which is
free and easy to setup. Create an account with your custom domain and point the latter to us
through a CNAME / A record and use the IP address described above. After this configuration you
must wait up to 24 hours for the change to be propagated through the Internet.

## Troubleshooting

If the domain is not working here's a list of thinkgs to keep in mind:

1. Have you waited up to 72 hours since you modified DNS? In some cases it can take that long before
the DNS change fully takes effect.

2. Log in to your registrar's web site and confirm the **A** or **CNAME** record you entered match
the instructions above.

4. If none of these steps work: if you added or changed a CNAME record, some registrars require that
the CNAME value ends with a dot (.). Try changing the values of your CNAME records from
`l.mydomain.com` to `l.mydomain.com.` (note the trailing dot).
