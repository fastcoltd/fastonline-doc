
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化分页组件
    const pagination = new Pagination({
      current: 1,
      pageSize: 20,
      total: 285,
      showSizeChanger: true,
      showQuickJumper: true
    });
  
    // 页面变化回调
    pagination.onPageChange = (page, pageSize) => {
      console.log(`页面变化: 第${page}页, 每页${pageSize}条`);
    };
  
    // 页面大小变化回调
    pagination.onPageSizeChange = (page, pageSize) => {
      console.log(`页面大小变化: 第${page}页, 每页${pageSize}条`);
    };
    this.layout = new PageLayout();
    //   this.sort = new SortSelector();
    $('.load-more').on('click', function () {
      $('.loading').show()
      $('.load-more-text').hide()
      setTimeout(() => {
        $('.items-pager').each(function () {
          const htmlStr = $(this).children(':not(.no-data-wrapper)').map(function () {
            return this.outerHTML;
          }).get().join('');
          const $emptyState = $(this).children('.no-data-wrapper').first();
          if ($emptyState.length) {
            $emptyState.before(htmlStr);
          } else {
            $(this).append(htmlStr);
          }
        })
        $('.loading').hide()
        $('.load-more-text').show()
      }, 2000)
    })

    const sideMenuButton = document.querySelector('.detail-page-menu');
    const sidePanel = document.getElementById('blog-side-panel');
    const sidePanelContent = sidePanel ? sidePanel.querySelector('.other-info-wrapper') : null;
    const sideClose = sidePanel ? sidePanel.querySelector('.table-of-container-close') : null;

    const resetSidePanelScrollTop = () => {
      if (sidePanel) {
        sidePanel.scrollTop = 0;
      }
      if (sidePanelContent) {
        sidePanelContent.scrollTop = 0;
      }
    };

    const toggleSidePanel = (visible) => {
      if (!sidePanel) {
        return;
      }
      sidePanel.classList.toggle('is-open', visible);
      sidePanel.setAttribute('aria-hidden', visible ? 'false' : 'true');
      if (visible) {
        resetSidePanelScrollTop();
        window.requestAnimationFrame(resetSidePanelScrollTop);
        window.setTimeout(resetSidePanelScrollTop, 80);
      }
      if (sideMenuButton) {
        sideMenuButton.setAttribute('aria-expanded', visible ? 'true' : 'false');
      }
    };

    const syncPanelByViewport = () => {
      if (!sidePanel) {
        return;
      }
      if (window.matchMedia('(max-width: 768px)').matches) {
        toggleSidePanel(false);
        return;
      }
      sidePanel.classList.remove('is-open');
      sidePanel.setAttribute('aria-hidden', 'false');
      if (sideMenuButton) {
        sideMenuButton.setAttribute('aria-expanded', 'false');
      }
    };

    if (sideMenuButton && sidePanel) {
      sideMenuButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const visible = sidePanel.classList.contains('is-open');
        toggleSidePanel(!visible);
      });
    }

    if (sideClose) {
      sideClose.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSidePanel(false);
      });
    }

    if (sidePanel) {
      sidePanel.addEventListener('click', (event) => {
        if (event.target === sidePanel) {
          toggleSidePanel(false);
        }
      });
    }

    syncPanelByViewport();
    window.addEventListener('resize', syncPanelByViewport);
  });
