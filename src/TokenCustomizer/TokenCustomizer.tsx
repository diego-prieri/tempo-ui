import React, { useState, useEffect, useMemo } from 'react';
import { setTokens, getTokens, defaultTokens, googleFonts, type GoogleFont } from '../tokens';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Text } from '../atoms/Text';
import { evaluateContrast, ensureAAATextColor } from '../utils/colorContrast';
import { downloadScssVariables } from '../utils/generateScssVariables';
import styles from './TokenCustomizer.module.scss';

const ContrastDisplay: React.FC<{ 
  backgroundColor: string; 
  textColor?: string;
  showTextColorInput?: boolean;
  onTextColorChange?: (color: string) => void;
}> = ({ backgroundColor, textColor, showTextColorInput = false, onTextColorChange }) => {
  const customTextColor = textColor || '#1a1a1a'; // Default text color
  const contrastWithCustom = useMemo(() => evaluateContrast(customTextColor, backgroundColor), [customTextColor, backgroundColor]);
  const recommended = useMemo(() => ensureAAATextColor(backgroundColor), [backgroundColor]);

  return (
    <div className={styles.contrastInfo}>
      {showTextColorInput && onTextColorChange && (
        <div className={styles.textColorInputWrapper}>
          <label className={styles.contrastLabel} style={{ marginBottom: '0.25rem' }}>
            Test Text Color:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="color"
              value={customTextColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              className={styles.colorInput}
              style={{ width: '40px', height: '32px' }}
              aria-label="Test text color"
            />
            <input
              type="text"
              value={customTextColor}
              onChange={(e) => {
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  onTextColorChange(e.target.value);
                }
              }}
              className={styles.colorTextInput}
              pattern="^#[0-9A-Fa-f]{6}$"
              style={{ flex: 1, fontSize: '0.75rem', padding: '0.375rem' }}
              aria-label="Test text color hex value"
            />
          </div>
        </div>
      )}
      <div className={styles.contrastRatio}>
        <span className={styles.contrastLabel}>Contrast Ratio:</span>
        <span className={styles.contrastValue}>{contrastWithCustom.ratio}:1</span>
      </div>
      <div className={styles.contrastRatio}>
        <span className={styles.contrastLabel}>AA Compliance:</span>
        <span className={contrastWithCustom.passesAA ? styles.contrastPass : styles.contrastFail}>
          {contrastWithCustom.passesAA ? '✓ Pass' : '✗ Fail'}
        </span>
      </div>
      <div className={styles.contrastRatio}>
        <span className={styles.contrastLabel}>AAA Compliance:</span>
        <span className={contrastWithCustom.passesAAA ? styles.contrastPass : styles.contrastFail}>
          {contrastWithCustom.passesAAA ? '✓ Pass' : '✗ Fail'}
        </span>
      </div>
      <div className={styles.contrastRatio}>
        <span className={styles.contrastLabel}>AAA Large Text:</span>
        <span className={contrastWithCustom.passesAAALarge ? styles.contrastPass : styles.contrastFail}>
          {contrastWithCustom.passesAAALarge ? '✓ Pass' : '✗ Fail'}
        </span>
      </div>
      <div className={styles.recommendedText}>
        Recommended (AAA): 
        <span 
          className={styles.textColorPreview} 
          style={{ backgroundColor: recommended.color }}
          title={recommended.color}
        />
        {recommended.color} ({recommended.contrast.ratio}:1)
      </div>
      {showTextColorInput && (
        <div className={styles.livePreview} style={{ 
          backgroundColor, 
          color: customTextColor,
          padding: '0.5rem',
          borderRadius: '0.25rem',
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          border: '1px solid #e5e7eb'
        }}>
          Preview: Sample text with this contrast
        </div>
      )}
    </div>
  );
};

