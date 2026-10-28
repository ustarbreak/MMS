-- MediasMakers Sample Data for Service Delivery
-- Run this after service_delivery_schema.sql to populate demo data
--
-- IMPORTANT: Replace the UUIDs with actual IDs from your system
-- This is for demonstration purposes only

-- ─── SAMPLE AUDIT REPORT ──────────────────────────────────────────────────────
-- For a fitness creator on Instagram

INSERT INTO audit_reports (
  platform,
  niche,
  target_audience,
  main_objective,
  profile_url,
  profile_data,
  customer_notes,
  executive_summary,
  profile_positioning,
  bio_suggestions,
  content_strategy,
  recommended_formats,
  content_ideas,
  seven_day_plan,
  performance_metrics,
  next_steps,
  status,
  generated_by
) VALUES (
  'Instagram',
  'Fitness & Wellness',
  'Women 25-40 interested in home workouts and healthy living',
  'Grow engaged following and establish authority in home fitness space',
  'https://instagram.com/samplefitnesscreator',
  '{"followers": 2500, "following": 800, "posts": 150, "engagement_rate": "2.1%"}'::jsonb,
  'Customer wants to focus on busy moms who want quick home workouts',
  'Sample Fitness Creator has built a solid foundation with 2,500 followers and consistent posting. The profile shows clear niche focus on fitness, but there are opportunities to improve discoverability and engagement. Current content mix leans heavily on workout videos, with limited educational or community-building content. The bio effectively communicates the value proposition but could be optimized for search and clarity. With strategic adjustments to content mix, posting schedule, and engagement tactics, significant growth potential exists within the next 90 days.',
  'Current positioning: "Fitness creator sharing workouts." This is clear but generic. Recommended repositioning: "Helping busy women transform their health with 20-minute home workouts. No gym required. Join 2,500+ women building stronger bodies at home." This positions the creator as a solution provider for a specific audience pain point (busy schedules) and includes social proof.',
  'Current bio: "Fitness enthusiast | Workouts | DM for coaching"
Suggested bio:
"🏋️‍♀️ Home workouts for busy women
⏱️ 20-min routines that actually work
💪 2,500+ women training with me
👇 Free 7-day starter plan"

Changes made:
1. Added emoji for visual appeal and scannability
2. Specified target audience (busy women)
3. Highlighted key benefit (20-min routines)
4. Included social proof (2,500+ women)
5. Added clear CTA with value offer (free plan)

Name field: Change from personal name to "Sarah | Home Fitness Coach" for better searchability.',
  'Content Pillars:
1. Quick Workouts (40%) - 20-min or less routines
2. Education (25%) - Form tips, nutrition basics, mindset
3. Community (20%) - Q&A, transformations, behind-the-scenes
4. Promotion (15%) - Coaching offers, program launches

Posting Schedule:
- Monday: Quick Workout (Reel)
- Tuesday: Educational tip (Carousel)
- Wednesday: Community/Q&A (Story series)
- Thursday: Quick Workout (Reel)
- Friday: Motivation/Mindset (Single image or Reel)
- Saturday: Educational (Carousel)
- Sunday: Rest/Behind-the-scenes (Story)

Best posting times: 7-8 AM and 7-8 PM (when target audience is most active)

Engagement Tactics:
- Respond to all comments within 2 hours
- Use question stickers in Stories daily
- Engage with 10 accounts in niche daily (genuine comments)
- Use 5-8 relevant hashtags (mix of popular and niche)',
  '["Short-form Reels (15-30 seconds)", "Educational carousels (5-7 slides)", "Story series with interactive elements", "Before/after transformation posts", "Quick tip single-image posts"]'::jsonb,
  '[
    {"title": "5-Minute Morning Energy Boost", "type": "Reel", "description": "Quick 5-exercise routine perfect for busy mornings. Show each exercise with timer overlay.", "engagement_level": "high"},
    {"title": "Common Squat Mistakes", "type": "Carousel", "description": "5-slide carousel showing proper squat form vs common mistakes. Include cues for each correction.", "engagement_level": "high"},
    {"title": "What I Eat in a Day", "type": "Reel", "description": "Quick montage of healthy meals throughout the day. Keep it realistic and achievable.", "engagement_level": "medium"},
    {"title": "No Equipment? No Problem", "type": "Carousel", "description": "10 bodyweight exercises that target every muscle group. Perfect for travelers or home workouts.", "engagement_level": "high"},
    {"title": "My Fitness Journey", "type": "Single Image", "description": "Personal story with before/after photo. Share struggles and wins to build connection.", "engagement_level": "medium"},
    {"title": "30-Day Challenge Announcement", "type": "Reel", "description": "Announce a 30-day plank challenge. Show proper form and explain how to join.", "engagement_level": "high"},
    {"title": "Post-Workout Stretching Routine", "type": "Reel", "description": "5-minute stretching sequence to prevent soreness. Show each stretch with hold times.", "engagement_level": "medium"},
    {"title": "Gym vs Home Workout Comparison", "type": "Carousel", "description": "Side-by-side comparison showing equivalent exercises. Prove you dont need a gym.", "engagement_level": "medium"},
    {"title": "Client Transformation Tuesday", "type": "Single Image", "description": "Share a client success story (with permission). Include their testimonial and results.", "engagement_level": "high"},
    {"title": "Q&A: Your Questions Answered", "type": "Story Series", "description": "Collect questions via Story sticker, then answer top 5-7 questions in follow-up Stories.", "engagement_level": "medium"}
  ]'::jsonb,
  '[
    {"day": 1, "task": "Optimize Profile", "description": "Update bio, profile picture, and name field using suggestions above. Add link to free resource."},
    {"day": 2, "task": "Create Content Bank", "description": "Film 3 Reels and create 2 carousels using the content ideas. Batch create for efficiency."},
    {"day": 3, "task": "Engagement Sprint", "description": "Spend 30 minutes engaging with accounts in your niche. Leave genuine, thoughtful comments."},
    {"day": 4, "task": "Post & Monitor", "description": "Publish first optimized post. Monitor engagement and respond to all comments within 2 hours."},
    {"day": 5, "task": "Story Strategy", "description": "Create a 5-part Story series using question stickers. Share behind-the-scenes content."},
    {"day": 6, "task": "Analyze & Adjust", "description": "Review insights from the week. Note which content performed best and why."},
    {"day": 7, "task": "Plan Next Week", "description": "Schedule next weeks content using the content calendar template. Prepare batch content."}
  ]'::jsonb,
  '[
    {"name": "Engagement Rate", "description": "Percentage of followers who interact with your content (likes, comments, saves, shares)", "target": "Increase from 2.1% to 3.5% within 60 days"},
    {"name": "Follower Growth Rate", "description": "Net new followers per week", "target": "100-150 new followers per week"},
    {"name": "Reach", "description": "Number of unique accounts that see your content", "target": "Increase by 50% within 30 days"},
    {"name": "Saves", "description": "Number of times your content is saved (indicates value)", "target": "Average 50+ saves per post"},
    {"name": "Story Completion Rate", "description": "Percentage of viewers who watch all your Stories", "target": "60%+ completion rate"},
    {"name": "DM Inquiries", "description": "Number of direct messages asking about coaching or programs", "target": "5-10 qualified inquiries per week"}
  ]'::jsonb,
  '1. Implement all profile optimizations within the next 48 hours
