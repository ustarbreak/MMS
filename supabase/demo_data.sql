-- MediasMakers Demo Data
-- Run this AFTER schema.sql and service_delivery_schema.sql
-- This populates the database with sample orders, reports, and content for demonstration

-- ─── DEMO ORDERS ──────────────────────────────────────────────────────────────

INSERT INTO orders (
  order_reference,
  customer_name,
  customer_email,
  customer_country,
  product_id,
  product_name,
  price_eur,
  price_mad,
  currency,
  requirements,
  status,
  payment_confirmed_at,
  delivered_at,
  internal_notes,
  verification_token,
  verification_token_expires_at,
  verification_token_used
) VALUES
-- Order 1: Completed Creator Audit
(
  'MM-DEMO0001',
  'Sarah Johnson',
  'sarah.johnson@example.com',
  'United States',
  (SELECT id FROM products WHERE slug = 'creator-audit'),
  'Creator Audit',
  9.00,
  99.00,
  'EUR',
  '{"platform": "Instagram", "niche": "Fitness & Wellness", "target_audience": "Women 25-40 interested in home workouts", "main_objective": "Grow engaged following and establish authority", "profile_url": "https://instagram.com/fitwithsarah", "notes": "Currently at 2,500 followers, wants to reach 10k in 6 months"}'::jsonb,
  'delivered',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '3 days',
  'Client is very responsive, delivered comprehensive audit with 10 content ideas and 7-day action plan',
  encode(gen_random_bytes(32), 'hex'),
  NOW() + INTERVAL '24 hours',
  false
),

-- Order 2: In Progress Content Pack
(
  'MM-DEMO0002',
  'Ahmed Benali',
  'ahmed.benali@example.com',
  'Morocco',
  (SELECT id FROM products WHERE slug = 'creator-content-pack'),
  'Creator Content Pack',
  19.00,
  209.00,
  'MAD',
  '{"platform": "TikTok", "niche": "Independent Music", "target_audience": "Music lovers 18-35", "brand_voice": "Authentic, raw, passionate", "notes": "Releasing 5-track EP in 2 months, wants to build anticipation"}'::jsonb,
  'in_progress',
  NOW() - INTERVAL '2 days',
  NULL,
  'Working on 30 content ideas and 30-day calendar, client prefers energetic hooks',
  encode(gen_random_bytes(32), 'hex'),
  NOW() + INTERVAL '24 hours',
  false
),

-- Order 3: Pending Payment
(
  'MM-DEMO0003',
  'Emma Rodriguez',
  'emma.rodriguez@example.com',
  'Spain',
  (SELECT id FROM products WHERE slug = 'monthly-growth-partner'),
  'Monthly Growth Partner',
  149.00,
  1639.00,
  'EUR',
  '{"platform": "Instagram", "niche": "Specialty Coffee", "target_audience": "Coffee enthusiasts 25-45", "notes": "Owns coffee shop and roastery, wants to increase foot traffic and build community"}'::jsonb,
  'pending_payment',
  NULL,
  NULL,
  'Waiting for payment confirmation, sent invoice via email',
  encode(gen_random_bytes(32), 'hex'),
  NOW() + INTERVAL '24 hours',
  false
),

-- Order 4: Paid, Not Started
(
  'MM-DEMO0004',
  'Yuki Tanaka',
  'yuki.tanaka@example.com',
  'Japan',
  (SELECT id FROM products WHERE slug = 'creator-audit'),
  'Creator Audit',
  9.00,
  99.00,
  'EUR',
  '{"platform": "YouTube", "niche": "Tech Reviews", "target_audience": "Tech enthusiasts 20-40", "main_objective": "Improve video SEO and thumbnail CTR", "notes": "Currently at 5k subscribers, struggling with discoverability"}'::jsonb,
  'paid',
  NOW() - INTERVAL '1 day',
  NULL,
  'Payment confirmed, ready to start audit',
  encode(gen_random_bytes(32), 'hex'),
  NOW() + INTERVAL '24 hours',
  false
);

-- ─── DEMO AUDIT REPORTS ───────────────────────────────────────────────────────

