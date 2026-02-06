# Sentinel's Journal 🛡️

## 2025-05-15 - [Defense in Depth: Input Validation]
**Vulnerability:** Lack of input length limits on user-facing fields (folder names, search, password).
**Learning:** Purely client-side applications often overlook input validation as there is no backend to "protect". However, missing limits can lead to state corruption and storage-based DoS (filling localStorage with massive strings).
**Prevention:** Always enforce `maxLength` on UI inputs AND implement truncation logic in the state management layer (e.g., Zustand store) to ensure data integrity even if UI constraints are bypassed.

## 2025-05-16 - [Bulk Import Validation Gap]
**Vulnerability:** Data import function (`importFolders`) bypassed the "Defense in Depth" input validation patterns applied to single-item UI actions.
**Learning:** Security patterns like input truncation and property filtering must be applied at the state management level for ALL entry points. A secure UI doesn't guarantee a secure state if bulk operations (like JSON imports) skip the same checks.
**Prevention:** Implement a central sanitization helper or ensure that bulk processing logic (e.g., recursive import) explicitly maps to allowed types and enforces constraints like `maxLength` consistently with the rest of the application.

## 2025-05-17 - [URL-based XSS Prevention]
**Vulnerability:** Malicious URLs (`javascript:`) could be injected via data import or external APIs and executed via `window.open` or image `src`.
**Learning:** Whitelisting protocols (http, https, data:image/) is more robust than blacklisting `javascript:`. Centralizing this logic ensures consistency across manual and bulk entry points.
**Prevention:** Use a dedicated sanitization utility (e.g., `sanitizeUrl`) for all URL fields before they reach the state store.

## 2025-05-18 - [Secure OAuth State & Randomness]
**Vulnerability:** Use of insecure `Math.random()` for OAuth PKCE verifiers and lack of `state` parameter in Spotify auth flow.
**Learning:** OAuth 2.0 flows, even with PKCE, should always use a `state` parameter to prevent CSRF attacks. Cryptographically secure random number generators (CSPRNG) like `crypto.getRandomValues()` are mandatory for any security-sensitive value (verifiers, states, IDs).
**Prevention:** Always implement the `state` parameter in OAuth flows and verify it in the callback. Use `crypto.getRandomValues()` instead of `Math.random()` for any value that must be unpredictable.
