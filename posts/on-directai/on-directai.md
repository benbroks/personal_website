What if you could solve your computer vision problems without collecting or labeling any data?  

That was the question that sparked DirectAI, a company where I ([Ben Brooks](https://www.brooks.team/)) spent the past 1.5 years as a co-founder with [Isaac Robinson](https://www.linkedin.com/in/robinsonish/). In September 2024, we began the process of shutting it down. This is the story of what we learned \- about building software, about sales, and about the challenge of making something people want.  
  

We founded DirectAI on the tailwinds of generative image models ([DALL-E 2](https://cdn.openai.com/papers/dall-e-2.pdf) & [Stable Diffusion](https://stability.ai/news/stable-diffusion-announcement)) demonstrating a step function improvement in semantic understanding. Furthermore, other researchers were demonstrating how multimodal models could be repurposed to achieve strong performance on [zero-shot object detection tasks](https://arxiv.org/pdf/2205.06230). The only problem was that these zero-shot approaches were not controllable (see [zero-shot GLIP performance](https://arxiv.org/pdf/2211.13523)). If they made mistakes, the only option was to tediously re-train or re-prompt them. DirectAI’s core insight was to give users direct, intuitive control over these models without starting from scratch.  
  

Our product allowed users to deploy classifiers, detectors, and trackers with no training data, using simple text prompts to define and refine their class definitions. In practice, our users submitted a JSON definition and had a model ready to go in under a second. Over time, we expanded to offer image-prompting (define a class with a single image), low-latency inference & annotated re-broadcast on live video, self-hosted DirectAI for edge-deployment, and integrations with several streaming partners ([Ant Media](https://antmedia.io/ant-media-computer-vision/), [Livekit](https://twitter.com/livekit/status/1749901224860889380), [Viam](https://www.linkedin.com/posts/benjbrooks_directai-x-viam-poc-instantly-build-object-activity-7158589374966743040-CJfj)). We got paid to do video editing/people tracking for sports analytics, tree-counting for carbon offset verification, content moderation for social media brands, image tagging for interior design, data labeling for a robotics company, object tracking for public safety, and more.  
  

![][image1]  
  

**Learning \#1: You must actively attempt to invalidate your assumptions about what customers want. You’re more biased to believe that your ideas are good than you think.**  
  

The best startups are defined by their ability to learn quickly. They aren’t necessarily better at coming up with ideas than their competitors, they just quickly churn through the bad ones. As soon as you have an idea, you need to ground that in evidence. Imagine a loop like this when you’re pre-revenue:  
  

![][image2]  
  
  
Every component of your product should be motivated by some latent user/customer demand.  
  
  
It’s important to note that there are lots of wrong ways to conduct a user interview. [Mom Test](https://www.momtestbook.com/) goes over a lot of the common mistakes and is worth a read. My hot take is that you should **skip the informal “user interview”** and just go straight to sales calls. The signal:noise ratio is just much higher and you won’t have prospects beat around the bush. They either want to pay or they don’t. Just schedule sales calls and try to sell something you haven't fully built out yet. You don't have to lie about it being complete. Use these meetings to get LOIs or money-back guarantee trials. There isn't a better signal than someone giving you their credit card. And if you can validate an idea without doing any engineering work, you should. Cut out unnecessary fat on your customer feedback loops \- at the beginning that fat may actually be building the product. User interviews where folks give positive feedback but don’t convert to paying customers are negative signals \- best to just avoid these entirely.  
  
  
Our initial hypothesis was that robotics/autonomous vehicle teams would be actively attempting to outsource their perception stack. Isaac had previously trained & deployed vision models for a household robotics company. He noticed that a lot of his colleagues at similar companies were solving undifferentiated detection problems with the same model architectures, but they were all independently collecting/labeling their own custom datasets. Armed with pre-trained VLMs that we thought would generalize well on those types of problems, we pitched to several dozen robotics companies. It turns out that nearly all these teams viewed computer vision as “core IP”. Given how commoditized the robotics hardware stack is, computer vision was one of the few components they could innovate on. When confronted with a build vs. buy decision, they all chose build. DirectAI in its current form did not solve their problems. This was an interesting insight as we needed to frame our problem search around more than just a question of “which teams are actively solving computer vision problems?” \- they also needed to be teams that saw CV as an outsource-able business problem.  
  
  
In the same vein as the “go straight to sales calls” point, you should **use pricing to sort between “interested” and “hair on fire” customers**. It’s an oft-repeated point that you should charge more than you think, which I would nod my head at and say, “Sure, I’ll do that once we get a few customers.” What I failed to realize until the end of our journey is that charging high prices from the outset prevents you from falling down a rabbit hole of serving a set of cheap customers without a real problem. Consider the risk to the business of getting stuck in a local revenue minimum. It’s challenging to convince yourself to pivot if you have a couple customers, even if they’re paying self-serve prices for enterprise-level effort.  
  
  
For example, in the process of negotiating our first contract for object-counting over video files, we decided to come down on price when the customer protested our original quote. Two weeks after signing a deal, we realized that delivering them a solution required much more manual effort than expected. Furthermore, there wasn’t a near-term path to automating that effort away. We decided that our bar for continuing to work on this product had gone up; we needed to raise our price. The customer ended up churning as a result. In retrospect, sticking to a “high” price at the beginning would have taught us the same lesson about the market in far less effort & time.  
  
  
**Learning \#2: Nobody wants raw analytics. They want an end-to-end solution to their problem.**  
  
  
Imagine you have a piece of technology that speeds up a component of someone’s workflow by automating something they would have otherwise had to do manually. Sounds great right? However, this is only worth buying under a strict set of circumstances.  
  
  
![Bad workflow diagram][image3]  

![Quick workflow diagram][image4]
  
  
if your customer needs to context switch between their old workflow and your tool, it may actually be a net-worse experience. If they have to assemble hardware and set up your software to solve their problem, you might not make it past the first sales call. All kinds of momentum exists to prevent adoption, even if you think your product is an obvious choice. This is why you need to ensure you’re targeting a wicked problem and building a solution that’s [10x better than the competition](https://www.fastcompany.com/1738509/heres-why-your-product-needs-be-10x-better-competition-win).  
  
  
At one point in our ideation process, we dropped by a manufacturing packaging conference with the intention of pitching a defect detector for items going down the manufacturing line. We saw dozens of booths of companies selling cardboard boxes, glass jars, plastic containers, and biodegradable cups. After going booth to booth talking to sales reps, we confirmed that defective products making it off the line and out to customers was a real problem. Everyone had some non-zero defect rate and they often had highly manual systems in place to prevent defects from leaving the factory floor. This often involved a bunch of people paid to sit on the line and hand-examine products one by one. At the beginning of the day, we were quite enthused about this \- it seemed like these processes were ripe for automation. While the reps expressed interest once Isaac & I mentioned we could quickly build a detection model, their follow up questions were far outside our wheelhouse. What camera system do you work with? What type of mechanism do you use to physically remove the item from the line once you realize it’s defective? What we learned is that people don’t need a defect detector, they need an end-to-end system that physically prevents defects from being packed up and shipped out.  
  
  
When pitching our first customer, all we had was a data-free image classifier and object detector. Their goal was to display a set of unique objects in a live video stream for their application users. They didn’t want to manually break the video into frames or handle object de-duplication themselves \- they wanted unique IDs and a concise representation of where those objects appeared in the video. A detection model alone wasn’t sufficient. They needed DirectAI’s services to be accessible via an API and seamlessly integrated with their video provider. It wasn’t enough to showcase a cool demo; we had to meet them where their product was.  
  
  
So we set out to build an end-to-end solution for them by integrating with their video provider (see [open source Ant Media plugin](https://github.com/DirectAI/AntMediaPlugin)). This felt like a turning point in DirectAI’s life cycle as we wouldn’t have been motivated to build something like this had we not started talking to customers. This was when it felt like the killer feature turned into a solution to a business problem.  
  
  
**Learning \#3: Partnerships are cool but customers are cooler.**  
  
  
The best place to look for your *n+1th* customer is through the shared characteristics of your *n* existing customers. And after satisfying a customer with our Ant Media integration, we reached out directly to Ant Media to see if any of their customers were actively asking for computer vision integrations.  
  
  
Ant Media was excited to collaborate. We [co-authored a blog post](https://antmedia.io/ant-media-computer-vision/), produced a [promotional video](https://www.youtube.com/watch?v=P8VKFjqqKlc&themeRefresh=1), and they named us “Product of the Month” on their plugin marketplace. And when our first customer changed video providers to Livekit, we built out an integration with them too. Similarly, Livekit was eager to find a way to work together. They even built out a DirectAI [demo](https://x.com/livekit/status/1749901224860889380) (and [plugin](https://pypi.org/project/livekit-plugins-directai/)) as part of their Livekit Agents release. We were motivated by the time and effort that the folks at these partner companies were committing to us. It felt like we were getting closer to product-market fit when we heard them talk about how our plugin would help their customers. They would occasionally even set up meetings with their customers who were looking to integrate computer vision into their applications.  
  
  
However, much of this progress was an illusion.  
  
  
When you’re running an early stage company that’s scaling up post-launch, all of your work should directly lead to driving sales and increasing revenue. We figured that these partnerships would be one such growth avenue. In retrospect, we just weren’t honest with ourselves about how *this was simply work that provided exposure*. Though we initially had a customer that convinced us to build out those integrations, we never closed another customer using that tech. Partnerships are rarely the highest yield path to sales.  
  
  
**What Worked?**  
  
  
Several customers stuck with us until the moment we shut our production service down. A couple of them are even self-hosting [DirectAI’s open-sourced service](https://github.com/DirectAI/simple-data-free-model-server) to this day. For those customers that loved DirectAI the most, we functioned as a drop-in replacement for tools like [Google Vision](https://cloud.google.com/vision) and [Hive](https://hivemoderation.com/). They had niche use cases that didn’t necessitate hiring a dedicated ML engineer but were underserved by the big computer vision players.  
  
  
For example, one interior design platform used DirectAI to tag user-submitted images with over 100 unique categories (e.g. “bedroom”, “couch”, “lamp”, “rug”). We serviced thousands of their requests every day for over a year. A consumer social brand used DirectAI to automatically flag images containing alcohol, shot glasses, or solo cups. A renovation company used DirectAI to detect and count windows/doors in exterior home photos. These wins validated that our product could deliver real value, particularly for software engineers with minimal computer vision experience.  
  
  
However, our sweet spot \- serving niche use cases \- was also our greatest limitation. The market for each use case is **definitionally small** if you assume that the large-scale vision providers are releasing trained models according to user demand. We struggled to repeatedly sell to these disparate customer profiles. As a result, all of our best customers came to us via marketing and SEO, not outbound. In retrospect, we could have doubled down on acquiring this type of customer via product-led growth with an emphasis on self-serve buyers rather than clients with custom needs.  
  
  
**On Failure**  
  
  
While we proudly served a handful of dedicated customers, after several product/market pivots and a couple months of near-zero growth, it was clear that DirectAI wasn’t ready to be a venture-scale business.  
  
  
In reflecting on this experience, I keep coming back to this [Peter Thiel interview](https://tim.blog/wp-content/uploads/2018/07/28-peter-thiel.pdf):  

> Blake Masters: How important is failure in business?
> 
> Peter Thiel: Well, I think failure is massively overrated. Most businesses fail for more than one reason. And so when a business fails, you often don’t learn anything at all because the failure was over determined. You will think it failed for Reason 1, but it failed for Reasons 1 through 5\. And so the next business you start will fail for Reason 2, and then for 3 and so on. 
> 
> And so I think people actually do not learn very much from failure. And I think it ends up being quite damaging and demoralizing to people in the long run. And my sense is that the death of every business is a tragedy. It’s not some sort of beautiful esthetic where there’s a lot of carnage, but that’s how progress happens. And it’s not some sort of educational imperative. So I think failure is neither a Darwinian nor an educational imperative. Failure is always simply a tragedy.
   
  
We attempted to sell technology into a few market segments and it didn’t align with customer needs. We can and should try our best to learn from that negative outcome, but sometimes all you can do is lightly update your priors and try again.  
  
  
P.S. If you’re interested in reading more about DirectAI’s journey, we’ve also open-sourced a year’s worth of our [friends+family updates](https://buttondown.com/ben_startup/archive/).  


[image1]: </images/detector_config.png>

[image2]: </images/interview_cycle.png>

[image3]: </images/bad_flow.png>

[image4]: </images/quick_flow.png>