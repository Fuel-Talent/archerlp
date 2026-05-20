import { groq } from "next-sanity";

export const landingPageQuery = groq`*[_type == "landingPage" && _id == "landingPage"][0]{
  meta,
  nav{
    logoText,
    logoSubText,
    ctaLabel,
    links[]{href, label}
  },
  hero{
    eyebrow,
    headlinePre,
    headlineAccent,
    sub,
    primaryCta{label, href},
    secondaryCta{label, href},
    terminalCaption,
    terminalStatus,
    trustBadges[]{icon, label}
  },
  terminal{
    user, path, status,
    script[]{kind, text, tone}
  },
  problem{
    headline, sub,
    pains[]{icon, title, body}
  },
  agitate{
    headline, sub,
    quotes[]{body, who, org},
    stats[]{icon, value, label}
  },
  solution{
    headline, sub,
    blocks[]{icon, title, bullets, demoType}
  },
  proof{
    headline, headlineAccent, sub,
    bullets, ctaLabel, source,
    metrics[]{value, label}
  },
  howItWorks{
    eyebrow, headline,
    steps[]{icon, title, body}
  },
  differentiation{
    eyebrow, headline,
    leftCard{eyebrow, title, body},
    rightCard{eyebrow, title, body},
    rows[]{label, saas, archer}
  },
  demo{
    eyebrow, headline, sub,
    instantCard{pillLabel, title, body, ctaLabel, ctaLoadingLabel, fineprint, successTitle, successBody, audienceId, redirectUrl},
    bookCallCard{pillLabel, title, body, ctaLabel, ctaLoadingLabel, fineprint, successTitle, successBody, roles, audienceId, redirectUrl}
  },
  stickyCta{headline, sub, ctaLabel},
  exitIntent{eyebrow, headline, sub, videoPlaceholder, primaryCta, secondaryCta},
  footer{
    blurb, trustLine, copyright, deployTag,
    columns[]{title, links[]{href, label}}
  }
}`;
