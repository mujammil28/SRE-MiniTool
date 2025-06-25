module.exports = function parseLog(logText) {
  const lines = logText.split("\n");
  let errorCount = 0, warnCount = 0, infoCount = 0, criticalCount = 0;

  lines.forEach(line => {
    if (/CRITICAL/i.test(line)) criticalCount++;
    else if (/ERROR/i.test(line)) errorCount++;
    else if (/WARN/i.test(line)) warnCount++;
    else if (/INFO/i.test(line)) infoCount++;
  });

  return {
    totalLines: lines.length,
    errors: errorCount,
    warnings: warnCount,
    critical: criticalCount,
    info: infoCount
  };
};