INSERT INTO audit_reports (
  order_id,
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
  (SELECT id FROM orders WHERE order_reference = 'MM-DEMO0001'),
  'Instagram',
  'Fitness & Wellness',
  'Women 25-40 interested in home workouts and healthy living',
  'Grow engaged following and establish authority in home fitness space',
  'https://instagram.com/fitwithsarah',
  '{"followers": 2500, "following": 800, "posts": 150, "engagement_rate": "2.1%"}'::jsonb,
  'Wants to focus on busy moms who want quick home workouts',
  'Sarah has built a solid foundation with 2,500 followers and consistent posting. The profile shows clear niche focus on fitness, but there are opportunities to improve discoverability and engagement. Current content mix leans heavily on workout videos, with limited educational or community-building content. With strategic adjustments to content mix, posting schedule, and engagement tactics, significant growth potential exists within the next 90 days.',
  'Current positioning: "Fitness creator sharing workouts." This is clear but generic. Recommended repositioning: "Helping busy women transform their health with 20-minute home workouts. No gym required. Join 2,500+ women building stronger bodies at home." This positions Sarah as a solution provider for a specific audience pain point (busy schedules) and includes social proof.',
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
5. Added clear CTA with value offer (free plan)',
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

Best posting times: 7-8 AM and 7-8 PM (when target audience is most active)',
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
  'delivered',
  'ai_assisted'
);

-- ─── DEMO CONTENT PACKS ───────────────────────────────────────────────────────

INSERT INTO content_packs (
  order_id,
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
  (SELECT id FROM orders WHERE order_reference = 'MM-DEMO0002'),
  'TikTok',
  'Independent Music',
  'Music lovers 18-35 who discover new artists on social media',
  'Authentic, raw, passionate about music creation',
  'Increase streams, build fanbase, promote upcoming EP release',
  'Releasing a 5-track EP in 2 months. Wants to build anticipation.',
  '[
    {"title": "Studio Session Snippet", "type": "Behind-the-scenes", "description": "15-second clip of recording vocals or instruments. Show the raw creative process.", "engagement_level": "high"},
    {"title": "Song Meaning Explained", "type": "Storytelling", "description": "Explain the inspiration behind one of the songs. Connect emotionally with viewers.", "engagement_level": "high"},
    {"title": "Before & After Production", "type": "Comparison", "description": "Show raw recording vs final produced version. Demonstrate the magic of production.", "engagement_level": "medium"},
    {"title": "Lyric Breakdown", "type": "Educational", "description": "Break down the meaning behind specific lyrics. Show the thought process.", "engagement_level": "medium"},
    {"title": "Fan Reaction Compilation", "type": "Social Proof", "description": "Compile fan reactions to the music. Show real people connecting with the art.", "engagement_level": "high"},
    {"title": "Gear Tour", "type": "Behind-the-scenes", "description": "Show recording setup, instruments, or production tools. Music nerds love this.", "engagement_level": "medium"},
    {"title": "Collaboration Announcement", "type": "News", "description": "Announce a collaboration with another artist. Build excitement and cross-pollinate audiences.", "engagement_level": "high"},
    {"title": "Acoustic Version", "type": "Performance", "description": "Strip down one of the songs to acoustic. Show versatility and raw talent.", "engagement_level": "medium"},
    {"title": "Songwriting Process", "type": "Educational", "description": "Show how to write a song from start to finish. Demo the creative journey.", "engagement_level": "medium"},
    {"title": "EP Tracklist Reveal", "type": "Announcement", "description": "Reveal the EP tracklist one song at a time. Build anticipation for release.", "engagement_level": "high"}
  ]'::jsonb,
  '[
    {"id": 1, "caption": "POV: You finally finish that song you have been working on for months 🎵\n\nThe feeling is unmatched. Every late night, every doubt, every revision — it all leads to this moment.\n\nThis is what independent music is about. Creating something from nothing and sharing it with the world.\n\nWhat is a project you are proud to have finished? 👇", "hashtags": ["#independentartist", "#musicproducer", "#songwriter", "#newmusic", "#studiolife"]},
    {"id": 2, "caption": "The story behind this song hits different when you know the context 🎤\n\nI wrote this during one of the hardest periods of my life. Every lyric is real.\n\nSometimes the best art comes from the deepest pain.\n\nHave you ever connected with a song because it understood exactly what you were going through? 💔", "hashtags": ["#songwriting", "#musictherapy", "#realstories", "#newmusic", "#independentmusic"]},
    {"id": 3, "caption": "Raw recording → Final production 🎧\n\nThis is the magic of music production. Taking something raw and turning it into something polished.\n\nBut honestly? I love both versions. The raw one has soul. The produced one has power.\n\nWhich version do you prefer? Let me know 👇", "hashtags": ["#musicproduction", "#studiolife", "#beforeandafter", "#producerlife", "#musiccreation"]}
  ]'::jsonb,
  '[
    {"id": 1, "hook": "POV: You finally finish that song you have been working on for months", "description": "Show the moment of completion — hitting save, leaning back, smiling. Pair with the final chorus of the song.", "duration": "15-20 seconds"},
    {"id": 2, "hook": "The story behind this song hits different when you know the context", "description": "Start with looking directly at camera. Then cut to performance footage. Build emotional connection.", "duration": "30-45 seconds"},
    {"id": 3, "hook": "Wait for the drop...", "description": "Show raw recording first, then transition to fully produced version. The contrast creates impact.", "duration": "20-30 seconds"}
  ]'::jsonb,
  '[
    "Pre-save link in bio — be the first to hear it 🎧",
    "Which track are you most excited about? Comment below 👇",
    "Tag a friend who needs to hear this 🎵",
    "Follow for more behind-the-scenes content 🎬",
    "Share this with someone who loves independent music 💿"
  ]'::jsonb,
  '[
    "Behind-the-scenes studio footage (15-30 seconds)",
    "Storytelling videos with direct-to-camera delivery",
    "Before/after comparisons (raw vs produced)",
    "Acoustic performance videos",
    "Quick cuts with text overlays for announcements"
  ]'::jsonb,
  '[
    {"day": 1, "content_type": "Behind-the-scenes", "topic": "Studio Session Snippet", "posting_time": "7:00 PM", "notes": "Show raw creative process"},
    {"day": 2, "content_type": "Storytelling", "topic": "Song Meaning Explained", "posting_time": "6:30 PM", "notes": "Connect emotionally with viewers"},
    {"day": 3, "content_type": "Comparison", "topic": "Before & After Production", "posting_time": "8:00 PM", "notes": "Show the magic of production"},
    {"day": 4, "content_type": "Performance", "topic": "Acoustic Version", "posting_time": "7:00 PM", "notes": "Show versatility"},
    {"day": 5, "content_type": "News", "topic": "Collaboration Announcement", "posting_time": "7:30 PM", "notes": "Build excitement"}
  ]'::jsonb,
  'Demo content pack for independent musician. All content is designed to build anticipation and engage music-loving audience on TikTok.',
  'review',
  'ai_assisted'
);

