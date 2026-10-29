/**
 * Report Generation Utility
 *
 * Generates professional HTML reports that can be printed to PDF.
 * Supports audit reports and content packs.
 */

import { AuditReport, ContentPack, GrowthPartnerClient, GrowthPartnerDeliverable } from './serviceTypes';

/**
 * Generate HTML report for Creator Audit
 */
export function generateAuditReportHTML(report: AuditReport, clientName?: string): string {
  const generatedDate = new Date(report.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creator Audit Report - ${clientName || 'Client'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a202c;
      background: #ffffff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 3px solid #0891b2;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      color: #0891b2;
      margin-bottom: 8px;
    }
    .header .subtitle {
      font-size: 14px;
      color: #64748b;
    }
    .meta-info {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .meta-info p {
      margin: 4px 0;
      font-size: 14px;
    }
    .meta-info strong {
      color: #0f172a;
    }
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .section h2 {
      font-size: 22px;
      color: #0891b2;
      margin-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
    }
    .section h3 {
      font-size: 18px;
      color: #334155;
      margin: 16px 0 8px 0;
    }
    .section p {
      margin-bottom: 12px;
      text-align: justify;
    }
    .section ul, .section ol {
      margin: 12px 0;
      padding-left: 24px;
    }
    .section li {
      margin-bottom: 8px;
    }
    .content-idea {
      background: #f8fafc;
      border-left: 3px solid #0891b2;
      padding: 12px 16px;
      margin-bottom: 12px;
      border-radius: 4px;
    }
    .content-idea h4 {
      font-size: 16px;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .content-idea .type {
      display: inline-block;
      background: #0891b2;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 8px;
    }
    .content-idea .engagement {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .engagement.high { background: #dcfce7; color: #166534; }
    .engagement.medium { background: #fef3c7; color: #92400e; }
    .engagement.low { background: #e0e7ff; color: #3730a3; }
    .day-plan {
      background: #f8fafc;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 4px;
      border-left: 3px solid #0891b2;
    }
    .day-plan strong {
      color: #0891b2;
    }
    .metric {
      background: #f8fafc;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 4px;
    }
    .metric h4 {
      color: #0f172a;
      margin-bottom: 4px;
    }
    .metric .target {
      color: #0891b2;
      font-weight: 600;
    }
    .disclaimer {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      padding: 16px;
      border-radius: 8px;
      margin: 30px 0;
      font-size: 13px;
    }
    .disclaimer strong {
      color: #92400e;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Creator Audit Report</h1>
    <p class="subtitle">Prepared by MediasMakers • ${generatedDate}</p>
  </div>

  <div class="meta-info">
    <p><strong>Client:</strong> ${clientName || 'Not specified'}</p>
    <p><strong>Platform:</strong> ${report.platform}</p>
    <p><strong>Niche:</strong> ${report.niche}</p>
    <p><strong>Target Audience:</strong> ${report.target_audience || 'Not specified'}</p>
    <p><strong>Main Objective:</strong> ${report.main_objective || 'Not specified'}</p>
    ${report.profile_url ? `<p><strong>Profile URL:</strong> <a href="${report.profile_url}">${report.profile_url}</a></p>` : ''}
  </div>

  <div class="disclaimer">
    <strong>Important Note:</strong> This report is based on information provided by the client and general platform best practices. 
    Recommendations are suggestions, not guarantees. Results depend on implementation quality, consistency, and market conditions.
    ${report.profile_data && Object.keys(report.profile_data).length > 0 ? 'Profile metrics shown are as provided by the client.' : 'No private analytics data was accessed for this report.'}
  </div>

  ${report.executive_summary ? `
  <div class="section">
    <h2>Executive Summary</h2>
    <p>${report.executive_summary}</p>
  </div>
  ` : ''}

  ${report.profile_positioning ? `
  <div class="section">
    <h2>Profile Positioning</h2>
    <p>${report.profile_positioning}</p>
  </div>
  ` : ''}

  ${report.bio_suggestions ? `
  <div class="section">
    <h2>Bio & Profile Improvements</h2>
    <p>${report.bio_suggestions}</p>
  </div>
  ` : ''}

  ${report.content_strategy ? `
  <div class="section">
    <h2>Content Strategy</h2>
    <p>${report.content_strategy}</p>
  </div>
  ` : ''}

  ${report.recommended_formats && report.recommended_formats.length > 0 ? `
  <div class="section">
    <h2>Recommended Content Formats</h2>
    <ul>
      ${report.recommended_formats.map(format => `<li>${format}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  ${report.content_ideas && report.content_ideas.length > 0 ? `
  <div class="section">
    <h2>Content Ideas</h2>
    ${report.content_ideas.map((idea, i) => `
      <div class="content-idea">
        <h4>${i + 1}. ${idea.title}</h4>
        <span class="type">${idea.type}</span>
        <span class="engagement ${idea.engagement_level}">${idea.engagement_level.toUpperCase()}</span>
        <p style="margin-top: 8px;">${idea.description}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${report.seven_day_plan && report.seven_day_plan.length > 0 ? `
  <div class="section">
    <h2>7-Day Action Plan</h2>
    ${report.seven_day_plan.map(day => `
      <div class="day-plan">
        <strong>Day ${day.day}:</strong> ${day.task}
        <p style="margin-top: 4px; color: #64748b;">${day.description}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${report.performance_metrics && report.performance_metrics.length > 0 ? `
  <div class="section">
    <h2>Recommended Performance Metrics</h2>
    ${report.performance_metrics.map(metric => `
      <div class="metric">
        <h4>${metric.name}</h4>
        <p>${metric.description}</p>
        <p class="target">Target: ${metric.target}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${report.next_steps ? `
  <div class="section">
    <h2>Next Steps</h2>
    <p>${report.next_steps}</p>
  </div>
  ` : ''}

  <div class="footer">
    <p>© ${new Date().getFullYear()} MediasMakers • mediasmakers.com</p>
    <p>This report is confidential and intended for the client only.</p>
  </div>
</body>
</html>`;
}

/**
 * Generate HTML report for Content Pack
 */
export function generateContentPackHTML(pack: ContentPack, clientName?: string): string {
  const generatedDate = new Date(pack.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Content Pack - ${clientName || 'Client'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a202c;
      background: #ffffff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 3px solid #0891b2;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      color: #0891b2;
      margin-bottom: 8px;
    }
    .header .subtitle {
      font-size: 14px;
      color: #64748b;
    }
    .meta-info {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .meta-info p {
      margin: 4px 0;
      font-size: 14px;
    }
    .meta-info strong {
      color: #0f172a;
    }
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .section h2 {
      font-size: 22px;
      color: #0891b2;
      margin-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
    }
    .section p {
      margin-bottom: 12px;
      text-align: justify;
    }
    .content-idea {
      background: #f8fafc;
      border-left: 3px solid #0891b2;
      padding: 12px 16px;
      margin-bottom: 12px;
      border-radius: 4px;
    }
    .content-idea h4 {
      font-size: 16px;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .content-idea .type {
      display: inline-block;
      background: #0891b2;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 8px;
    }
    .caption {
      background: #f8fafc;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 4px;
      border-left: 3px solid #0891b2;
    }
    .caption .text {
      white-space: pre-wrap;
      margin-bottom: 8px;
    }
    .caption .hashtags {
      color: #0891b2;
      font-size: 14px;
    }
    .hook {
      background: #f8fafc;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 4px;
    }
    .hook strong {
      color: #0891b2;
    }
    .calendar-day {
      background: #f8fafc;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 4px;
      border-left: 3px solid #0891b2;
    }
    .calendar-day strong {
      color: #0891b2;
    }
    .cta-list {
      background: #f8fafc;
      padding: 16px;
      border-radius: 4px;
    }
    .cta-list li {
      margin-bottom: 8px;
      padding: 8px;
      background: white;
      border-radius: 4px;
    }
    .disclaimer {
      background: #fef3c7;
      border: 1px solid #fbbf24;
      padding: 16px;
      border-radius: 8px;
      margin: 30px 0;
      font-size: 13px;
    }
    .disclaimer strong {
      color: #92400e;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Creator Content Pack</h1>
    <p class="subtitle">Prepared by MediasMakers • ${generatedDate}</p>
  </div>

  <div class="meta-info">
    <p><strong>Client:</strong> ${clientName || 'Not specified'}</p>
    <p><strong>Platform:</strong> ${pack.platform}</p>
    <p><strong>Niche:</strong> ${pack.niche}</p>
    <p><strong>Target Audience:</strong> ${pack.target_audience || 'Not specified'}</p>
    <p><strong>Brand Voice:</strong> ${pack.brand_voice || 'Not specified'}</p>
  </div>

  <div class="disclaimer">
    <strong>Important Note:</strong> This content pack provides ideas and templates. 
    Adapt the content to match your authentic voice and brand. Results depend on execution quality, 
    audience engagement, and platform algorithms. These are suggestions, not guarantees.
  </div>

  ${pack.content_ideas && pack.content_ideas.length > 0 ? `
  <div class="section">
    <h2>30 Content Ideas</h2>
    ${pack.content_ideas.map((idea, i) => `
      <div class="content-idea">
        <h4>${i + 1}. ${idea.title}</h4>
        <span class="type">${idea.type}</span>
        <p style="margin-top: 8px;">${idea.description}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${pack.caption_drafts && pack.caption_drafts.length > 0 ? `
  <div class="section">
    <h2>Caption Drafts</h2>
    ${pack.caption_drafts.map((caption, i) => `
      <div class="caption">
        <div class="text">${caption.caption}</div>
        <div class="hashtags">${caption.hashtags.join(' ')}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${pack.video_hooks && pack.video_hooks.length > 0 ? `
  <div class="section">
    <h2>Video Hooks</h2>
    ${pack.video_hooks.map((hook, i) => `
      <div class="hook">
        <strong>${i + 1}. ${hook.hook}</strong>
        <p style="margin-top: 4px; color: #64748b;">${hook.description}</p>
        <p style="margin-top: 4px; font-size: 13px; color: #0891b2;">Duration: ${hook.duration}</p>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${pack.calls_to_action && pack.calls_to_action.length > 0 ? `
  <div class="section">
    <h2>Call-to-Action Examples</h2>
    <ul class="cta-list">
      ${pack.calls_to_action.map(cta => `<li>${cta}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  ${pack.suggested_formats && pack.suggested_formats.length > 0 ? `
  <div class="section">
    <h2>Suggested Content Formats</h2>
    <ul>
      ${pack.suggested_formats.map(format => `<li>${format}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  ${pack.publishing_calendar && pack.publishing_calendar.length > 0 ? `
  <div class="section">
    <h2>30-Day Publishing Calendar</h2>
    ${pack.publishing_calendar.map(day => `
      <div class="calendar-day">
        <strong>Day ${day.day}${day.date ? ` (${day.date})` : ''}:</strong> ${day.topic}
        <p style="margin-top: 4px; color: #64748b;">
          ${day.content_type}${day.posting_time ? ` • Best time: ${day.posting_time}` : ''}
        </p>
        ${day.notes ? `<p style="margin-top: 4px; font-size: 13px;">${day.notes}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  <div class="footer">
    <p>© ${new Date().getFullYear()} MediasMakers • mediasmakers.com</p>
    <p>This content pack is confidential and intended for the client only.</p>
  </div>
</body>
</html>`;
}

/**
 * Open report in new window for printing
 */
export function openReportInNewWindow(html: string): void {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  }
}

/**
 * Download report as HTML file
 */
export function downloadReportAsHTML(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
