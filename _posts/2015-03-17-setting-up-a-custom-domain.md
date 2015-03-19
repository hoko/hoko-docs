---
title: Setting up a custom domain
categories: advanced
layout: learning_center
permalink: /:categories/:title
---

The Branded Short Domain is the domain that takes the place of "bit.ly" or “bitly.com” in a shortened URL. To start using a Branded Short Domain, follow these steps:

1) Purchase the short domain you'd like to use. This domain can only be used for your shortened URLs*. Domai.nr is a great place to begin your search, and 101domain has lots of exotic short domains for sale. Your short domain name needs to be 15 characters or less (including the dot).

2) Tell Bitly about your domain. Sign in to your Bitly account, go to 'settings' from the upper right pull-down menu and click on the 'Advanced' tab (or click here.)

Under 'Branded Short Domain' let us know if you plan to use your Branded Short Domain for personal or business use. Free users may only use branded short domains personally and non-commercially. If you're interested in using branding for your business, you can read more about Bitly Brand Tools here!
​

You can add your Branded Short Domain in the text box provided. Note: you will need to verify your email address to take this step. You can do that here.

We recommend completing this step first before modifying DNS, so that if you are moving over an existing site you won’t experience any interruption in service. However, don’t take this step until you are ready to update your DNS records. Learn how to do that below.

3) Create a DNS record for your domain.

The Domain Name System (DNS) is what allows a web browser to translate a domain to a website. You will need to tell DNS that your custom domain now should point to Bitly.

The way you update DNS varies depending on your domain registrar. In general, the process goes something like this:
1.  Log into your domain registrar's website.
2.  Select the short domain you want to modify.
3.  Find the section for managing DNS entries. The name of this section varies, but is usually something like "DNS Configuration," "DNS Records", "Advanced DNS," "Total DNS", "Host records," or similar.
4.  The next step differs depending on whether you are using a Short Domain or a Subdomain.

For a Short Domain:
Edit the existing A record for your site and change the IP address to 69.58.188.49 If there is no existing A record (which is uncommon), add a new one. The A record's "host name" should be either the character @ or your base domain (both mean the same thing). You should only have one A Record. If you have more than one, remove all others and leave only the one pointing to Bitly's IP.

Note: In your DNS, you can also add a "www" entry for your domain name, which you will point to 'cname.bitly.com'. For example, if your short domain was 'fred.me' you'd point your CNAME record for 'www.fred.me' to 'cname.bitly.com.'

For a subdomain (such as on.wsj.com):
Set the CNAME Record for that subdomain to point to cname.bitly.com. When entering your subdomain, enter only the portion before the first dot. For example, with on.wsj.com you would just type in on.


Here is an example of correct DNS settings for a Branded Short Domain (not a subdomain) on iwantmyname.com: 




It can take up to 48 hours for domain changes to propagate. You’ll know the DNS has been set up correctly when you have the ability to default your short domain in your Bitly settings under ‘advanced’.  



Troubleshooting:

Modifying DNS is the hardest part of this process because of the variation in registrar web sites and because of DNS's strange terminology. It may take some time and searching to find the right page. If you are stuck during this process we suggest emailing your domain registrar’s support team.
The email can say something like this:


Dear Support,
In order to point my domain [your domain here] to Bitly (http://bitly.com), a hosting service, I need to modify DNS to update my A and CNAME records. Please let me know how I can do this through your domain management interface.
Many Thanks,
[you]


Note:  A records and CNAME records are different from nameservers (such as ns1.godaddy.com), which Bitly does not provide. If you are being asked to enter a nameserver, please use the one provided by your registrar, which should allow you to set an A record and/or CNAME from within your registrar’s dashboard.
 
I’ve followed instructions but my custom domain still isn’t working. 

Things to check:
1.  Have you waited up to 48 hours since you modified DNS? In some cases it can take that long before the DNS change fully takes effect.
2.  Log in to your registrar's web site and confirm the A and/or CNAME records(s) you entered match the instructions above.
3.  Go to Settings -> Advanced and look in the "Branded Short Domain" section. Does the entry in the Custom domain field match the one you used?
4.  If none of these steps work:  if you added or changed CNAME records, some registrars require that the CNAME value ends with a dot (.). Try changing the values of your CNAME records from on.fred.me to on.fred.me. (note the trailing dot).
