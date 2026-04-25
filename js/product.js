document.addEventListener('DOMContentLoaded', function () {
  const contentLimit = 3; // items per page
  const listItems = document.querySelectorAll('#paginationList .pro-list');
  const pageNumbers = document.querySelector('.pageNumbers');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  if (!listItems || listItems.length === 0) {
    console.warn('No product items found (selector: #paginationList .pro-list).');
    return;
  }

  const pageCount = Math.max(1, Math.ceil(listItems.length / contentLimit));
  let currentPage = 1;

  function createPageLinks() {
    pageNumbers.innerHTML = '';

    // Show ellipses for long paginations
    if (pageCount <= 5) {
      // show all numbers
      for (let i = 1; i <= pageCount; i++) addPageLink(i);
    } else if (pageCount > 5 && pageCount <= 15) {
      // medium range: show first 2, last 2, and current range
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) addPageLink(i);
        addEllipsis();
        addPageLink(pageCount - 1);
        addPageLink(pageCount);
      } else if (currentPage >= pageCount - 2) {
        addPageLink(1);
        addPageLink(2);
        addEllipsis();
        for (let i = pageCount - 3; i <= pageCount; i++) addPageLink(i);
      } else {
        addPageLink(1);
        addEllipsis();
        for (let i = currentPage - 1; i <= currentPage + 1; i++) addPageLink(i);
        addEllipsis();
        addPageLink(pageCount);
      }
    } else {
      // large range (>15): show first 5, last 5, and current middle range
      if (currentPage <= 5) {
        for (let i = 1; i <= 5; i++) addPageLink(i);
        addEllipsis();
        for (let i = pageCount - 1; i <= pageCount; i++) addPageLink(i);
      } else if (currentPage >= pageCount - 4) {
        for (let i = 1; i <= 2; i++) addPageLink(i);
        addEllipsis();
        for (let i = pageCount - 4; i <= pageCount; i++) addPageLink(i);
      } else {
        for (let i = 1; i <= 2; i++) addPageLink(i);
        addEllipsis();
        for (let i = currentPage - 2; i <= currentPage + 2; i++) addPageLink(i);
        addEllipsis();
        for (let i = pageCount - 1; i <= pageCount; i++) addPageLink(i);
      }
    }

    updateActiveNumber();
  }

  function addPageLink(i) {
    const a = document.createElement('a');
    a.href = '#';
    a.dataset.index = String(i);
    a.textContent = String(i);
    a.addEventListener('click', function (e) {
      e.preventDefault();
      setCurrentPage(i);
      document.querySelector('.products-section')
        .scrollIntoView({ behavior: 'smooth' });
    });
    pageNumbers.appendChild(a);
  }

  function addEllipsis() {
    const span = document.createElement('span');
    span.textContent = '...';
    span.classList.add('ellipsis');
    pageNumbers.appendChild(span);
  }

  function updateButtons() {
    const prevDisabled = (currentPage === 1);
    const nextDisabled = (currentPage === pageCount);
    prevButton.disabled = prevDisabled;
    nextButton.disabled = nextDisabled;
    prevButton.classList.toggle('disabled', prevDisabled);
    nextButton.classList.toggle('disabled', nextDisabled);
  }

  function updateActiveNumber() {
    pageNumbers.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', Number(a.dataset.index) === currentPage);
    });
  }

  function setCurrentPage(pageNum) {
    if (pageNum < 1) pageNum = 1;
    if (pageNum > pageCount) pageNum = pageCount;
    currentPage = pageNum;

    const start = (currentPage - 1) * contentLimit;
    const end = currentPage * contentLimit;

    listItems.forEach((el, idx) => {
      el.style.display = (idx >= start && idx < end) ? '' : 'none';
    });

    updateButtons();
    createPageLinks();
  }

  // Prev / Next events with smooth scroll
  prevButton.addEventListener('click', function () {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      document.querySelector('.products-section')
        .scrollIntoView({ behavior: 'smooth' });
    }
  });

  nextButton.addEventListener('click', function () {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      document.querySelector('.products-section')
        .scrollIntoView({ behavior: 'smooth' });
    }
  });

  // init
  createPageLinks();
  setCurrentPage(1);
});
