/**
 * ============================================================
 *  BIRTHDAY SURPRISE — CENTRAL CONFIGURATION
 * ============================================================
 *  This is the only file you need to edit to personalise the site.
 *  Change `person.name` and every screen, headline, letter and
 *  message updates automatically.
 *
 *  Any text below may contain the token {name} — it is replaced
 *  with `person.name` wherever it appears.
 * ============================================================
 */

export const config = {
  /* ----------------------------------------------------------
   *  WHO IS THIS FOR?
   * ---------------------------------------------------------- */
  person: {
    name: 'Your Special Person',
  },

  /* ----------------------------------------------------------
   *  WELCOME SCREEN
   * ---------------------------------------------------------- */
  welcome: {
    eyebrow: 'A little something for you',
    button: 'Open Your Surprise',
    hint: 'Psst… tap the button ✨',
  },

  /* ----------------------------------------------------------
   *  BIRTHDAY HEADLINE & MESSAGE
   * ---------------------------------------------------------- */
  birthday: {
    headline: 'Happy Birthday,\n{name}!',
    tagline:
      'Today the whole sky is dressed up just for you — balloons, bells and all.',
  },

  /* ----------------------------------------------------------
   *  PERSONAL LETTER
   *  Each string in `paragraphs` becomes its own paragraph.
   * ---------------------------------------------------------- */
  letter: {
    eyebrow: 'Sealed with love',
    title: 'A letter for {name}',
    envelopeHint: 'Tap the envelope to open it',
    openLabel: 'Open your birthday letter',
    greeting: 'Dear {name},',
    paragraphs: [
      'You are the person who turns ordinary days into little adventures — the one who shares the last dorayaki and always knows exactly how to make me laugh.',
      'Watching you grow this year has been my favourite show. You are kinder than you give yourself credit for, braver than you think, and far funnier than the rest of us.',
      'So here is a whole pocketful of magic, just for you. May this year be gentle with you, generous with you, and full of the small, silly joys that make you light up.',
    ],
    closing: 'With all my love,',
    signature: 'Your sibling',
  },

  /* ----------------------------------------------------------
   *  SURPRISE MESSAGES
   * ---------------------------------------------------------- */
  surprise: {
    eyebrow: 'One last door',
    title: 'One more thing, {name}…',
    message:
      "You didn't think that was all, did you? Behind this door is the wish I've been saving for you all day.",
    doorSign: 'Anywhere Door',
    doorHint: 'Tap the door to open it',
    doorLabel: 'Open the Anywhere Door',
    cakeCaption: 'Close your eyes and make a wish…',
    celebrateButton: 'Celebrate!',
    afterCelebrate:
      'Hooray! Consider this your official birthday applause, {name}. 🎂',
  },
}

/* ============================================================
 *  HELPERS — no need to edit below this line
 * ============================================================ */

const NAME_TOKEN = '{name}'

/**
 * Replaces every {name} token in a string with the configured name.
 */
export function withName(text) {
  if (typeof text !== 'string') return text
  return text.split(NAME_TOKEN).join(config.person.name)
}

export default config
