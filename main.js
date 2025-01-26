chrome.extension
  .getBackgroundPage()
  .console.log("[main.js]");

var lastModifiedDate;

var checkRELOADME = (dir) => {
  dir.createReader().readEntries((entries) => {
    entries.map((e) => {
      const p = new Promise((r) => e.file(r));
      p.then((f) => {
        if (f.name === "RELOADME") {
          if (f.lastModifiedDate > lastModifiedDate) {
            setTimeout(() => chrome.tabs.reload(), 800);
          }

          lastModifiedDate = f.lastModifiedDate;

          setTimeout(() => checkRELOADME(dir), 600);
        }
      });
    });
  });
};

chrome.management.getSelf((self) => {
  chrome.runtime.getPackageDirectoryEntry((dir) => {
    console.log("[main.js] dir:", dir);
    checkRELOADME(dir);
  });
});
