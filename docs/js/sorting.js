
(() => {
  function initialize() {
    document.querySelectorAll(
      'iframe[src*="sorting-app/"]'
    ).forEach(iframe => {
      if (iframe.dataset.autoResize === "true") return;
      iframe.dataset.autoResize = "true";

      let resize = () => {};

      iframe.addEventListener("load", () => {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) return;

        // 先缩小 iframe，测量内容的实际高度
        iframe.style.height = "1px";

        resize = () => {
          if (!iframe.getClientRects().length || iframe.clientWidth === 0) return;
          const content = doc.querySelector('#TwoPanels');
          if (!content) return;
          const height = Math.ceil(content.getBoundingClientRect().bottom + doc.defaultView.scrollY);

          if (height > 0 && iframe.style.height !== `${height + 8}px`) {
            iframe.style.height = `${height + 8}px`;
          }
        };

        const observer = new ResizeObserver(resize);
        observer.observe(doc.body);

        resize();
      });

      // 切换 MkDocs 标签页后重新计算高度
      document.addEventListener("click", () => {
        setTimeout(resize, 100);
      });
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else {
    document.addEventListener("DOMContentLoaded", initialize);
  }
})();
