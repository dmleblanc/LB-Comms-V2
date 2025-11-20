# Deprecated Files

**Date**: November 19, 2025

## Overview

The following files have been deprecated as part of the JavaScript and CSS modularization migration. They are preserved for reference but are **no longer used** by the application.

## Deprecated Files

### 1. `scripts.js.deprecated`
- **Original**: `scripts.js` (397 lines)
- **Deprecated**: November 19, 2025
- **Reason**: Replaced by modular ES6 architecture
- **Replacement**: `src/js/` directory with 9 modules

#### Migration Path
The single-file JavaScript has been split into:
- `src/js/main.js` - Application entry point
- `src/js/config/constants.js` - Configuration
- `src/js/utils/dom.js` - DOM utilities
- `src/js/modules/` - 6 feature modules
  - header.js
  - carousel.js
  - forms.js
  - animations.js
  - specialties.js
  - tableau.js

#### Key Improvements
- ✅ Consolidated 7 DOMContentLoaded listeners → 1
- ✅ Removed ~70 lines of duplicate code
- ✅ Added error handling for missing DOM elements
- ✅ Centralized configuration
- ✅ ES6 modules with proper encapsulation

### 2. `styles.css.deprecated`
- **Original**: `styles.css` (1,791 lines)
- **Deprecated**: November 19, 2025
- **Reason**: Replaced by modular CSS architecture
- **Replacement**: `src/css/` directory with 22 modules

#### Migration Path
The monolithic CSS file has been split into:
- `src/css/main.css` - Entry point with @imports
- `src/css/base/` - 3 foundation files
- `src/css/layout/` - 3 layout files
- `src/css/components/` - 11 component files
- `src/css/pages/` - 3 page-specific files
- `src/css/utilities/` - 1 utilities file

#### Key Improvements
- ✅ 1 CSS variable → 105+ custom properties
- ✅ Organized by responsibility (ITCSS-inspired)
- ✅ Consistent design tokens
- ✅ Better maintainability
- ✅ Easier to find and modify styles

## Why Were These Files Deprecated?

### Problems with Old Architecture
1. **Poor Organization**: All code in single files
2. **No Separation of Concerns**: Mixed responsibilities
3. **Code Duplication**: Repeated logic and styles
4. **Magic Numbers**: Hardcoded values throughout
5. **No Error Handling**: Crashes on missing elements
6. **Difficult Maintenance**: Hard to find and modify code
7. **No Build Process**: No optimization or minification

### Benefits of New Architecture
1. **Modular**: Clear separation by feature
2. **Maintainable**: Easy to find and update code
3. **Reusable**: Shared utilities and variables
4. **Optimized**: Production builds with minification
5. **Professional**: Industry-standard structure
6. **Scalable**: Easy to add new features
7. **Type-Safe Ready**: Can add TypeScript easily

## Migration Documentation

For detailed migration information, see:
- **JavaScript**: [MIGRATION.md](MIGRATION.md)
- **CSS**: [CSS-MIGRATION.md](CSS-MIGRATION.md)
- **Development**: [README.md](README.md)

## Rollback Instructions

If you need to temporarily rollback to the old files:

### JavaScript Rollback
```bash
# Rename back
mv scripts.js.deprecated scripts.js

# Update HTML files
# index.html: <script src="scripts.js"></script>
# about.html: <script src="scripts.js"></script>
```

### CSS Rollback
```bash
# Rename back
mv styles.css.deprecated styles.css

# Update HTML files
# index.html: <link rel="stylesheet" href="styles.css">
# about.html: <link rel="stylesheet" href="styles.css">
```

**Note**: Rollback is not recommended. The new modular architecture is superior in every way.

## Can These Files Be Deleted?

### Recommendation: **Keep for 1-2 release cycles**

**Reasons to keep temporarily:**
- Reference for any missing functionality
- Historical comparison
- Emergency rollback option
- Team familiarity transition

**Safe to delete when:**
- ✅ All team members familiar with new structure
- ✅ New architecture tested in production for 30+ days
- ✅ No bugs attributed to migration
- ✅ All functionality verified equivalent

**How to delete (when ready):**
```bash
rm scripts.js.deprecated
rm styles.css.deprecated
```

## Production Impact

### Files Used in Production
- ✅ `src/js/main.js` → bundled to `dist/assets/main-*.js`
- ✅ `src/css/main.css` → bundled to `dist/assets/main-*.css`

### Files NOT Used
- ❌ `scripts.js.deprecated` - Ignored by build system
- ❌ `styles.css.deprecated` - Ignored by build system

## Bundle Size Comparison

| File | Before | After | Change |
|------|--------|-------|--------|
| JavaScript | ~397 lines (unbundled) | 9.4 KB gzipped | Optimized |
| CSS | ~1,791 lines (unbundled) | 4.8 KB gzipped | Similar |
| **Total** | **No bundling** | **14.2 KB gzipped** | **Production ready** |

## Questions?

**Q: Will the old files affect performance?**
A: No, they are not loaded by the application.

**Q: Should I commit these to Git?**
A: Yes, keep them in Git history for reference. They can be deleted in a future commit.

**Q: What if I find a bug?**
A: Check the migration docs first. If needed, compare with deprecated files to verify the migration was accurate.

**Q: Can I use both old and new files?**
A: No, the HTML files only reference the new modular structure. Don't revert unless absolutely necessary.

## Timeline

- **Nov 19, 2025**: Files deprecated
- **Dec 19, 2025**: Review for deletion (after 30 days)
- **Jan 19, 2026**: Safe to delete (after 60 days)

## Support

For questions about the migration:
1. Read [MIGRATION.md](MIGRATION.md) and [CSS-MIGRATION.md](CSS-MIGRATION.md)
2. Check [README.md](README.md) for development workflow
3. Review [.claude/claude.md](.claude/claude.md) for architecture details

---

**Status**: Deprecated but preserved for reference
**Safe to delete**: January 19, 2026 (after 60 days in production)