export const TokenCustomizer: React.FC = () => {
  const tokens = getTokens();
  const [primaryColor, setPrimaryColor] = useState(tokens.colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(tokens.colors.secondary);
  const [accentColor, setAccentColor] = useState(tokens.colors.accent);
  const [customTextColor, setCustomTextColor] = useState('#1a1a1a');
  const [selectedFont, setSelectedFont] = useState<GoogleFont>(
    googleFonts.find(f => f.value.includes(tokens.typography.fontFamily.primary.split(',')[0])) || googleFonts[0]
  );

  // Update tokens when colors or font change
  useEffect(() => {
    const currentTokens = getTokens();
    setTokens({
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
      },
      typography: {
        ...currentTokens.typography,
        fontFamily: {
          primary: selectedFont.value,
        },
      },
    });

    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primaryColor);
    root.style.setProperty('--color-secondary', secondaryColor);
    root.style.setProperty('--color-accent', accentColor);
    root.style.setProperty('--font-family-primary', selectedFont.value);

    // Load Google Font if needed
    if (selectedFont.name !== 'Inter') {
      const linkId = `google-font-${selectedFont.name.toLowerCase().replace(/\s+/g, '-')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.name.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [primaryColor, secondaryColor, accentColor, selectedFont]);

  // Calculate contrast ratios for preview
  const primaryContrast = useMemo(() => evaluateContrast(customTextColor, primaryColor), [customTextColor, primaryColor]);
  const secondaryContrast = useMemo(() => evaluateContrast(customTextColor, secondaryColor), [customTextColor, secondaryColor]);
  const accentContrast = useMemo(() => evaluateContrast(customTextColor, accentColor), [customTextColor, accentColor]);

  const handleReset = () => {
    setPrimaryColor(defaultTokens.colors.primary);
    setSecondaryColor(defaultTokens.colors.secondary);
    setAccentColor(defaultTokens.colors.accent);
    setCustomTextColor('#1a1a1a');
    setSelectedFont(googleFonts[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h1 className={styles.title}>Design Token Customizer</h1>
          <p className={styles.description}>
            Customize the design tokens and see real-time updates across all components.
            All text colors are AAA compliant for accessibility.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Colors</h2>
          
          <div className={styles.colorGroup}>
            <label htmlFor="text-color" className={styles.colorLabel}>
              Text Color (for contrast testing)
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="text-color"
                type="color"
                value={customTextColor}
                onChange={(e) => setCustomTextColor(e.target.value)}
                className={styles.colorInput}
                aria-label="Text color"
              />
              <input
                type="text"
                value={customTextColor}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    setCustomTextColor(e.target.value);
                  }
                }}
                className={styles.colorTextInput}
                pattern="^#[0-9A-Fa-f]{6}$"
                aria-label="Text color hex value"
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Use this color to test contrast against background colors below
            </p>
          </div>

          <div className={styles.colorGroup}>
            <label htmlFor="primary-color" className={styles.colorLabel}>
              Primary Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className={styles.colorInput}
                aria-label="Primary color"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    setPrimaryColor(e.target.value);
                  }
                }}
                className={styles.colorTextInput}
                pattern="^#[0-9A-Fa-f]{6}$"
                aria-label="Primary color hex value"
              />
            </div>
            <ContrastDisplay 
              backgroundColor={primaryColor} 
              textColor={customTextColor}
              showTextColorInput={false}
            />
          </div>

          <div className={styles.colorGroup}>
            <label htmlFor="secondary-color" className={styles.colorLabel}>
              Secondary Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="secondary-color"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className={styles.colorInput}
                aria-label="Secondary color"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    setSecondaryColor(e.target.value);
                  }
                }}
                className={styles.colorTextInput}
                pattern="^#[0-9A-Fa-f]{6}$"
                aria-label="Secondary color hex value"
              />
            </div>
            <ContrastDisplay 
              backgroundColor={secondaryColor} 
              textColor={customTextColor}
              showTextColorInput={false}
            />
          </div>

          <div className={styles.colorGroup}>
            <label htmlFor="accent-color" className={styles.colorLabel}>
              Accent Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className={styles.colorInput}
                aria-label="Accent color"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    setAccentColor(e.target.value);
                  }
                }}
                className={styles.colorTextInput}
                pattern="^#[0-9A-Fa-f]{6}$"
                aria-label="Accent color hex value"
              />
            </div>
            <ContrastDisplay 
              backgroundColor={accentColor} 
              textColor={customTextColor}
              showTextColorInput={false}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Typography</h2>
          
          <div className={styles.fontGroup}>
            <label htmlFor="font-select" className={styles.fontLabel}>
              Font Family
            </label>
            <select
              id="font-select"
              value={selectedFont.name}
              onChange={(e) => {
                const font = googleFonts.find(f => f.name === e.target.value);
                if (font) setSelectedFont(font);
              }}
              className={styles.fontSelect}
              aria-label="Select font family"
            >
              {googleFonts.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              onClick={downloadScssVariables}
              className={styles.downloadButton}
            >
              Download SCSS Variables
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className={styles.resetButton}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewContent}>
          <Text variant="heading" size="3xl" as="h1">
            Component Preview
          </Text>
          <Text variant="body" size="base" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            All components below update in real-time as you modify the design tokens.
            Text colors automatically adjust to meet AAA accessibility standards.
          </Text>

          <div className={styles.previewSection}>
            <h2 className={styles.previewSectionTitle}>Buttons</h2>
            <div className={styles.buttonGroup}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <div className={styles.previewSection}>
            <h2 className={styles.previewSectionTitle}>Inputs</h2>
            <div className={styles.inputGroup}>
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email" type="email" placeholder="Enter your email" helperText="We'll never share your email" />
              <Input label="Password" type="password" placeholder="Enter password" required />
              <Input label="Error State" error="This field is required" />
            </div>
          </div>

          <div className={styles.previewSection}>
            <h2 className={styles.previewSectionTitle}>Contrast Test Preview</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Preview how your custom text color looks against each background color with real-time contrast evaluation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: primaryColor, color: customTextColor }}>
                <Text variant="heading" size="lg" as="h3" style={{ margin: 0, color: customTextColor }}>
                  Primary Background ({primaryContrast.ratio}:1)
                </Text>
                <Text variant="body" size="base" style={{ marginTop: '0.5rem', color: customTextColor }}>
                  This is sample text to preview how your custom text color looks on the primary background. 
                  {primaryContrast.passesAAA && ' ✓ AAA Pass'}
                  {!primaryContrast.passesAAA && primaryContrast.passesAA && ' ✓ AA Pass'}
                  {!primaryContrast.passesAA && ' ✗ Fail'}
                </Text>
              </div>
              <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: secondaryColor, color: customTextColor }}>
                <Text variant="heading" size="lg" as="h3" style={{ margin: 0, color: customTextColor }}>
                  Secondary Background ({secondaryContrast.ratio}:1)
                </Text>
                <Text variant="body" size="base" style={{ marginTop: '0.5rem', color: customTextColor }}>
                  This is sample text to preview how your custom text color looks on the secondary background.
                  {secondaryContrast.passesAAA && ' ✓ AAA Pass'}
                  {!secondaryContrast.passesAAA && secondaryContrast.passesAA && ' ✓ AA Pass'}
                  {!secondaryContrast.passesAA && ' ✗ Fail'}
                </Text>
              </div>
              <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: accentColor, color: customTextColor }}>
                <Text variant="heading" size="lg" as="h3" style={{ margin: 0, color: customTextColor }}>
                  Accent Background ({accentContrast.ratio}:1)
                </Text>
                <Text variant="body" size="base" style={{ marginTop: '0.5rem', color: customTextColor }}>
                  This is sample text to preview how your custom text color looks on the accent background.
                  {accentContrast.passesAAA && ' ✓ AAA Pass'}
                  {!accentContrast.passesAAA && accentContrast.passesAA && ' ✓ AA Pass'}
                  {!accentContrast.passesAA && ' ✗ Fail'}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.previewSection}>
            <h2 className={styles.previewSectionTitle}>Typography</h2>
            <div className={styles.typographyGroup}>
              <Text variant="heading" size="4xl" as="h1">Heading 4XL</Text>
              <Text variant="heading" size="3xl" as="h2">Heading 3XL</Text>
              <Text variant="heading" size="2xl" as="h3">Heading 2XL</Text>
              <Text variant="heading" size="xl" as="h4">Heading XL</Text>
              <Text variant="body" size="lg">Body Large</Text>
              <Text variant="body" size="base">Body Base</Text>
              <Text variant="body" size="sm">Body Small</Text>
              <Text variant="caption">Caption Text</Text>
              <Text variant="label">Label Text</Text>
            </div>
          </div>

          <div className={styles.previewSection}>
            <h2 className={styles.previewSectionTitle}>Combined Example</h2>
            <div className={styles.combinedExample}>
              <Text variant="heading" size="2xl" as="h3">
                Contact Form
              </Text>
              <Text variant="body" style={{ marginBottom: '1.5rem' }}>
                Fill out the form below to get in touch.
              </Text>
              <Input label="Full Name" placeholder="John Doe" required />
              <Input label="Email Address" type="email" placeholder="john@example.com" required />
              <Input label="Message" placeholder="Your message here..." helperText="Minimum 10 characters" />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                <Button variant="primary">Submit</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TokenCustomizer.displayName = 'TokenCustomizer';
