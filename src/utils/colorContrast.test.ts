import { getContrastRatio, evaluateContrast, getBestTextColor, ensureAAATextColor } from './colorContrast';

describe('colorContrast utils', () => {
  it('calculates correct ratio for black and white', () => {
    const ratio = getContrastRatio('#000000', '#ffffff');
    expect(Math.round(ratio * 100) / 100).toBe(21);
  });

  it('evaluates AA/AAA compliance', () => {
    const c = evaluateContrast('#000000', '#ffffff');
    expect(c.passesAA).toBe(true);
    expect(c.passesAAA).toBe(true);
  });

  it('chooses best text color', () => {
    expect(getBestTextColor('#000000')).toBe('#ffffff');
    expect(getBestTextColor('#ffffff')).toBe('#000000');
  });

  it('ensures AAA if possible', () => {
    const best = ensureAAATextColor('#ffffff');
    expect(best.color).toBe('#000000');
    expect(best.contrast.passesAAA).toBe(true);
  });
});


