---
title: How to setup a custom domain?
categories: advanced
layout: learning_center
permalink: /:title
description: Personalized smart links with custom domains.
---

You can personalize your smart links URLs with custom domains. Thus your smart links will look like `domain.co/TCw1RoX` instead of `yourapp.hoko.link/TCw1RoX`. To activate a custom domain follow these  simple steps:

**1. Purchase the short domain you'd like to use or use a subdomain.**

This domain can only be used for your shortened URLs. We strongly recommend that you only use short domain names, e.g. 10 characters or less. You can also use a previously owned domain and just make a subdomain for HOKO smart links like
`l.mydomain.com`.

**2. Create a DNS record for your domain.**

You can either setup an **A** record (if you're using the full domain as the links domain) or a **CNAME** if you're using a subdomain:

* if it's an **A** record it should point to `52.18.77.36`.
* if it's a **CNAME** it should point to `hoko.link`.

Either way, you should see a screen like this when visiting your address on your browser:

![dns_ready](https://s3-eu-west-1.amazonaws.com/hoko-misc/dns_ready.png)

**3. Tell us about your custom domain.**

If you see the screen above then everything is working on your end. For now, the only way to have a custom domain is if you tell us about it. Send an e-mail to <a href="mailto:support@hokolinks.com">support@hokolinks.com</a> and tell us what is the application and the custom domain you're using and we will manually enable it.

That's it!

(keep in mind that it can take us at most 12 hours to finish the process)

# Troubleshooting:

If the domain is not working here's a list of thinkgs to keep in mind:

1. Have you waited up to 72 hours since you modified DNS? In some cases it can take that long before the DNS change fully takes effect.

2. Log in to your registrar's web site and confirm the A and/or CNAME records(s) you entered match the instructions above.

3. Go to Settings -> Advanced and look in the "Branded Short Domain" section. Does the entry in the Custom domain field match the one you used?

4. If none of these steps work:  if you added or changed CNAME records, some registrars require that the CNAME value ends with a dot (.). Try changing the values of your CNAME records from on.fred.me to on.fred.me. (note the trailing dot).

5. If you want to redirect requests from both `yourdomain.com` and `www.yourdomain.com` you might need to to create just one record with `*.yourdomain.com`.
