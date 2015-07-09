---
title: Setting up a custom domain
categories: advanced
layout: learning_center
permalink: /:title
description: Personalized smart links with custom domains.
---

You can personalize your smart links URLs with custom domains. Thus your smart links will look like `http://www.yourdomain.com/TCw1RoX` instead of `http://yourapp.hoko.link/TCw1RoX`.To activate a custom domain follow these steps:

**1.** Purchase the short domain you'd like to use. This domain can only be used for your shortened URLs*. We strongly recommend that you only use short domain names, e.g. 10 characters or less (including the dot).

**2.** Tell HOKO about your custom domain. **UPDATE: This is work in progress. Send an e-mail to <a href="mailto:support@hokolinks.com">support@hokolinks.com</a> and tell us what is your custom domain and we will manually set it up.**

**3.** Create a DNS record for your domain.

The Domain Name System (DNS) is what allows a web browser to translate a domain to a website. You will need to tell DNS that your custom domain now should point to HOKO.

The way you update DNS varies depending on your domain registrar, but should be something like this:

**1.** Log into your domain registrar's website.

**2.** Select the short domain you want to modify.

**3.** Find the section for managing DNS entries, or a similar phrase ("DNS Configuration," "DNS Records", "Advanced DNS," "Total DNS", "Host records,"...)

**4.** Add a new DNS record with `www.yourdomain.com CNAME yourapp.hoko.link`. The CNAME record will redirect your traffic from `www.yourdomain.com` to HOKO.

It can take up to 72 hours for domain changes to propagate. You’ll know the DNS has been set up correctly when you have the ability to default your short domain in your HOKO settings. When this feature is available, click on default to make sure all your links have your new brand.

# Troubleshooting:

> I’ve followed instructions but my custom domain still doesn't work.

Things to check:

**1.**  Have you waited up to 72 hours since you modified DNS? In some cases it can take that long before the DNS change fully takes effect.

**2.** Log in to your registrar's web site and confirm the A and/or CNAME records(s) you entered match the instructions above.

**3.** Go to Settings -> Advanced and look in the "Branded Short Domain" section. Does the entry in the Custom domain field match the one you used?

**4.** If none of these steps work:  if you added or changed CNAME records, some registrars require that the CNAME value ends with a dot (.). Try changing the values of your CNAME records from on.fred.me to on.fred.me. (note the trailing dot).

**5.** If you want to redirect requests from both `yourdomain.com` and `www.yourdomain.com` you might need to to create just one record with `*.yourdomain.com`.