2. Create a content batch (5-7 posts) using the provided content ideas
3. Establish a consistent posting schedule and stick to it for 30 days
4. Dedicate 30 minutes daily to engagement (comments, DMs, Story interactions)
5. Track metrics weekly and adjust strategy based on performance data
6. Consider creating a free lead magnet (7-day plan, workout guide) to capture email addresses
7. Reassess strategy after 30 days and refine based on what is working best',
  'approved',
  'ai_assisted'
);

-- ─── SAMPLE CONTENT PACK ──────────────────────────────────────────────────────
-- For a musician on TikTok

INSERT INTO content_packs (
  platform,
  niche,
  target_audience,
  brand_voice,
  content_goals,
  customer_notes,
  content_ideas,
  caption_drafts,
  video_hooks,
  calls_to_action,
  suggested_formats,
  publishing_calendar,
  admin_notes,
  status,
  generated_by
) VALUES (
  'TikTok',
  'Independent Music',
  'Music lovers 18-35 who discover new artists on social media',
  'Authentic, raw, passionate about music creation',
  'Increase streams, build fanbase, promote upcoming EP release',
  'Artist is releasing a 5-track EP in 2 months. Wants to build anticipation.',
  '[
    {"title": "Studio Session Snippet", "type": "Behind-the-scenes", "description": "15-second clip of you recording vocals or instruments. Show the raw creative process.", "engagement_level": "high"},
    {"title": "Song Meaning Explained", "type": "Storytelling", "description": "Explain the inspiration behind one of your songs. Connect emotionally with viewers.", "engagement_level": "high"},
    {"title": "Before & After Production", "type": "Comparison", "description": "Show raw recording vs final produced version. Demonstrate the magic of production.", "engagement_level": "medium"},
    {"title": "Lyric Breakdown", "type": "Educational", "description": "Break down the meaning behind specific lyrics. Show the thought process.", "engagement_level": "medium"},
    {"title": "Fan Reaction Compilation", "type": "Social Proof", "description": "Compile fan reactions to your music. Show real people connecting with your art.", "engagement_level": "high"},
    {"title": "Gear Tour", "type": "Behind-the-scenes", "description": "Show your recording setup, instruments, or production tools. Music nerds love this.", "engagement_level": "medium"},
    {"title": "Collaboration Announcement", "type": "News", "description": "Announce a collaboration with another artist. Build excitement and cross-pollinate audiences.", "engagement_level": "high"},
    {"title": "Acoustic Version", "type": "Performance", "description": "Strip down one of your songs to acoustic. Show versatility and raw talent.", "engagement_level": "medium"},
    {"title": "Songwriting Process", "type": "Educational", "description": "Show how you write a song from start to finish. Demo the creative journey.", "engagement_level": "medium"},
    {"title": "EP Tracklist Reveal", "type": "Announcement", "description": "Reveal the EP tracklist one song at a time. Build anticipation for release.", "engagement_level": "high"},
    {"title": "Live Q&A About Music", "type": "Interactive", "description": "Go live and answer questions about your music, influences, and creative process.", "engagement_level": "medium"},
    {"title": "Cover Song Request", "type": "Interactive", "description": "Ask fans to request a cover song. Perform it in your style. Engage community.", "engagement_level": "high"},
    {"title": "Music Video BTS", "type": "Behind-the-scenes", "description": "Show behind-the-scenes footage from a music video shoot. Fans love exclusivity.", "engagement_level": "medium"},
    {"title": "Influenced By...", "type": "Educational", "description": "Share artists who influenced your sound. Play short clips and explain the connection.", "engagement_level": "medium"},
    {"title": "Pre-Save Campaign", "type": "Promotional", "description": "Create urgency around pre-saving your EP. Offer exclusive content for pre-savers.", "engagement_level": "high"},
    {"title": "Day in the Life", "type": "Lifestyle", "description": "Show a day in your life as an independent musician. Balance music, work, and life.", "engagement_level": "medium"},
    {"title": "Studio Fail Compilation", "type": "Entertainment", "description": "Funny moments from studio sessions. Show the human side of music creation.", "engagement_level": "high"},
    {"title": "Merchandise Preview", "type": "Promotional", "description": "Preview upcoming merch designs. Build excitement and drive pre-orders.", "engagement_level": "medium"},
    {"title": "Fan Art Showcase", "type": "Community", "description": "Share fan-created art, covers, or content inspired by your music. Celebrate your community.", "engagement_level": "high"},
    {"title": "Countdown to Release", "type": "Announcement", "description": "Daily countdown posts leading to EP release. Build momentum and anticipation.", "engagement_level": "high"},
    {"title": "Song Challenge", "type": "Interactive", "description": "Create a challenge around a catchy hook from your song. Encourage user-generated content.", "engagement_level": "high"},
    {"title": "Production Tutorial", "type": "Educational", "description": "Teach a production technique you use. Show your expertise and help aspiring musicians.", "engagement_level": "medium"},
    {"title": "Unreleased Track Teaser", "type": "Teaser", "description": "Tease an unreleased track. Play 10-15 seconds and ask if fans want to hear more.", "engagement_level": "high"},
    {"title": "Concert/Show Announcement", "type": "News", "description": "Announce upcoming shows or livestream performances. Drive ticket sales or viewership.", "engagement_level": "medium"},
    {"title": "Gratitude Post", "type": "Community", "description": "Thank your fans for support. Share milestones and express genuine appreciation.", "engagement_level": "medium"},
    {"title": "Song Remix Challenge", "type": "Interactive", "description": "Release stems or acapella and challenge producers to remix. Engage creator community.", "engagement_level": "high"},
    {"title": "Playlist Curation", "type": "Educational", "description": "Share your current playlist inspirations. Connect your sound to broader music landscape.", "engagement_level": "medium"},
    {"title": "Creative Block Story", "type": "Storytelling", "description": "Share a time you overcame creative block. Be vulnerable and authentic.", "engagement_level": "medium"},
    {"title": "EP Listening Party", "type": "Event", "description": "Host a TikTok Live listening party for your EP release. Engage with fans in real-time.", "engagement_level": "high"},
    {"title": "What is Next", "type": "Announcement", "description": "Tease what is coming after the EP. Keep momentum going and maintain interest.", "engagement_level": "medium"}
  ]'::jsonb,
  '[
    {"id": 1, "caption": "POV: You finally finish that song you have been working on for months 🎵\n\nThe feeling is unmatched. Every late night, every doubt, every revision — it all leads to this moment.\n\nThis is what independent music is about. Creating something from nothing and sharing it with the world.\n\nWhat is a project you are proud to have finished? 👇", "hashtags": ["#independentartist", "#musicproducer", "#songwriter", "#newmusic", "#studiolife"]},
    {"id": 2, "caption": "The story behind this song hits different when you know the context 🎤\n\nI wrote this during one of the hardest periods of my life. Every lyric is真实 (real).\n\nSometimes the best art comes from the deepest pain.\n\nHave you ever connected with a song because it understood exactly what you were going through? 💔", "hashtags": ["#songwriting", "#musictherapy", "#realstories", "#newmusic", "#independentmusic"]},
    {"id": 3, "caption": "Raw recording → Final production 🎧\n\nThis is the magic of music production. Taking something raw and turning it into something polished.\n\nBut honestly? I love both versions. The raw one has soul. The produced one has power.\n\nWhich version do you prefer? Let me know 👇", "hashtags": ["#musicproduction", "#studiolife", "#beforeandafter", "#producerlife", "#musiccreation"]},
    {"id": 4, "caption": "3 AM studio sessions hit different 🌙\n\nTheres something about creating music when the world is asleep. No distractions. Just you and the art.\n\nThese are the moments that make being an independent artist worth it.\n\nAre you a night owl creator or an early bird? 🦉 vs 🌅", "hashtags": ["#studiolife", "#nightowl", "#musiccreation", "#independentartist", "#creativelife"]},
    {"id": 5, "caption": "My EP is finally here and I could not be more excited 🎉\n\n5 tracks. Months of work. Countless revisions. And its finally ready to share with you.\n\nThis project is deeply personal. Every song tells a story. Every lyric matters.\n\nLink in bio to listen. Let me know which track is your favorite 🎧", "hashtags": ["#newmusic", "#eprelease", "#independentmusic", "#newrelease", "#musicdrop"]},
    {"id": 6, "caption": "You asked for it, so here it is 🎸\n\nAcoustic version of [Song Name]. Sometimes you need to strip everything back and just feel the music.\n\nNo production. No effects. Just raw emotion.\n\nWhich song should I do acoustic next? Drop your requests 👇", "hashtags": ["#acousticversion", "#unplugged", "#rawmusic", "#independentartist", "#livemusic"]},
    {"id": 7, "caption": "The gear that makes the magic happen 🎛️\n\nA lot of you have been asking about my setup, so here is a quick tour.\n\nNothing fancy, but it gets the job done. Proof that you do not need expensive equipment to create great music.\n\nWhat is your favorite piece of gear? 🎸", "hashtags": ["#studiotour", "#musicgear", "#producerlife", "#homestudio", "#musicproduction"]},
    {"id": 8, "caption": "Big news! 🚨\n\nI am collaborating with [Artist Name] on a track and I cannot wait for you to hear it.\n\nTwo different styles. One incredible song. Dropping soon.\n\nWho should I collaborate with next? Tag them below 👇", "hashtags": ["#collab", "#newmusic", "#independentartist", "#musiccollaboration", "#comingsoon"]},
    {"id": 9, "caption": "The creative process is not always pretty 🎨\n\nHere is a real look at how I write songs. The messy notes, the voice memos, the 100 revisions.\n\nBut thats what makes it real. Art is not about perfection. Its about expression.\n\nWhat does your creative process look like? Share below 👇", "hashtags": ["#songwritingprocess", "#creativelife", "#musiccreation", "#behindthescenes", "#independentartist"]},
    {"id": 10, "caption": "EP TRACKLIST REVEAL 🎵\n\nAfter months of work, here are the 5 tracks that make up my upcoming EP:\n\n1. [Track 1 Name]\n2. [Track 2 Name]\n3. [Track 3 Name]\n4. [Track 4 Name]\n5. [Track 5 Name]\n\nEach song tells a different story. Which one are you most excited to hear? 👇", "hashtags": ["#eptracklist", "#newmusic", "#albumreveal", "#independentmusic", "#comingsoon"]}
  ]'::jsonb,
  '[
    {"id": 1, "hook": "POV: You finally finish that song you have been working on for months", "description": "Show the moment of completion — hitting save, leaning back, smiling. Pair with the final chorus of the song.", "duration": "15-20 seconds"},
    {"id": 2, "hook": "The story behind this song hits different when you know the context", "description": "Start with you looking directly at camera. Then cut to performance footage. Build emotional connection.", "duration": "30-45 seconds"},
    {"id": 3, "hook": "Wait for the drop...", "description": "Show raw recording first, then transition to fully produced version. The contrast creates impact.", "duration": "20-30 seconds"},
    {"id": 4, "hook": "3 AM studio sessions hit different", "description": "Show clock showing late time, then cut to you creating music. Capture the vibe of late-night creativity.", "duration": "15-20 seconds"},
    {"id": 5, "hook": "My EP is finally here", "description": "Start with you holding the physical copy or showing the digital release. Genuine excitement. Then play snippet.", "duration": "20-30 seconds"},
    {"id": 6, "hook": "You asked for it, so here it is", "description": "Reference previous comments or requests. Show you listening to fans. Then perform acoustic version.", "duration": "30-45 seconds"},
    {"id": 7, "hook": "The gear that makes the magic happen", "description": "Quick cuts showing each piece of equipment. Add text overlays with names. Keep it fast-paced.", "duration": "20-30 seconds"},
    {"id": 8, "hook": "Big news!", "description": "Start with excited energy. Reveal collaboration. Show brief clip of the track if possible.", "duration": "15-20 seconds"},
    {"id": 9, "hook": "The creative process is not always pretty", "description": "Show messy notes, voice memos, frustrated moments. Then show the final polished result.", "duration": "30-45 seconds"},
    {"id": 10, "hook": "EP TRACKLIST REVEAL", "description": "Dramatic reveal. Show each track name one by one. Build anticipation with music snippets.", "duration": "20-30 seconds"}
  ]'::jsonb,
  '[
    "Pre-save link in bio — be the first to hear it 🎧",
    "Which track are you most excited about? Comment below 👇",
    "Tag a friend who needs to hear this 🎵",
    "Follow for more behind-the-scenes content 🎬",
    "Share this with someone who loves independent music 💿",
    "Drop a 🔥 if you want to hear the full song",
    "What should I name this track? Best suggestion wins 👇",
    "Turn on post notifications so you do not miss the release 🔔",
    "Save this for when the song drops 📌",
    "Duets welcome — show me your version 🎤"
  ]'::jsonb,
  '[
    "Behind-the-scenes studio footage (15-30 seconds)",
    "Storytelling videos with direct-to-camera delivery",
    "Before/after comparisons (raw vs produced)",
    "Acoustic performance videos",
    "Quick cuts with text overlays for announcements",
    "Live Q&A sessions",
    "Duet/stitch responses to fan comments",
    "Trending sound adaptations with original music"
  ]'::jsonb,
  '[
    {"day": 1, "content_type": "Behind-the-scenes", "topic": "Studio Session Snippet", "posting_time": "7:00 PM", "notes": "Use hook #1. Show raw creative process."},
    {"day": 2, "content_type": "Storytelling", "topic": "Song Meaning Explained", "posting_time": "6:30 PM", "notes": "Use hook #2. Connect emotionally with viewers."},
    {"day": 3, "content_type": "Comparison", "topic": "Before & After Production", "posting_time": "8:00 PM", "notes": "Use hook #3. Show the magic of production."},
    {"day": 4, "content_type": "Lifestyle", "topic": "3 AM Studio Sessions", "posting_time": "9:00 PM", "notes": "Use hook #4. Capture late-night vibe."},
    {"day": 5, "content_type": "Performance", "topic": "Acoustic Version", "posting_time": "7:00 PM", "notes": "Use hook #6. Show versatility."},
    {"day": 6, "content_type": "Behind-the-scenes", "topic": "Gear Tour", "posting_time": "6:00 PM", "notes": "Use hook #7. Fast-paced cuts."},
    {"day": 7, "content_type": "News", "topic": "Collaboration Announcement", "posting_time": "7:30 PM", "notes": "Use hook #8. Build excitement."},
    {"day": 8, "content_type": "Educational", "topic": "Songwriting Process", "posting_time": "6:30 PM", "notes": "Show creative journey from start to finish."},
    {"day": 9, "content_type": "Interactive", "topic": "Cover Song Request", "posting_time": "8:00 PM", "notes": "Engage community. Ask for requests."},
    {"day": 10, "content_type": "Announcement", "topic": "EP Tracklist Reveal", "posting_time": "7:00 PM", "notes": "Use hook #10. Build anticipation."},
    {"day": 11, "content_type": "Interactive", "topic": "Live Q&A About Music", "posting_time": "8:00 PM", "notes": "Go live. Answer fan questions."},
    {"day": 12, "content_type": "Social Proof", "topic": "Fan Reaction Compilation", "posting_time": "6:30 PM", "notes": "Show real people connecting with your music."},
    {"day": 13, "content_type": "Behind-the-scenes", "topic": "Music Video BTS", "posting_time": "7:00 PM", "notes": "Exclusive footage from video shoot."},
    {"day": 14, "content_type": "Educational", "topic": "Influenced By...", "posting_time": "6:00 PM", "notes": "Share influences. Play short clips."},
    {"day": 15, "content_type": "Promotional", "topic": "Pre-Save Campaign", "posting_time": "7:30 PM", "notes": "Create urgency. Offer exclusive content."},
    {"day": 16, "content_type": "Lifestyle", "topic": "Day in the Life", "posting_time": "8:00 PM", "notes": "Show balance of music, work, life."},
    {"day": 17, "content_type": "Entertainment", "topic": "Studio Fail Compilation", "posting_time": "7:00 PM", "notes": "Funny moments. Show human side."},
    {"day": 18, "content_type": "Promotional", "topic": "Merchandise Preview", "posting_time": "6:30 PM", "notes": "Preview merch. Drive pre-orders."},
    {"day": 19, "content_type": "Community", "topic": "Fan Art Showcase", "posting_time": "7:00 PM", "notes": "Celebrate fan-created content."},
    {"day": 20, "content_type": "Announcement", "topic": "Countdown to Release", "posting_time": "7:30 PM", "notes": "10 days until EP. Build momentum."},
    {"day": 21, "content_type": "Interactive", "topic": "Song Challenge", "posting_time": "8:00 PM", "notes": "Create challenge around catchy hook."},
    {"day": 22, "content_type": "Educational", "topic": "Production Tutorial", "posting_time": "6:00 PM", "notes": "Teach a technique. Show expertise."},
    {"day": 23, "content_type": "Teaser", "topic": "Unreleased Track Teaser", "posting_time": "7:00 PM", "notes": "Play 10-15 seconds. Build curiosity."},
    {"day": 24, "content_type": "News", "topic": "Concert/Show Announcement", "posting_time": "6:30 PM", "notes": "Announce shows or livestream."},
    {"day": 25, "content_type": "Community", "topic": "Gratitude Post", "posting_time": "7:00 PM", "notes": "Thank fans. Share milestones."},
    {"day": 26, "content_type": "Interactive", "topic": "Song Remix Challenge", "posting_time": "8:00 PM", "notes": "Release stems. Engage producers."},
    {"day": 27, "content_type": "Educational", "topic": "Playlist Curation", "posting_time": "6:00 PM", "notes": "Share inspirations. Connect to broader landscape."},
    {"day": 28, "content_type": "Storytelling", "topic": "Creative Block Story", "posting_time": "7:30 PM", "notes": "Be vulnerable. Share real experience."},
    {"day": 29, "content_type": "Event", "topic": "EP Listening Party", "posting_time": "8:00 PM", "notes": "TikTok Live. Engage in real-time."},
    {"day": 30, "content_type": "Announcement", "topic": "What is Next", "posting_time": "7:00 PM", "notes": "Tease future projects. Keep momentum."}
  ]'::jsonb,
  'Sample content pack for independent musician preparing for EP release. All content is designed to build anticipation and engage music-loving audience on TikTok.',
  'approved',
  'ai_assisted'
);

