import { generateScssVariables } from './generateScssVariables';

describe('generateScssVariables', () => {
  it('generates SCSS with key variables', () => {
    const scss = generateScssVariables();
    expect(scss).toContain('$color-primary:');
    expect(scss).toContain('$color-text-primary:');
    expect(scss).toContain('$font-family-primary:');
  });
});


