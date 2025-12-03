/**
 * Application Health Check
 * Verifies that required APIs and resources are available
 */

interface HealthCheckResult {
  passed: boolean;
  checks: {
    name: string;
    passed: boolean;
    message?: string;
  }[];
}

export const initHealthCheck = {
  async runChecks(): Promise<HealthCheckResult> {
    const checks = [];
    let allPassed = true;

    // Check API connection
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      console.log(`[Health Check] Testing API connection at ${apiUrl}`);
      
      const response = await fetch(`${apiUrl}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        checks.push({
          name: 'API Connection',
          passed: true,
          message: `API is reachable at ${apiUrl}`,
        });
      } else {
        throw new Error(`API returned status ${response.status}`);
      }
    } catch (error) {
      allPassed = false;
      checks.push({
        name: 'API Connection',
        passed: false,
        message: error instanceof Error ? error.message : 'Failed to connect to API',
      });
    }

    // Check localStorage availability
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      checks.push({
        name: 'LocalStorage',
        passed: true,
        message: 'LocalStorage is available',
      });
    } catch (error) {
      allPassed = false;
      checks.push({
        name: 'LocalStorage',
        passed: false,
        message: 'LocalStorage is not available (private browsing mode?)',
      });
    }

    return {
      passed: allPassed,
      checks,
    };
  },

  displayResults(result: HealthCheckResult, container: HTMLElement): void {
    const failedChecks = result.checks.filter((check) => !check.passed);

    container.innerHTML = `
      <div style="
        padding: 40px 20px;
        font-family: system-ui, -apple-system, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        color: #fff;
        background: #0a0a0a;
        min-height: 100vh;
      ">
        <h1 style="color: #f59e0b; margin-bottom: 20px; font-size: 24px;">
          ⚠️ Health Check Failed
        </h1>
        <p style="color: #999; margin-bottom: 30px; line-height: 1.6;">
          Some required services or features are not available:
        </p>
        ${failedChecks
          .map(
            (check) => `
          <div style="
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
          ">
            <div style="color: #f59e0b; font-weight: 600; margin-bottom: 8px;">
              ${check.name}
            </div>
            <div style="color: #999; font-size: 14px;">
              ${check.message}
            </div>
          </div>
        `
          )
          .join('')}
        <div style="margin-top: 20px;">
          <button onclick="window.location.reload()" style="
            padding: 12px 24px;
            background: #8b5cf6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          ">Retry</button>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; line-height: 1.6;">
            <strong>Troubleshooting:</strong><br>
            • Make sure the backend server is running on http://localhost:3001<br>
            • Check the browser console for more details<br>
            • Verify your network connection
          </p>
        </div>
      </div>
    `;
  },
};

export default initHealthCheck;