-- ─── SAMPLE GROWTH PARTNER CLIENT ─────────────────────────────────────────────
-- A small business owner on Instagram

INSERT INTO growth_partner_clients (
  client_name,
  client_email,
  platform,
  niche,
  start_date,
  end_date,
  agreed_deliverables,
  monthly_fee_eur,
  monthly_fee_mad,
  status,
  client_notes,
  admin_notes
) VALUES (
  'Artisan Coffee Roasters',
  'owner@artisancoffee.example.com',
  'Instagram',
  'Specialty Coffee & Café',
  '2025-01-01',
  NULL,
  '{"content_calendar": "Monthly 30-day calendar", "caption_drafts": "20 captions per month", "story_ideas": "15 story concepts per month", "monthly_report": "Performance analytics and recommendations", "strategy_call": "1 hour monthly call"}'::jsonb,
  149.00,
  1639.00,
  'active',
  'Client owns a specialty coffee shop and roastery. Wants to attract coffee enthusiasts and build community. Currently has 1,200 followers. Goal is to reach 5,000 followers in 6 months and increase foot traffic to the shop.',
  'Client is very engaged and responsive. Prefers educational content about coffee brewing methods and origin stories. Visual style should be warm, earthy tones. Avoid overly promotional content — focus on value and community building.'
);

-- Add sample deliverables for the growth partner client
-- Note: Replace the client_id with the actual ID from the insert above

-- ─── COMPLETION ───────────────────────────────────────────────────────────────
-- Sample data inserted successfully!
-- 
-- This demonstrates:
-- 1. A complete Creator Audit report for a fitness creator
-- 2. A full Content Pack with 30 ideas for a musician
-- 3. A Growth Partner client setup for a coffee business
--
-- You can view and edit these in the admin workspace.