-- ─── DEMO GROWTH PARTNER CLIENT ───────────────────────────────────────────────

INSERT INTO growth_partner_clients (
  order_id,
  client_name,
  client_email,
  platform,
  niche,
  start_date,
  agreed_deliverables,
  monthly_fee_eur,
  monthly_fee_mad,
  status,
  client_notes,
  admin_notes
) VALUES (
  NULL,
  'Artisan Coffee Roasters',
  'owner@artisancoffee.example.com',
  'Instagram',
  'Specialty Coffee & Café',
  '2025-01-01',
  '{"content_calendar": "Monthly 30-day calendar", "caption_drafts": "20 captions per month", "story_ideas": "15 story concepts per month", "monthly_report": "Performance analytics and recommendations", "strategy_call": "1 hour monthly call"}'::jsonb,
  149.00,
  1639.00,
  'active',
  'Owns a specialty coffee shop and roastery. Wants to attract coffee enthusiasts and build community. Currently has 1,200 followers. Goal is to reach 5,000 followers in 6 months and increase foot traffic to the shop.',
  'Client is very engaged and responsive. Prefers educational content about coffee brewing methods and origin stories. Visual style should be warm, earthy tones. Avoid overly promotional content — focus on value and community building.'
);

-- ─── COMPLETION ───────────────────────────────────────────────────────────────
-- Demo data inserted successfully!
-- 
-- This includes:
-- 4 sample orders in various stages
-- 1 completed audit report
-- 1 content pack in review
-- 1 active growth partner client
--
-- You can view and manage all of this in the admin dashboard.
